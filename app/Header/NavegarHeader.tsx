import Link from "next/link";

export default function NavegarHeader() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link href="/" className="text-sm font-semibold text-white hover:text-red-300 transition-colors duration-200 uppercase tracking-wide">
        Inicio
      </Link>
      <Link href="/Actividades" className="text-sm font-semibold text-white hover:text-red-300 transition-colors duration-200 uppercase tracking-wide">
        Actividades
      </Link>
      <Link href="/SobreNosotros" className="text-sm font-semibold text-white hover:text-red-300 transition-colors duration-200 uppercase tracking-wide">
        Sobre nosotros
      </Link>
      <Link href="/Contacto" className="text-sm font-semibold text-white hover:text-red-300 transition-colors duration-200 uppercase tracking-wide">
        Contacto
      </Link>
    </nav>
  );
}
