"use client";
import { useState } from "react";
import LogoHeader from "./LogoHeader";
import NavegarHeader from "./NavegarHeader";

export default function ComponenteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-white dark:bg-[#0b0b0b] relative z-20">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <LogoHeader />

        <div className="hidden md:flex">
          <NavegarHeader />
        </div>

        <div className="md:hidden">
          <button
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md text-zinc-700 dark:text-zinc-200"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-0 right-0 w-3/4 max-w-sm h-full bg-white dark:bg-[#0b0b0b] p-6">
            <div className="flex items-center justify-between mb-6">
              <LogoHeader />
              <button
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
                className="p-2"
              >
                <svg
                  className="h-6 w-6 text-zinc-700 dark:text-zinc-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              <a
                href="/#inicio"
                className="text-base text-zinc-800 dark:text-zinc-100"
                onClick={() => setOpen(false)}
              >
                Inicio
              </a>
              <a
                href="/Actividades"
                className="text-base text-zinc-800 dark:text-zinc-100"
                onClick={() => setOpen(false)}
              >
                Actividades
              </a>
              <a
                href="/sobre-nosotros"
                className="text-base text-zinc-800 dark:text-zinc-100"
                onClick={() => setOpen(false)}
              >
                Sobre nosotros
              </a>
              <a
                href="/contacto"
                className="text-base text-zinc-800 dark:text-zinc-100"
                onClick={() => setOpen(false)}
              >
                Contacto
              </a>

              <div className="mt-4">
                <a
                  href="#"
                  className="inline-block rounded bg-red-600 text-white px-4 py-2"
                >
                  Acceder
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
