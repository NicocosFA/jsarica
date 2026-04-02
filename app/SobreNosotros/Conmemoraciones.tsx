"use client";
import { useEffect, useState } from "react";
import { conmemoraciones } from "./sobrenosotroscontent";

export default function Conmemoraciones() {
  const [items, setItems] = useState(conmemoraciones);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sobreNosotrosContent");
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored.conmemoraciones) setItems(stored.conmemoraciones);
      }
    } catch {}
  }, []);

  return (
    <section className="w-full bg-white relative overflow-hidden">
      {[
        { top: "5%",  left: "88%", size: 64, rotate: 18  },
        { top: "70%", left: "3%",  size: 48, rotate: -20 },
      ].map((p, i) => (
        <img key={i} aria-hidden="true" src="/images/fondo/fist-fondo.svg" alt=""
          className="absolute pointer-events-none select-none opacity-5"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, transform: `rotate(${p.rotate}deg)` }}
        />
      ))}

      <div className="mx-auto max-w-6xl px-6 py-16 relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-1 h-8 bg-red-800" />
          <h2 className="text-2xl font-black text-red-900 tracking-tight uppercase">Fechas que conmemoramos</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.fecha} className="bg-white border border-red-200 p-6 hover:border-red-600 transition-colors duration-300 shadow-sm">
              <span className="inline-block bg-red-800 text-white text-xs font-bold tracking-widest uppercase px-3 py-1 mb-4">
                {item.fecha}
              </span>
              <h3 className="font-black text-red-900 mb-2 uppercase text-sm tracking-wide">{item.titulo}</h3>
              <p className="text-sm text-red-900/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
