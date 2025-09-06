import DoctorRepository from "../repositories/DoctorRepository.js";

const getAllDoctors = async () => {
  return await DoctorRepository.getAllDoctors();
};

const getDoctorById = async (id) => {
  return await DoctorRepository.getDoctorById(id);
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
  return await DoctorRepository.saveDoctor({
    name,
    login,
    password,
    medicalSpecialty,
    medicalRegistration,
    email,
    phone,
  });
};

const updateDoctor = async (
  id,
  { name, login, password, medicalSpecialty, medicalRegistration, email, phone }
) => {
  return await DoctorRepository.updateDoctor(id, {
    name,
    login,
    password,
    medicalSpecialty,
    medicalRegistration,
    email,
    phone,
  });
};

const deleteDoctor = async (id) => {
  return await DoctorRepository.deleteDoctor(id);
};

//login
const getDoctorByLogin = async (login) => {
  return await DoctorRepository.getDoctorByLogin(login);
};

const doctorService = {
  getAllDoctors,
  getDoctorById,
  saveDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorByLogin,
};

export default doctorService;
