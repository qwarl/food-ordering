"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const session = useSession();
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0] + " " + userName.split(" ")[1];
  }
   //const { data: session, status } = useSession();

  return (
    <header className="flex justify-between">
      <nav className="flex gap-8 items-center">
        <Link href="/" className="text-[#F13A01] uppercase font-bold text-2xl">
          ST Pizza
        </Link>
        <Link href="/" className="font-bold text-base text-[#6B7280]">
          Home
        </Link>
        <Link href="" className="font-bold text-base text-[#6B7280]">
          Menu
        </Link>
        <Link href="" className="font-bold text-base text-[#6B7280]">
          About
        </Link>
        <Link href="" className="font-bold text-base text-[#6B7280]">
          Contact
        </Link>
      </nav>

      {/* use this if the css is break */}
      {/* {session.status === "unauthenticated" ? (
        <nav className="flex gap-4 items-center">
          <Link href="/login" className="font-bold text-base text-[#6B7280]">
            Login
          </Link>
          <Link
            href="/register"
            className="font-bold text-base text-white bg-[#F13A01] px-8 py-2 rounded-full"
          >
            Register
          </Link>
          <Link href="">Cart</Link>
        </nav>
      ) : (
        <nav className="flex gap-4 items-center">
          <button
            href="/login"
            className="font-bold text-base text-[#6B7280]"
            onClick={() => signOut()}
          >
            Logout
          </button>
          <Link href="">Cart</Link>
        </nav>
      )} */}
      <nav className="flex gap-4 items-center">
        {session.status === "unauthenticated" ? (
          <>
            <Link href="/login" className="font-bold text-base text-[#6B7280]">
              Login
            </Link>
            <Link
              href="/register"
              className="font-bold text-base text-white bg-[#F13A01] px-8 py-2 rounded-full"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link href="profile" className="whitespace-nowrap">
              Hello, {userName}
            </Link>
            <button
              href="/login"
              className="font-bold text-base text-[#6B7280]"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </>
        )}
        <Link href="">Cart</Link>
      </nav>
    </header>
  );
}
