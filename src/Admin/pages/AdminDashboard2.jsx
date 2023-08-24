import React, { useEffect, useState } from "react";
import { Pie, SparkLine, Stacked } from "../components";
import { SparklineAreaData } from "../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";
import { Progress } from "antd";
import { Modal } from "antd";
import CustomLoader from "../components/CustomLoader";
import { Toaster, toast } from "react-hot-toast";

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
  const [BranchReportsData, setBranchReportsData] = useState([])
  const [DataPremiumCount, setDataPremiumCount] = useState([])
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
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}GetBranchDataAndPremiumCount`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === 200) {
          setBranchReportsData(result.Data)
        }
      })
      .catch(error => console.log('error', error));
  }
  const GetBusinessData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}DataPremiumCount`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setDataPremiumCount(result.Data)
      })
      .catch(error => console.log('error', error));
  }
  useEffect(() => {
    setloader(true);
    GetNotice();
    GetBusinessData();
    GetBranchReportData();
    AllCounts();
    CallStatus();
    ReminderData();
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
      amount: DashboardData.TotalUnAllocated ? DashboardData.TotalUnAllocated : 0,
      title: "Unallocated Data",
    }
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
      })
      .catch((error) => console.log("error", error));
  };
  const PieChartDataa = {
    Total: CallStatusdata.Total ? CallStatusdata.Total : 0,
    Connect: CallStatusdata.Connect ? CallStatusdata.Connect : 0,
    Quote: CallStatusdata.Quote ? CallStatusdata.Quote : 0,
    Convience: CallStatusdata.Convience ? CallStatusdata.Convience : 0,
    Appointment: CallStatusdata.Appointment ? CallStatusdata.Appointment : 0,
    Convert: CallStatusdata.Convert ? CallStatusdata.Convert : 0,
    Lost: CallStatusdata.Lost ? CallStatusdata.Lost : 0,
  };
  const handleMoreClick = (index) => {
    if (MoreText === false) {
      setMoreText(index);
    } else {
      setMoreText(false);
    }
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
        <div className="mt-2 bg-gray-200" style={{ minHeight: "93vh" }}>
          <div className="grid" style={{ gridTemplateColumns: "60% auto" }}>
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
                              ? "#2ab86a" : "#1e28c7",
                      background:
                        index === 0
                          ? "linear-gradient(320deg, #552cd1,#9372f7)"
                          : index === 1
                            ? "linear-gradient(320deg, #fa5b05,#f5945f)"
                            : index === 2
                              ? "linear-gradient(320deg, #2ab86a,#84f5b7)" : "linear-gradient(320deg, #1e28c7,#676feb)",
                      height: "5.5rem",
                      width: "100%"
                    }}
                    className="mx-1 text-white py-3 px-1 rounded-2xl flex flex-col justify-center items-center"
                  >
                    <span className="text-sm font-semibold">{item.amount}</span>
                    <p className="f01 text-white mt-1">{item.title}</p>
                  </div>
                ))}
              </div>
              <div
                className="bg-white mt-2 ml-12 py-5 rounded-2xl"
                style={{ width: "90%" }}
              >
                <div className="text-center">
                  <p className="font-semibold text-sm">Sales Report</p>
                </div>
                <div className="flex flex-wrap justify-center">
                  <div
                    className="mt-2"
                    style={{
                      width: "80%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Stacked />
                  </div>
                </div>
              </div>
              <div
                className="mt-4 ml-12 mb-5 bg-white rounded-2xl md:w-400 py-5"
                style={{ width: "90%", maxHeight: "290px", overflowY: "scroll" }}
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
                    <span className="text-center font-semibold">Total Premium</span>
                  </div>
                  <div className="f02 flex flex-col">
                    <span className="text-center font-semibold">Action</span>
                  </div>
                </div>
                {
                  BranchReportsData && BranchReportsData.map((el, index) => {
                    return (
                      <div className="grid grid-cols-4" key={index}>
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
                          <span className="text-center hover:text-blue-700 cursor-pointer">View</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="w-full">
              <div
                className="mt-6 mx-5 bg-white w-full rounded-2xl p-2 "
                style={{ width: "90%" }}
              >
                <p className="f02 font-bold">Call Status</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: " 0 10%",
                  }}
                >
                  <div className="w-36">
                    <Pie Data={PieChartDataa} Width={290} />
                  </div>
                </div>
              </div>
              <div
                className="mt-4 mx-5 bg-[#2ab86a] p-4 rounded-2xl"
                style={{ width: "90%" }}
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-white text-sm">
                    Total Business
                  </p>
                  <div>
                    <p className="text-lg text-white font-semibold">
                      ₹63,448/-
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 mt-1">
                  <div className="text-center text-white font-semibold f02">
                    <p>Type</p>
                  </div>
                  <div className="text-center text-white font-semibold f02">
                    <p>Nop</p>
                  </div>
                  <div className="text-center text-white font-semibold f02">
                    <p>Premium</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 mt-2">
                  <div className="text-center text-white f01">
                    <p>Pvt</p>
                  </div>
                  <div className="text-center text-white f01">
                    <p>9</p>
                  </div>
                  <div className="text-center text-white f01">
                    <p>0</p>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-center text-white f01">
                    <p>Gcv</p>
                  </div>
                  <div className="text-center text-white f01">
                    <p>11</p>
                  </div>
                  <div className="text-center text-white f01">
                    <p>0</p>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-center text-white f01">
                    <p>Health</p>
                  </div>
                  <div className="text-center text-white f01">
                    <p>1</p>
                  </div>
                  <div className="text-center text-white f01">
                    <p>0</p>
                  </div>
                </div>
                <div className="mt-3">
                  {/* <SparkLine PvtPrev={DataPremiumCount.Pvt.Prev} PvtCurrent={DataPremiumCount.Pvt.Current} GcvPrev={DataPremiumCount.Gcv.Prev} GcvCurrent={DataPremiumCount.Gcv.Current} HealthPrev={DataPremiumCount.Health.Prev} HealthCurrent={DataPremiumCount.Health.Current} /> */}
                  <SparkLine />
                </div>
              </div>
              <div
                className="mt-3 bg-white rounded-2xl mx-5 p-4"
                style={{ width: "90%" }}
              >
                <div
                  className=""
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
