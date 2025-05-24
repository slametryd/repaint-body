import express from "express";
import Booking from "../models/booking.js";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/bookings", async (req, res) => {
  const { tanggal, jenis_motor, warna, qty, produkId } = req.body;

  // Validasi input
  if (!tanggal || !jenis_motor || !warna || !qty || !produkId) {
    return res.status(400).json({ error: "Semua kolom harus diisi." });
  }

  try {
    // Ambil produk dari database berdasarkan ID
    const product = await Product.findByPk(produkId);
    if (!product) {
      return res.status(404).json({ error: "Produk tidak ditemukan." });
    }

    // Hitung total harga berdasarkan harga produk dan qty
    const total_harga = product.harga * qty;

    // Simpan booking ke database
    const booking = await Booking.create({
      tanggal,
      jenis_motor,
      warna,
      qty,
      total_harga,
      produkId,
    });

    // Response sukses
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
