import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/p.png";
import thumb from "../assets/thumb.svg";
import { useState } from "react";

const SideBar = () => {
  const location = useLocation().pathname;
  const [toggled, setToggled] = useState(true);
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/");
    setToggled(false);
  };

  return (
    <>
      <div
        className="SideBarBlur"
        style={{ display: toggled ? "block" : "none" }}
        onClick={() => {
          setToggled(false);
        }}
      ></div>

      <button
        className="thumb"
        onClick={() => {
          setToggled(!toggled);
        }}
      >
        <img src={thumb} alt="" />
      </button>

      <div className={`SideBar ${toggled && "toggled"}`}>
        <div className="top">
          <img src={logo} alt="" onClick={handleClickLogo} />
          <a href="www.github.com/onfranciis" className="by">
            By Francis Onukwu
          </a>
        </div>

        {Data.map((link) => {
          const selected = link.link == location;

          return (
            <Link
              to={link.link}
              key={link.title}
              className={`${selected && "selected"}`}
              onClick={() => setToggled(false)}
            >
              {link.title}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default SideBar;

const Data = [
  {
    link: "/fat",
    title: "Fat Percentage",
  },
  {
    link: "/ash",
    title: "Ash Percentage",
  },
  {
    link: "/protein",
    title: "Protein Percentage",
  },
  {
    link: "/moisture",
    title: "Moisture Percentage",
  },
  {
    link: "/fibre",
    title: "Fibre Percentage",
  },
  {
    link: "/total-solids",
    title: "Determine Total Solids",
  },
  {
    link: "/volatile-solids",
    title: "Determine Volatile Solids",
  },
];
