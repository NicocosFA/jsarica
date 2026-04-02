import { readdirSync, statSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

const EXTENSIONES = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

function esImagen(nombre: string) {
  return EXTENSIONES.includes(nombre.toLowerCase().substring(nombre.lastIndexOf(".")));
}

// GET /api/imagenes              → lista todas las carpetas de actividades
// GET /api/imagenes?carpeta=xxx  → lista imágenes de esa carpeta
export async function GET(request: NextRequest) {
  const carpeta = request.nextUrl.searchParams.get("carpeta");
  const base = join(process.cwd(), "public", "images", "Actividades");

  try {
    if (!carpeta) {
      // Devolver lista de carpetas con su portada (primera imagen)
      const entries = readdirSync(base);
      const actividades = entries
        .filter((entry) => {
          try { return statSync(join(base, entry)).isDirectory(); } catch { return false; }
        })
        .map((nombre) => {
          const carpetaPath = join(base, nombre);
          const archivos = readdirSync(carpetaPath).filter(esImagen).sort();
          const portada = archivos.length > 0
            ? `/images/Actividades/${nombre}/${archivos[0]}`
            : null;
          return { nombre, portada, total: archivos.length };
        })
        .filter((a) => a.portada !== null);

      return NextResponse.json({ actividades });
    }

    // Devolver imágenes de una carpeta específica
    const carpetaPath = join(base, carpeta);
    const archivos = readdirSync(carpetaPath).filter(esImagen).sort();
    const imagenes = archivos.map((f) => `/images/Actividades/${carpeta}/${f}`);

    return NextResponse.json({ imagenes });
  } catch (error) {
    console.error("Error leyendo imágenes:", error);
    return NextResponse.json({ error: "Error al cargar", imagenes: [], actividades: [] }, { status: 500 });
  }
}
