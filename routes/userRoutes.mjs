import express from "express";
import {
  checkUserExists,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.mjs";
import {
  getCidadesPorEstado,
  getEscolasEUniversidades,
  getBairrosPorCidade,
} from "../controllers/cidadeController.mjs";
import cepController from "../controllers/cepController.mjs";

const router = express.Router();

// Rota para verificar se o usuário existe
router.post("/users/check", checkUserExists);

// Rota para criar um novo usuário
router.post("/users", createUser);

// Rota para obter todos os usuários
router.get("/users", getAllUsers);

// Rota para obter um usuário por ID
router.get("/users/:id", getUserById);

// Rota para atualizar um usuário por ID
router.put("/users/:id", updateUser);

// Rota para deletar um usuário por ID
router.delete("/users/:id", deleteUser);

// Outras rotas
router.get("/cidades/:estado", getCidadesPorEstado);
router.get("/escolas-universidades", getEscolasEUniversidades);
router.get("/bairros", getBairrosPorCidade); // Definir a nova rota para buscar bairros

// Usando o controlador de CEP
router.use(cepController);

export default router;
