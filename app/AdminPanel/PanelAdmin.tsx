"use client";
import { useEffect, useState } from "react";
import {
  heroTitle,
  heroSubtitle,
  presidente,
  actividades,
  carousel,
  queHacemos,
} from "../BodyInicio/quehacemoscontent";
import {
  misionVision,
  historia,
  hitos,
  conmemoraciones,
} from "../SobreNosotros/sobrenosotroscontent";
import {
  contactoInfo,
  redesSociales,
  llamarMilitar,
} from "../Contacto/contactocontent";

function readStored(key: string) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

const TABS = ["Inicio", "Sobre Nosotros", "Contacto"] as const;
type Tab = typeof TABS[number];

export default function PanelAdmin() {
  const [tab, setTab] = useState<Tab>("Inicio");

  // --- Inicio ---
  const [content, setContent] = useState(() => ({
    heroTitle: heroTitle ?? "",
    heroSubtitle: heroSubtitle ?? "",
    presidente: presidente ?? {},
    actividades: actividades ?? [],
    carousel: carousel ?? [],
    queHacemos: queHacemos ?? [],
  }));

  // --- Sobre Nosotros ---
  const [sobre, setSobre] = useState(() => ({
    misionVision: { ...misionVision },
    historia: { ...historia },
    hitos: [...hitos],
    conmemoraciones: [...conmemoraciones],
  }));

  // --- Contacto ---
  const [contacto, setContacto] = useState(() => ({
    contactoInfo: { ...contactoInfo },
    redesSociales: [...redesSociales],
    llamarMilitar: {
      ...llamarMilitar,
      razones: [...llamarMilitar.razones],
    },
  }));

  useEffect(() => {
    const s = readStored("siteContent");
    if (s) setContent((c) => ({ ...c, ...s }));
    const sn = readStored("sobreNosotrosContent");
    if (sn) setSobre((c) => ({ ...c, ...sn }));
    const ct = readStored("contactoContent");
    if (ct) setContacto((c) => ({ ...c, ...ct }));
  }, []);

  function saveInicio() {
    localStorage.setItem("siteContent", JSON.stringify(content));
    alert("Guardado");
  }

  function saveSobre() {
    localStorage.setItem("sobreNosotrosContent", JSON.stringify(sobre));
    alert("Guardado");
  }

  function saveContacto() {
    localStorage.setItem("contactoContent", JSON.stringify(contacto));
    alert("Guardado");
  }

  const inputCls = "w-full bg-gray-800 text-white border border-red-800 px-3 py-2 rounded mb-2 text-sm";
  const labelCls = "block mt-4 mb-1 text-sm text-gray-300 font-semibold uppercase tracking-wide";

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-6">Panel Admin</h2>

        {/* Tabs */}
        <div className="flex gap-px mb-8 bg-red-900">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                tab === t ? "bg-red-700 text-white" : "bg-gray-900 text-gray-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── TAB INICIO ── */}
        {tab === "Inicio" && (
          <div className="bg-gray-900 p-6 rounded shadow-md space-y-2">

            <label className={labelCls}>Subtítulo del carousel</label>
            <textarea value={content.heroSubtitle} onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })} className={inputCls + " h-20"} />

            <label className={labelCls}>Presidente</label>
            <input value={content.presidente?.nombre ?? ""} onChange={(e) => setContent({ ...content, presidente: { ...content.presidente, nombre: e.target.value } })} placeholder="Nombre" className={inputCls} />
            <input value={content.presidente?.rol ?? ""} onChange={(e) => setContent({ ...content, presidente: { ...content.presidente, rol: e.target.value } })} placeholder="Rol" className={inputCls} />
            <textarea value={content.presidente?.bio ?? ""} onChange={(e) => setContent({ ...content, presidente: { ...content.presidente, bio: e.target.value } })} placeholder="Bio" className={inputCls + " h-24"} />

            <label className={labelCls}>Qué hacemos</label>
            <div className="space-y-3">
              {content.queHacemos.map((q: any, idx: number) => (
                <div key={idx} className="bg-gray-800 p-3 rounded border border-gray-700">
                  <input className={inputCls} value={q.title ?? ""} onChange={(e) => { const arr = [...content.queHacemos]; arr[idx] = { ...arr[idx], title: e.target.value }; setContent({ ...content, queHacemos: arr }); }} placeholder="Título" />
                  <textarea className={inputCls + " h-16"} value={q.description ?? ""} onChange={(e) => { const arr = [...content.queHacemos]; arr[idx] = { ...arr[idx], description: e.target.value }; setContent({ ...content, queHacemos: arr }); }} placeholder="Descripción" />
                  <button type="button" className="text-xs px-2 py-1 bg-red-800 rounded text-white" onClick={() => { const arr = [...content.queHacemos]; arr.splice(idx, 1); setContent({ ...content, queHacemos: arr }); }}>Eliminar</button>
                </div>
              ))}
              <button type="button" className="bg-red-800 text-white px-3 py-2 rounded text-sm" onClick={() => setContent({ ...content, queHacemos: [...content.queHacemos, { title: "", description: "" }] })}>+ Añadir</button>
            </div>

            <label className={labelCls}>Actividades</label>
            <div className="space-y-3">
              {content.actividades.map((a: any, idx: number) => (
                <div key={idx} className="bg-gray-800 p-3 rounded border border-gray-700">
                  <input className={inputCls} value={a.title ?? ""} onChange={(e) => { const arr = [...content.actividades]; arr[idx] = { ...arr[idx], title: e.target.value }; setContent({ ...content, actividades: arr }); }} placeholder="Título" />
                  <button type="button" className="text-xs px-2 py-1 bg-red-800 rounded text-white" onClick={() => { const arr = [...content.actividades]; arr.splice(idx, 1); setContent({ ...content, actividades: arr }); }}>Eliminar</button>
                </div>
              ))}
              <button type="button" className="bg-red-800 text-white px-3 py-2 rounded text-sm" onClick={() => setContent({ ...content, actividades: [...content.actividades, { id: Date.now(), title: "", src: "" }] })}>+ Añadir</button>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={saveInicio} className="bg-red-700 hover:bg-red-600 text-white font-bold px-6 py-2 uppercase tracking-widest text-sm transition-colors">Guardar</button>
              <button onClick={() => { localStorage.removeItem("siteContent"); setContent({ heroTitle, heroSubtitle, presidente, actividades, carousel, queHacemos }); }} className="border border-gray-600 text-gray-400 hover:text-white px-6 py-2 text-sm uppercase tracking-widest transition-colors">Reset</button>
            </div>
          </div>
        )}

        {/* ── TAB SOBRE NOSOTROS ── */}
        {tab === "Sobre Nosotros" && (
          <div className="bg-gray-900 p-6 rounded shadow-md space-y-2">

            <label className={labelCls}>Misión</label>
            <textarea value={sobre.misionVision.mision} onChange={(e) => setSobre({ ...sobre, misionVision: { ...sobre.misionVision, mision: e.target.value } })} className={inputCls + " h-24"} />

            <label className={labelCls}>Visión</label>
            <textarea value={sobre.misionVision.vision} onChange={(e) => setSobre({ ...sobre, misionVision: { ...sobre.misionVision, vision: e.target.value } })} className={inputCls + " h-24"} />

            <label className={labelCls}>Historia — párrafo 1</label>
            <textarea value={sobre.historia.texto1} onChange={(e) => setSobre({ ...sobre, historia: { ...sobre.historia, texto1: e.target.value } })} className={inputCls + " h-20"} />
            <label className={labelCls}>Historia — párrafo 2</label>
            <textarea value={sobre.historia.texto2} onChange={(e) => setSobre({ ...sobre, historia: { ...sobre.historia, texto2: e.target.value } })} className={inputCls + " h-20"} />
            <label className={labelCls}>Historia — párrafo 3</label>
            <textarea value={sobre.historia.texto3} onChange={(e) => setSobre({ ...sobre, historia: { ...sobre.historia, texto3: e.target.value } })} className={inputCls + " h-20"} />

            <label className={labelCls}>Hitos históricos</label>
            <div className="space-y-3">
              {sobre.hitos.map((h, idx) => (
                <div key={idx} className="bg-gray-800 p-3 rounded border border-gray-700">
                  <input className={inputCls} value={h.año} onChange={(e) => { const arr = [...sobre.hitos]; arr[idx] = { ...arr[idx], año: e.target.value }; setSobre({ ...sobre, hitos: arr }); }} placeholder="Año" />
                  <textarea className={inputCls + " h-16"} value={h.hito} onChange={(e) => { const arr = [...sobre.hitos]; arr[idx] = { ...arr[idx], hito: e.target.value }; setSobre({ ...sobre, hitos: arr }); }} placeholder="Descripción" />
                  <button type="button" className="text-xs px-2 py-1 bg-red-800 rounded text-white" onClick={() => { const arr = [...sobre.hitos]; arr.splice(idx, 1); setSobre({ ...sobre, hitos: arr }); }}>Eliminar</button>
                </div>
              ))}
              <button type="button" className="bg-red-800 text-white px-3 py-2 rounded text-sm" onClick={() => setSobre({ ...sobre, hitos: [...sobre.hitos, { año: "", hito: "" }] })}>+ Añadir hito</button>
            </div>

            <label className={labelCls}>Fechas que conmemoramos</label>
            <div className="space-y-3">
              {sobre.conmemoraciones.map((c, idx) => (
                <div key={idx} className="bg-gray-800 p-3 rounded border border-gray-700">
                  <input className={inputCls} value={c.fecha} onChange={(e) => { const arr = [...sobre.conmemoraciones]; arr[idx] = { ...arr[idx], fecha: e.target.value }; setSobre({ ...sobre, conmemoraciones: arr }); }} placeholder="Fecha (ej: 19 Abril)" />
                  <input className={inputCls} value={c.titulo} onChange={(e) => { const arr = [...sobre.conmemoraciones]; arr[idx] = { ...arr[idx], titulo: e.target.value }; setSobre({ ...sobre, conmemoraciones: arr }); }} placeholder="Título" />
                  <textarea className={inputCls + " h-16"} value={c.desc} onChange={(e) => { const arr = [...sobre.conmemoraciones]; arr[idx] = { ...arr[idx], desc: e.target.value }; setSobre({ ...sobre, conmemoraciones: arr }); }} placeholder="Descripción" />
                  <button type="button" className="text-xs px-2 py-1 bg-red-800 rounded text-white" onClick={() => { const arr = [...sobre.conmemoraciones]; arr.splice(idx, 1); setSobre({ ...sobre, conmemoraciones: arr }); }}>Eliminar</button>
                </div>
              ))}
              <button type="button" className="bg-red-800 text-white px-3 py-2 rounded text-sm" onClick={() => setSobre({ ...sobre, conmemoraciones: [...sobre.conmemoraciones, { fecha: "", titulo: "", desc: "" }] })}>+ Añadir fecha</button>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={saveSobre} className="bg-red-700 hover:bg-red-600 text-white font-bold px-6 py-2 uppercase tracking-widest text-sm transition-colors">Guardar</button>
              <button onClick={() => { localStorage.removeItem("sobreNosotrosContent"); setSobre({ misionVision: { ...misionVision }, historia: { ...historia }, hitos: [...hitos], conmemoraciones: [...conmemoraciones] }); }} className="border border-gray-600 text-gray-400 hover:text-white px-6 py-2 text-sm uppercase tracking-widest transition-colors">Reset</button>
            </div>
          </div>
        )}

        {/* ── TAB CONTACTO ── */}
        {tab === "Contacto" && (
          <div className="bg-gray-900 p-6 rounded shadow-md space-y-2">

            <label className={labelCls}>Correo</label>
            <input value={contacto.contactoInfo.email} onChange={(e) => setContacto({ ...contacto, contactoInfo: { ...contacto.contactoInfo, email: e.target.value } })} className={inputCls} />

            <label className={labelCls}>Teléfono</label>
            <input value={contacto.contactoInfo.telefono} onChange={(e) => setContacto({ ...contacto, contactoInfo: { ...contacto.contactoInfo, telefono: e.target.value } })} className={inputCls} />

            <label className={labelCls}>Dirección</label>
            <input value={contacto.contactoInfo.direccion} onChange={(e) => setContacto({ ...contacto, contactoInfo: { ...contacto.contactoInfo, direccion: e.target.value } })} className={inputCls} />

            <label className={labelCls}>Horario</label>
            <input value={contacto.contactoInfo.horario} onChange={(e) => setContacto({ ...contacto, contactoInfo: { ...contacto.contactoInfo, horario: e.target.value } })} className={inputCls} />

            <label className={labelCls}>Redes sociales</label>
            <div className="space-y-3">
              {contacto.redesSociales.map((r, idx) => (
                <div key={idx} className="bg-gray-800 p-3 rounded border border-gray-700">
                  <input className={inputCls} value={r.nombre} onChange={(e) => { const arr = [...contacto.redesSociales]; arr[idx] = { ...arr[idx], nombre: e.target.value }; setContacto({ ...contacto, redesSociales: arr }); }} placeholder="Nombre (ej: Instagram)" />
                  <input className={inputCls} value={r.url} onChange={(e) => { const arr = [...contacto.redesSociales]; arr[idx] = { ...arr[idx], url: e.target.value }; setContacto({ ...contacto, redesSociales: arr }); }} placeholder="URL" />
                  <input className={inputCls} value={r.handle} onChange={(e) => { const arr = [...contacto.redesSociales]; arr[idx] = { ...arr[idx], handle: e.target.value }; setContacto({ ...contacto, redesSociales: arr }); }} placeholder="Handle (ej: @usuario)" />
                  <button type="button" className="text-xs px-2 py-1 bg-red-800 rounded text-white" onClick={() => { const arr = [...contacto.redesSociales]; arr.splice(idx, 1); setContacto({ ...contacto, redesSociales: arr }); }}>Eliminar</button>
                </div>
              ))}
              <button type="button" className="bg-red-800 text-white px-3 py-2 rounded text-sm" onClick={() => setContacto({ ...contacto, redesSociales: [...contacto.redesSociales, { nombre: "", url: "", handle: "" }] })}>+ Añadir red</button>
            </div>

            <label className={labelCls}>Llamar a militar — Título</label>
            <input value={contacto.llamarMilitar.titulo} onChange={(e) => setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, titulo: e.target.value } })} className={inputCls} />

            <label className={labelCls}>Subtítulo</label>
            <input value={contacto.llamarMilitar.subtitulo} onChange={(e) => setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, subtitulo: e.target.value } })} className={inputCls} />

            <label className={labelCls}>Cuerpo</label>
            <textarea value={contacto.llamarMilitar.cuerpo} onChange={(e) => setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, cuerpo: e.target.value } })} className={inputCls + " h-24"} />

            <label className={labelCls}>Texto del botón CTA</label>
            <input value={contacto.llamarMilitar.cta} onChange={(e) => setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, cta: e.target.value } })} className={inputCls} />

            <label className={labelCls}>URL del botón CTA</label>
            <input value={contacto.llamarMilitar.ctaUrl} onChange={(e) => setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, ctaUrl: e.target.value } })} className={inputCls} />

            <label className={labelCls}>Razones para militar</label>
            <div className="space-y-3">
              {contacto.llamarMilitar.razones.map((r, idx) => (
                <div key={idx} className="bg-gray-800 p-3 rounded border border-gray-700">
                  <input className={inputCls} value={r.titulo} onChange={(e) => { const arr = [...contacto.llamarMilitar.razones]; arr[idx] = { ...arr[idx], titulo: e.target.value }; setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, razones: arr } }); }} placeholder="Título" />
                  <textarea className={inputCls + " h-16"} value={r.desc} onChange={(e) => { const arr = [...contacto.llamarMilitar.razones]; arr[idx] = { ...arr[idx], desc: e.target.value }; setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, razones: arr } }); }} placeholder="Descripción" />
                  <button type="button" className="text-xs px-2 py-1 bg-red-800 rounded text-white" onClick={() => { const arr = [...contacto.llamarMilitar.razones]; arr.splice(idx, 1); setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, razones: arr } }); }}>Eliminar</button>
                </div>
              ))}
              <button type="button" className="bg-red-800 text-white px-3 py-2 rounded text-sm" onClick={() => setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, razones: [...contacto.llamarMilitar.razones, { titulo: "", desc: "" }] } })}>+ Añadir razón</button>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={saveContacto} className="bg-red-700 hover:bg-red-600 text-white font-bold px-6 py-2 uppercase tracking-widest text-sm transition-colors">Guardar</button>
              <button onClick={() => { localStorage.removeItem("contactoContent"); setContacto({ contactoInfo: { ...contactoInfo }, redesSociales: [...redesSociales], llamarMilitar: { ...llamarMilitar, razones: [...llamarMilitar.razones] } }); }} className="border border-gray-600 text-gray-400 hover:text-white px-6 py-2 text-sm uppercase tracking-widest transition-colors">Reset</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
