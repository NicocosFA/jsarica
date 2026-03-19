import Link from "next/link";

export default function LogoHeader() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <img src="/images/logo/logo.png" alt="Logo" className="h-10 w-auto" />
      <div className="w-px h-8 bg-white" />
    </Link>
  );
}
