import express from "express";
import prescriptionService from "../services/PrescriptionService.js";
import multer from "multer";
import process from "process";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./prescriptions/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/uploadPrescription/:id",
  upload.single("file"),
  async (req, res) => {
    try {
      const { id } = req.params;
      let prescription = await prescriptionService.getPrescriptionById(id);

      const file = "./prescriptions/" + req.file.originalname;
      prescription = await prescriptionService.updatePrescription(id, { file });

      return res.status(200).send(prescription);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
);

router.get("/readPrescription/:filename", async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await prescriptionService.getPrescriptionById(id);
    let filePath = path.resolve(process.cwd() + "/../ " + prescription.file);
    res.status(200).sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/prescriptions", async (req, res) => {
  try {
    const prescriptions = await prescriptionService.getAllPrescriptions();
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/prescriptions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await prescriptionService.getPrescriptionById(id);
    res.status(200).json(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
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
    res.status(500).send(error);
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
    res.status(500).send(error);
  }
});

router.delete("/prescriptions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prescriptionService.deletePrescription(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/generatePrescription/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const prescription = await prescriptionService.getPrescriptionById(id);
    const generatedPrescription =
      await prescriptionService.generatePrescriptionFile(prescription);
    res.status(200).json(generatedPrescription);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
