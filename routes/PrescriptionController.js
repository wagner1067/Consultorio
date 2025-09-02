import express from "express";
import prescriptionService from "../services/PrescriptionService.js";

const router = express.Router();

router.get("/prescriptions", async (req, res) => {
  try {
    const prescriptions = await prescriptionService.getAllPrescriptions();
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/prescriptions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await prescriptionService.getPrescriptionById(id);
    res.status(200).json(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/prescriptions", async (req, res) => {
  const { date, appointmentId, medicine, dosage, instructions } = req.body;
  try {
    const prescription = await prescriptionService.savePrescription({
      date,
      appointmentId,
      medicine,
      dosage,
      instructions,
    });
    res.status(201).json(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/prescriptions/:id", async (req, res) => {
  const { id } = req.params;
  const { date, appointmentId, medicine, dosage, instructions } = req.body;
  try {
    const prescription = await prescriptionService.updatePrescription(id, {
      date,
      appointmentId,
      medicine,
      dosage,
      instructions,
    });
    res.status(200).json(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/prescriptions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prescriptionService.deletePrescription(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
