import mainLogo from "../assets/logo-putih.png";

const Footer = () => {
  return (
    <div className="navbar  bg-black transition-all py-4 ">
      <div className="container mx-auto ">
        <div className="navbar-box flex justify-between items-center  px-6 py-2 ">
          <div className="logo ">
            <img src={mainLogo} className="w-[102px] h-[62px]" alt="" />
          </div>
          <ul className="flex justify-center text-white gap-12">
            <li>
              <a href="#"> repaintbodymengkilat@gmail.com</a>
            </li>
            <li>
              <a href="#">|</a>
            </li>
            <li>
              <a href="#">repaintbodymengkilat©copyright@2025</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
