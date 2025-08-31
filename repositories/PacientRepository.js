import { Pacient } from "../models/Pacient.js";

const getAllPacients = async () => {
  try {
    return await Pacient.find();
  } catch (error) {
    throw new Error(Error, "Error fetching pacients");
  }
};

const getPacientById = async (id) => {
  try {
    return await Pacient.findById(id);
  } catch (error) {
    throw new Error(Error, "Pacient not found");
  }
};

const savePacient = async ({ name, birthDate, email, phone }) => {
  try {
    const pacient = new Pacient({ name, birthDate, email, phone });
    return await pacient.save();
  } catch (error) {
    throw new Error(Error, "Error saving pacient");
  }
};

const updatePacient = async (id, { name, birthDate, email, phone }) => {
  try {
    return await Pacient.findByIdAndUpdate(id, {
      name,
      birthDate,
      email,
      phone,
    });
  } catch (error) {
    throw new Error(Error, "Error updating pacient");
  }
};

const deletePacient = async (id) => {
  try {
    return await Pacient.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(Error, "Error deleting pacient");
  }
};

const pacientRepository = {
  getAllPacients,
  getPacientById,
  savePacient,
  updatePacient,
  deletePacient,
};

export default pacientRepository;
