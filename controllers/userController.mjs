import { UserLogin } from "../models/UserLogin.mjs";

export const checkUserExists = async (req, res) => {
  try {
    const { ddd, numero } = req.body;

    if (!ddd || !numero) {
      return res.status(400).json({ message: "DDD e número são obrigatórios" });
    }

    const user = await UserLogin.findOne({ ddd, numero });
    if (user) {
      return res.status(200).json({ message: "Usuário encontrado" });
    } else {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Erro no checkUserExists:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new UserLogin(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro no createUser:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserLogin.find();
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
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
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
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
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
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    console.error("Erro no deleteUser:", error);
    res.status(500).json({ message: error.message });
  }
};
