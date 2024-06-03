import fetch from "node-fetch";

// Função para buscar cidades por estado usando a API do IBGE
export const getCidadesPorEstado = async (req, res) => {
  try {
    const estado = req.params.estado;
    const query = req.query.q;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`;

    const response = await fetch(url);
    const cidades = await response.json();

    if (query) {
      const cidadesFiltradas = cidades.filter((cidade) =>
        cidade.nome.toLowerCase().includes(query.toLowerCase())
      );
      res.json(cidadesFiltradas.slice(0, 10));
    } else {
      res.json(cidades);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para buscar escolas e universidades
export const getEscolasEUniversidades = async (req, res) => {
  try {
    const estado = req.query.estado;
    const cidade = req.query.cidade;

    if (!estado || !cidade) {
      return res.status(400).json({ message: "Estado e cidade são obrigatórios" });
    }

    console.log(`Buscando escolas para cidade: ${cidade}, estado: ${estado}`);

    const urlEscolas = `https://escolas-cidades.vercel.app/cidades`;
    let escolas = [];
    try {
      const responseEscolas = await fetch(urlEscolas);
      if (responseEscolas.ok) {
        const escolasData = await responseEscolas.json();
        escolas = escolasData.filter(
          (escola) => escola.cidade.toLowerCase() === cidade.toLowerCase()
        );
      } else {
        console.error("Erro ao buscar escolas:", responseEscolas.status);
        console.error(
          "Resposta da API de escolas:",
          await responseEscolas.text()
        );
      }
    } catch (error) {
      console.error("Erro ao processar resposta de escolas:", error);
    }

    const urlUniversidades = `https://lista-universidades.vercel.app/universidades?cidade=${
      cidade.charAt(0).toUpperCase() + cidade.slice(1).toLowerCase()
    }`;
    let universidades = [];
    try {
      const responseUniversidades = await fetch(urlUniversidades);
      if (responseUniversidades.ok) {
        const universidadesData = await responseUniversidades.json();
        universidades = universidadesData.filter(
          (universidade) =>
            universidade.cidade.toLowerCase() === cidade.toLowerCase()
        );
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

    console.log("Resultados combinados:", resultados);

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
    const bairros = data.map(item => item.bairro);

    console.log("Bairros filtrados:", bairros);

    res.json(bairros);
  } catch (error) {
    console.error("Erro ao buscar bairros:", error);
    res.status(500).json({ message: error.message });
  }
};
