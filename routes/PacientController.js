import express from "express";
import PacientService from "../services/pacientService.js";

const router = express.Router();

router.get("/pacients ", async (req, res) => {
  try {
    const pacients = await PacientService.getAllPacients();
    res.status(200).json(pacients);
  } catch (error) {
    console.error("Error fetching pacients:" + error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/pacients/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pacient = await PacientService.getPacientById(id);
    res.status(200).json(pacient);
  } catch (error) {
    console.error("Error fetching pacient:" + error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/pacients", async (req, res) => {
  const { name, birthDate, email, phone } = req.body;
  try {
    const pacient = await PacientService.savePacient({
      name,
      birthDate,
      email,
      phone,
    });
    res.status(201).json(pacient);
  } catch (error) {
    console.error("Error saving pacient:" + error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/pacients/:id", async (req, res) => {
  const { id } = req.params;
  const { name, birthDate, email, phone } = req.body;
  try {
    const pacient = await PacientService.updatePacient(id, {
      name,
      birthDate,
      email,
      phone,
    });
    res.status(200).json(pacient);
  } catch (error) {
    console.error("Error updating pacient:" + error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/pacients/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await PacientService.deletePacient(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting pacient:" + error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
