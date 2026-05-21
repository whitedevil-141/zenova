"""FastAPI dependencies."""

from __future__ import annotations

import uuid
from typing import Annotated

import structlog
from fastapi import Depends, Header
from sqlalchemy import select  # noqa: F401  (kept for future query deps)
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.errors import AuthError
from app.models import AdminUser
from app.security import decode_token

DbSession = Annotated[AsyncSession, Depends(get_session)]


async def get_current_admin(
    db: DbSession,
    authorization: Annotated[str | None, Header()] = None,
) -> AdminUser:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise AuthError("Missing or malformed Authorization header.", code="unauthorized")

    token = authorization.split(" ", 1)[1].strip()
    payload = decode_token(token, expected_type="access")

    try:
        user_id = uuid.UUID(payload["sub"])
    except (KeyError, ValueError) as e:
        raise AuthError("Invalid token subject.", code="invalid_token") from e

    user = await db.get(AdminUser, user_id)
    if user is None or not user.is_active:
        raise AuthError("Account is not active.", code="forbidden")

    # Bind user identity to the request's structured log context. Every log
    # emitted later in this request (router code, storage helpers, etc.) will
    # carry user_id without callers having to pass it explicitly.
    structlog.contextvars.bind_contextvars(user_id=str(user.id))
    return user


CurrentAdmin = Annotated[AdminUser, Depends(get_current_admin)]
