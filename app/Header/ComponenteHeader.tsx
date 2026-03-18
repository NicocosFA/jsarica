"use client";
import { useState } from "react";
import LogoHeader from "./LogoHeader";
import NavegarHeader from "./NavegarHeader";

export default function ComponenteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 shadow-sm relative z-20">
      <div className="mx-auto max-w-7xl px-6 py-0 flex items-center justify-between">

        {/* Franja roja izquierda + logo */}
        <div className="flex items-center">
          <div className="w-1.5 h-16 bg-red-600 mr-4" />
          <LogoHeader />
        </div>

        {/* Nav escritorio */}
        <div className="hidden md:flex items-center gap-1">
          <NavegarHeader />
          <a
            href="/login"
            className="ml-4 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-sm transition-colors"
          >
            Acceder
          </a>
        </div>

        {/* Botón hamburguesa móvil */}
        <div className="md:hidden">
          <button
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded text-zinc-200"
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
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute top-0 right-0 w-3/4 max-w-sm h-full bg-zinc-900 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <LogoHeader />
              <button aria-label="Cerrar menú" onClick={() => setOpen(false)} className="p-2">
                <svg className="h-6 w-6 text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {[
                { href: "/", label: "Inicio" },
                { href: "/Actividades", label: "Actividades" },
                { href: "/sobre-nosotros", label: "Sobre nosotros" },
                { href: "/contacto", label: "Contacto" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-zinc-200 font-medium px-3 py-3 rounded hover:bg-zinc-800 hover:text-red-500 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/login"
                onClick={() => setOpen(false)}
                className="mt-4 bg-red-600 text-white text-center font-semibold px-4 py-3 rounded-sm hover:bg-red-700 transition-colors"
              >
                Acceder
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
