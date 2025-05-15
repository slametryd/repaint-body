import { Sequelize } from "sequelize";

const db = new Sequelize(`auth_db`, `root`, ``, {
  host: "localhost",
  dialect: "mysql",
  port: 8112,
});

export default db;
