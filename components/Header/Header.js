import Link from "next/link";
export default function Header() {
  return (
    <>
      <div className="flex justify-between">
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
      </div>
    </>
  );
}
