"use client";
import { useEffect, useState } from "react";

const defaultData = {
  titulo: "El cambio lo hacemos juntos",
  subtitulo: "La Juventud Socialista te necesita",
  cuerpo: "No importa de dónde vengas ni cuánto sabes de política. Lo que importa es que quieres un mundo más justo. Aquí encontrarás compañeros, formación y acción real. Da el primer paso.",
  cta: "Quiero ser parte",
  ctaUrl: "/Contacto",
};

export default function Motivacion() {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("motivacionContent");
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored) setData((d) => ({ ...d, ...stored }));
      }
    } catch {}
  }, []);

  return (
    <section className="w-full bg-red-900 relative overflow-hidden">
      {/* Puños decorativos */}
      {[
        { top: "10%", left: "3%",  size: 70, rotate: -15 },
        { top: "50%", left: "90%", size: 90, rotate: 20  },
        { top: "75%", left: "45%", size: 50, rotate: 10  },
      ].map((p, i) => (
        <img key={i} aria-hidden="true" src="/images/fondo/fist-fondo.svg" alt=""
          className="absolute pointer-events-none select-none opacity-10"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, transform: `rotate(${p.rotate}deg)` }}
        />
      ))}

      <div className="mx-auto max-w-6xl px-6 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          <span className="inline-block bg-red-900 text-white text-xs font-bold tracking-[0.3em] uppercase px-4 py-1 mb-6">
            Únete
          </span>

          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase leading-tight mb-4">
            {data.titulo}
          </h2>

          <p className="text-red-300 font-bold text-lg mb-6 uppercase tracking-wide">
            {data.subtitulo}
          </p>

          <p className="text-white/75 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            {data.cuerpo}
          </p>

          <a
            href={data.ctaUrl}
            className="inline-flex items-center gap-3 bg-white hover:bg-red-100 text-red-900 font-black px-10 py-4 uppercase tracking-widest text-sm transition-colors duration-200 border-2 border-white hover:border-red-200"
          >
            {data.cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

        </div>
      </div>
    </section>
  );
}
