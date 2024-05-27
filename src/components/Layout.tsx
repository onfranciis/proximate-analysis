import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import logo from "../assets/unesco.svg";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="Layout">
      <div className="pre"></div>
      <header>
        <img
          src={logo}
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />
        <h2>Biogas Proximate Analysis Calculator</h2>
      </header>

      <div className="main">
        <SideBar />

        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
