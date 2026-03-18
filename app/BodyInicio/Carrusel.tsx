"use client";
import { useEffect, useState } from "react";
import { carousel, heroTitle, heroTitleSub, heroSubtitle } from "./quehacemoscontent";

export default function Carrusel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % carousel.length),
      4500
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      aria-label="carrusel"
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100dvh - 65px)" }}
    >
      <div
        className="flex h-full transition-transform duration-1200 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {carousel.map((item, i) => (
          <div key={i} className="relative shrink-0 w-full h-full">
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
          </div>
        ))}
      </div>

      {/* Contenido */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 pointer-events-none"
      >
        <span className="inline-block bg-red-600 text-white text-xs font-semibold tracking-widest uppercase px-4 py-1 mb-5 rounded-sm">
          Bienvenidos
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight max-w-4xl">
          {heroTitle}
          <span className="block text-red-400">{heroTitleSub}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
          {heroSubtitle}
        </p>
        <a
          href="/Actividades"
          className="mt-8 inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-sm transition-colors pointer-events-auto"
        >
          Ver actividades
        </a>
      </div>

      {/* Indicadores */}
      <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex gap-2 z-10">
        {carousel.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index ? "bg-red-500 w-8" : "bg-white/40 w-4"
            }`}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
