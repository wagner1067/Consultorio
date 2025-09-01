import Appointment from "../models/Appointment.js";

const getAllAppointments = async () => {
  try {
    return await Appointment.find();
  } catch (error) {
    throw new Error(error);
  }
};

const getAppointmentById = async (id) => {
  try {
    return await Appointment.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const saveAppointment = async ({ date, doctorId, pacientId }) => {
  try {
    const prescription = new Appointment({ date, doctorId, pacientId });
    return await prescription.save();
  } catch (error) {
    throw new Error(error);
  }
};

const updateAppointment = async (id, { date, doctorId, pacientId }) => {
  try {
    return await Appointment.findByIdAndUpdate(
      id,
      {
        date,
        doctorId,
        pacientId,
      },
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw new Error(error);
  }
};

const deleteAppointment = async (id) => {
  try {
    return await Appointment.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
};

const appointmentRepository = {
  getAllAppointments,
  getAppointmentById,
  saveAppointment,
  updateAppointment,
  deleteAppointment,
};

export default appointmentRepository;
