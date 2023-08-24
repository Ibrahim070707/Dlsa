import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import avatar from "../data/avatar3.png";
import { useStateContext } from "../../contexts/ContextProvider";
import {
  FaBell,
  FaCheckSquare,
  FaRegBell,
  FaRegCheckSquare,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { Toaster, toast } from "react-hot-toast";
import CustomLoader from "./CustomLoader";
import Trash from "../../assets/trash.gif"
const NavButton = ({ title, customFunc, icon, color, dotColor, FontSize }) => (
  <TooltipComponent content={title} position="BottomCentre">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray dark:hover:bg-secondary-dark-bg"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);
const Navbar = ({ OnChangeState, OnChangeTheme }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [ProfileBox, setProfileBox] = useState(false);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [SelectedPhoto, setSelectedPhoto] = useState("");
  const [Duration, setDuration] = useState("");
  const [DurationMedediaan, setDurationMedediaan] = useState("");
  const [ApprovedOrNot, setApprovedOrNot] = useState(false);

  const {
    setActiveMenu,
    handleClick,
    screenSize,
    setScreenSize,
    currentColor,
    Base_Url,
  } = useStateContext();
  const Token = localStorage.getItem("token");
  const [SerachBar, setSerachBar] = useState(false);
  const [VisibleDropDown, setVisibleDropDown] = useState(false);
  const [ApprovalData, setApprovalData] = useState([]);
  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    ApiFetch();
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (screenSize <= 1300) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  const fontSize = "fontSize:'25px'";
  const handleSearchBar = () => {
    if (SerachBar === false) {
      setSerachBar(true);
    } else {
      setSerachBar(false);
    }
  };
  const handleDropDown = () => {
    if (VisibleDropDown === false) {
      setVisibleDropDown(true);
    } else {
      setVisibleDropDown(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("IsLoggedIn");
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    localStorage.removeItem("RoleID");

    // window.location.replace("https://flymingotech.co.in/CRM/");
    navigate("/");
    OnChangeState(false);
  };
  const ApiFetch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}GetEmployeeApprovals`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setApprovalData(result.Data);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const AdminData = JSON.parse(localStorage.getItem("data"));
  const handleCancel = () => {
    setOpen(false);
  };
  const handleNotificationSubmit = () => {
    if (Title) {
      if (Description) {
        if (SelectedPhoto) {
          setOpen(false);
          var myHeaders = new Headers();
          myHeaders.append("Accept", "application/json");
          myHeaders.append("Authorization", `Bearer ${Token}`);

          var formdata = new FormData();

          formdata.append("title", Title);
          formdata.append("description", Description);
          formdata.append("photo", SelectedPhoto);
          formdata.append("duration", Duration);
          formdata.append("meredian", DurationMedediaan);

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
          };
          fetch(`${Base_Url}AddNotice`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
              if (result.Status === 200) {
                window.location.reload(false);
                toast.success("Notification Added Successfully");
              }
            })
            .catch((error) => console.log("error", error));
        } else {
          toast.error("Image Field Is Required");
        }
      } else {
        toast.error("Description Field Is Required");
      }
    } else {
      toast.error("Label Field Is Required");
    }
  };

  const HandleSubmitType = (type, ID) => {
    setLoader(true);
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var raw = JSON.stringify({
      user_id: ID,
      is_approved: type,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Base_Url}ChangeEmployeeApprovals`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        ApiFetch()
        if (result.Status === 200) {
          toast.success("Request Updated Successfully")
        }
        setLoader(false)
      })
      .catch((error) => console.log("error", error));
  };
  console.log(ApprovalData);
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          id: "25663",
          duration: 7000,
        }}
      />
      <Modal
        open={open}
        title="Send Notification"
        onCancel={handleCancel}
        footer=""
      >
        {/* <form return="false"> */}
        <div class="mb-5">
          <label class="block mb-2 font-bold text-gray-600 dark:text-white dark:hover:text-black">
            Label
          </label>
          <input
            required
            type="text"
            placeholder="Enter Label"
            class="border border-gray-300 shadow p-3 w-full rounded mb-"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="mb-5">
          <label class="block mb-2 font-bold text-gray-600 dark:text-white dark:hover:text-black">
            Description
          </label>
          <input
            required
            type="text"
            placeholder="Enter Description"
            class="border border-gray-300 shadow p-3 w-full rounded mb-"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div class="mb-5">
          <label class="block mb-2 font-bold text-gray-600">Photo</label>
          <input
            required
            type="file"
            class="border border-gray-300 shadow p-3 w-full rounded mb-"
            onChange={(e) => setSelectedPhoto(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          class="block w-full bg-blue-500 hover:bg-blue-900 text-white font-bold p-4 rounded-lg dark:text-white dark:hover:text-black"
          onClick={handleNotificationSubmit}
        >
          Submit
        </button>
        {/* </form> */}
      </Modal>
      <Modal
        open={ApprovedOrNot}
        title="Approval Request"
        onCancel={() => setApprovedOrNot(false)}
        footer=""
      >
        <div class="mb-5 overflow-y-scroll">
          {Loader ? (
            <CustomLoader />
          ) : (
            ApprovalData.length > 0 ?
              ApprovalData.map((el, index) => (
                <div
                  className="border bg-slate-200 border-gray-200 mb-3 rounded-lg  w-full "
                  key={index}
                >
                  <div className="grid grid-cols-2 px-5 py-2">
                    <div className="text-center">
                      <p className="text-gray-500 f02 font-semibold">
                        Employee ID:
                      </p>
                      <p className="f02 font-semibold">{el.Employee_ID}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500 f02 font-semibold">
                        Employee Name:
                      </p>
                      <p className="f02 font-semibold">{el.Name}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 px-5 py-2">
                    <div className="text-center">
                      <p className="text-gray-500 f02 font-semibold">Branch:</p>
                      <p className="f02 font-semibold">{el.Branch}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500 f02 font-semibold">
                        Requested Time:
                      </p>
                      <p className="f02 font-semibold">{el.Created_At}</p>
                    </div>
                  </div>
                  <div className="flex justify-evenly my-2 items-center text-center">
                    <button
                      class="bg-transparent hover:bg-red-500 w-28 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                      onClick={() => HandleSubmitType(1, el.ID)}
                    >
                      Reject
                    </button>
                    <button
                      class="bg-transparent hover:bg-green-500 w-28 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                      onClick={() => HandleSubmitType(2, el.ID)}
                    >
                      Approve
                    </button>
                  </div>
                </div>
              )) :
              <div className="flex justify-center items-center flex-col">
                <img src={Trash} alt="" width="180px" />
                <span className="mt-5">No Data Available</span>
              </div>
          )}
        </div>
      </Modal>
      <div
        className="flex justify-between items-center p-2 md:mx-6 relative h-12"
        style={{ transition: "0.5s" }}
      >
        <NavButton
          title="Menu"
          customFunc={() => setActiveMenu((preActiveMenu) => !preActiveMenu)}
          color="#1677ff"
          icon={<AiOutlineMenu />}
        />
        {SerachBar ? (
          <input
            class="SearchInput input-elevated"
            style={{ width: "70%", transition: "0.5s" }}
            type="text"
            placeholder="Search"
          />
        ) : null}
        <div className="flex">
          <NavButton
            title="Menu"
            customFunc={() => setApprovedOrNot(true)}
            color={currentColor}
            icon={
              ApprovedOrNot ? (
                <FaCheckSquare className="text-[#1677ff] dark:text-white " />
              ) : (
                <FaRegCheckSquare className="text-[#1677ff] dark:text-white " />
              )
            }
          />
          <NavButton
            title="Menu"
            customFunc={() => setOpen(true)}
            color={currentColor}
            icon={
              open === true ? (
                <FaBell className="text-[#1677ff] dark:text-white " />
              ) : (
                <FaRegBell className="text-[#1677ff] dark:text-white " />
              )
            }
          />

          <TooltipComponent content="Profile" position="BottomCentre">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray dark:hover:bg-secondary-dark-bg  rounded-lg"
              onClick={() => handleClick("userProfile")}
            >
              <img
                className="rounded-full w-8 h-8"
                src={avatar}
                onClick={() => setProfileBox(true)}
              />
              <p>
                <span className="text-black dark:text-white text-14">Hi, </span>{" "}
                <span className="text-black dark:text-white font-bold ml-1 text-14">
                  {AdminData ? AdminData.name : ""}
                </span>
              </p>
              <MdKeyboardArrowDown
                style={{ fontSize: "20px" }}
                className="dark:text-white"
                onClick={() => setProfileBox(true)}
              />
            </div>
          </TooltipComponent>
          <Modal
            open={ProfileBox}
            onCancel={() => setProfileBox(false)}
            footer=""
            className="absolute right-5 top-16 bg-white dark:text-white dark:bg-secondary-dark-bg  p-3 rounded-lg "
            style={{ width: "350px", minWidth: "350px", maxWidth: "350px" }}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg dark:text-gray-200">
                User Profile
              </p>
            </div>
            <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
              <img
                className="rounded-full h-24 w-24"
                src={avatar}
                alt="user-profile"
              />
              <div>
                <p className="font-semibold text-xl dark:text-gray-200">
                  {AdminData.name}
                </p>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  Administrator
                </p>
              </div>
            </div>
            <div className="mt-5">
              <button
                type="button"
                style={{
                  borderRadius: "10px",
                }}
                className="hover:drop-shadow-xl shadow-xl p-3 w-full bg-[#1677ff] text-white dark:bg-white dark:text-black"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Navbar;
