// models/Booking.js
import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";
import Product from "./Product.js"; // Import untuk relasi

const Booking = db.define(
  "Booking",
  {
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jenis_motor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    warna: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    produkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "product", // nama tabel (bukan model)
        key: "id",
      },
    },
    total_harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "booking",
    timestamps: false,
  }
);

// Relasi: Satu booking terkait ke satu product
Booking.belongsTo(Product, { foreignKey: "produkId" });

export default Booking;
