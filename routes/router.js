import { express } from "express";
import appointmentController from "./AppointmentContrroller.js";
import doctorController from "./DoctorController.js";
import pacientCoptroller from "./PacientController.js";
import prescriptionController from "./PrescriptionController.js";

let router = express.Router();

router.get("/", (req, res) => {
  console.log("Hi!");
  res.status(200).json({ message: "Hi!" });
});

router.use("/appointments", appointmentController);
router.use("/doctors", doctorController);
router.use("/pacients", pacientCoptroller);
router.use("/prescriptions", prescriptionController);

export default router;
