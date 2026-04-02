"use client";
import { useEffect, useState } from "react";
import { actividades as defaultActividades } from "./quehacemoscontent";

type Actividad = {
  id: number;
  title: string;
  tipo: "imagen" | "video";
  src: string;         // imagen o URL de video (YouTube/Vimeo/mp4)
  descripcion?: string;
};

function getYoutubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
}

function getVimeoId(url: string) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

function MediaPreview({ a }: { a: Actividad }) {
  if (a.tipo === "video") {
    const ytId = getYoutubeId(a.src);
    const vimeoId = getVimeoId(a.src);

    if (ytId) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${ytId}`}
          title={a.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      );
    }
    if (vimeoId) {
      return (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}`}
          title={a.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      );
    }
    // Video directo (mp4)
    return (
      <video src={a.src} controls className="h-full w-full object-cover">
        Tu navegador no soporta video.
      </video>
    );
  }

  return (
    <>
      <img
        src={a.src}
        alt={a.title}
        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 to-transparent" />
    </>
  );
}

export default function Actividades() {
  const [actividades, setActividades] = useState<Actividad[]>(
    defaultActividades.map((a) => ({ ...a, tipo: "imagen" as const }))
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem("siteContent");
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored.actividades?.length) setActividades(stored.actividades);
      }
    } catch {}
  }, []);

  return (
    <section aria-label="actividades-recientes" className="w-full bg-transparent relative">
      <div className="mx-auto max-w-6xl px-6 py-16">

        <div className="flex items-center gap-3 mb-10">
          <span className="block w-1 h-8 bg-red-800" />
          <h2 className="text-2xl font-black text-red-900 tracking-tight uppercase">
            Actividades recientes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {actividades.map((a) => (
            <article
              key={a.id}
              className="group overflow-hidden border border-red-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative h-44 bg-red-100 overflow-hidden">
                <MediaPreview a={a} />
                {a.tipo === "video" && (
                  <span className="absolute top-2 right-2 bg-red-800 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5">
                    Video
                  </span>
                )}
              </div>
              <div className="p-4 border-t-2 border-red-800">
                <h3 className="font-bold text-red-900 uppercase text-sm tracking-wide">{a.title}</h3>
                {a.descripcion && (
                  <p className="text-sm text-red-900/50 mt-1">{a.descripcion}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
