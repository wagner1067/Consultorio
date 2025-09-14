import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyToken from "../middlleware/authMiddleware.js";
import appointmentController from "./AppointmentContrroller.js";
import doctorController from "./DoctorController.js";
import pacientCoptroller from "./PacientController.js";
import prescriptionController from "./PrescriptionController.js";
import DoctorService from "../services/DoctorService.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("Hi!");
  res.status(200).json({ message: "Hi!" });
});

//mapeamento de login
router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const doctor = await DoctorService.getDoctorByLogin(login);
    if (!doctor) {
      return res.status(401).json({ error: "Authentication failed!" });
    }

    const passwordMatch = await bcrypt.compare(password, doctor.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed!" });
    }

    const token = jwt.sign({ doctorId: doctor._id }, "your_secret_key", {
      expiresIn: "5h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.use("/", verifyToken, appointmentController);
router.use("/", verifyToken, doctorController);
router.use("/", verifyToken, pacientCoptroller);
router.use("/", verifyToken, prescriptionController);

export default router;
