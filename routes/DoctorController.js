import express from "express";
import bcrypt from "bcrypt";
import DoctorService from "../services/DoctorService.js";

const router = express.Router();

router.get("/doctors", async (req, res) => {
  try {
    const doctors = await DoctorService.getAllDoctors();
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:" + error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/doctors/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await DoctorService.getDoctorById(id);
    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:" + error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/doctors", async function (req, res) {
  const {
    name,
    login,
    password,
    medicalSpecialty,
    medicalRegistration,
    email,
    phone,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = await DoctorService.saveDoctor({
      name,
      login,
      password: hashedPassword,
      medicalSpecialty,
      medicalRegistration,
      email,
      phone,
    });
    res.status(201).send(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).send("Falha ao registrar médico" + error);
  }
});

router.put("/doctors/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    login,
    password,
    medicalSpecialty,
    medicalRegistration,
    email,
    phone,
  } = req.body;
  try {
    const doctor = await DoctorService.updateDoctor(id, {
      name,
      login,
      password,
      medicalSpecialty,
      medicalRegistration,
      email,
      phone,
    });
    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error updating doctor:" + error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/doctors/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await DoctorService.deleteDoctor(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting doctor:" + error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
