import express from "express";
import midtransClient from "midtrans-client";

const router = express.Router();

const snap = new midtransClient.Snap({
  isProduction: false, // true untuk mode live
  serverKey: "SB-Mid-server-SZqlmFjsOEBfj5YGDVrDvxyu",
});

router.post("/payment-token", async (req, res) => {
  const { order_id, gross_amount, name, email } = req.body;

  const parameter = {
    transaction_details: {
      order_id: order_id,
      gross_amount: gross_amount,
    },
    customer_details: {
      first_name: name,
      email: email,
    },
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    res.json({ token: transaction.token });
  } catch (error) {
    console.error("Midtrans Error:", error);
    res.status(500).json({ error: "Gagal membuat token pembayaran" });
  }
});
export default router;
