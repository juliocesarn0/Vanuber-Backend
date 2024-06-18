import Motorista from "../models/motoristaModel.mjs";

// Função para verificar se o motorista existe
export const checkMotoristaExists = async (req, res) => {
  try {
    const { ddd, numero } = req.body;
    console.log("Verificando dados:", { ddd, numero });
    const motorista = await Motorista.findOne({ ddd, numero });
    if (motorista) {
      return res.status(200).send(motorista);
    } else {
      return res.status(404).send({ exists: false });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Função para criar um novo motorista
export const createMotorista = async (req, res) => {
  try {
    const novoMotorista = new Motorista({
      ...req.body,
      status: "iniciante", // Definindo o status como "iniciante" ao criar um novo motorista
    });
    const motoristaSalvo = await novoMotorista.save();
    res.status(201).send(motoristaSalvo);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Função para login de motorista
export const loginMotorista = async (req, res) => {
  try {
    const { ddd, numero } = req.body;
    console.log("Verificando dados:", { ddd, numero });
    const motorista = await Motorista.findOne({ ddd, numero });
    if (!motorista) {
      return res.status(404).send({ error: "Motorista não encontrado" });
    }

    res.send(motorista);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Função para atualizar motorista
export const atualizarMotorista = async (req, res) => {
  try {
    const motoristaId = req.params.id;
    const atualizacoes = req.body;

    const motorista = await Motorista.findByIdAndUpdate(
      motoristaId,
      atualizacoes,
      { new: true }
    );

    if (!motorista) {
      return res.status(404).send({ error: "Motorista não encontrado" });
    }

    res.send(motorista);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Função para atualizar destinos do motorista
export const atualizarDestinosMotorista = async (req, res) => {
  try {
    const motoristaId = req.params.id;
    const { destinos } = req.body;

    const motorista = await Motorista.findById(motoristaId);
    if (!motorista) {
      return res.status(404).send({ error: "Motorista não encontrado" });
    }

    motorista.destinos = destinos;
    await motorista.save();

    res.send(motorista);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Função para atualizar bairros do motorista
export const atualizarBairrosMotorista = async (req, res) => {
  try {
    const motoristaId = req.params.id;
    const { bairros } = req.body;

    const motorista = await Motorista.findById(motoristaId);
    if (!motorista) {
      return res.status(404).send({ error: "Motorista não encontrado" });
    }

    motorista.bairros = bairros;
    await motorista.save();

    res.send(motorista);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getMotoristasPorLocal = async (req, res) => {
  try {
    const { bairro, cidade } = req.query;

    if (!bairro || !cidade) {
      console.log("Bairro e cidade são obrigatórios.");
      return res
        .status(400)
        .json({ message: "Bairro e cidade são obrigatórios" });
    }

    console.log(
      `Buscando motoristas para o bairro: ${bairro}, cidade: ${cidade}`
    );

    const motoristas = await Motorista.find({
      "bairros.bairro": bairro,
      "bairros.cidade": cidade,
    });

    console.log(`Motoristas encontrados: ${motoristas.length}`);
    res.status(200).json(motoristas);
  } catch (error) {
    console.error("Erro ao buscar motoristas:", error);
    res
      .status(500)
      .json({ message: "Erro ao buscar motoristas", error: error.message });
  }
};

export const getMotoristasPorEscolaEUniversidade = async (req, res) => {
  try {
    const { local, cidade } = req.query;

    if (!local || !cidade) {
      console.log("Local e cidade são obrigatórios.");
      return res
        .status(400)
        .json({ message: "Local e cidade são obrigatórios" });
    }

    console.log(
      `Buscando motoristas para o local: ${local}, cidade: ${cidade}`
    );

    const motoristas = await Motorista.find({
      "destinos.local": local,
      "destinos.cidade": cidade,
    });

    console.log(`Motoristas encontrados: ${motoristas.length}`);
    res.status(200).json(motoristas);
  } catch (error) {
    console.error("Erro ao buscar motoristas:", error);
    res
      .status(500)
      .json({ message: "Erro ao buscar motoristas", error: error.message });
  }
};
