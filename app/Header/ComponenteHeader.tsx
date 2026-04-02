"use client";
import { useState } from "react";
import LogoHeader from "./LogoHeader";
import NavegarHeader from "./NavegarHeader";

export default function ComponenteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-red-900 border-b border-red-950 shadow-sm relative z-20">
      {/* Franja separadora superior */}
      <div className="w-full h-px bg-white" />
      <div className="w-full px-10 py-0 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <img src="/images/logo/logo.png" alt="Logo" className="h-13 w-auto" />
          <div className="w-px h-16 bg-white" />
          <span className="text-white font-bold text-xl tracking-tight">Únete a nosotros</span>
        </div>

        {/* Nav escritorio */}
        <div className="hidden md:flex items-center gap-1">
          <NavegarHeader />
        </div>

        {/* Botón hamburguesa móvil */}
        <div className="md:hidden">
          <button
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded text-white"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-red-950/70" onClick={() => setOpen(false)} />
          <div className="absolute top-0 right-0 w-3/4 max-w-sm h-full bg-red-900 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <LogoHeader />
              <button aria-label="Cerrar menú" onClick={() => setOpen(false)} className="p-2">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {[
                { href: "/", label: "Inicio" },
                { href: "/Actividades", label: "Actividades" },
                { href: "/SobreNosotros", label: "Sobre nosotros" },
                { href: "/Contacto", label: "Contacto" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-white font-medium px-3 py-3 rounded hover:bg-red-950 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
