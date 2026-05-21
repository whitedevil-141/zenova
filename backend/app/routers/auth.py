"""Authentication endpoints."""

from __future__ import annotations

import uuid

from fastapi import APIRouter, Request, Response
from sqlalchemy import select

from app.config import get_settings
from app.deps import CurrentAdmin, DbSession
from app.errors import AuthError
from app.limiter import limiter
from app.logging import logger
from app.models import AdminUser
from app.schemas import (
    AdminUserOut,
    LoginRequest,
    LoginResponse,
    RefreshRequest,
    TokenPair,
)
from app.security import decode_token, issue_token, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])

_settings = get_settings()


def _user_to_schema(u: AdminUser) -> AdminUserOut:
    return AdminUserOut(
        id=str(u.id),
        email=u.email,
        name=u.name,
        is_active=u.is_active,
        created_at=u.created_at,
    )


def _issue_pair(user_id: uuid.UUID) -> TokenPair:
    access, ttl = issue_token(str(user_id), kind="access")
    refresh, _ = issue_token(str(user_id), kind="refresh")
    return TokenPair(access_token=access, refresh_token=refresh, expires_in=ttl)


@router.post("/login", response_model=LoginResponse)
@limiter.limit(_settings.rate_limit_login)
async def login(
    request: Request,
    response: Response,
    payload: LoginRequest,
    db: DbSession,
) -> LoginResponse:
    """Exchange email + password for an access/refresh token pair."""
    print("LOGIN REQUEST")
    stmt = select(AdminUser).where(AdminUser.email == payload.email.lower())
    user = (await db.execute(stmt)).scalar_one_or_none()
    print("HASH =", user.password_hash if user else None)
    if user is None or not verify_password(payload.password, user.password_hash):
        logger.info(
            "login_failed",
            email=payload.email,
            reason="no_user" if user is None else "bad_password",
        )
        # Identical error for missing user vs wrong password — avoids enumeration.
        raise AuthError("Invalid email or password.", code="invalid_credentials")

    if not user.is_active:
        logger.info("login_failed", email=payload.email, reason="inactive", user_id=str(user.id))
        raise AuthError("Account is disabled.", code="forbidden")

    logger.info("login_success", user_id=str(user.id), email=user.email)
    return LoginResponse(user=_user_to_schema(user), tokens=_issue_pair(user.id))


@router.post("/refresh", response_model=TokenPair)
async def refresh(payload: RefreshRequest, db: DbSession) -> TokenPair:
    claims = decode_token(payload.refresh_token, expected_type="refresh")
    try:
        user_id = uuid.UUID(claims["sub"])
    except (KeyError, ValueError) as e:
        raise AuthError("Invalid token subject.", code="invalid_token") from e

    user = await db.get(AdminUser, user_id)
    if user is None or not user.is_active:
        raise AuthError("Account is not active.", code="forbidden")
    return _issue_pair(user.id)


@router.get("/me", response_model=AdminUserOut)
async def me(current: CurrentAdmin) -> AdminUserOut:
    return _user_to_schema(current)
