import { express } from "express";
import AppointmentService from "../services/AppointmentService.js";

let router = express.Router();

router.get("/appointments", async (req, res) => {
  try {
    const appointments = await AppointmentService.getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await AppointmentService.getAppointmentById(id);
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/appointments", async (req, res) => {
  const { date, doctorId, pacientId } = req.body;
  try {
    const appointment = await AppointmentService.saveAppointment({
      date,
      doctorId,
      pacientId,
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error saving appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  const { date, doctorId, pacientId } = req.body;
  try {
    const appointment = await AppointmentService.updateAppointment(id, {
      date,
      doctorId,
      pacientId,
    });
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await AppointmentService.deleteAppointment(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
