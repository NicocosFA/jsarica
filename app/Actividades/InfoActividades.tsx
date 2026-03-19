export default function InfoActividades() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">

        <div className="flex items-center gap-3 mb-10">
          <span className="block w-1 h-8 bg-red-800" />
          <h2 className="text-2xl font-black text-red-900 tracking-tight uppercase">
            Información y participación
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-red-800 p-8 border border-red-700">
            <h3 className="font-black text-white uppercase text-sm tracking-widest mb-3">
              ¿Cómo participar?
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Escríbenos a{" "}
              <a href="mailto:contacto@example.com" className="text-red-300 hover:text-white transition-colors underline">
                contacto@example.com
              </a>{" "}
              o acércate a nuestras reuniones semanales.
            </p>
          </div>

          <div className="flex-1 bg-red-100 border border-red-200 p-8">
            <h3 className="font-black text-red-900 uppercase text-sm tracking-widest mb-3">
              Próximas actividades
            </h3>
            <p className="text-red-900/60 text-sm leading-relaxed">
              Mantente atento a nuestras redes sociales para conocer las próximas fechas y lugares de nuestras actividades.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
