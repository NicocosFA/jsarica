"use client";
import { useEffect, useState } from "react";
import { historia, hitos } from "./sobrenosotroscontent";

export default function NuestraHistoria() {
  const [data, setData] = useState({ historia, hitos });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sobreNosotrosContent");
      if (raw) {
        const stored = JSON.parse(raw);
        setData({
          historia: stored.historia ?? historia,
          hitos: stored.hitos ?? hitos,
        });
      }
    } catch {}
  }, []);

  return (
    <section className="w-full bg-red-900 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-16">

        <div className="flex items-center gap-3 mb-10">
          <span className="block w-1 h-8 bg-white" />
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">Nuestra Historia</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">{data.historia.texto1}</p>
            <p className="text-white/80 text-sm leading-relaxed mb-4">{data.historia.texto2}</p>
            <p className="text-white/80 text-sm leading-relaxed">{data.historia.texto3}</p>
          </div>
          <div className="relative h-64 overflow-hidden">
            <img
              src="/images/DiseñoPag/juventud-socialista-conce-1024x698-1-1.jpg"
              alt="Historia Juventud Socialista"
              className="h-full w-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 to-transparent" />
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-1 h-6 bg-red-400" />
            <h3 className="text-lg font-black text-white uppercase tracking-wide">Hitos históricos</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-red-800">
            {data.hitos.map((item) => (
              <div key={item.año} className="bg-red-900 p-6 hover:bg-red-800 transition-colors duration-300">
                <span className="text-red-400 font-black text-2xl block mb-2">{item.año}</span>
                <p className="text-white/70 text-xs leading-relaxed">{item.hito}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
