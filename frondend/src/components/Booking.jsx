import React from "react";
import asetBundel from "../assets/asetBundel.png";
import Footer from "./Footer";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tanggal, setTanggal] = useState("");
  const [jenis_motor, setJenisMotor] = useState("");
  const [warna, setWarna] = useState("");
  const [qty, setQty] = useState(1);
  const { picture, judul, harga, deskripsi } = location.state || {};
  const today = new Date().toISOString().split("T")[0];

  // State untuk menampung data dari backend
  const [motorOptions, setMotorOptions] = useState([]);
  const [warnaOptions, setWarnaOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/motor-options");
        setMotorOptions(res.data.jenisMotor);
        setWarnaOptions(res.data.warnaMotor);
      } catch (err) {
        console.error("Gagal mengambil data motor options:", err);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      tanggal,
      jenis_motor,
      warna,
      qty,
      produkId: location.state?.id, // Pastikan produkId ada dan valid
    });

    // Validasi: Pastikan semua kolom terisi
    if (!tanggal || !jenis_motor || !warna || !qty) {
      alert("Semua kolom harus diisi sebelum booking.");
      return;
    }

    try {
      // Kirim data booking ke server
      const res = await axios.post("http://localhost:5000/api/bookings", {
        tanggal,
        jenis_motor,
        warna,
        qty,
        produkId: location.state?.id, // Pastikan ID produk yang tepat
      });

      // Ambil data booking dari server, termasuk total_harga yang dihitung oleh backend
      const { booking } = res.data;

      // Navigasi ke halaman detail booking dan kirimkan data booking termasuk total_harga
      navigate("/detailbooking", {
        state: {
          picture,
          judul,
          harga,
          deskripsi,
          tanggal,
          jenis_motor,
          warna,
          qty,
          total_harga: booking.total_harga, // Ambil total_harga dari response backend
        },
      });
    } catch (error) {
      console.error("Gagal booking:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-ful">
      <div className="container px-4 mx-auto mb-20 min-h-screen flex flex-col ">
        <div className="">
          <h1 className="font-extrabold text-2xl  my-7 ">
            <span onClick={() => navigate(`/`)} className="pr-3 cursor-pointer">
              <FontAwesomeIcon icon={faArrowLeft} />
            </span>{" "}
            BOOKING ORDER
          </h1>
        </div>
        <div className="flex  justify-between items-center h-full pt-32">
          <form onSubmit={handleSubmit} className="w-[600px]  ">
            <h1 className="font-extrabold text-5xl mb-7">Isi detail pesanan</h1>
            <div className="flex flex-col justify-center mb-4">
              <label className="mb-2">Pilih tangal booking</label>
              <input
                type="date"
                min={today}
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="outline-0 border-b-2"
              />
            </div>
            <div className="flex flex-col justify-center mb-4">
              <label className="mb-2">Jenis Motor</label>
              <select
                value={jenis_motor}
                onChange={(e) => setJenisMotor(e.target.value)}
                className="outline-0 border-b-2"
              >
                <option value="">Pilih jenis motor</option>
                {motorOptions.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col justify-center mb-4">
              <label className="mb-2">Warna yang dipilih</label>
              <select
                value={warna}
                onChange={(e) => setWarna(e.target.value)}
                className="outline-0 border-b-2"
              >
                <option value="">Pilih warna</option>
                {warnaOptions.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col justify-center mb-20">
              <label className="mb-2">Qty</label>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="outline-0 border-b-2"
              />
            </div>
            <div className="">
              <button
                type="submit"
                className="bg-[#FD1E0D] font-medium px-5 py-2 rounded-full font text-white hover:bg-[#ED1100] transition-all mb-2"
              >
                Check Out
              </button>
            </div>
          </form>
          <div className="">
            <img
              src={`http://localhost:5000/uploads/${picture}`}
              className="w-[300px] mx-auto  rounded-2xl"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

export default Booking;
