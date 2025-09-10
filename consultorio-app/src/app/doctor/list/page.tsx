"use client";
import React, { useEffect, useState } from "react";
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
        setDoctors(data);
      } catch {
        setError("Erro ao carregar lista de médicos");
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
        className="font-medium text-blue-600 hover:underline inline-block mb-4"
        href="/home"
      >
        ← Voltar
      </Link>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white text-left">
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
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-4 py-2">{doctor.name}</td>
                <td className="px-4 py-2 text-center">{doctor.login}</td>
                <td className="px-4 py-2 text-center">
                  {doctor.medicalSpecialty}
                </td>
                <td className="px-4 py-2 text-center">
                  {doctor.medicalRegistration}
                </td>
                <td className="px-4 py-2 text-center">{doctor.email}</td>
                <td className="px-4 py-2 text-center">{doctor.phone}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => deleteDoctor(doctor._id)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-sm transition"
                  >
                    Delete
                  </button>
                  <Link
                    href={`/doctor/edit/${doctor._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white text-sm ml-2 transition"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && (
        <div className="mt-4 p-3 text-red-700 border border-red-400 rounded-md bg-red-100">
          {error}
        </div>
      )}
    </>
  );
}
