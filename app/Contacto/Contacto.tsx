"use client";
import { useEffect, useState } from "react";
import { contactoInfo as defaultInfo } from "./contactocontent";

export default function Contacto() {
  const [info, setInfo] = useState(defaultInfo);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("contactoContent");
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored.contactoInfo) setInfo(stored.contactoInfo);
      }
    } catch {}
  }, []);

  return (
    <section className="w-full bg-white relative overflow-hidden">
      {[
        { top: "8%",  left: "90%", size: 56, rotate: 20  },
        { top: "65%", left: "2%",  size: 44, rotate: -15 },
      ].map((p, i) => (
        <img key={i} aria-hidden="true" src="/images/fondo/fist-fondo.svg" alt=""
          className="absolute pointer-events-none select-none opacity-5"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, transform: `rotate(${p.rotate}deg)` }}
        />
      ))}

      <div className="mx-auto max-w-6xl px-6 py-16 relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-1 h-8 bg-red-800" />
          <h2 className="text-2xl font-black text-red-900 tracking-tight uppercase">Contáctanos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Info */}
          <div className="space-y-4">
            {[
              { label: "Correo",   value: info.email,     href: `mailto:${info.email}`   },
              { label: "Teléfono", value: info.telefono,  href: `tel:${info.telefono}`   },
              { label: "Dirección",value: info.direccion, href: null                     },
              { label: "Horario",  value: info.horario,   href: null                     },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-red-200 p-6 hover:border-red-600 transition-colors duration-300 shadow-sm">
                <p className="text-xs font-black text-red-800 uppercase tracking-widest mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-red-900 font-semibold text-sm hover:text-red-600 transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-red-900/70 text-sm">{item.value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Formulario */}
          <div className="bg-red-800 p-8 border border-red-700">
            <h3 className="font-black text-white uppercase text-sm tracking-widest mb-6">Envíanos un mensaje</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Mensaje enviado (demo)"); }}>
              <input
                type="text"
                placeholder="Tu nombre"
                required
                className="w-full bg-red-900 text-white border border-red-700 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:border-white transition-colors"
              />
              <input
                type="email"
                placeholder="Tu correo"
                required
                className="w-full bg-red-900 text-white border border-red-700 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:border-white transition-colors"
              />
              <textarea
                placeholder="Tu mensaje"
                required
                rows={4}
                className="w-full bg-red-900 text-white border border-red-700 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:border-white transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-white hover:bg-red-100 text-red-900 font-black uppercase tracking-widest text-sm py-3 transition-colors duration-200 border-2 border-white hover:border-red-200 flex items-center justify-center gap-2"
              >
                Enviar mensaje
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
