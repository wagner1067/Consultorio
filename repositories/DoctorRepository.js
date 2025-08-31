import { Doctor } from "../models/Doctor.js";

const getAllDoctors = async () => {
  try {
    return await Doctor.find();
  } catch (error) {
    throw new Error(Error, "Error fetching doctors");
  }
};

const getDoctorById = async (id) => {
  try {
    return await Doctor.findById(id);
  } catch (error) {
    throw new Error(Error, "Doctor not found");
  }
};

const saveDoctor = async ({
  name,
  login,
  password,
  medicalSpecialty,
  medicalRegistration,
  email,
  phone,
}) => {
  try {
    const doctor = new Doctor({
      name,
      login,
      password,
      medicalSpecialty,
      medicalRegistration,
      email,
      phone,
    });
    return await doctor.save();
  } catch (error) {
    throw new Error(Error, "Error saving doctor");
  }
};

const updateDoctor = async (
  id,
  { name, login, password, medicalSpecialty, medicalRegistration, email, phone }
) => {
  try {
    return await Doctor.findByIdAndUpdate(id, {
      name,
      login,
      password,
      medicalSpecialty,
      medicalRegistration,
      email,
      phone,
    });
  } catch (error) {
    throw new Error(Error, "Error updating doctor");
  }
};

const deleteDoctor = async (id) => {
  try {
    return await Doctor.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(Error, "Error deleting doctor");
  }
};

const getDoctorByLogin = async (login) => {
  try {
    return await Doctor.findOne({ login: login });
  } catch (error) {
    throw new Error(Error, "Doctor not found");
  }
};

const doctorRepository = {
  getAllDoctors,
  getDoctorById,
  saveDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorByLogin,
};

export default doctorRepository;
