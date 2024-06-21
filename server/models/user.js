const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    surname: { type: String, required: true },
    other: { type: String, required: true },
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "clients",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("admin", adminSchema);
