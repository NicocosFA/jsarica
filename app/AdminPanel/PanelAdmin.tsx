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

function readStored() {
  try {
    const raw = localStorage.getItem("siteContent");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function PanelAdmin() {
  const [content, setContent] = useState(() => ({
    heroTitle: heroTitle ?? "",
    heroSubtitle: heroSubtitle ?? "",
    presidente: presidente ?? {},
    actividades: actividades ?? [],
    carousel: carousel ?? [],
    queHacemos: queHacemos ?? [],
  }));

  useEffect(() => {
    const stored = readStored();
    if (stored) setContent((c) => ({ ...c, ...stored }));
  }, []);

  function save() {
    localStorage.setItem("siteContent", JSON.stringify(content));
    alert("Guardado en localStorage (demo)");
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Panel Admin (demo)</h2>

        <label className="block mt-4 text-sm text-gray-300">Título del carousel (no editable)</label>
        <div className="w-full bg-gray-800 text-white border border-gray-700 px-3 py-2 rounded">{content.heroTitle}</div>

        <label className="block mt-4 text-white">Subtítulo del carousel</label>
        <textarea
          value={content.heroSubtitle}
          onChange={(e) =>
            setContent({ ...content, heroSubtitle: e.target.value })
          }
          className="w-full bg-gray-800 text-white border border-red-600 px-3 py-2 rounded"
        />

        <label className="block mt-4 text-white">Presidente</label>
        <input
          value={(content.presidente && content.presidente.nombre) || ""}
          onChange={(e) => setContent({ ...content, presidente: { ...(content.presidente || {}), nombre: e.target.value } })}
          placeholder="Nombre"
          className="w-full bg-gray-800 text-white border border-red-600 px-3 py-2 rounded mb-2"
        />
        <input
          value={(content.presidente && content.presidente.rol) || ""}
          onChange={(e) => setContent({ ...content, presidente: { ...(content.presidente || {}), rol: e.target.value } })}
          placeholder="Rol"
          className="w-full bg-gray-800 text-white border border-red-600 px-3 py-2 rounded mb-2"
        />
        <div className="mb-2">
          <div className="text-sm text-gray-300 mb-1">Foto del presidente</div>
          {content.presidente && content.presidente.foto ? (
            <div className="mb-2">
              <img src={content.presidente.foto} alt="Presidente" className="w-24 h-24 object-cover rounded" />
              <div>
                <button type="button" className="text-sm px-2 py-1 bg-red-600 rounded text-white mt-2" onClick={() => setContent({ ...content, presidente: { ...(content.presidente || {}), foto: "" } })}>Eliminar foto</button>
              </div>
            </div>
          ) : null}
          <input type="file" accept="image/*" onChange={(e) => {
            const f = e.target.files && e.target.files[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = () => {
              setContent({ ...content, presidente: { ...(content.presidente || {}), foto: reader.result as string } });
            };
            reader.readAsDataURL(f);
          }} className="text-sm text-white" />
        </div>
        <textarea
          value={(content.presidente && content.presidente.bio) || ""}
          onChange={(e) => setContent({ ...content, presidente: { ...(content.presidente || {}), bio: e.target.value } })}
          placeholder="Bio"
          className="w-full bg-gray-800 text-white border border-red-600 px-3 py-2 rounded h-24"
        />

        <label className="block mt-4 text-white">Actividades</label>
        <div className="space-y-3">
          {(content.actividades || []).map((a: any, idx: number) => (
            <div key={idx} className="bg-gray-800 p-3 rounded border border-gray-700">
              <input className="w-full bg-gray-800 text-white px-2 py-1 rounded mb-2" value={a.title || ""} onChange={(e) => {
                const arr = [...(content.actividades || [])]; arr[idx] = { ...(arr[idx] || {}), title: e.target.value }; setContent({ ...content, actividades: arr });
              }} placeholder="Título" />
              <div className="mt-2">
                <div className="text-sm text-gray-300 mb-1">Imágenes</div>
                <div className="flex gap-2 flex-wrap mb-2">
                  {(a.images || []).map((im: any, i: number) => (
                    <div key={i} className="relative">
                      <img src={im.src} alt={im.alt || ""} className="w-20 h-20 object-cover rounded" />
                      <button type="button" className="absolute -top-1 -right-1 bg-red-600 text-white rounded px-1" onClick={() => { const arr = [...(content.actividades || [])]; const imgs = [...((arr[idx] && arr[idx].images) || [])]; imgs.splice(i, 1); arr[idx] = { ...(arr[idx] || {}), images: imgs }; setContent({ ...content, actividades: arr }); }}>x</button>
                    </div>
                  ))}
                </div>
                <input type="file" accept="image/*" onChange={(e) => {
                  const f = e.target.files && e.target.files[0];
                  if (!f) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    const arr = [...(content.actividades || [])];
                    const item = { ...(arr[idx] || {}), images: [...((arr[idx] && arr[idx].images) || []), { src: reader.result as string, alt: "" }] };
                    arr[idx] = item;
                    setContent({ ...content, actividades: arr });
                  };
                  reader.readAsDataURL(f);
                }} />
              </div>
              <div className="flex gap-2 mt-2">
                <button type="button" className="text-sm px-2 py-1 bg-red-600 rounded text-white" onClick={() => { const arr = [...(content.actividades || [])]; arr.splice(idx, 1); setContent({ ...content, actividades: arr }); }}>Eliminar actividad</button>
              </div>
            </div>
          ))}
          <button type="button" className="mt-2 bg-red-600 text-white px-3 py-2 rounded" onClick={() => { const arr = [...(content.actividades || [])]; arr.push({ id: Date.now(), title: "Nueva actividad", images: [] }); setContent({ ...content, actividades: arr }); }}>Añadir actividad</button>
        </div>

          <label className="block mt-4 text-white">Carousel (imagenes)</label>
          <div className="space-y-3">
            {(content.carousel || []).map((c: any, idx: number) => (
              <div key={idx} className="bg-gray-800 p-3 rounded border border-gray-700">
                <input className="w-full bg-gray-800 text-white px-2 py-1 rounded mb-2" value={c.src || ""} onChange={(e) => { const arr = [...(content.carousel || [])]; arr[idx] = { ...(arr[idx] || {}), src: e.target.value }; setContent({ ...content, carousel: arr }); }} placeholder="URL de imagen" />
                <input className="w-full bg-gray-800 text-white px-2 py-1 rounded" value={c.alt || ""} onChange={(e) => { const arr = [...(content.carousel || [])]; arr[idx] = { ...(arr[idx] || {}), alt: e.target.value }; setContent({ ...content, carousel: arr }); }} placeholder="Alt/Texto" />
                <div className="flex gap-2 mt-2">
                  <button type="button" className="text-sm px-2 py-1 bg-red-600 rounded text-white" onClick={() => { const arr = [...(content.carousel || [])]; arr.splice(idx, 1); setContent({ ...content, carousel: arr }); }}>Eliminar</button>
                </div>
              </div>
            ))}
            <button type="button" className="mt-2 bg-red-600 text-white px-3 py-2 rounded" onClick={() => { const arr = [...(content.carousel || [])]; arr.push({ src: "", alt: "" }); setContent({ ...content, carousel: arr }); }}>Añadir imagen</button>
          </div>

        <label className="block mt-4 text-white">Qué hacemos</label>
        <div className="space-y-3">
          {(content.queHacemos || []).map((q: any, idx: number) => (
            <div key={idx} className="bg-gray-800 p-3 rounded border border-gray-700">
              <input className="w-full bg-gray-800 text-white px-2 py-1 rounded mb-2" value={q.title || ""} onChange={(e) => { const arr = [...(content.queHacemos || [])]; arr[idx] = { ...(arr[idx] || {}), title: e.target.value }; setContent({ ...content, queHacemos: arr }); }} placeholder="Título" />
              <textarea className="w-full bg-gray-800 text-white px-2 py-1 rounded" value={q.description || ""} onChange={(e) => { const arr = [...(content.queHacemos || [])]; arr[idx] = { ...(arr[idx] || {}), description: e.target.value }; setContent({ ...content, queHacemos: arr }); }} placeholder="Descripción" />
              <div className="flex gap-2 mt-2">
                <button type="button" className="text-sm px-2 py-1 bg-red-600 rounded text-white" onClick={() => { const arr = [...(content.queHacemos || [])]; arr.splice(idx, 1); setContent({ ...content, queHacemos: arr }); }}>Eliminar</button>
              </div>
            </div>
          ))}
          <button type="button" className="mt-2 bg-red-600 text-white px-3 py-2 rounded" onClick={() => { const arr = [...(content.queHacemos || [])]; arr.push({ title: "Nuevo", description: "" }); setContent({ ...content, queHacemos: arr }); }}>Añadir item</button>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={save}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("siteContent");
              setContent({
                heroTitle: heroTitle,
                heroSubtitle: heroSubtitle,
                presidente: presidente,
                actividades: actividades,
                carousel: carousel,
                queHacemos: queHacemos,
              });
            }}
            className="px-4 py-2 border border-white rounded text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
