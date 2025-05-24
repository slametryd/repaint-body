import heroImg from "../assets/heroImg.png";
import asetTiga from "../assets/aset3.jpg";
import asetBundel from "../assets/asetBundel.png";
import fotoAll from "../assets/fotoall.png";
import secondimg from "../assets/second.png";
import Element2 from "../assets/element2.png";
import Element from "../assets/element.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "./AuthContext";
import React, { useEffect, useState, useContext } from "react";

import axios from "axios"; // Menggunakan axios untuk mengambil data dari API

const FAQ = [
  {
    title: `KAK, SAYA MAU BOOKING SLOT DONG! CARANYA GIMANA?`,
    description: `Pilih jasa yang anda di pesan inginkan\n
      Isi informasi-informasi yang dibutuhkan\n Datang sesuai waktu dan tanggal yang sudah dipilih`,
  },
  {
    title: "KAK ADA GARANSI NGGAK?",
    description: `Garansi dari bengkel diberikan 1 bulan sejak tanggal pengecatan ya, diluar waktu ditentukan sudah bukan tanggungjawab kami`,
  },

  {
    title: "KAK BODY MOTOR SAYA BEKAS CAT-AN",
    description: `Diliat dulu nanti teknisnya, kalau diharuskan di remover cat sebelumnya +50.000 s/d +100.000 ya, jika bisa langsung naik cat harga normal. Velg bekas cat disarankan Senin sampai Jumat dan datang dari pagi ya kak`,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [actived, setActived] = useState(null);
  const [produk, setProduk] = useState([]);
  const { user } = useContext(AuthContext);

  console.log("HomePage user:", user); // cek user di sini

  // Mengambil produk dari server saat halaman dimuat
  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/produk");
        setProduk(response.data); // Menyimpan data produk ke dalam state
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      }
    };

    fetchProduk();
  }, []); // Dependency array kosong agar hanya dijalankan sekali saat pertama kali load

  const toggleFunction = (i) => {
    if (actived === i) {
      setActived(null);
    } else {
      setActived(i);
    }
  };

  const handleBooking = async (item) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("Silakan login terlebih dahulu untuk melakukan booking.");
      navigate("/login");
      return;
    }

    try {
      // Jika kamu perlu validasi token atau refresh token, buat fungsi khusus refresh token di sini
      const response = await axios.get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      // Jika perlu update token baru:
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }

      navigate(`/booking`, {
        state: {
          id: item.id,
          picture: item.picture,
          judul: item.judul,
          harga: item.harga,
          deskripsi: item.deskripsi,
        },
      });
    } catch (error) {
      console.error("Refresh token tidak valid:", error);
      alert("Silakan login terlebih dahulu untuk melakukan booking.");
      navigate("/login");
    }
  };

  return (
    <div id="beranda" className="home-page pb-10">
      <div className="container px-4 mx-auto">
        <div
          className="hero grid
        grid-cols-2 pt-32 items-center gap-20"
        >
          <div className="box ">
            <h1 className="font-extrabold text-5xl mb-7">
              Bikin Motor Kamu Tampil Beda dengan Repaint{" "}
              <span className="text-[#FD1E0D]">Berkualitas!</span>
            </h1>
            <p className="mb-7 font-medium">
              Spesialis cat ulang body motor dengan hasil halus,
              <br /> warna tajam, dan tahan lama
            </p>
            <a
              href="#layanan-kami"
              className="bg-[#FD1E0D] font-medium text-center px-3 py-2 rounded-md font text-white hover:bg-[#ED1100] transition-all "
            >
              Lihat Detail
            </a>
          </div>
          <div className="box">
            <img src={heroImg} className="w-[537px] h-[422px]" alt="" />
          </div>
        </div>

        <div
          id="tentang-kami"
          className=" grid grid-cols-2  items-center justify-center pt-32"
        >
          <div className=" ">
            <img
              src={fotoAll}
              className="w-[380px] justify-center mx-auto ml-0 rounded-2xl"
              alt=""
            />
          </div>
          <div className="box ">
            <h2 className="font-bold text-3xl mb-7">Tentang Kami</h2>
            <h1 className="font-bold text-5xl mb-7">
              Kami Bukan Sekadar Bengkel, Kami{" "}
              <span className="text-[#FD1E0D]">Seniman Warna</span> untuk Motor
              Kamu!
            </h1>
            <p className="mb-7 font-medium">
              Kami adalah tim spesialis repaint body motor yang punya passion
              besar dalam mempercantik tampilan motor kamu. Dengan pengalaman
              lebih dari 2 tahun, kami sudah membantu ratusan pelanggan bikin
              motornya tampil beda, lebih segar, dan lebih keren.
            </p>
          </div>
        </div>

        <div id="layanan-kami" className="layanan-kami pt-32">
          <h2
            className="font-bold text-3xl mb-4 text-center
          "
          >
            Layanan Kami
          </h2>
          <p className="mb-7 font-medium text-center">
            Apakah kamu ingin tampilan motor yang klasik, elegan, atau nyentrik?{" "}
          </p>
          <div className="card-box  flex gap-8 items-center justify-between ">
            {produk.map((item) => (
              <div
                key={item.id}
                className="box rounded-md w-[400px] pb-7 shadow-md "
              >
                <img
                  src={`http://localhost:5000/uploads/${item.picture}`}
                  className="w-[400px] rounded-t-md mb-5 "
                  alt=""
                />
                <h3 className="font-bold text-[20px] px-4 ">{item.judul}</h3>
                <p className="text-gray-500 mb-4 px-4">{item.harga}</p>
                <p className="mb-5 font-medium px-4">{item.deskripsi}</p>
                <div className="button flex justify-between items-center  px-4">
                  <button
                    onClick={() => handleBooking(item)}
                    className="bg-[#FD1E0D] font-medium text-center px-4 py-2 rounded-md font text-white hover:bg-[#ED1100] transition-all "
                  >
                    Booking Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          id="galeri"
          className="galeri grid grid-cols-2 items-center justify-center pt-32 "
        >
          <div className="box ">
            <h2 className="font-bold text-3xl mb-7">Galeri</h2>
            <h1 className="font-bold text-5xl mb-7">
              Hasil
              <span className="text-[#FD1E0D]">Repaint Terbaik</span>dari
              Bengkel Kami
            </h1>
            <p className="mb-7 font-medium">
              Lihat bagaimana kami mengubah tampilan motor-motor <br />{" "}
              pelanggan jadi lebih keren dan baru lagi.
            </p>
          </div>
          <div className="box">
            <img
              src={asetBundel}
              className="w-[250px] mx-auto  mr-0 rounded-md"
              alt=""
            />
          </div>
        </div>

        <div id="faq" className="faq pt-32 ">
          <div className="box ">
            <h2 className="font-bold text-3xl mb-7 text-center ">FAQ</h2>

            <p className="mb-7 font-medium text-center">
              Yang sering orang tanyakan.
            </p>
          </div>
          {FAQ.map((item, i) => (
            <div
              key={i}
              className={`mb-7 box-faq  shadow-md  rounded-2xl ${
                actived === i ? "" : ""
              }`}
            >
              <div
                className="content-faq overflow-hidden flex justify-between items-center transition-all font-bold text-[16px] px-6 py-4 "
                onClick={() => toggleFunction(i)}
              >
                <h3 className=" ">{item.title}</h3>
                <span className="transition-all">
                  {actived === i ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  )}
                </span>
              </div>
              {actived === i && (
                <div className="isi-faq transition-all px-6 pb-4 rounded-2xl   text-gray-600">
                  {item.description.split(`\n`).map((line, i) => (
                    <p key={i} clasName="">
                      {" "}
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
