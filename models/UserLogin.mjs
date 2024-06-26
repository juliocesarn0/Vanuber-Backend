import mongoose from "mongoose";

const destinoSchema = new mongoose.Schema({
  estado: { type: String, required: true },
  cidade: { type: String, required: true },
  local: { type: String, required: true },
  periodo: { type: String, required: true },
});

const enderecoSchema = new mongoose.Schema({
  cep: { type: String, required: false },
  rua: { type: String, required: false },
  numero: { type: String, required: false },
  bairro: { type: String, required: false },
  cidade: { type: String, required: false },
  estado: { type: String, required: false },
});

const userLoginSchema = new mongoose.Schema({
  ddd: { type: String, required: true },
  numero: { type: String, required: true },
  email: { type: String, required: true },
  primeiroNome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  cpf: { type: String, required: true },
  senha: { type: String, required: true },
  destinos: [destinoSchema],
  endereco: { type: enderecoSchema, default: {} }, // Inicializando com objeto vazio
});

const UserLogin = mongoose.model("UserLogin", userLoginSchema);

export { UserLogin };
