import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import React, { useState, useContext } from "react";

function MasukLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(""); // Untuk pesan error
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const googleIdToken = await firebaseUser.getIdToken();

      const response = await axios.post(
        "http://localhost:5000/google-login",
        { token: googleIdToken },
        { withCredentials: true }
      );

      console.log("Response data:", response.data);

      const { accessToken, user: userData } = response.data;

      if (accessToken && userData) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(userData));

        login(userData);

        alert("Login berhasil!");
        navigate("/");
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        alert("Login gagal, data user tidak lengkap.");
      }
    } catch (error) {
      console.error("Login gagal:", error);
      alert("Login gagal. Coba lagi.");
    }
  };

  const Auth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg("Email dan password wajib diisi");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { email, password },
        { withCredentials: true }
      );
      const { accessToken, user: userData } = response.data;

      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        login(userData);
      } else {
        localStorage.removeItem("user");
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.msg) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("Terjadi kesalahan saat login");
      }
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="flex justify-center items-center h-full ">
        <form
          onSubmit={Auth}
          className="max-w-[400px]  border-2 rounded-2xl  px-4 "
        >
          <h1 className="font-extrabold text-5xl my-7 text-center">Login</h1>
          {msg && <p className="text-red-500 text-center">{msg}</p>}
          <div className="flex flex-col justify-center mb-4">
            <label className="mb-2">Email</label>
            <input
              className="outline-0 border-b-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center mb-4">
            <label className="mb-2">Password</label>
            <input
              className="outline-0 border-b-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#FD1E0D] font-medium px-5 py-2 rounded-full font text-white hover:bg-[#ED1100] transition-all mb-2"
            >
              Login
            </button>
            <p className="text-[#808080] mb-2"> Atau login dengan Google</p>
            <button
              type="button"
              className="bg-[#DFDFDF] font-medium px-5 py-2 rounded-full font text-white hover:bg-[#808080] transition-all mb-2"
              onClick={handleGoogleLogin}
            >
              <span className="pr-3 cursor-pointer">
                <FontAwesomeIcon icon={faGoogle} />
              </span>
              Gunakan google akun
            </button>
          </div>
          <div className="flex justify-center items-center gap-20 my-7 ">
            <p className="">
              <Link className="hover:border-b-2" to="/forgot-password">
                Lupa password?
              </Link>
            </p>
            <p className="text-right">
              {" "}
              Belum punya akun?
              <span
                onClick={() => navigate(`/signup`)}
                className="text-red-500 font-bold cursor-pointer hover:border-b-2"
              >
                Signup
              </span>
            </p>
          </div>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default MasukLogin;
