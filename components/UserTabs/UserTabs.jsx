"use client";

import Link from "next/link";

export default function UserTabs({ isAdmin }) {
  return (
    <div className="flex gap-2 tabs justify-center">
      <Link className="active" href="/profile">
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link className="" href="/categories">
            Categories
          </Link>
          <Link className="" href="/menu-items">
            Menu Items
          </Link>
          <Link className="" href="/users">
            Users
          </Link>
        </>
      )}
    </div>
  )
}
