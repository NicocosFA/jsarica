export default function Footer() {
  return (
    <footer className="w-full bg-red-900 border-t border-red-950">
      <div className="w-full h-1 bg-white" />
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-3">
          <span className="block w-1 h-6 bg-white" />
          <span className="text-white font-black text-sm uppercase tracking-widest">
            Juventudes Socialistas
          </span>
          <span className="text-red-300 font-semibold text-sm uppercase tracking-widest">
            Arica y Parinacota
          </span>
        </div>

        <p className="text-red-300 text-xs">
          © {new Date().getFullYear()} JSCh · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
