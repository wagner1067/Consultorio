import express from "express";
import router from "./routes/router.js";
import "./database/database.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rotas
app.use("/", router);

// servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000!");
});
