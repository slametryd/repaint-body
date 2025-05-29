import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import UploadProduct from "../components/dasboardAdmin/UploadProduct";
import DataOrderan from "../components/dasboardAdmin/DataOrderan";
import UpdateBooking from "../components/dasboardAdmin/UpdateBooking";
import mainLogo from "../assets/logo-putih.png";

import {
  faArrowUpFromBracket,
  faCartFlatbedSuitcase,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
function AdminDasboard() {
  const [activeMenu, setActiveMenu] = useState("upload");

  const renderContent = () => {
    switch (activeMenu) {
      case "upload":
        return <UploadProduct />;
      case "order":
        return <DataOrderan />;
      case "booking":
        return <UpdateBooking />;
      default:
    }
  };

  return (
    <div className="dasboard">
      <div className="container px-4 py-3 mx-auto ">
        <div className="box">
          <div className="cover_view min-h-full flex grid-cols-2 gap-12  ">
            <div className="menu shadow-md bg-[#1d1d1d]   w-1/4  py-3 rounded-md text-white ">
              <div className="img">
                <img
                  src={mainLogo}
                  alt=""
                  className="w-[150px] mx-auto mt-5 "
                />
              </div>
              <ul className=" flex flex-col  mt-8 ">
                <li>
                  <button
                    onClick={() => {
                      setActiveMenu("upload");
                    }}
                    className="hover:bg-[#FD1E0D] transition-all w-full px-0 py-3 "
                  >
                    <span className="mr-3">
                      <FontAwesomeIcon icon={faArrowUpFromBracket} />
                    </span>
                    Upload Product
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveMenu("order")}
                    className="w-full py-3 hover:bg-[#FD1E0D] transition-all"
                  >
                    <span className="mr-3">
                      <FontAwesomeIcon icon={faCartFlatbedSuitcase} />
                    </span>
                    Data Orderan
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveMenu("booking")}
                    className="w-full py-3 hover:bg-[#FD1E0D] transition-all"
                  >
                    <span className="mr-3">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </span>
                    Update Data
                  </button>
                </li>
              </ul>
            </div>
            <div className="tampilan  flex-1  min-h-screen ">
              <div className=" navbar px-4 py-3 mb-12">
                <h2 className="font-bold text-2xl "> DASBOARD ADMIN</h2>
              </div>
              <div className="flex ">{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDasboard;
