import React from "react";
import asetBundel from "../assets/asetBundel.png";
import Footer from "./Footer";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Booking() {
  const navigate = useNavigate();
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
          <form className="w-[600px]  ">
            <h1 className="font-extrabold text-5xl mb-7">Isi detail pesanan</h1>
            <div className="flex flex-col justify-center mb-4">
              <label className="mb-2">Pilih tangal booking</label>
              <input className="outline-0 border-b-2" type="text" />
            </div>
            <div className="flex flex-col justify-center mb-4">
              <label className="mb-2">Jenis Motor</label>
              <input className="outline-0 border-b-2" type="text" />
            </div>
            <div className="flex flex-col justify-center mb-4">
              <label className="mb-2">Warna yang dipilih</label>
              <input className="outline-0 border-b-2" type="text" />
            </div>
            <div className="flex flex-col justify-center mb-20">
              <label className="mb-2">Qty</label>
              <input className="outline-0 border-b-2" type="number" />
            </div>
            <div className="">
              <button
                onClick={() => navigate(`/detailbooking`)}
                className="bg-[#FD1E0D] font-medium px-5 py-2 rounded-full font text-white hover:bg-[#ED1100] transition-all mb-2"
              >
                Booking Now
              </button>
            </div>
          </form>
          <div className="">
            <img
              src={asetBundel}
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
