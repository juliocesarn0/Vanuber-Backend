import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api", userRoutes);

mongoose
  .connect(
    "mongodb+srv://juliocesarn:20041999@vanuber.6rnlyo7.mongodb.net/Batata"
  )
  .then(() => console.log("Conexão com MongoDB Atlas estabelecida com sucesso"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB Atlas:", err));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
