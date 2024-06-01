import express from "express";
import fetch from "node-fetch";
import Cep from "../models/cepModel.js"; // Importar o modelo de CEP

const router = express.Router();

router.get("/cep/:cep", async (req, res) => {
  const { cep } = req.params;

  try {
    // Verificar se o CEP já está no banco de dados
    console.log(`Buscando CEP no banco de dados: ${cep}`);
    const cepData = await Cep.findOne({ cep });
    if (cepData) {
      console.log("CEP encontrado no banco de dados:", cepData);
      return res.json(cepData);
    }

    // Buscar dados do ViaCEP
    console.log(`Buscando dados do CEP no ViaCEP: ${cep}`);
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new Error("Erro ao buscar o CEP no ViaCEP");
    }

    const data = await response.json();
    if (data.erro) {
      return res.status(404).json({ message: "CEP não encontrado" });
    }

    // Criar um novo documento de CEP no banco de dados
    console.log("Armazenando novo CEP no banco de dados");
    const newCep = new Cep({
      cep: data.cep.replace("-", ""), // Remover o hífen para manter a consistência
      rua: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf,
    });
    await newCep.save();

    console.log("Novo CEP armazenado com sucesso:", newCep);
    res.json(newCep);
  } catch (error) {
    console.error("Erro ao buscar ou armazenar o CEP:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
