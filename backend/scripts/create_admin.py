"""Create or update an admin user.

Usage:
    python -m scripts.create_admin --email you@example.com --name "Your Name"

You will be prompted for a password (hidden). Pass ``--password`` to skip the
prompt (not recommended outside automation).
"""

from __future__ import annotations

import argparse
import asyncio
import getpass
import sys

from sqlalchemy import select

from app.db import session_scope
from app.models import AdminUser
from app.security import hash_password


async def upsert_admin(email: str, name: str, password: str) -> None:
    email = email.lower().strip()
    async with session_scope() as db:
        existing = (await db.execute(select(AdminUser).where(AdminUser.email == email))).scalar_one_or_none()
        if existing is None:
            db.add(AdminUser(email=email, name=name, password_hash=hash_password(password)))
            print(f"Created admin {email}.")
        else:
            existing.name = name
            existing.password_hash = hash_password(password)
            existing.is_active = True
            print(f"Updated admin {email}.")


def main() -> None:
    parser = argparse.ArgumentParser(description="Create or update an admin user.")
    parser.add_argument("--email", required=True)
    parser.add_argument("--name", required=True)
    parser.add_argument("--password", default=None, help="If omitted, prompted interactively.")
    args = parser.parse_args()

    password = args.password
    if not password:
        password = getpass.getpass("Password: ")
        confirm = getpass.getpass("Confirm:  ")
        if password != confirm:
            print("Passwords do not match.", file=sys.stderr)
            sys.exit(1)
    if len(password) < 8:
        print("Password must be at least 8 characters.", file=sys.stderr)
        sys.exit(1)

    asyncio.run(upsert_admin(args.email, args.name, password))


if __name__ == "__main__":
    main()
