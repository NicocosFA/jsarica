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
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Panel Admin (demo)</h2>

        <label className="block mt-4">Título del carousel</label>
        <input
          value={content.heroTitle}
          onChange={(e) =>
            setContent({ ...content, heroTitle: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />

        <label className="block mt-4">Subtítulo del carousel</label>
        <textarea
          value={content.heroSubtitle}
          onChange={(e) =>
            setContent({ ...content, heroSubtitle: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />

        <label className="block mt-4">Presidente (JSON)</label>
        <textarea
          value={JSON.stringify(content.presidente, null, 2)}
          onChange={(e) => {
            try {
              setContent({
                ...content,
                presidente: JSON.parse(e.target.value),
              });
            } catch {}
          }}
          className="w-full border px-3 py-2 rounded h-28"
        />

        <label className="block mt-4">Actividades (JSON array)</label>
        <textarea
          value={JSON.stringify(content.actividades, null, 2)}
          onChange={(e) => {
            try {
              setContent({
                ...content,
                actividades: JSON.parse(e.target.value),
              });
            } catch {}
          }}
          className="w-full border px-3 py-2 rounded h-32"
        />

        <label className="block mt-4">
          Carousel (JSON array of objects with src/alt)
        </label>
        <textarea
          value={JSON.stringify(content.carousel, null, 2)}
          onChange={(e) => {
            try {
              setContent({ ...content, carousel: JSON.parse(e.target.value) });
            } catch {}
          }}
          className="w-full border px-3 py-2 rounded h-32"
        />

        <label className="block mt-4">Qué hacemos (JSON array)</label>
        <textarea
          value={JSON.stringify(content.queHacemos, null, 2)}
          onChange={(e) => {
            try {
              setContent({
                ...content,
                queHacemos: JSON.parse(e.target.value),
              });
            } catch {}
          }}
          className="w-full border px-3 py-2 rounded h-32"
        />

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
            className="px-4 py-2 border rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
