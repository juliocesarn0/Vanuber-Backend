import mongoose from "mongoose";

const destinoSchema = new mongoose.Schema({
  estado: { type: String, required: true },
  cidade: { type: String, required: true },
  local: { type: String, required: true },
  periodo: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  ddd: { type: String, required: true },
  numero: { type: String, required: true },
  email: { type: String, required: true },
  primeiroNome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  cpf: { type: String, required: true },
  senha: { type: String, required: true },
  destinos: [destinoSchema],
});

const User = mongoose.model("User", userSchema);

export default User;
