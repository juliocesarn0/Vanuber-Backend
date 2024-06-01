import express from "express";
import * as userController from "../controllers/userController.mjs";
import {
  getCidadesPorEstado,
  getEscolasEUniversidades,
} from "../controllers/cidadeController.mjs";
import cepController from "../controllers/cepController.mjs"; // Importar a rota do CEP

const router = express.Router();

router.post("/users", userController.createUser);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.post("/users/check", userController.checkUserExists); // Nova rota

router.get("/cidades/:estado", getCidadesPorEstado);
router.get("/escolas-universidades", getEscolasEUniversidades);
router.use(cepController); // Usar a rota do CEP

export default router;

