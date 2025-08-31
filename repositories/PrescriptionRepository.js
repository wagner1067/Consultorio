import { Prescription } from "../models/Prescription.js";

const getAllPrescriptions = async () => {
  try {
    return await Prescription.find();
  } catch (error) {
    throw new Error(error);
  }
};

const getPrescriptionById = async (id) => {
  try {
    return await Prescription.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const savePrescription = async ({
  date,
  appointmentId,
  medicine,
  dosage,
  instructions,
}) => {
  try {
    const prescription = new Prescription({
      date,
      appointmentId,
      medicine,
      dosage,
      instructions,
    });
    return await prescription.save();
  } catch (error) {
    throw new Error(error);
  }
};

const updatePrescription = async (
  id,
  { date, appointmentId, medicine, dosage, instructions }
) => {
  try {
    return await Prescription.findByIdAndUpdate(id, {
      date,
      appointmentId,
      medicine,
      dosage,
      instructions,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const deletePrescription = async (id) => {
  try {
    return await Prescription.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
};

const prescriptionRepository = {
  getAllPrescriptions,
  getPrescriptionById,
  savePrescription,
  updatePrescription,
  deletePrescription,
};

export default prescriptionRepository;
