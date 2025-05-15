import React from "react";
import asetBundel from "../assets/asetBundel.png";
import Footer from "./Footer";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function DetailBooking() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen">
      <div className="container px-4 mx-auto mb-20 ">
        <div className="">
          <h1 className="font-extrabold text-2xl px-4 my-7 ">
            <span
              onClick={() => navigate(`/booking`)}
              className="cursor-pointer pr-3"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </span>{" "}
            DETAIL BOOKING
          </h1>
        </div>
        <div className="pt-20">
          <h1 className="font-extrabold text-5xl">Detail pesanan</h1>
        </div>
        <div className="flex  justify-between items-center h-full pt-32">
          <div>
            <h1 className="font-medium">Product</h1>
            <p>Tangal Booking : 13 Desember 2023</p>
            <p>Jenis Motor : NMX 2019</p>
            <p>Warna yang dipilih : Hitam doff</p>
          </div>
          <div>
            <h1>Qty</h1>
            <p>1</p>
          </div>
          <div>
            <h1>Harga</h1>
            <p>1.000.000</p>
          </div>
        </div>
        <div className="pt-14">
          <div>
            <p>
              Pilih Metode Pembayaran <span></span>
            </p>
          </div>
          <div className="mb-20">
            <p>Total Bayar</p>
          </div>
        </div>
        <div>
          <div className="">
            <button className="bg-[#FD1E0D] font-medium px-5 py-2 rounded-full font text-white hover:bg-[#ED1100] transition-all mb-2">
              Check Out
            </button>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default DetailBooking;
