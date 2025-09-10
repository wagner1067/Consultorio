import express from "express";
import router from "./routes/router.js";
import "../src/database/database.js";
import cors from "cors";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// rotas
app.use("/", router);

// servidor
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001!");
});
