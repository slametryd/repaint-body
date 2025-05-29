import express from "express";
import Booking from "../models/booking.js";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ GET /booking - ambil semua data booking
router.get("/booking", async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: Product, // mengambil data produk terkait
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data booking." });
  }
});

// ✅ POST /bookings - buat data booking baru
router.post("/bookings", async (req, res) => {
  const { tanggal, jenis_motor, warna, qty, produkId } = req.body;

  if (!tanggal || !jenis_motor || !warna || !qty || !produkId) {
    return res.status(400).json({ error: "Semua kolom harus diisi." });
  }

  try {
    const product = await Product.findByPk(produkId);
    if (!product) {
      return res.status(404).json({ error: "Produk tidak ditemukan." });
    }

    const total_harga = product.harga * qty;

    const booking = await Booking.create({
      tanggal,
      jenis_motor,
      warna,
      qty,
      total_harga,
      produkId,
    });

    res.status(201).json({
      message: "Booking berhasil disimpan.",
      booking: {
        id: booking.id,
        tanggal: booking.tanggal,
        jenis_motor: booking.jenis_motor,
        warna: booking.warna,
        qty: booking.qty,
        total_harga: booking.total_harga,
        produkId: booking.produkId,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menyimpan booking." });
  }
});

export default router;
