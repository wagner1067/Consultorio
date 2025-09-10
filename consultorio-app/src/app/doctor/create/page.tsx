"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function DoctorCreate() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [medicalSpecialty, setMedicalSpecialty] = useState("");
  const [medicalRegistration, setMedicalRegistration] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !name ||
      !login ||
      !password ||
      !medicalSpecialty ||
      !medicalRegistration ||
      !email ||
      !phone
    ) {
      setError("Preencha todos os campos!");
      return;
    }

    const formData = {
      name,
      login,
      password,
      medicalSpecialty,
      medicalRegistration,
      email,
      phone,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://127.0.0.1:3001/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(formData),
      });

      const content = await response.json();

      if (response.ok) {
        router.push("/home");
      } else {
        setError(content.error || "Erro ao criar médico.");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
        <Link
          className="inline-block mb-4 text-blue-600 hover:underline"
          href="/home"
        >
          ← Voltar
        </Link>

        <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">
          Formulário de Criação de Médico
        </h2>

        <form className="space-y-4" onSubmit={addDoctor}>
          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Login */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Login
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Especialidade */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Especialidade Médica
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              onChange={(e) => setMedicalSpecialty(e.target.value)}
            />
          </div>

          {/* Registro Médico */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Registro Médico
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              onChange={(e) => setMedicalRegistration(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Telefone
            </label>
            <input
              type="text"
              placeholder="99 91234-5678"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Botão */}
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition">
            Criar Médico
          </button>

          {/* Erro */}
          {error && (
            <div className="mt-4 p-3 text-sm text-red-700 border border-red-300 rounded-md bg-red-100">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
