import React from "react";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

function DetailBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email || "email-default@example.com";

  const {
    picture,
    judul,
    harga,
    deskripsi,
    tanggal,
    jenis_motor,
    warna,
    qty,
    total_harga,
  } = location.state || {};

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  const initiatePayment = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userEmail = user?.email || "fallback@example.com"; // email fallback jika null

      // Lanjut ke pembayaran Midtrans
      const res = await axios.post("http://localhost:5000/api/payment-token", {
        order_id: `ORDER-${Date.now()}`,
        gross_amount: total_harga,
        name: user?.name || "Customer Default",
        email: userEmail,
      });

      const snapToken = res.data.token;

      window.snap.pay(snapToken, {
        onSuccess: async function (result) {
          alert("Pembayaran berhasil!");
          console.log("Success", result);

          await axios.post("http://localhost:5000/api/send-email", {
            judul,
            tanggal,
            jenis_motor,
            warna,
            qty,
            total_harga: formatRupiah(total_harga),
            to: userEmail,
            payment_info: {
              order_id: result.order_id,
              payment_type: result.payment_type,
              va_number: result.va_numbers?.[0]?.va_number,
              bank: result.va_numbers?.[0]?.bank,
            },
          });

          navigate("/", { state: { result } });
        },

        onPending: async function (result) {
          alert("Menunggu pembayaran...");
          console.log("Pending", result);

          await axios.post("http://localhost:5000/api/send-email", {
            judul,
            tanggal,
            jenis_motor,
            warna,
            qty,
            total_harga: formatRupiah(total_harga),
            to: userEmail,
            payment_info: {
              order_id: result.order_id,
              payment_type: result.payment_type,
              va_number: result.va_numbers?.[0]?.va_number,
              bank: result.va_numbers?.[0]?.bank,
            },
          });
        },

        onError: function (result) {
          alert("Pembayaran gagal.");
          console.error("Error", result);
        },

        onClose: function () {
          alert("Kamu belum menyelesaikan pembayaran.");
        },
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mengirim email atau memulai pembayaran.");
    }
  };

  if (!judul) {
    return (
      <div className="text-center mt-10">
        <h2>Data booking tidak tersedia.</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="container px-4 mx-auto mb-20 flex-grow ">
        <div className="">
          <h1 className="font-extrabold text-2xl  my-7 ">
            <span
              onClick={() => navigate(`/booking`)}
              className="cursor-pointer pr-3"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </span>{" "}
            DETAIL BOOKING
          </h1>
        </div>
        <div className="pt-20 mb-32">
          <h1 className="font-extrabold text-5xl">Detail pesanan</h1>
        </div>
        <div className="flex  justify-between items-center h-full   bg-[#d3d3d3] px-6 py-3 rounded-full ">
          <div>
            <h1 className="font-bold  text-[20px]">Product</h1>
          </div>
          <div>
            <h1 className="font-bold  text-[20px]">Quantity</h1>
          </div>
          <div>
            <h1 className="font-bold  text-[20px]">Harga</h1>
          </div>
        </div>
        <div className=" flex  justify-between items-center h-full px-6 py-3 ">
          <div>
            <h1 className="font-bold text-[20px]">{judul}</h1>
            <p>Tangal Booking : {tanggal}</p>
            <p>Jenis Motor : {jenis_motor}</p>
            <p>Warna yang dipilih : {warna}</p>
          </div>
          <div>
            <p>{qty}</p>
          </div>
          <div>
            <p>{formatRupiah(total_harga)}</p>
          </div>
        </div>
        <div className="pt-14 flex  justify-between items-center h-full">
          <div>
            <p className="px-6 py-3 font-bold  text-[20px]">
              Pilih Metode Pembayaran <span></span>
            </p>
          </div>
          <div className="">
            <button
              onClick={initiatePayment}
              className="bg-[#FD1E0D] font-medium px-5 py-2 rounded-md font text-white hover:bg-[#ED1100] transition-all mb-2"
            >
              Bayar
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

export default DetailBooking;
