import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function UpdateBooking() {
  const [warna, setWarna] = useState("");
  const [jenis, setJenis] = useState("");

  const handleSimpanWarna = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/warna_motor", { warna });
      alert("Warna berhasil disimpan!");
      setWarna("");
    } catch (error) {
      alert("Gagal menyimpan warna");
    }
  };

  const handleSimpanJenis = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/jenis_motor", { jenis });
      alert("Jenis motor berhasil disimpan!");
      setJenis("");
    } catch (error) {
      alert("Gagal menyimpan jenis motor");
    }
  };

  return (
    <div className="w-full h-screen ">
      <div className="container">
        <div className="box ">
          <h2 className="font-bold py-3 rounded-full  px-4 bg-[#DFDFDF] ">
            Update Data Orderan
          </h2>
          <div className="Warna border-2 mt-10 rounded-2xl">
            <h2 className="mt-10 px-4 font-medium bg-[#1d1d1d] text-white py-3 w-fit rounded-r-md">
              Update Warna Motor
            </h2>
            <div className="box m-7">
              <form action="" onSubmit={handleSimpanWarna}>
                <input
                  type="text"
                  value={warna}
                  placeholder="Tambah warna motor"
                  onChange={(e) => setWarna(e.target.value)}
                  className=" px-4 py-3 border-2 text-gray-400 rounded-md w-full mt-4 hover:border-gray-800"
                />
                <button
                  type="submit"
                  className="bg-[#FD1E0D] text-white px-4 py-2 rounded-md hover:bg-[#ED1100] mt-4 "
                >
                  Simpan
                </button>
              </form>
            </div>
          </div>
          <div className="Warna border-2 mt-10 rounded-2xl">
            <h2 className="mt-10 px-4 font-medium bg-[#1d1d1d] text-white py-3 w-fit rounded-r-md">
              Update Jenis Motor
            </h2>
            <div className="box m-7">
              <form action="" onSubmit={handleSimpanJenis}>
                <input
                  type="text"
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                  placeholder="Tambah jenis motor"
                  className=" px-4 py-3 border-2 text-gray-400 rounded-md w-full mt-4 hover:border-gray-800"
                />
                <button
                  type="submit"
                  className="bg-[#FD1E0D] text-white px-4 py-2 rounded-md hover:bg-[#ED1100] mt-4 "
                >
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateBooking;
