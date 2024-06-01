import mongoose from "mongoose";

const cepSchema = new mongoose.Schema({
  cep: { type: String, required: true, unique: true },
  rua: { type: String, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
});

const Cep = mongoose.model("Cep", cepSchema);

export default Cep;
