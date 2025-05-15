import heroImg from "../assets/heroImg.png";
import asetTiga from "../assets/aset3.jpg";
import asetBundel from "../assets/asetBundel.png";
import secondimg from "../assets/second.png";
import Element2 from "../assets/element2.png";
import Element from "../assets/element.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
  const toggleFunction = (i) => {
    if (actived === i) {
      setActived(null);
    } else {
      setActived(i);
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
        <div id="tentang-kami" className=" grid grid-cols-2 pt-32">
          <div className="box">
            <img
              src={asetBundel}
              className="w-[250px] mx-auto  rounded-2xl"
              alt=""
            />
          </div>
          <div className="box">
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
            <div className="box rounded-md w-[400px] pb-7 shadow-md ">
              <img
                src={asetTiga}
                className="w-[400px] rounded-t-md mb-5 "
                alt=""
              />
              <h3 className="font-bold text-[20px] px-4 ">Repaint Full Body</h3>
              <p className="text-gray-500 mb-4 px-4">Rp.1.000.000</p>
              <p className="mb-5 font-medium px-4">
                Repaint full body(body halus dan kasar) paket komplit, untuk
                motor kesayangan Anda
              </p>
              <div className="button flex justify-between items-center  px-4">
                <button
                  onClick={() => navigate(`/detailproduct`)}
                  className="bg-[#FD1E0D] font-medium text-center px-4 py-2 rounded-md font text-white hover:bg-[#ED1100] transition-all "
                >
                  Lihat Detail
                </button>
                <button
                  onClick={() => navigate(`/booking`)}
                  className="border-2 border-[#FD1E0D] font-medium text-center  px-3 py-2 text-[#FD1E0D] rounded-md font  hover:border-[#ff7676] hover:text-[#ff7676]  transition-all "
                >
                  Booking Now
                </button>
              </div>
            </div>

            <div className="box rounded-md w-[400px] pb-7 shadow-md ">
              <img
                src={asetTiga}
                className="w-[400px] rounded-t-md mb-5 "
                alt=""
              />
              <h3 className="font-bold text-[20px] px-4 ">Repaint Full Body</h3>
              <p className="text-gray-500 mb-4 px-4">Rp.1.000.000</p>
              <p className="mb-5 font-medium px-4">
                Repaint full body(body halus dan kasar) paket komplit, untuk
                motor kesayangan Anda
              </p>
              <div className="button flex justify-between items-center gap-8 px-4">
                <button
                  onClick={() => navigate(`/detailproduct`)}
                  className="bg-[#FD1E0D] font-medium text-center px-3 py-2 rounded-md font text-white hover:bg-[#ED1100] transition-all "
                >
                  Lihat Detail
                </button>
                <button
                  onClick={() => navigate(`/booking`)}
                  className="border-2 border-[#FD1E0D] font-medium text-center  px-3 py-2 text-[#FD1E0D] rounded-md font  hover:border-[#ff7676] hover:text-[#ff7676]  transition-all "
                >
                  Booking Now
                </button>
              </div>
            </div>

            <div className="box rounded-md w-[400px] pb-7 shadow-md ">
              <img
                src={asetTiga}
                className="w-[400px] rounded-t-md mb-5 "
                alt=""
              />
              <h3 className="font-bold text-[20px] px-4 ">Repaint Full Body</h3>
              <p className="text-gray-500 mb-4 px-4">Rp.1.000.000</p>
              <p className="mb-5 font-medium px-4">
                Repaint full body(body halus dan kasar) paket komplit, untuk
                motor kesayangan Anda
              </p>
              <div className="button flex justify-between items-center gap-8 px-4">
                <button
                  onClick={() => navigate(`/detailproduct`)}
                  className="bg-[#FD1E0D] font-medium text-center px-3 py-2 rounded-md font text-white hover:bg-[#ED1100] transition-all "
                >
                  Lihat Detail
                </button>
                <button
                  onClick={() => navigate(`/booking`)}
                  className="border-2 border-[#FD1E0D] font-medium text-center  px-3 py-2 text-[#FD1E0D] rounded-md font  hover:border-[#ff7676] hover:text-[#ff7676]  transition-all "
                >
                  Booking Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="galeri" className="galeri grid grid-cols-2 pt-32 gap-12">
          <div className="box">
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
              className="w-[250px] mx-auto  rounded-2xl"
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
