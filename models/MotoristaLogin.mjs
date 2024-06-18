import mongoose from "mongoose";

const motoristaLoginSchema = new mongoose.Schema({
  ddd: {
    type: String,
    required: true,
  },
  numero: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  primeiroNome: {
    type: String,
    required: true,
  },
  sobrenome: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  documentos: {
    cnh: { type: String, default: null },
    renavam: { type: String, default: null },
    modelo: { type: String, default: null },
    ano: { type: String, default: null },
    cor: { type: String, default: null },
  },
  destinos: [
    {
      cidade: { type: String },
      local: { type: String },
      periodo: { type: String },
    },
  ],
  bairros: [
    {
      cidade: { type: String },
      bairro: { type: String },
    },
  ],
  status: {
    type: String,
    default: "em análise",
  },
});

const MotoristaLogin = mongoose.model("MotoristaLogin", motoristaLoginSchema);

export default MotoristaLogin;
