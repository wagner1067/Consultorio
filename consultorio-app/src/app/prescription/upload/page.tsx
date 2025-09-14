"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Pencil, Upload, Eye } from "lucide-react";

interface Prescription {
  _id: string;
  date: string;
  medicine: string;
  dosage: string;
  instructions: string;
  file: string | null;
}

export default function PrescriptionCreate() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchPrescriptions = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:3001/prescriptions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao carregar prescrições.");
        return;
      }

      const data = await response.json();
      setPrescriptions(data);
    } catch (err) {
      setError("Erro de conexão com o servidor.");
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const uploadPrescription = async (id: string, selectedFile: File) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch(
        `http://127.0.0.1:3001/uploadPrescription/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: sessionStorage.getItem("token")
              ? `Bearer ${sessionStorage.getItem("token")}`
              : "",
          },
          body: formData,
        }
      );

      if (res.ok) {
        const updatedPrescription = await res.json();
        setPrescriptions((prev) =>
          prev.map((p) => (p._id === id ? updatedPrescription : p))
        );
        setSuccess("Prescrição enviada com sucesso!");
        setTimeout(() => setSuccess(null), 3000);
        setError(null);
        setFile(null);
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Erro ao fazer upload da prescrição.");
        setSuccess(null);
      }
    } catch (err) {
      setError("Erro de conexão com o servidor.");
      setSuccess(null);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    prescriptionId: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      uploadPrescription(prescriptionId, selectedFile);
    }
  };

  const showFile = async (id: string) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:3001/readPrescription/${id}`, {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Arquivo não encontrado.");
        } else if (res.status === 401) {
          throw new Error("Não autorizado. Faça login novamente.");
        } else {
          const errorData = await res.text();
          throw new Error(errorData || "Erro ao abrir arquivo.");
        }
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `prescricao_${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
      setSuccess(null);
      setTimeout(() => setError(null), 5000);
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

      {/* Mensagens de sucesso e erro */}
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

      {/* Tabela para telas grandes (>=1024px) */}
      <div className="hidden lg:block overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden dark:bg-gray-900">
          <thead className="bg-blue-600 text-white text-left dark:bg-blue-800">
            <tr>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2 text-center">Medicamento</th>
              <th className="px-4 py-2 text-center">Dosagem</th>
              <th className="px-4 py-2 text-center">Instruções</th>
              <th className="px-4 py-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.length > 0 ? (
              prescriptions.map((p, index) => (
                <tr
                  key={p._id}
                  className={`${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                >
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                    {p.date}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-800 dark:text-gray-200">
                    {p.medicine}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-800 dark:text-gray-200">
                    {p.dosage}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-800 dark:text-gray-200">
                    {p.instructions}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      {!p.file && (
                        <>
                          <input
                            type="file"
                            onChange={(e) => handleFileChange(e, p._id)}
                            className="hidden"
                            id={`file-upload-${p._id}`}
                          />
                          <label
                            htmlFor={`file-upload-${p._id}`}
                            className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 px-3 py-2 rounded text-white text-sm cursor-pointer w-50"
                          >
                            <Upload size={16} />
                            Escolha um arquivo
                          </label>
                        </>
                      )}
                      {p.file && (
                        <button
                          onClick={() => showFile(p._id)}
                          className="flex items-center justify-center gap-1 bg-purple-500 hover:bg-purple-600 px-3 py-2 rounded text-white text-sm w-20"
                        >
                          <Eye size={16} /> Ver Arquivo
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-2 text-center text-gray-800 dark:text-gray-200"
                >
                  Nenhuma prescrição encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Cards para mobile/tablets (<1024px) */}
      <div className="lg:hidden space-y-4">
        {prescriptions.length > 0 ? (
          prescriptions.map((p) => (
            <div
              key={p._id}
              className="p-4 border rounded-lg shadow bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            >
              <p>
                <span className="font-bold">Data:</span> {p.date}
              </p>
              <p>
                <span className="font-bold">Medicamento:</span> {p.medicine}
              </p>
              <p>
                <span className="font-bold">Dosagem:</span> {p.dosage}
              </p>
              <p>
                <span className="font-bold">Instruções:</span> {p.instructions}
              </p>

              <div className="flex flex-col items-center mt-3 gap-2">
                {!p.file && (
                  <>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, p._id)}
                      className="hidden"
                      id={`file-upload-mobile-${p._id}`}
                    />
                    <label
                      htmlFor={`file-upload-mobile-${p._id}`}
                      className="w-full flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 px-3 py-2 rounded text-white text-sm cursor-pointer"
                    >
                      <Upload size={16} />
                      Escolha um arquivo
                    </label>
                  </>
                )}
                {p.file && (
                  <button
                    onClick={() => showFile(p._id)}
                    className="w-full flex items-center justify-center gap-1 bg-purple-500 hover:bg-purple-600 px-3 py-2 rounded text-white text-sm"
                  >
                    <Eye size={16} /> Ver Arquivo
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 border rounded-lg shadow bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-center">
            Nenhuma prescrição encontrada.
          </div>
        )}
      </div>
    </>
  );
}
