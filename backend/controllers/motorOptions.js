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
// Tambah warna baru

router.post("/warna_motor", async (req, res) => {
  try {
    const { warna } = req.body;

    if (!warna) {
      return res.status(400).json({ message: "Warna tidak boleh kosong" });
    }

    await WarnaMotor.create({ nama: warna });
    res.status(201).json({ message: "Warna berhasil ditambahkan" });
  } catch (err) {
    console.error("Gagal menyimpan warna:", err);
    res.status(500).json({ message: "Gagal menyimpan warna" });
  }
});
// Tambah jenis baru
router.post("/jenis_motor", async (req, res) => {
  try {
    const { jenis } = req.body;

    if (!jenis) {
      return res.status(400).json({ message: "jenis tidak boleh kosong" });
    }

    await JenisMotor.create({ nama: jenis });
    res.status(201).json({ message: "jenis berhasil ditambahkan" });
  } catch (err) {
    console.error("Gagal menyimpan jenis:", err);
    res.status(500).json({ message: "Gagal menyimpan jenis" });
  }
});

export default router;
