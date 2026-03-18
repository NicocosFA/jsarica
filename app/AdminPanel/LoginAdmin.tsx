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
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Ingreso de administrador</h2>

        <label className="block mb-2 text-sm">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <div className="flex gap-2">
          <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
