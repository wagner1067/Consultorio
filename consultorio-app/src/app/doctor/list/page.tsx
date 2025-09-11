"use client";
import React, { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import Link from "next/link";

interface Doctor {
  _id: string;
  name: string;
  login: string;
  medicalSpecialty: string;
  medicalRegistration: string;
  email: string;
  phone: string;
}

export default function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/doctors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token") || "",
          },
        });

        const data = await response.json();

        // --- CÓDIGO AJUSTADO AQUI ---
        // Verifique se os dados recebidos são um array.
        // Se for um array, atualiza a lista de médicos.
        // Se não, exibe a mensagem de erro da API ou uma genérica.
        if (Array.isArray(data)) {
          setDoctors(data);
          setError(null); // Limpa o erro caso a requisição anterior tenha falhado.
        } else {
          // Se a API retornou um objeto de erro, usa a mensagem do objeto.
          setError(data.error || "A resposta da API não é um array.");
          setDoctors([]); // Garante que doctors é um array vazio para evitar o erro de .map()
        }
      } catch (err) {
        setError("Erro ao carregar lista de médicos");
        setDoctors([]); // Garante que doctors é um array vazio.
      }
    };

    fetchDoctors();
  }, []);

  const deleteDoctor = async (id: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/doctors/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
      });

      const content = await response.json();

      if (response.ok) {
        setDoctors((prev) => prev.filter((doc) => doc._id !== id));
      } else {
        setError(content.error || "Erro ao deletar médico");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
    }
  };

  return (
    <>
      <Link
        className="font-medium text-blue-600 hover:underline inline-block mb-4 dark:text-blue-400"
        href="/home"
      >
        ← Voltar
      </Link>

      {/* Tabela - aparece somente em telas grandes (>=1024px) */}
      <div className="hidden lg:block overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden dark:bg-gray-900">
          <thead className="bg-blue-600 text-white text-left dark:bg-blue-800">
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2 text-center">Login</th>
              <th className="px-4 py-2 text-center">Especialidade Médica</th>
              <th className="px-4 py-2 text-center">Registro Médico</th>
              <th className="px-4 py-2 text-center">Email</th>
              <th className="px-4 py-2 text-center">Telefone</th>
              <th className="px-4 py-2 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor: Doctor, index) => (
              <tr
                key={doctor._id}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
              >
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                  {doctor.name}
                </td>
                <td className="px-4 py-2 text-center text-gray-800 dark:text-gray-200">
                  {doctor.login}
                </td>
                <td className="px-4 py-2 text-center text-gray-800 dark:text-gray-200">
                  {doctor.medicalSpecialty}
                </td>
                <td className="px-4 py-2 text-center text-gray-800 dark:text-gray-200">
                  {doctor.medicalRegistration}
                </td>
                <td className="px-4 py-2 text-center text-gray-800 dark:text-gray-200">
                  {doctor.email}
                </td>
                <td className="px-4 py-2 text-center text-gray-800 dark:text-gray-200">
                  {doctor.phone}
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => deleteDoctor(doctor._id)}
                      className="flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-white text-sm w-20"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                    <Link
                      href={`/doctor/edit/${doctor._id}`}
                      className="flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded text-white text-sm w-20"
                    >
                      <Pencil size={16} /> Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - aparecem em mobile/tablets (<1024px) */}
      <div className="lg:hidden space-y-4">
        {doctors.map((doctor: Doctor) => (
          <div
            key={doctor._id}
            className="p-4 border rounded-lg shadow bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
          >
            <p>
              <span className="font-bold">Nome:</span> {doctor.name}
            </p>
            <p>
              <span className="font-bold">Login:</span> {doctor.login}
            </p>
            <p>
              <span className="font-bold">Especialidade:</span>{" "}
              {doctor.medicalSpecialty}
            </p>
            <p>
              <span className="font-bold">Registro:</span>{" "}
              {doctor.medicalRegistration}
            </p>
            <p>
              <span className="font-bold">Email:</span> {doctor.email}
            </p>
            <p>
              <span className="font-bold">Telefone:</span> {doctor.phone}
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => deleteDoctor(doctor._id)}
                className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-white text-sm"
              >
                <Trash2 size={16} /> Delete
              </button>
              <Link
                href={`/doctor/edit/${doctor._id}`}
                className="flex-1 flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded text-white text-sm"
              >
                <Pencil size={16} /> Edit
              </Link>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-4 p-3 text-red-700 border border-red-400 rounded-md bg-red-100 dark:bg-red-900 dark:text-red-300 dark:border-red-600">
          {error}
        </div>
      )}
    </>
  );
}
