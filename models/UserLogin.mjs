import mongoose from "mongoose";

const userLoginSchema = new mongoose.Schema({
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
});

const UserLogin = mongoose.model("UserLogin", userLoginSchema);

export { UserLogin };
