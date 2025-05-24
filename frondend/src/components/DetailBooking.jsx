import React from "react";
import asetBundel from "../assets/asetBundel.png";
import Footer from "./Footer";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useLocation } from "react-router-dom";

function DetailBooking() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    picture,
    judul,
    harga,
    deskripsi,
    tanggal,
    jenis_motor,
    warna,
    qty,
    total_harga, // Ambil total_harga dari location.state
  } = location.state || {};

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  const initiatePayment = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/payment-token", {
        order_id: `ORDER-${Date.now()}`, // bisa diganti dengan ID booking dari backend jika ada
        gross_amount: total_harga,
        name: "Customer Default", // Ganti dengan nama user jika sudah login
        email: "email@example.com", // Ganti dengan email user
      });

      const snapToken = res.data.token;

      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          alert("Pembayaran berhasil!");
          console.log("Success", result);
          navigate("/pembayaran-berhasil", { state: { result } });
        },
        onPending: function (result) {
          alert("Menunggu pembayaran...");
          console.log("Pending", result);
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
      console.error("Error mengambil snap token:", error);
      alert("Gagal menginisiasi pembayaran.");
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
        <div className="flex  justify-between items-center h-full   bg-[#d3d3d3] px-4 py-3 rounded-md ">
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
        <div className=" flex  justify-between items-center h-full px-4 py-3 ">
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
            <p className="px-4 py-3 font-bold  text-[20px]">
              Pilih Metode Pembayaran <span></span>
            </p>
          </div>
          <div className="">
            <button
              onClick={initiatePayment}
              className="bg-[#FD1E0D] font-medium px-5 py-2 rounded-full font text-white hover:bg-[#ED1100] transition-all mb-2"
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
