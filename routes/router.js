import { express } from "express";

let router = express.Router();

router.get("/", (req, res) => {
  console.log("Hi!");
  res.status(200).json({ message: "Hi!" });
});

export default router;
