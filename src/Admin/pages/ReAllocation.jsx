import React, { useEffect, useState, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Select, Space, Switch, Table, Button, Modal } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Header } from "../components";
import CustomLoader from "../components/CustomLoader";
import { useStateContext } from "../../contexts/ContextProvider";
import { FaPen, FaTasks, FaTrash } from "react-icons/fa";
import CustomButton from "../components/AddProductForm/CustomButton";

import { Toaster, toast } from "react-hot-toast";
import Label from "../components/AddProductForm/Label";
import Input from "../components/AddProductForm/Input";

function ReAllocation() {
  const Token = localStorage.getItem("token");
  const { Base_Url } = useStateContext();
  const [loader, setloader] = useState(false);
  const [InactiveBranchData, setInactiveBranchData] = useState([])
  const [BranchData, setBranchData] = useState([])
  const [CasesCount, setCasesCount] = useState("---")
  const [CardsData, setCardsData] = useState({})
  const [AllocationCount, setAllocationCount] = useState("")

  const InActiveBranchIdsRef = useRef([]);
  const ActiveBranchIdsRef = useRef([]);

  const ApiFetch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}GetAllInactiveBranch`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === 201) {
          setCardsData({
            AllInActiveBranch: result.AllInActiveBranch,
            AllInActive: result.AllInActive,
            PVT_CAR: result.PVT_CAR,
            GCV: result.GCV,
            HEALTH: result.HEALTH,
          })
        }
      })
      .catch(error => console.log('error', error));
  };
  const GetBranchesData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}GetBranch`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          const filteredData = result.Data.filter((el) => el.status === "2");
          const InactiveBranch = filteredData.map((el) => ({
            label: el.branch_name,
            value: el.id
          }));
          const filteredDataBranch = result.Data.filter((el) => el.status === "1");
          const BranchData = filteredDataBranch.map((el) => ({
            label: el.branch_name,
            value: el.id
          }));
          setInactiveBranchData(InactiveBranch);
          setBranchData(BranchData)
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    ApiFetch();
    GetBranchesData();
  }, []);
  const handleBranchChange = (values) => {
    if (values.includes('all')) {
      InActiveBranchIdsRef.current = InactiveBranchOptions.map((option) => option.value);
    } else {
      InActiveBranchIdsRef.current = values;
    }
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var formdata = new FormData();
    InActiveBranchIdsRef.current.map((el, index) => {
      formdata.append("branch[]", el);
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${Base_Url}InactiveCases`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === 200) {
          setCasesCount(result.InActiveCases)
        } else {
          setCasesCount("No Cases Found")
        }
      })
      .catch(error => console.log('error', error));
  }
  const handleOnSubmit = () => {
    if (InActiveBranchIdsRef.current.length !== 0) {
      if (AllocationCount) {
        if (ActiveBranchIdsRef.current.length !== 0) {
          setloader(true)
          var myHeaders = new Headers();
          myHeaders.append("Accept", "application/json");
          myHeaders.append("Authorization", `Bearer ${Token}`);

          var formdata = new FormData();
          InActiveBranchIdsRef.current.map((el, index) => {
            formdata.append("branch[]", el);
          })
          ActiveBranchIdsRef.current.map((eal, index) => {
            formdata.append("branch_id[]", eal);
          })
          formdata.append("To_Allocate", AllocationCount);

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };

          fetch(`${Base_Url}Send/Inactive/Cases`, requestOptions)
            .then(response => response.json())
            .then(result => {
              if (result.Status === 200) {
                ApiFetch()
                toast.success("Data Reallocated Successfully");
                setloader(false)
                setAllocationCount(null)
              }
            })
            .catch(error => console.log('error', error));
        } else {
          toast.error("Please Select Inactive Branch First");
        }
      } else {
        toast.error("Please Enter Case Qty To Allocate");
      }
    } else {
      toast.error("Please Select Active Branch First");
    }
  };

  const handleActiveBranchChange = (values) => {
    if (values.includes('all')) {
      ActiveBranchIdsRef.current = activeBranchOptions.map((option) => option.value);
    } else {
      ActiveBranchIdsRef.current = values;
    }
  }

  const allOption = {
    value: 'all',
    label: 'Select All',
  };

  const InactiveBranchOptions = [allOption, ...InactiveBranchData];
  const activeBranchOptions = [allOption, ...BranchData];
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
      {loader === true ? (
        <CustomLoader />
      ) : (
        <div>
          <div className="h-200 bg-blue-200 text-black rounded-2xl p-5 m-5 shadow ">
            <div className="grid grid-cols-5">
              <div className="w-full flex justify-center text-blue-700 items-center flex-col">
                <p className="text-sm font-bold mt-2 text-center mb-2 text-blue-700">Inactive Branches</p>
                <p>{CardsData.AllInActiveBranch ? CardsData.AllInActiveBranch : 0}</p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col">
                <p className="text-sm font-bold mt-2 text-center mb-2 text-blue-700">Total Cases</p>
                <p>{CardsData.AllInActive ? CardsData.AllInActive : 0}</p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col">
                <p className="text-sm font-bold mt-2 text-center mb-2 text-blue-700">Private Car</p>
                <p>{CardsData.PVT_CAR ? CardsData.PVT_CAR : 0}</p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col">
                <p className="text-sm font-bold mt-2 text-center mb-2 text-blue-700">GCV</p>
                <p>{CardsData.GCV ? CardsData.GCV : 0}</p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col">
                <p className="text-sm font-bold mt-2 text-center mb-2 text-blue-700">Health</p>
                <p>{CardsData.HEALTH ? CardsData.HEALTH : 0}</p>
              </div>
            </div>
          </div>
          <div className="m-5 p-5 bg-slate-200  rounded-2xl">
            <div className="flex flex-row justify-between items-center">
              <Header title="Data Reallocation" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="flex flex-col justify-center w-full">
                <Label label="Select From Branch" />
                <Select
                  mode="multiple"
                  className="h-8"
                  allowClear
                  style={{
                    width: '100%',
                    overflowY: "scroll"
                  }}
                  maxTagCount={3}
                  placeholder="Please Select From Branch"
                  onChange={(values) => handleBranchChange(values)}
                  options={InactiveBranchOptions}
                />
              </div>
              <div className="flex flex-col justify-center w-full">
                <Label label="Total Cases Found" />
                <input
                  style={{ borderRadius: "5px", width: "100%" }}
                  className="appearance-none block bg-white text-black border border-gray-200 rounded-xl py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm placeholder:text-gray-400"
                  type="text"
                  disabled
                  value={CasesCount}
                  placeholder="Please Enter Case Qty"
                />
              </div>
              <div className="flex flex-col justify-center w-full">
                <Label label="No Of Cases To Allocate" />
                <input
                  style={{ borderRadius: "5px", width: "100%" }}
                  className="appearance-none block bg-white text-black border border-gray-200 rounded-xl py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm placeholder:text-gray-400"
                  type="number"
                  min={1}
                  max={CasesCount}
                  onChange={(e) => setAllocationCount(e.target.value)}
                  placeholder="Please Enter No Of Cases"
                />
              </div>
              <div className="flex flex-col justify-center w-full">
                <Label label="Select To Branch" />
                <Select
                  mode="multiple"
                  className="h-8"
                  allowClear
                  style={{
                    width: '100%',
                    overflowY: "scroll"
                  }} maxTagCount={3}
                  placeholder="Please Select To Branch"
                  onChange={(values) => handleActiveBranchChange(values)}
                  options={activeBranchOptions}
                />
              </div>
            </div>
            <div className="flex justify-center items-center my-5">
              <CustomButton
                Onclick={handleOnSubmit}
                Title="ReAllocate"
                BgColor="#fa5b05"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReAllocation;
