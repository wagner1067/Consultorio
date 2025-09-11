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
    // Removendo 'bg-gray-100' para que o body controle a cor de fundo
    <div className="flex items-center justify-center min-h-screen px-4">
      {/* Adicionando as classes de tema escuro */}
      <form
        className="w-full max-w-sm bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 transition-colors"
        onSubmit={authentication}
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6 transition-colors">
          Login
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 transition-colors">
            Usuário
          </label>
          <input
            type="text"
            name="login"
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition-colors"
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 transition-colors">
            Senha
          </label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition-colors"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition">
          Entrar
        </button>

        {error && (
          <div className="mt-4 p-3 text-sm text-red-700 dark:text-red-300 border border-red-300 dark:border-red-600 rounded-md bg-red-100 dark:bg-red-900 transition-colors">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
