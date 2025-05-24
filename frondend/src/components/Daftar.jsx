import React, { useState } from "react";
import Footer from "./Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Daftar = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState(""); // Untuk pesan error

  const navigate = useNavigate();
  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.msg) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("Terjadi kesalahan saat mendaftar");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // 1. Login pakai popup Google (Firebase)
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 2. Ambil ID Token (penting untuk keamanan)
      const idToken = await user.getIdToken();

      // 3. Kirim ID Token ke backend (bukan data mentah)
      const response = await axios.post("http://localhost:5000/google-login", {
        token: idToken,
      });

      // 4. Simpan data user (yang sudah diverifikasi backend)
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // 5. Arahkan user ke halaman utama
      navigate("/");
    } catch (error) {
      console.error("Login gagal:", error);
      alert("Login gagal. Coba lagi.");
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="flex justify-center items-center h-full">
        <form onSubmit={Register} className=" border-2 rounded-2xl px-4 ">
          <h1 className="w-[400px] font-extrabold text-5xl my-7 text-center">
            Sign Up
          </h1>

          {/* Tampilkan pesan error */}
          {msg && <p className="text-red-500 text-center mb-4">{msg}</p>}

          <div className="flex flex-col justify-center mb-4">
            <label className="mb-2">Nama</label>
            <input
              className="outline-0 border-b-2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col justify-center mb-4">
            <label className="mb-2">Email</label>
            <input
              className="outline-0 border-b-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col justify-center mb-4">
            <label className="mb-2">Password</label>
            <input
              className="outline-0 border-b-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col justify-center mb-4">
            <label className="mb-2">Konfirmasi Password</label>
            <input
              className="outline-0 border-b-2"
              type="password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#FD1E0D] font-medium px-5 py-2 rounded-full text-white hover:bg-[#ED1100] transition-all mb-2"
            >
              Sign Up
            </button>
            <p className="text-[#808080] mb-2">Atau daftar dengan Google</p>
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="bg-[#DFDFDF] font-medium px-5 py-2 rounded-full font text-white hover:bg-[#808080] transition-all "
            >
              <span className="pr-3 cursor-pointer">
                <FontAwesomeIcon icon={faGoogle} />
              </span>{" "}
              Gunakan akun Google
            </button>
          </div>

          <div className="flex justify-center items-center my-4">
            <p>
              <Link className="hover:border-b-2" to="/">
                Sudah punya akun? Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="mt-7">
        <Footer />
      </div>
    </div>
  );
};

export default Daftar;
