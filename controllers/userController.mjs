import { UserLogin } from "../models/UserLogin.mjs";
import mongoose from "mongoose";

const normalizePhoneNumber = (numero) => {
  return numero.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
};

export const checkUserExists = async (req, res) => {
  try {
    console.log("Requisição recebida para verificar usuário:", req.body);
    const { ddd, numero } = req.body;

    if (!ddd || !numero) {
      console.log("Erro: DDD e número são obrigatórios.");
      return res.status(400).json({ message: "DDD e número são obrigatórios" });
    }

    const normalizedNumero = normalizePhoneNumber(numero);
    console.log("Número normalizado:", normalizedNumero);

    const user = await UserLogin.findOne({ ddd, numero: normalizedNumero });
    console.log("Usuário encontrado:", user);

    if (user) {
      console.log(`Usuário com DDD ${ddd} e número ${numero} encontrado.`);
      return res.status(200).json(user);
    } else {
      console.log(`Usuário com DDD ${ddd} e número ${numero} não encontrado.`);
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Erro no checkUserExists:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const createUser = async (req, res) => {
  try {
    console.log("Requisição recebida para criar usuário:", req.body);
    const { ddd, numero, email, primeiroNome, sobrenome, cpf, senha } =
      req.body;

    if (
      !ddd ||
      !numero ||
      !email ||
      !primeiroNome ||
      !sobrenome ||
      !cpf ||
      !senha
    ) {
      console.log("Erro: Todos os campos são obrigatórios.");
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const normalizedNumero = normalizePhoneNumber(numero);
    const newUser = new UserLogin({
      ddd,
      numero: normalizedNumero,
      email,
      primeiroNome,
      sobrenome,
      cpf,
      senha,
      destinos: [],
      endereco: {}, // Inicializando o campo endereco com um objeto vazio
    });

    await newUser.save();
    console.log(`Usuário ${primeiroNome} ${sobrenome} criado com sucesso.`);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro no createUser:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserLogin.find();
    console.log(`Total de usuários encontrados: ${users.length}`);
    res.json(users);
  } catch (error) {
    console.error("Erro no getAllUsers:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserLogin.findById(req.params.id);
    if (!user) {
      console.log(`Usuário com ID ${req.params.id} não encontrado.`);
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    console.log(`Usuário com ID ${req.params.id} encontrado.`);
    res.json(user);
  } catch (error) {
    console.error("Erro no getUserById:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await UserLogin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      console.log(
        `Usuário com ID ${req.params.id} não encontrado para atualização.`
      );
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    console.log(`Usuário com ID ${req.params.id} atualizado com sucesso.`);
    res.json(user);
  } catch (error) {
    console.error("Erro no updateUser:", error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await UserLogin.findByIdAndDelete(req.params.id);
    if (!user) {
      console.log(
        `Usuário com ID ${req.params.id} não encontrado para exclusão.`
      );
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    console.log(`Usuário com ID ${req.params.id} excluído com sucesso.`);
    res.json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    console.error("Erro no deleteUser:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createDestino = async (req, res) => {
  try {
    console.log("Requisição recebida para criar destino:", req.body);
    const { userId, estado, cidade, local, periodo } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID do usuário inválido" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const user = await UserLogin.findById(userObjectId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    user.destinos.push({ estado, cidade, local, periodo });
    await user.save();

    res.status(201).json({ message: "Destino salvo com sucesso", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao salvar destino", error: error.message });
  }
};

export const addEndereco = async (req, res) => {
  try {
    console.log("Requisição recebida para adicionar endereço:", req.body);
    const { userId, cep, rua, numero, bairro, cidade, estado } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID do usuário inválido" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const user = await UserLogin.findById(userObjectId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    user.endereco = { cep, rua, numero, bairro, cidade, estado };
    await user.save();

    res.status(201).json({ message: "Endereço salvo com sucesso", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao salvar endereço", error: error.message });
  }
};
