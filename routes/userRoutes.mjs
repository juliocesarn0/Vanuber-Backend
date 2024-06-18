import express from "express";
import {
  checkUserExists,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createDestino,
  addEndereco,
} from "../controllers/userController.mjs";
import {
  getCidadesPorEstado,
  getEscolasEUniversidades,
  getBairrosPorCidade,
} from "../controllers/cidadeController.mjs";
import cepController from "../controllers/cepController.mjs";

const router = express.Router();

// Rotas para usuários
router.post("/users/check", checkUserExists);
router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post("/destinos", createDestino);
router.post("/enderecos", addEndereco);

// Rotas para cidades e escolas/universidades
router.get("/cidades/:estado", getCidadesPorEstado);
router.get("/escolas-universidades", getEscolasEUniversidades);
router.get("/bairros", getBairrosPorCidade);

// Rotas para CEP
router.use("/cep", cepController);

export default router;
