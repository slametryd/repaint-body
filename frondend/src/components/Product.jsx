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
      <div className="container px-4 mx-auto min-h-screen flex flex-col">
        <div className="">
          <h1 className="font-extrabold text-2xl  my-7 ">
            <span onClick={() => navigate(`/`)} className="pr-3 cursor-pointer">
              <FontAwesomeIcon icon={faArrowLeft} />
            </span>{" "}
            DETAIL PRODUCT
          </h1>
        </div>
        <div className="flex  justify-between gap-40 pt-20">
          <div className="">
            <img
              src={asetBundel}
              className="w-[300px] mx-auto  rounded-md"
              alt=""
            />
          </div>
          <div className="w-[600px] pb-32 ">
            <h1 className="font-extrabold text-4xl mb-2">Repaint Full Body</h1>
            <h2 className="font-bold text-2xl text-[#7c7c7c] mb-4">
              Rp 1.000.000
            </h2>
            <p className="font-medium mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Necessitatibus omnis ipsa voluptate commodi molestiae praesentium!
              Laboriosam repellendus debitis eos labore, quo, excepturi ea
              deserunt modi officia illo unde, perferendis eius!
            </p>
            <h2 className="font-bold text-2xl">Waktu Pengerjaan</h2>
            <p className="font-medium mb-7">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Necessitatibus omnis ipsa voluptate commodi molestiae praesentium!
              Laboriosam repellendus debitis eos labore, quo, excepturi ea
              deserunt modi officia illo unde, perferendis eius!
            </p>
            <div className="">
              <button
                onClick={() => navigate(`/detailbooking`)}
                className="bg-[#FD1E0D] font-medium px-5 py-2 rounded-full font text-white hover:bg-[#ED1100] transition-all mb-2"
              >
                Booking Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full">
        <Footer />
      </div>
    </div>
  );
}

export default Booking;
