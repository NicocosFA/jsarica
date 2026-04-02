"use client";
import { useEffect, useState } from "react";
import { llamarMilitar as defaultData } from "../Contacto/contactocontent";

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

      <div className="mx-auto max-w-6xl px-6 py-10 relative z-10">
        <div className="text-center mb-8">
          <span className="inline-block bg-red-800 text-white text-xs font-bold tracking-[0.25em] uppercase px-4 py-1 mb-4">
            Únete
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase leading-tight mb-3">
            {data.titulo}
          </h2>
          <p className="text-red-300 text-sm font-semibold mb-3">{data.subtitulo}</p>
          <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto">
            {data.cuerpo}
          </p>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-3 mb-5 justify-center">
            <span className="block w-1 h-5 bg-red-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-wide">{data.razonesTitle}</h3>
            <span className="block w-1 h-5 bg-red-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-red-800">
            {data.razones.map((r, i) => (
              <div key={i} className="bg-red-900 p-5 hover:bg-red-800 transition-colors duration-300">
                <div className="w-7 h-7 bg-white flex items-center justify-center mb-3">
                  <span className="text-red-900 font-black text-xs">0{i + 1}</span>
                </div>
                <h4 className="font-black text-white uppercase text-xs tracking-wide mb-2">{r.titulo}</h4>
                <p className="text-white/60 text-xs leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
