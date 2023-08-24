import React from "react";
import { Table } from "antd";

function ViewEmployeesData({ data }) {
  const columns = [
    {
      title: <div className="text-center f01 ">EmployeeID</div>,
      dataIndex: "employee_id",
      key: "employee_id",
      render: (text) => <div className="text-center f01">{text}</div>,
    },
    {
      title: <div className="text-center f01 ">Total</div>,
      dataIndex: "Total",
      key: "Total",
      render: (text) => (
        <div className="text-center text-blue-600 f01">{text}</div>
      ),
    },
    {
      title: <div className="text-center f01 ">Connect</div>,
      dataIndex: "Connect",
      key: "Connect",
      render: (text) => <div className="text-center f01">{text}</div>,
    },
    {
      title: <div className="text-center f01 ">Convience</div>,
      dataIndex: "Convience",
      key: "Convience",
      render: (text) => <div className="text-center f01">{text}</div>,
    },
    {
      title: <div className="text-center f01 ">Appointment</div>,
      dataIndex: "Appointment",
      key: "Appointment",
      render: (text) => <div className="text-center f01">{text}</div>,
    },
    {
      title: <div className="text-center f01 ">Convert</div>,
      dataIndex: "Convert",
      key: "Convert",
      render: (text) => <div className="text-center f01">{text}</div>,
    },
    {
      title: <div className="text-center f01 ">Lost</div>,
      dataIndex: "Lost",
      key: "Lost",
      render: (text) => (
        <div className="text-center text-red-500 f01">{text}</div>
      ),
    },
    // {
    //   title: <div className="text-center f01 ">Download</div>,
    //   dataIndex: "id",
    //   key: "id",
    //   render: (text) => (
    //     <div className="flex justify-center items-center cursor-pointer f01">
    //       <FaArrowDown
    //         className="hover:text-blue-700 text-lg"
    //         onClick={() => handleOpenNewSite(text)}
    //       />
    //     </div>
    //   ),
    // },
    // {
    //   title: <div className="text-center f01 ">View Employee</div>,
    //   dataIndex: "id",
    //   key: "id",
    //   render: (text) => (
    //     <div className="flex justify-center items-center cursor-pointer f01">
    //       <FaEye
    //         className="hover:text-blue-700 text-lg"
    //         onClick={() => HandleViewEmployee(text)}
    //       />
    //     </div>
    //   ),
    // },
  ];
  return <Table columns={columns} dataSource={data} />;
}

export default ViewEmployeesData;
