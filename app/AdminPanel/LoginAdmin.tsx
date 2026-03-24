"use client";
import { useState } from "react";

export default function LoginAdmin({ onAuth }: { onAuth?: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === "admin") {
      sessionStorage.setItem("admin-auth", "1");
      onAuth?.();
    } else {
      setError("Contraseña incorrecta");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-900 p-6 rounded shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-white">Ingreso de administrador</h2>

        <label className="block mb-2 text-sm text-white">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-800 text-white border border-red-600 px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {error && <div className="text-red-400 mb-3">{error}</div>}

        <div className="flex gap-2">
          <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
