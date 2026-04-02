"use client";
import { useEffect, useState } from "react";
import { comoTrabajamos as defaultData } from "./actividadescontent";

export default function DescripcionActiv() {
  const [items, setItems] = useState(defaultData);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("actividadesContent");
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored.comoTrabajamos) setItems(stored.comoTrabajamos);
      }
    } catch {}
  }, []);

  return (
    <section className="w-full bg-white relative overflow-hidden">
      {[
        { top: "5%",  left: "2%",  size: 60, rotate: -15 },
        { top: "10%", left: "88%", size: 80, rotate: 20  },
        { top: "60%", left: "5%",  size: 44, rotate: 10  },
        { top: "70%", left: "90%", size: 52, rotate: -25 },
      ].map((p, i) => (
        <img key={i} aria-hidden="true" src="/images/fondo/fist-fondo.svg" alt=""
          className="absolute pointer-events-none select-none opacity-5"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, transform: `rotate(${p.rotate}deg)` }}
        />
      ))}

      <div className="mx-auto max-w-6xl px-6 py-16 relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-1 h-8 bg-red-800" />
          <h2 className="text-2xl font-black text-red-900 tracking-tight uppercase">Cómo trabajamos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.num} className="bg-white border border-red-200 p-6 hover:border-red-600 transition-colors duration-300 shadow-sm">
              <div className="w-8 h-8 bg-red-800 flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xs">{item.num}</span>
              </div>
              <h3 className="font-bold text-red-900 mb-2 uppercase text-sm tracking-wide">{item.title}</h3>
              <p className="text-sm text-red-900/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
