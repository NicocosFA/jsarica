export default function ImagenesActividades() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-zinc-900">Galería de actividades</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            Imagen 1 (placeholder)
          </div>
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            Imagen 2 (placeholder)
          </div>
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            Imagen 3 (placeholder)
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          Imágenes que subirás más tarde aparecerán aquí.
        </p>
      </div>
    </section>
  );
}
