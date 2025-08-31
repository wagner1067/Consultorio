import AppointmentRepository from "../repositories/AppointmentRepository.js";

const getAllAppointments = async () => {
  return await AppointmentRepository.getAllAppointments();
};

const getAppointmentById = async (id) => {
  return await AppointmentRepository.getAppointmentById(id);
};

const saveAppointment = async ({ date, doctorId, pacientId }) => {
  return await AppointmentRepository.saveAppointment({
    date,
    doctorId,
    pacientId,
  });
};

const updateAppointment = async (id, { date, doctorId, pacientId }) => {
  return await AppointmentRepository.updateAppointment(id, {
    date,
    doctorId,
    pacientId,
  });
};

const deleteAppointment = async (id) => {
  return await AppointmentRepository.deleteAppointment(id);
};

const appointmentService = {
  getAllAppointments,
  getAppointmentById,
  saveAppointment,
  updateAppointment,
  deleteAppointment,
};

export default appointmentService;
