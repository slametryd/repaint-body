import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
function AdminDasboard() {
  return (
    <div className="dasboard">
      <div className="container px-4 py-3 mx-auto ">
        <div className="box">
          <div className=" navbar px-4 py-3 shadow-md rounded-full">
            <h2 className="font-bold text-2xl ">
              {" "}
              <span className="px-4">
                <FontAwesomeIcon icon={faBars} />
              </span>
              DASBOARD
            </h2>
          </div>
          <div className="cover_view mt-32 flex grid-cols-2 gap-12 ">
            <div className="menu  border-4 h-full shadow-md ">
              <ul>
                <li>
                  <a href="">Upload Product</a>
                </li>
                <li>
                  <a href="">Data Orderan</a>
                </li>
                <li>
                  <a href="">Update Data Booking</a>
                </li>
              </ul>
            </div>
            <div className="tampilan border-4">
              <h2>ini tampilan</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDasboard;
