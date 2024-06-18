import fetch from "node-fetch";

// Função para buscar cidades por estado usando a API do IBGE
export const getCidadesPorEstado = async (req, res) => {
  try {
    const estado = req.params.estado;
    const query = req.query.q;

    console.log(
      `Buscando cidades para o estado: ${estado}, com query: ${query}`
    );

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`;

    const response = await fetch(url);
    const cidades = await response.json();

    if (query) {
      const cidadesFiltradas = cidades.filter((cidade) =>
        cidade.nome.toLowerCase().includes(query.toLowerCase())
      );
      console.log(
        `Cidades encontradas (com filtro): ${cidadesFiltradas.length}`
      );
      res.json(cidadesFiltradas.slice(0, 10));
    } else {
      console.log(`Total de cidades encontradas: ${cidades.length}`);
      res.json(cidades);
    }
  } catch (error) {
    console.error("Erro ao buscar cidades:", error);
    res.status(500).json({ message: error.message });
  }
};

// Função para buscar escolas e universidades
export const getEscolasEUniversidades = async (req, res) => {
  try {
    const estado = req.query.estado;
    const cidade = req.query.cidade.trim().toLowerCase();

    if (!estado || !cidade || cidade.length < 3) {
      console.log(
        "Erro: Estado e cidade são obrigatórios e a cidade deve ter pelo menos 3 caracteres."
      );
      return res.status(400).json({
        message:
          "Estado e cidade são obrigatórios e a cidade deve ter pelo menos 3 caracteres.",
      });
    }

    console.log(
      `Buscando escolas e universidades para cidade: ${cidade}, estado: ${estado}`
    );

    // Buscando escolas
    const urlEscolas = `https://escolas-cidades.vercel.app/cidades`;
    let escolas = [];
    try {
      const responseEscolas = await fetch(urlEscolas);
      if (responseEscolas.ok) {
        const escolasData = await responseEscolas.json();
        escolas = escolasData.filter((escola) =>
          escola.cidade.toLowerCase().includes(cidade)
        );
        console.log(`Escolas encontradas: ${escolas.length}`);
      } else {
        console.error("Erro ao buscar escolas:", responseEscolas.status);
      }
    } catch (error) {
      console.error("Erro ao processar resposta de escolas:", error);
    }

    // Buscando universidades
    const urlUniversidades = `https://lista-universidades.vercel.app/universidades?cidade=${
      cidade.charAt(0).toUpperCase() + cidade.slice(1).toLowerCase()
    }`;
    let universidades = [];
    try {
      const responseUniversidades = await fetch(urlUniversidades);
      if (responseUniversidades.ok) {
        const universidadesData = await responseUniversidades.json();
        universidades = universidadesData.filter((universidade) =>
          universidade.cidade.toLowerCase().includes(cidade)
        );
        console.log(`Universidades encontradas: ${universidades.length}`);
      } else {
        console.error(
          "Erro ao buscar universidades:",
          responseUniversidades.status
        );
      }
    } catch (error) {
      console.error("Erro ao processar resposta de universidades:", error);
    }

    const resultados = {
      escolas: escolas.map((escola) => ({ nome: escola.escola })),
      universidades: universidades.map((universidade) => ({
        nome: universidade.facul,
      })),
    };

    res.json(resultados);
  } catch (error) {
    console.error("Erro ao buscar escolas e universidades:", error);
    res.status(500).json({
      message: "Erro ao buscar escolas e universidades",
      error: error.message,
    });
  }
};

// Função para buscar bairros usando a API externa
export const getBairrosPorCidade = async (req, res) => {
  try {
    const { cidade } = req.query;

    if (!cidade) {
      console.log("Erro: Cidade é obrigatória.");
      return res.status(400).json({ message: "Cidade é obrigatória" });
    }

    console.log(`Buscando bairros para a cidade: ${cidade}`);

    const url = `https://lista-bairros.vercel.app/bairros?cidade=${cidade}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao buscar bairros: " + response.statusText);
    }
    const data = await response.json();

    // Filtrar apenas os nomes dos bairros
    const bairros = data.map((item) => item.bairro);

    console.log("Bairros filtrados:", bairros);

    res.json(bairros);
  } catch (error) {
    console.error("Erro ao buscar bairros:", error);
    res.status(500).json({ message: error.message });
  }
};
