import fetch from "node-fetch";

// Função para buscar cidades por estado
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

// Função para buscar escolas e universidades por cidade e estado
export const getEscolasEUniversidades = async (req, res) => {
  try {
    const estado = req.query.estado;
    const cidade = req.query.cidade;

    if (!estado || !cidade) {
      return res
        .status(400)
        .json({ message: "Estado e cidade são obrigatórios" });
    }

    // 1. Buscar escolas (API de Dados Abertos)
    const urlEscolas = `http://educacao.dadosabertosbr.org/api/escolas?nome=${cidade}`;
    const responseEscolas = await fetch(urlEscolas);
    const escolas = await responseEscolas.json();

    // 2. Buscar universidades (lista-universidades API)
    const urlUniversidades = `https://lista-universidades.vercel.app/universidades?cidade=${cidade}`;
    const responseUniversidades = await fetch(urlUniversidades);
    const universidades = await responseUniversidades.json();

    // 3. Combinar os resultados (adaptando para a estrutura da API)
    const resultados = {
      escolas: escolas,
      universidades: universidades,
    };

    // 4. Enviar a resposta
    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao buscar universidades",
      error: error.message, // Inclua detalhes do erro para facilitar o debug
    });
  }
};
