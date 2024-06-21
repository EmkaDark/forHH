const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    account: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    other: { type: String, required: true },
    date: { type: String, required: true },
    responsible: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    status: { type: String, default: "Не в работе" },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("clients", clientSchema);
