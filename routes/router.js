import express from "express";
import appointmentController from "./AppointmentContrroller.js";
import doctorController from "./DoctorController.js";
import pacientCoptroller from "./PacientController.js";
import prescriptionController from "./PrescriptionController.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("Hi!");
  res.status(200).json({ message: "Hi!" });
});

router.use("/", appointmentController);
router.use("/", doctorController);
router.use("/", pacientCoptroller);
router.use("/", prescriptionController);

export default router;
