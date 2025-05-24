// models/Product.js
import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    judul: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    picture: DataTypes.STRING,
  },
  {
    tableName: "product",
    timestamps: false,
  }
);

export default Product;
