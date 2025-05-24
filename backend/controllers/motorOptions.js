import express from "express";
import JenisMotor from "../models/JenisMotor.js"; // import model
import WarnaMotor from "../models/WarnaMotor.js"; // import model

const router = express.Router();

// GET: ambil data jenis_motor dan warna_motor dari MySQL
router.get("/motor-options", async (req, res) => {
  try {
    // Mengambil semua data jenis motor dari database
    const jenisMotorData = await JenisMotor.findAll();
    // Mengambil semua data warna motor dari database
    const warnaMotorData = await WarnaMotor.findAll();

    // Memetakan hasil query ke array yang berisi nama jenis motor dan warna motor
    const jenisMotor = jenisMotorData.map((row) => row.nama);
    const warnaMotor = warnaMotorData.map((row) => row.nama);

    // Mengirimkan response JSON
    res.json({ jenisMotor, warnaMotor });
  } catch (err) {
    console.error("Gagal mengambil data opsi:", err);
    res.status(500).json({ message: "Gagal mengambil data" });
  }
});

export default router;
