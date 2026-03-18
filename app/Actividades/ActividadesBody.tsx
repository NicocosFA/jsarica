import DescripcionActiv from "./DescripcionActiv";
import ImagenesActividades from "./ImagenesActividades";
import InfoActividades from "./InfoActividades";

export default function ActividadesBody() {
  return (
    <main id="actividades" className="min-h-screen bg-white">
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-zinc-900">Actividades</h1>
          <p className="text-gray-600">
            Aquí encontrarás nuestras actividades, cómo trabajamos y cómo
            participar.
          </p>
        </div>
      </section>

      <DescripcionActiv />
      <ImagenesActividades />
      <InfoActividades />
    </main>
  );
}
