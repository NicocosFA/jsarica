"use client";
import { useEffect, useState } from "react";
import { llamarMilitar as defaultData } from "./contactocontent";

export default function LlamarMilitar() {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("contactoContent");
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored.llamarMilitar) setData(stored.llamarMilitar);
      }
    } catch {}
  }, []);

  return (
    <section className="w-full bg-red-900 relative overflow-hidden">
      {/* Puños decorativos */}
      {[
        { top: "5%",  left: "88%", size: 80, rotate: 15  },
        { top: "60%", left: "2%",  size: 60, rotate: -20 },
        { top: "80%", left: "75%", size: 44, rotate: 30  },
      ].map((p, i) => (
        <img key={i} aria-hidden="true" src="/images/fondo/fist-fondo.svg" alt=""
          className="absolute pointer-events-none select-none opacity-10"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, transform: `rotate(${p.rotate}deg)` }}
        />
      ))}

      <div className="mx-auto max-w-6xl px-6 py-20 relative z-10">
        {/* Llamado principal */}
        <div className="text-center mb-16">
          <span className="inline-block bg-red-800 text-white text-xs font-bold tracking-[0.25em] uppercase px-4 py-1 mb-6">
            Únete
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase leading-tight mb-4">
            {data.titulo}
          </h2>
          <p className="text-red-300 text-lg font-semibold mb-6">{data.subtitulo}</p>
          <p className="text-white/70 text-sm leading-relaxed max-w-2xl mx-auto">
            {data.cuerpo}
          </p>
        </div>

        {/* Razones */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <span className="block w-1 h-6 bg-red-400" />
            <h3 className="text-lg font-black text-white uppercase tracking-wide">{data.razonesTitle}</h3>
            <span className="block w-1 h-6 bg-red-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-red-800">
            {data.razones.map((r, i) => (
              <div key={i} className="bg-red-900 p-8 hover:bg-red-800 transition-colors duration-300">
                <div className="w-8 h-8 bg-white flex items-center justify-center mb-4">
                  <span className="text-red-900 font-black text-sm">0{i + 1}</span>
                </div>
                <h4 className="font-black text-white uppercase text-sm tracking-wide mb-3">{r.titulo}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={data.ctaUrl}
            className="inline-block bg-white hover:bg-red-100 text-red-900 font-black px-12 py-4 uppercase tracking-widest text-sm transition-colors duration-200"
          >
            {data.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
