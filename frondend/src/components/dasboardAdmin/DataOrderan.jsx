import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function DataOrderan() {
  const [booking, setBooking] = useState([]);
  const [produk, setProduk] = useState([]);

  // Mengambil dataOrder dari data base
  useEffect(() => {
    const fetcBooking = async (e) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/booking`);

        setBooking(response.data);

        const resProduk = await axios.get(`http://localhost:5000/api/produk`);

        setProduk(resProduk.data);
      } catch (error) {
        console.log("Gagal memuat data", error);
      }
    };
    fetcBooking();
  }, []);

  const getProdukJudul = (produkId) => {
    const product = produk.find((p) => p.id === produkId);
    return product ? product.judul : "";
  };

  const getEmailUsers = (usersId) => {
    const user = users.find((u) => u.id === usersId);
    return user ? user.email : "";
  };

  const formatRupiah = (Angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(Angka);
  };

  return (
    <div className="w-full h-screen ">
      <div className="container">
        <div className="box ">
          <h2 className="font-bold py-3 rounded-full  px-4 bg-[#DFDFDF] ">
            Data Orderan
          </h2>

          <div className="grid grid-cols-6  items-center text-center p-6 mt-10 border-b-2">
            <h2>Nama Produk</h2>
            <h2>Jenis Motor</h2>
            <h2>Warna</h2>
            <h2>Quantity</h2>
            <h2>Total Harga</h2>
            <h2 className="">Tanggal</h2>
          </div>
          {booking.map((booking) => (
            <div
              className="grid grid-cols-6 gap-4 text-center items-center  p-6"
              key={booking.id}
            >
              <h2>{getProdukJudul(booking.produkId)}</h2>
              <h2>{booking.jenis_motor}</h2>
              <h2>{booking.warna}</h2>
              <h2>{booking.qty}</h2>
              <h2>{formatRupiah(booking.total_harga)}</h2>
              <h2>{new Date(booking.tanggal).toLocaleDateString()}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DataOrderan;
