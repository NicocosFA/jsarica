import { readdirSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const carpeta = request.nextUrl.searchParams.get("carpeta");

    if (!carpeta) {
      return NextResponse.json({ error: "Carpeta no especificada" }, { status: 400 });
    }

    // Ruta segura a la carpeta de imágenes
    const imagenPath = join(process.cwd(), "public", "images", "Actividades", carpeta);
    
    // Leer los archivos de la carpeta
    const archivos = readdirSync(imagenPath);
    
    // Filtrar solo archivos de imagen
    const extensionesValidas = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const imagenes = archivos
      .filter((archivo) => {
        const ext = archivo.toLowerCase().substring(archivo.lastIndexOf("."));
        return extensionesValidas.includes(ext);
      })
      .map((archivo) => `/images/Actividades/${carpeta}/${archivo}`)
      .sort(); // Ordenar alfabéticamente para consistencia

    return NextResponse.json({ imagenes });
  } catch (error) {
    console.error("Error leyendo imágenes:", error);
    return NextResponse.json(
      { error: "Error al cargar imágenes", imagenes: [] },
      { status: 500 }
    );
  }
}
