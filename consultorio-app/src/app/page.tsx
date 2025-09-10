"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const authentication = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (login && password) {
      const formData = { login, password };

      try {
        const res = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const content = await res.json();

        if (content.token) {
          sessionStorage.setItem("token", content.token);
          router.push("/home");
        } else {
          setError(content.error || "Falha na autenticação");
        }
      } catch (err) {
        setError("Erro de conexão com o servidor");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        className="w-full max-w-sm bg-white shadow-md rounded-xl p-6"
        onSubmit={authentication}
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Usuário
          </label>
          <input
            type="text"
            name="login"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Senha
          </label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition">
          Entrar
        </button>

        {error && (
          <div className="mt-4 p-3 text-sm text-red-700 border border-red-300 rounded-md bg-red-100">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
