import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const WarnaMotor = db.define(
  "warna_motor",
  {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "warna_motor", // Sesuaikan dengan nama tabel asli
    timestamps: false, // Nonaktifkan createdAt & updatedAt
    freezeTableName: true, // Jangan ubah nama tabel jadi jamak
  }
);

export default WarnaMotor;
