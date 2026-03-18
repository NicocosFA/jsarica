import Link from "next/link";

export default function NavegarHeader() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link href="/" className="text-sm text-zinc-300 hover:text-white transition-colors">
        Inicio
      </Link>
      <Link href="/Actividades" className="text-sm text-zinc-300 hover:text-white transition-colors">
        Actividades
      </Link>
      <Link href="/sobre-nosotros" className="text-sm text-zinc-300 hover:text-white transition-colors">
        Sobre nosotros
      </Link>
      <Link href="/contacto" className="text-sm text-zinc-300 hover:text-white transition-colors">
        Contacto
      </Link>
    </nav>
  );
}
