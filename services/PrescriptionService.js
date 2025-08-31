import prescriptionRepository from "../repositories/PrescriptionRepository.js";

const getAllPrescriptions = async () => {
  return await prescriptionRepository.getAllPrescriptions();
};
const getPrescriptionById = async (id) => {
  return await prescriptionRepository.getPrescriptionById(id);
};

const savePrescription = async ({
  date,
  appointmentId,
  medicine,
  dosage,
  instructions,
}) => {
  return await prescriptionRepository.savePrescription({
    date,
    appointmentId,
    medicine,
    dosage,
    instructions,
  });
};

const updatePrescription = async (
  id,
  { date, appointmentId, medicine, dosage, instructions }
) => {
  return await prescriptionRepository.updatePrescription(id, {
    date,
    appointmentId,
    medicine,
    dosage,
    instructions,
  });
};

const deletePrescription = async (id) => {
  return await prescriptionRepository.deletePrescription(id);
};

const prescriptionService = {
  getAllPrescriptions,
  getPrescriptionById,
  savePrescription,
  updatePrescription,
  deletePrescription,
};

export default prescriptionService;
