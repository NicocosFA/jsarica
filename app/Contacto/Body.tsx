import Contacto from "./Contacto";
import RedesSociales from "./RedesSociales";

export default function Body() {
  return (
    <main id="contacto" className="min-h-screen bg-white">

      {/* Hero */}
      <section className="w-full bg-red-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-6xl px-6 py-16 relative z-10">
          <span className="inline-block bg-red-800 text-white text-xs font-bold tracking-[0.25em] uppercase px-4 py-1 mb-5">
            Contáctanos
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase leading-tight">
            Estamos
            <span className="block text-red-400">Aquí</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">
            Escríbenos, síguenos en redes o simplemente anímate a militar con nosotros.
          </p>
        </div>
      </section>

      <Contacto />
      <RedesSociales />

    </main>
  );
}
