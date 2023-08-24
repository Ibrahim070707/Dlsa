import React, { useEffect, useState } from "react";
import { Pie, SparkLine, Stacked } from "../components";
import { SparklineAreaData, pieChartData } from "../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";
import { Progress } from "antd";
import { Modal } from "antd";
import CustomLoader from "../components/CustomLoader";
import { Toaster, toast } from "react-hot-toast";
import ViewBranchDashboard from "./ViewBranchDashboard";

const AdminDashboard = () => {
  const [NotificationData, setNotificationData] = useState([]);
  const [loader, setloader] = useState(false);
  const [Remindersdata, setRemindersdata] = useState([]);
  const [ModelOpen, setModelOpen] = useState(false);
  const [FormData, setFormData] = useState({ title: "", description: "" });
  const Token = localStorage.getItem("token");
  const [DashboardData, setDashboardData] = useState({});
  const { Base_Url, MediaBase_Url } = useStateContext();
  const [CallStatusdata, setCallStatusdata] = useState({});
  const [MoreText, setMoreText] = useState(false);
  const [BranchReportsData, setBranchReportsData] = useState([]);
  const [DataPremiumCount, setDataPremiumCount] = useState([]);
  const [CurrentMonthData, setCurrentMonthData] = useState("");
  const [PrevMonthData, setPrevMonthData] = useState("");
  const [LocationData, setLocationData] = useState([]);
  const [BranchID, setBranchID] = useState("");
  const [SalesData, setSalesData] = useState([]);
  const [ShowStacked, setShowStacked] = useState(false);

  const GetNotice = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}getNotice`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setNotificationData(result.data);
        }
        setloader(false);
      })
      .catch((error) => console.log("error", error));
  };
  const AllCounts = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);
    var requestOptionstwo = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}AllCount`, requestOptionstwo)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setDashboardData({
            TotalBranch: result.TotalBranch,
            TotalAllocated: result.TotalAllocated,
            TotalCases: result.TotalCases,
            TotalUnAllocated: result.TotalUnAllocated,
          });
        }
        setloader(false);
      })
      .catch((error) => console.log("error", error));
  };
  const ReminderData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}readReminder`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setRemindersdata(result.data);
        }
        setloader(false);
      })
      .catch((error) => console.log("error", error));
  };
  const GetBranchReportData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}GetBranchDataAndPremiumCount`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setBranchReportsData(result.Data);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const GetBusinessData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}DataPremiumCount`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDataPremiumCount(result.Data);
        setPrevMonthData(result.Data.Prev);
        setCurrentMonthData(result.Data.Current);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    setloader(true);
    GetNotice();
    GetSalesData();
    GetBusinessData();
    GetBranchReportData();
    AllCounts();
    CallStatus();
    ReminderData();
    GetLocation();
    setTimeout(() => {
      setShowStacked(true);
    }, 1500);
  }, []);
  const DashboardCards = [
    {
      amount: DashboardData.TotalBranch ? DashboardData.TotalBranch : 0,
      title: "Total Branches",
    },
    {
      amount: DashboardData.TotalCases ? DashboardData.TotalCases : 0,
      title: "Total Data",
    },
    {
      amount: DashboardData.TotalAllocated ? DashboardData.TotalAllocated : 0,
      title: "Allocated Data",
    },
    {
      amount: DashboardData.TotalUnAllocated
        ? DashboardData.TotalUnAllocated
        : 0,
      title: "Unallocated Data",
    },
  ];
  const CallStatus = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}GetCallStatus`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCallStatusdata({
          Total: result.Total,
          Connect: result.Connect,
          Quote: result.Quote,
          Convience: result.Convience,
          Appointment: result.Appointment,
          Convert: result.Convert,
          Lost: result.Lost,
        });
        setloader(false);
      })
      .catch((error) => console.log("error", error));
  };
  const labels = [
    "Total",
    "Connect",
    "Convert",
    "Appointment",
    "Lost",
    "Convience",
  ];
  const PieChartDataa = {
    Total: CallStatusdata.Total ? CallStatusdata.Total : 0,
    Connect: CallStatusdata.Connect ? CallStatusdata.Connect : 0,
    Convert: CallStatusdata.Convert ? CallStatusdata.Convert : 0,
    Appointment: CallStatusdata.Appointment ? CallStatusdata.Appointment : 0,
    Lost: CallStatusdata.Lost ? CallStatusdata.Lost : 0,
    Convience: CallStatusdata.Convience ? CallStatusdata.Convience : 0,
  };
  const handleMoreClick = (index) => {
    if (MoreText === false) {
      setMoreText(index);
    } else {
      setMoreText(false);
    }
  };
  const GetLocation = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}GetLocations`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setLocationData(result.Data);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const GetSalesData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(`${Base_Url}GetSalesData`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSalesData(result.Data);
        setloader(false);
        setShowStacked(true)
      })
      .catch((error) => console.log("error", error));
  };
  const HandleZoneChange = async (e) => {
    if (e === "All") {
      setShowStacked(false)
      CallStatus();
      AllCounts();
      GetBusinessData();
      GetBranchReportData();
      GetSalesData();
    } else {
      setShowStacked(false)
      HandleGetLocation(e);
      HandleAllCounts(e);
      HandleGetBusinessData(e);
      HandleGetSalesData(e);
      HandleGetBranchReportData(e);
    }
    setTimeout(() => {
      setShowStacked(true);
    }, 1000);

  };
  const HandleGetLocation = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}GetCallStatus/ByLocation/${e}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setCallStatusdata({
            Total: result.Total,
            Connect: result.Connect,
            Quote: result.Quote,
            Convience: result.Convience,
            Appointment: result.Appointment,
            Convert: result.Convert,
            Lost: result.Lost,
          });
        }
        setloader(false);
      })
      .catch((error) => console.log("error", error));
  };
  const HandleAllCounts = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);
    var requestOptionstwo = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}AllCountByLocation/${e}`, requestOptionstwo)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setDashboardData({
            TotalBranch: result.TotalBranch,
            TotalAllocated: result.TotalAllocated,
            TotalCases: result.TotalCases,
            TotalUnAllocated: result.TotalUnAllocated,
          });
        }
        setloader(false);
      })
      .catch((error) => console.log("error", error));
  };
  const HandleGetBusinessData = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}DataPremiumCountByZone/${e}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDataPremiumCount(result.Data);
        setPrevMonthData(result.Data.Prev);
        setCurrentMonthData(result.Data.Current);
      })
      .catch((error) => console.log("error", error));
  };
  const HandleGetSalesData = async (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(`${Base_Url}GetSalesDataByZone/${e}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSalesData(result.Data);
        setloader(false);
        setShowStacked(true)
      })
      .catch((error) => console.log("error", error));
  };
  const HandleGetBranchReportData = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}GetBranchDataAndPremiumCountByZone/${e}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setBranchReportsData(result.Data);
        }
      })
      .catch((error) => console.log("error", error));
  };
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
      {loader ? (
        <CustomLoader />
      ) : (
        <div
          className="mt-2 dark:bg-main-dark-bg bg-gray-200"
          style={{ minHeight: "93vh" }}
        >
          <Modal
            open={ModelOpen}
            title="Branch Report"
            onCancel={() => {
              setModelOpen(false);
              setBranchID("");
              window.location.reload(false);
            }}
            footer=""
            width="60%"
          >
            <ViewBranchDashboard BranchID={BranchID} />
          </Modal>
          <div className="grid CustomGridBox">
            <div className="w-full">
              <div className="mt-4 p-2 gap-2 ml-8 mx-5 grid grid-cols-4">
                {DashboardCards.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor:
                        index === 0
                          ? "#9372f7"
                          : index === 1
                            ? "#fa5b05"
                            : index === 2
                              ? "#2ab86a"
                              : "#1e28c7",
                      background:
                        index === 0
                          ? "linear-gradient(320deg, #552cd1,#9372f7)"
                          : index === 1
                            ? "linear-gradient(320deg, #fa5b05,#f5945f)"
                            : index === 2
                              ? "linear-gradient(320deg, #2ab86a,#84f5b7)"
                              : "linear-gradient(320deg, #1e28c7,#676feb)",
                      height: "5.5rem",
                      width: "100%",
                    }}
                    className="mx-1 text-white py-3 px-1 rounded-2xl flex flex-col justify-center items-center"
                  >
                    <span className="text-sm font-semibold">{item.amount}</span>
                    <p className="f01 text-white mt-1">{item.title}</p>
                  </div>
                ))}
              </div>
              <div
                className="mt-2 mx-5 ml-12 bg-blue-500 dark:bg-[#1D944F] p-4 rounded-2xl"
                style={{ width: "90%" }}
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-white text-sm">
                    Total Business
                  </p>
                  <div>
                    <p className="text-lg text-white font-semibold">
                      ₹{DataPremiumCount?.TotalBusiness + DataPremiumCount?.IPartner?.Health?.Premium + DataPremiumCount?.IPartner?.Gcv?.Premium + DataPremiumCount?.IPartner?.Pvt?.Premium}/-
                    </p>
                  </div>
                </div>
                <div className="grid  mt-2">
                  <div>
                    <p className="text-white f03 ">CSE Report</p>
                    <div className="grid grid-cols-5 mt-1">
                      <div className="text-center text-white font-semibold f02">
                        <p>Type</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Fresh Nop</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Fresh Premium</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Renewal Nop</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Renewal Premium</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 mt-2">
                      <div className="text-center text-white f01">
                        <p>Pvt</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Pvt?.Current?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Pvt?.Current?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType1?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType1?.Premium}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5">
                      <div className="text-center text-white f01">
                        <p>Gcv</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Gcv?.Current?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Gcv?.Current?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType2?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType2?.Premium}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5  ">
                      <div className="text-center text-white f01">
                        <p>Health</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Health?.Current?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Health?.Current?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType3?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType3?.Premium}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5  ">
                      <div className="text-center text-white f01">
                        <p>Total</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Health?.Current?.Total + DataPremiumCount?.Gcv?.Current?.Total + DataPremiumCount?.Pvt?.Current?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Health?.Current?.Premium + DataPremiumCount?.Gcv?.Current?.Premium + DataPremiumCount?.Pvt?.Current?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType1?.Total + DataPremiumCount?.RenewalType2?.Total + DataPremiumCount?.RenewalType3?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType1?.Premium + DataPremiumCount?.RenewalType2?.Premium + DataPremiumCount?.RenewalType3?.Premium}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-white f03 mt-5">I Partner Report</p>
                    <div className="grid grid-cols-5 mt-1">
                      <div className="text-center text-white font-semibold f02">
                        <p>Type</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Fresh Nop</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Fresh Premium</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Renewal Nop</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Renewal Premium</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 mt-2">
                      <div className="text-center text-white f01">
                        <p>Pvt</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Pvt?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Pvt?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalPvt?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalPvt?.Premium}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5">
                      <div className="text-center text-white f01">
                        <p>Gcv</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Gcv?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Gcv?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalGcv?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalGcv?.Premium}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5  ">
                      <div className="text-center text-white f01">
                        <p>Health</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Health?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Health?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalHealth?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalHealth?.Premium}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5  ">
                      <div className="text-center text-white f01">
                        <p>Total</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Health?.Total + DataPremiumCount?.IPartner?.Gcv?.Total + DataPremiumCount?.IPartner?.Pvt?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Health?.Premium + DataPremiumCount?.IPartner?.Gcv?.Premium + DataPremiumCount?.IPartner?.Pvt?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalHealth?.Total + DataPremiumCount?.IPartner?.RenewalGcv?.Total + DataPremiumCount?.IPartner?.RenewalPvt?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalHealth?.Premium + DataPremiumCount?.IPartner?.RenewalGcv?.Premium + DataPremiumCount?.IPartner?.RenewalPvt?.Premium}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="mt-4 ml-12 mb-5 bg-white dark:bg-secondary-dark-bg dark:text-white rounded-2xl md:w-400 py-2"
                style={{
                  width: "90%",
                  maxHeight: "200px",
                  overflowY: "scroll",
                }}
              >
                <p className="text-sm mb-3 text-center">Branch Report</p>
                <div className="grid grid-cols-4">
                  <div className="f02 flex flex-col">
                    <span className="text-center font-semibold">Branch</span>
                  </div>
                  <div className="f02 flex flex-col">
                    <span className="text-center font-semibold">Nop</span>
                  </div>
                  <div className="f02 flex flex-col">
                    <span className="text-center font-semibold">
                      Total Premium
                    </span>
                  </div>
                  <div className="f02 flex flex-col">
                    <span className="text-center font-semibold">Action</span>
                  </div>
                </div>
                {BranchReportsData &&
                  BranchReportsData.map((el, index) => {
                    return (
                      <div className="grid grid-cols-4 my-1" key={index}>
                        <div className="f01 flex flex-col">
                          <span className="text-center ">{el.BranchName}</span>
                        </div>
                        <div className="f01 flex flex-col">
                          <span className="text-center ">{el.TotalData}</span>
                        </div>
                        <div className="f01 flex flex-col">
                          <span className="text-center ">{el.Premium}</span>
                        </div>
                        <div className="f01 flex flex-col">
                          <span
                            className="text-center hover:text-blue-700 cursor-pointer"
                            onClick={() => {
                              setModelOpen(true);
                              setBranchID(el.Id);
                            }}
                          >
                            View
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="w-full">
              <div className="mt-1 mx-5">
                <select
                  style={{ borderRadius: "5px", width: "97%" }}
                  className="appearance-none block bg-white dark:bg-secondary-dark-bg dark:text-white text-gray-700 border border-gray-200 rounded-xl py-2  px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black font-bold placeholder:font-bold f01"
                  onChange={(e) => HandleZoneChange(e.target.value)}
                >
                  <option
                    className="text-gray-400 dark:text-white font-bold text-center"
                    value="All"
                  >
                    All Zone
                  </option>
                  <option
                    className="text-gray-400 dark:text-white font-bold text-center"
                    value="West"
                  >
                    West
                  </option>
                  <option
                    className="text-gray-400 dark:text-white font-bold text-center"
                    value="North"
                  >
                    North
                  </option>
                  <option
                    className="text-gray-400 dark:text-white font-bold text-center"
                    value="East"
                  >
                    East
                  </option>
                  <option
                    className="text-gray-400 dark:text-white font-bold text-center"
                    value="NorthEast"
                  >
                    NorthEast
                  </option>
                  <option
                    className="text-gray-400 dark:text-white font-bold text-center"
                    value="South"
                  >
                    South
                  </option>
                </select>
              </div>
              <div
                className="mt-1 mx-5 bg-white dark:bg-secondary-dark-bg dark:text-white w-full rounded-2xl px-2 py-1"
                style={{ width: "90%" }}
              >
                <p className="text-sm flex flex-row justify-between font-semibold">Call Status <span className="f01 text-center font-light">Total Data<br />{PieChartDataa.Total}</span></p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: " 0 10%",
                  }}
                >
                  <div className="w-36">
                    <Pie Data={PieChartDataa} Width={360} />
                  </div>
                </div>
              </div>
              <div
                className="bg-white mt-2 mx-5 py-5 rounded-2xl dark:bg-secondary-dark-bg dark:text-white"
                style={{ width: "90%" }}
              >
                <div className="text-center">
                  <p className="font-semibold text-sm">Sales Report</p>
                </div>
                <div className="flex flex-wrap justify-center">
                  <div
                    className="mt-2"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {ShowStacked ?
                      <div className="grid grid-cols-2">
                        <div className="flex flex-col">
                          <Stacked data={SalesData} type={1} lenght={100} />
                          <p className="text-center f03">Policy</p>
                        </div>
                        <div className="flex flex-col">
                          <Stacked data={SalesData} lenght={1000000} />
                          <p className="text-center f03">Premuim</p>
                        </div>
                      </div> : null}
                  </div>
                </div>
              </div>
              <div
                className="mt-1 bg-white rounded-2xl mx-5 py-2 px-4 mb-3 dark:bg-secondary-dark-bg dark:text-white"
                style={{ width: "90%" }}
              >
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <p className="text-sm text-center">Notifications</p>
                  {NotificationData.length !== 0 ? (
                    NotificationData.map((el, index) => (
                      <div className="p-1" key={index}>
                        <div
                          className=" bg-slate-200 p-2 rounded-2xl grid grid-cols-2"
                          style={{ width: "100%" }}
                        >
                          <div>
                            <span className="f01">Title:{el.title}</span>
                            <br />
                            <span className="f01">
                              Desc:
                              {el.description.length >= 38
                                ? MoreText === index
                                  ? el.description
                                  : el.description.slice(0, 38)
                                : el.description}
                              {el.description.length >= 38 ? (
                                <span
                                  className="text-gray-400 cursor-pointer"
                                  onClick={() => handleMoreClick(index)}
                                >
                                  &nbsp;{" "}
                                  {MoreText === false ? "...Show" : "...Hide"}
                                </span>
                              ) : (
                                ""
                              )}
                            </span>
                            <br />
                            <span className="f01 text-gray-500">
                              {el.Cjreated_at}
                            </span>
                            <br />
                          </div>
                          <div className="flex justify-end items-center">
                            <img
                              src={MediaBase_Url + el.photo}
                              alt=""
                              width="100px"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-1 my-2">
                      <div
                        className=" bg-slate-200 p-2 rounded-2xl flex flex-col"
                        style={{ width: "100%" }}
                      >
                        <span className="text-lg flex justify-center items-center">
                          No Data Available
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
