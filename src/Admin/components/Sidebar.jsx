import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { FaDatabase, FaTasks, FaTv, FaUsers, FaWallet } from "react-icons/fa";

import "../sidebar.css";
import crmLogo from "../data/crmLogo2.png";
import CustomNavLink from "./CustomNavLink";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";

function getItem(label, key, icon, children, onClick) {
  return {
    key,
    icon,
    children,
    label,
    onClick
  };
}
const SideBar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const navigate = useNavigate();

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const SideNav = [
    {
      Tile: "Dashboard",
      IsDropDown: 2,
      id: "Dashboard",
      Links: "",
      To: "/",
      icon: <FaTv className="text-xl" />,
    },
    {
      Tile: "Data Bank",
      id: "DataBank",
      IsDropDown: 1,
      icon: <FaDatabase className="text-xl" />,
      Links: [
        {
          Title: "Data Upload",
          To: "/CaseList",
          id: "CaseList",
        },
        {
          Title: "Data Allocation",
          To: "/Allocation",
          id: "Allocation",
        },
        {
          Title: "ReAllocation",
          To: "/ReAllocation",
          id: "ReAllocation",
        },
      ],
    },
    {
      Tile: "Partner Creation",
      IsDropDown: 1,
      icon: <FaUsers className="text-xl" />,
      id: "EmployeeCreation",
      Links: [
        {
          Title: "Hub Creation",
          To: "/AddBranch",
          id: "AddBranch",
        },
        {
          Title: "All Id's",
          To: "/ListBranch",
          id: "ListBranch",
        },
      ],
    },
    {
      Tile: "Reports",
      icon: <FaTasks className="text-xl" />,
      IsDropDown: 1,
      id: "Reports",
      Links: [
        {
          Title: "Business Reports",
          To: "BusinessReports",
          id: "BusinessReports",
        },
        {
          Title: "CSR Reports",
          To: "CsrReports",
          id: "CsrReports",
        },
        {
          Title: "Recovery Reports",
          To: "add",
        },
      ],
    },
    {
      Tile: "Financials",
      icon: <FaWallet className="text-xl" />,
      IsDropDown: 1,
      Links: [
        {
          Title: "Statement",
          To: "add",
        },
        {
          Title: "Invoice",
          To: "add",
        },
      ],
    },
  ];


  const items = [
    getItem('Dashboard', '1', <FaTv />, null, () => myCustomFunction("/")),
    getItem('Data Bank', 'sub1', <FaDatabase />, [
      getItem('Data Upload', '3', null, null, () => myCustomFunction("/CaseList")),
      getItem('Data Allocation', '4', null, null, () => myCustomFunction("/Allocation")),
      getItem('ReAllocation', '5', null, null, () => myCustomFunction("/ReAllocation")),
    ]),
    getItem('Partner Creation', 'sub2', <FaUsers />, [
      getItem('Hub Creation', '6', null, null, () => myCustomFunction("/AddBranch")),
      getItem("ALL ID'S", '7', null, null, () => myCustomFunction("/ListBranch")),
    ]),
    getItem('Reports', 'sub3', <FaTasks />, [
      getItem('Business Reports', '8', null, null, () => myCustomFunction("/BusinessReports")),
      getItem("CSR Reports", '9', null, null, () => myCustomFunction("/CsrReports")),
      getItem("Recovery Reports", '10', null, null, () => myCustomFunction("/RecoveryReports")),
    ]),
    getItem('Financials', 'sub4', <FaWallet />, [
      getItem('Statement', '11', null, null, () => myCustomFunction("/Statement")),
      getItem("Invoice", '12', null, null, () => myCustomFunction("/Invoice")),
    ]),
  ];
  const myCustomFunction = (e) => {
    navigate(e)
  }

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto scroll-pb-10">
      {activeMenu ? (
        <>
          <div className="flex justify-center items-center z-100">
            <span className="items-center mt-4 flex text-sm font-extrabold tracking-tight text-white">Admin Dashboard</span>
          </div>
          {/* <CustomNavLink data={SideNav} /> */}
          <div style={{
            maxHeight: "80vh",
            overflowX: "scroll",
          }}>
            <Layout
              style={{
                backgroundColor: "transparent",
                background: "transparent",
                border: "none",
                width: "100%"
              }}
            >
              <Sider>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} style={{ background: "#33373E", color: "white", width: "100%", fontSize: "10.7px" }} />
              </Sider>
            </Layout>
          </div>
          <div className="flex w-full mt-10 items-center justify-center">
            <div style={{ position: "Fixed", bottom: "7px" }}>
              <img src={crmLogo} style={{ width: "95px" }} />
            </div>
          </div>
          <div className="flex w-full mt-10 items-center justify-center">
            <div style={{ position: "Fixed", bottom: "7px" }}>
              <img src={crmLogo} style={{ width: "95px" }} />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default SideBar;
