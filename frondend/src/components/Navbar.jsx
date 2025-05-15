import { useState, useEffect } from "react";
import mainLogo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [scroll, setScroll] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [user, setUser] = useState(null); // ✅ user state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 5);
      setShowDropDown(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollActive = scroll ? "shadow-lg" : "";
  const scroll_profile = scroll ? "" : "";

  return (
    <div className="navbar fixed w-full transition-all py-4 z-50 bg-transparent">
      <div className="container mx-auto px-4">
        <div
          className={`navbar-box flex justify-between items-center bg-white px-6 py-2 rounded-full ${scrollActive}`}
        >
          {/* Logo */}
          <div className="logo">
            <img src={mainLogo} className="w-[102px] h-[62px]" alt="Logo" />
          </div>

          {/* Menu */}
          <ul className="flex justify-center gap-12">
            <li className="hover:font-medium hover:underline transition-all">
              <a href="#beranda">Beranda</a>
            </li>
            <li className="hover:font-medium hover:underline transition-all">
              <a href="#tentang-kami">Tentang Kami</a>
            </li>
            <li className="hover:font-medium hover:underline transition-all">
              <a href="#layanan-kami">Layanan Kami</a>
            </li>
            <li className="hover:font-medium hover:underline transition-all">
              <a href="#galeri">Galeri</a>
            </li>
            <li className="hover:font-medium hover:underline transition-all">
              <a href="#faq">FAQ</a>
            </li>
          </ul>

          {/* login */}
          <div className="relative flex items-center gap-4">
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-[#FD1E0D] font-medium px-5 py-2 rounded-full text-white hover:bg-[#ED1100] transition-all"
              >
                Login
              </button>
            ) : (
              <div className="relative">
                <div
                  onClick={() => setShowDropDown(!showDropDown)}
                  className="account w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-200 text-white font-bold cursor-pointer"
                >
                  <FontAwesomeIcon icon={faUser} />
                </div>

                {/* Dropdown */}
                {showDropDown && (
                  <div
                    className={`absolute right-0 mt-2 w-40 rounded-lg text-sm z-50 ${scroll_profile}`}
                  >
                    <button
                      className="block w-full text-right px-4 py-2 mt-8 hover:underline"
                      onClick={() => {
                        // navigate("/akun");
                        setShowDropDown(false); // Close dropdown after click
                      }}
                    >
                      Kelola Akun
                    </button>
                    <button
                      className="block w-full text-right px-4 py-2 hover:underline"
                      onClick={() => {
                        localStorage.removeItem("user");
                        setUser(null);
                        setShowDropDown(false);
                        navigate("/login");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
