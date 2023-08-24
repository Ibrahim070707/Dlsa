import React from "react";
import { FaRegCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../sidebar.css";

function CustomNavLink(props) {
  const Data = props.data;
  return (
    <div
      style={{
        width: "97%",
        maxHeight: "500px",
        overflowY: "scroll",
      }}
    >
      {Data.map((el, index) => {
        return el.IsDropDown === 1 ? (
          <div
            key={index}
            s
            className="sidebar my-3"
            style={{ boxShadow: "0", transition: "0.5s" }}
          >
            <button
              className="SideNavIconsAdmin dropdown-btn "
              id={el.id}
              style={{
                borderRadius: "5px",
              }}
            >
              <span
                className="text-center items-center gap-2"
                style={{
                  display: " grid",
                  gridTemplateColumns: "auto auto  auto",
                  fontSize: "12px",
                }}
              >
                {el.icon}
                {el.Tile}
              </span>
            </button>

            <div className="dropdown-container">
              <ul className="mt-1">
                {el.Links.map((ael, i) => {
                  return (
                    <Link to={ael.To} key={i}>
                      <li
                        id={ael.id}
                        key={index}
                        style={{ borderRadius: "5px", fontSize: "12px" }}
                        className="h-8 my-1 hover:bg-[#f1f1f1] hover:text-black centeredSideNav"
                      >
                        <FaRegCircle className="mx-2" />
                        {ael.Title}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          <div
            key={index}
            className="sidebar my-3 "
            style={{
              boxShadow: "0",
              transition: "0.5s",
            }}
          >
            <Link to={el.To}>
              <button
                id={el.id}
                style={{
                  borderRadius: "5px",
                }}
                className="SideNavIconsAdmin dropdown-btna my-3  "
              >
                <span
                  className="text-center  items-center gap-2 "
                  style={{
                    display: " grid",
                    gridTemplateColumns: "auto auto auto",
                    fontSize: "12px",
                  }}
                >
                  {el.icon}
                  {el.Tile}
                </span>
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default CustomNavLink;
