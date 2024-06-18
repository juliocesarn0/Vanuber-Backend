import express from "express";
import {
  checkMotoristaExists,
  createMotorista,
  loginMotorista,
  atualizarMotorista,
  atualizarDestinosMotorista,
  atualizarBairrosMotorista,
  getMotoristasPorLocal,
  getMotoristasPorEscolaEUniversidade,
} from "../controllers/motoristaController.mjs";

const router = express.Router();

router.post("/motoristas/check", checkMotoristaExists);
router.post("/motoristas", createMotorista);
router.post("/motoristas/login", loginMotorista); // Verifique se esta linha está presente
router.put("/motoristas/update/:id", atualizarMotorista);
router.put("/motoristas/:id/destinos", atualizarDestinosMotorista);
router.put("/motoristas/:id/bairros", atualizarBairrosMotorista);
router.get("/motoristas/por-local", getMotoristasPorLocal);
router.get(
  "/motoristas/por-escolaEuniversidade",
  getMotoristasPorEscolaEUniversidade
);

export default router;
