import Link from "next/link";

export default function LogoHeader() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="text-red-600 font-bold text-xl tracking-tight">
        Nuestras
      </span>
      <span className="text-zinc-100 font-bold text-xl tracking-tight">
        Actividades
      </span>
    </Link>
  );
}
