import Link from "next/link";

export default function LogoHeader() {
  return (
    <div className="flex items-center">
      <Link
        href="/"
        className="text-lg font-semibold text-black dark:text-white"
      >
        Nuestras Actividades
      </Link>
    </div>
  );
}
