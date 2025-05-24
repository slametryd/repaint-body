import express from "express";
import multer from "multer";
import Produk from "../models/Product.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/produk", upload.single("picture"), async (req, res) => {
  try {
    const { judul, harga, deskripsi } = req.body;
    const picture = req.file.filename;

    await Produk.create({ judul, harga, deskripsi, picture });

    res.json({ message: "Produk berhasil ditambahkan!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menyimpan produk." });
  }
});

// Route untuk mengambil semua produk dari database
router.get("/produk", async (req, res) => {
  try {
    const produk = await Produk.findAll(); // Mengambil semua produk dari database
    res.json(produk); // Mengembalikan data produk dalam bentuk JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil produk." }); // Mengirimkan error jika gagal mengambil produk
  }
});

export default router;
