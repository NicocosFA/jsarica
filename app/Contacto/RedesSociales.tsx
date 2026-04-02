"use client";
import { useEffect, useState } from "react";
import { redesSociales as defaultRedes } from "./contactocontent";

export default function RedesSociales() {
  const [redes, setRedes] = useState(defaultRedes);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("contactoContent");
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored.redesSociales) setRedes(stored.redesSociales);
      }
    } catch {}
  }, []);

  return (
    <section className="w-full bg-red-100 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-1 h-8 bg-red-800" />
          <h2 className="text-2xl font-black text-red-900 tracking-tight uppercase">Redes sociales</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-red-200">
          {redes.map((red) => (
            <a
              key={red.nombre}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-100 p-8 hover:bg-white transition-colors duration-300 group border-t-2 border-transparent hover:border-red-800"
            >
              <h3 className="font-black text-red-900 uppercase text-sm tracking-widest mb-2 group-hover:text-red-700 transition-colors">
                {red.nombre}
              </h3>
              <p className="text-red-800/60 text-xs">{red.handle}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
