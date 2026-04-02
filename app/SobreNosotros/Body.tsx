"use client";
import { useEffect, useState } from "react";
import NuestraHistoria from "./NuestraHistoria";
import PresidenteSection from "./Presidente";
import Conmemoraciones from "./Conmemoraciones";
import { misionVision } from "./sobrenosotroscontent";

export default function Body() {
  const [mv, setMv] = useState(misionVision);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sobreNosotrosContent");
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored.misionVision) setMv(stored.misionVision);
      }
    } catch {}
  }, []);

  return (
    <main id="sobre-nosotros" className="min-h-screen bg-white">

      {/* Hero */}
      <section className="w-full bg-red-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-6xl px-6 py-16 relative z-10">
          <span className="inline-block bg-red-800 text-white text-xs font-bold tracking-[0.25em] uppercase px-4 py-1 mb-5">
            Quiénes somos
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase leading-tight">
            Sobre
            <span className="block text-red-400">Nosotros</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">
            Conoce nuestra historia, misión, visión y a quienes lideran la Juventud Socialista de Arica y Parinacota.
          </p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="w-full bg-white relative overflow-hidden">
        {[
          { top: "10%", left: "90%", size: 70, rotate: 20  },
          { top: "60%", left: "2%",  size: 50, rotate: -15 },
        ].map((p, i) => (
          <img key={i} aria-hidden="true" src="/images/fondo/fist-fondo.svg" alt=""
            className="absolute pointer-events-none select-none opacity-5"
            style={{ top: p.top, left: p.left, width: p.size, height: p.size, transform: `rotate(${p.rotate}deg)` }}
          />
        ))}
        <div className="mx-auto max-w-6xl px-6 py-16 relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="block w-1 h-8 bg-red-800" />
            <h2 className="text-2xl font-black text-red-900 tracking-tight uppercase">Misión y Visión</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-red-200 p-8 hover:border-red-600 transition-colors duration-300 shadow-sm">
              <div className="w-8 h-8 bg-red-800 flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xs">M</span>
              </div>
              <h3 className="font-black text-red-900 mb-3 uppercase text-sm tracking-wide">Misión</h3>
              <p className="text-sm text-red-900/60 leading-relaxed">{mv.mision}</p>
            </div>
            <div className="bg-white border border-red-200 p-8 hover:border-red-600 transition-colors duration-300 shadow-sm">
              <div className="w-8 h-8 bg-red-800 flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xs">V</span>
              </div>
              <h3 className="font-black text-red-900 mb-3 uppercase text-sm tracking-wide">Visión</h3>
              <p className="text-sm text-red-900/60 leading-relaxed">{mv.vision}</p>
            </div>
          </div>
        </div>
      </section>

      <NuestraHistoria />
      <Conmemoraciones />
      <PresidenteSection />

    </main>
  );
}
