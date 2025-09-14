"use client";
import React, { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import ConfirmModal from "@/components/ConfirmModal"; // Importe o novo componente

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
  const [success, setSuccess] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<string | null>(null);
  const [doctorNameToDelete, setDoctorNameToDelete] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:3001/doctors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const data = await response.json();

        if (response.ok) {
          if (Array.isArray(data)) {
            setDoctors(data);
            setError(null);
          } else {
            setError(data.error || "A resposta da API não é um array.");
            setDoctors([]);
          }
        } else {
          setError(data.error || "Erro ao carregar lista de médicos");
          setDoctors([]);
        }
      } catch (err) {
        setError("Erro ao carregar lista de médicos");
        setDoctors([]);
      }
    };
    fetchDoctors();
  }, []);

  const handleOpenModal = (id: string, name: string) => {
    setDoctorToDelete(id);
    setDoctorNameToDelete(name);
    setShowModal(true);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setDoctorToDelete(null);
    setDoctorNameToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!doctorToDelete) return;
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:3001/doctors/${doctorToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (response.ok) {
        setDoctors((prev) => prev.filter((doc) => doc._id !== doctorToDelete));
        setError(null);
        setSuccess("Médico deletado com sucesso!");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        const content = await response.json();
        setError(content.error || "Erro ao deletar médico");
        setSuccess(null);
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      setSuccess(null);
    } finally {
      handleCancelDelete();
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
                      onClick={() => handleOpenModal(doctor._id, doctor.name)} // Altere esta linha
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
                onClick={() => handleOpenModal(doctor._id, doctor.name)} // Altere esta linha
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

      {showModal && (
        <ConfirmModal
          message={`Tem certeza que deseja deletar o médico ${doctorNameToDelete}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* ... (Seu código de sucesso e erro) */}
      {success && (
        <div className="mt-4 p-3 text-sm text-green-700 border border-green-400 rounded-md bg-green-100 dark:bg-green-900 dark:text-green-300 dark:border-green-600">
          {success}
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 text-red-700 border border-red-400 rounded-md bg-red-100 dark:bg-red-900 dark:text-red-300 dark:border-red-600">
          {error}
        </div>
      )}
    </>
  );
}
