import Link from "next/link";

export default function NavegarHeader() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link href="/" className="text-sm text-zinc-700 dark:text-zinc-300">
        Inicio
      </Link>
      <Link
        href="/Actividades"
        className="text-sm text-zinc-700 dark:text-zinc-300"
      >
        Actividades
      </Link>
      <Link
        href="/sobre-nosotros"
        className="text-sm text-zinc-700 dark:text-zinc-300"
      >
        Sobre nosotros
      </Link>
      <Link
        href="/contacto"
        className="text-sm text-zinc-700 dark:text-zinc-300"
      >
        Contacto
      </Link>
    </nav>
  );
}
