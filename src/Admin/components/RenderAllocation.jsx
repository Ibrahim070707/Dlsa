import React, { useEffect, useRef, useState } from "react";
import { Select } from "antd";
import { Header } from "../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { FaTasks } from "react-icons/fa";
import CustomButton from "../components/AddProductForm/CustomButton";
import CustomLoader from "../components/CustomLoader";
import { Toaster, toast } from "react-hot-toast";
import Label from "../components/AddProductForm/Label";

function RenderAllocation() {
  const Token = localStorage.getItem("token");
  const { Base_Url } = useStateContext();
  const [MakeData, setMakeData] = useState([]);
  const [ModelData, setModelData] = useState([]);
  const [YearData, setYearData] = useState([]);
  const [LocationData, setLocationData] = useState([]);
  const [CasesCount, setCasesCount] = useState("---");
  const [TotalCasesToAllocate, setTotalCasesToAllocate] = useState("");
  const [loader, setloader] = useState(false);
  const [CardsData, setCardsData] = useState([]);
  const [BranchData, setBranchData] = useState([]);

  const dataArrayRef = useRef([]);
  const MakeDataRef = useRef([]);
  const ModelDataRef = useRef([]);
  const YearDataRef = useRef([]);
  const LocationRef = useRef([]);
  const BranchRef = useRef([]);

  const ApiFetch = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(`${Base_Url}AllCase/type`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCardsData({
          CAR_Cases: result.PVT_CAR.CAR_Cases,
          CAR_Allocated: result.PVT_CAR.CAR_Allocated,
          CAR_Nonallocate: result.PVT_CAR.CAR_Nonallocate,
          GCV_Cases: result.GCV.GCV_Cases,
          GCV_Allocated: result.GCV.GCV_Allocated,
          GCV_Nonallocate: result.GCV.GCV_Nonallocate,
          HEALTH_TotalCases: result.HEALTH.HEALTH_TotalCases,
          HEALTH_Allocated: result.HEALTH.HEALTH_Allocated,
          HEALTH_Nonallocate: result.HEALTH.HEALTH_Nonallocate,
        });
      })
      .catch((error) => console.log("error", error));
  };
  const GetBranchesData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    await fetch(`${Base_Url}GetBranch`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          const filteredData = result.Data.filter((el) => el.status === "1");
          const branchData = filteredData.map((el) => ({
            value: el.id,
            label: el.branch_name,
          }));
          setBranchData(branchData);
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    GetBranchesData();
    ApiFetch();
  }, []);

    const [isTypeOpen, setisTypeOpen] = useState(false);

  const handleTypeChange = async (values) => {
    if (values.includes("all")) {
      dataArrayRef.current = optionsWithSelectAll.map((option) => option.value);
    } else {
      dataArrayRef.current = values;
    }

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var formdata = new FormData();
    dataArrayRef.current.map((el, index) => {
      formdata.append(`type[]`, el);
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(`${Base_Url}getMake`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setMakeData(result.Data);
          setisTypeOpen(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const [isMakeOpen , setisMakeOpen] = useState(false);

  const handleMakeChange = async (values) => {
    if (values.includes("all")) {
      MakeDataRef.current = MakewithSelectAll.map((option) => option.value);
    } else {
      MakeDataRef.current = values;
    }
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var formdata = new FormData();
    dataArrayRef.current.map((el, index) => {
      formdata.append(`type[]`, el);
    });
    MakeDataRef.current.map((ol, index) => {
      formdata.append("make[]", ol);
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(`${Base_Url}getModel`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setModelData(result.Data);
          setisMakeOpen(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

    const [isModalOpen , setisModalOpen] = useState(false);

  const handleModelChange = async (values) => {
    if (values.includes("all")) {
      ModelDataRef.current = ModelwithSelectAll.map((option) => option.value);
    } else {
      ModelDataRef.current = values;
    }
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var formdata = new FormData();
    dataArrayRef.current.map((el, index) => {
      formdata.append(`type[]`, el);
    });
    MakeDataRef.current.map((ol, index) => {
      formdata.append("make[]", ol);
    });
    ModelDataRef.current.map((ul, index) => {
      formdata.append("model[]", ul);
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(`${Base_Url}getYear`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setYearData(result.Data);
          setisModalOpen(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const [isYearOpen, setisYearOpen] = useState(false);

  const handleYearChange = async (values) => {
    if (values.includes("all")) {
      YearDataRef.current = YearwithSelectAll.map((option) => option.value);
    } else {
      YearDataRef.current = values;
    }
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var formdata = new FormData();
    dataArrayRef.current.map((el, index) => {
      formdata.append(`type[]`, el);
    });
    MakeDataRef.current.map((ol, index) => {
      formdata.append("make[]", ol);
    });
    ModelDataRef.current.map((ul, index) => {
      formdata.append("model[]", ul);
    });
    YearDataRef.current.map((ql, index) => {
      formdata.append("year[]", ql);
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(`${Base_Url}getLocation`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setLocationData(result.data);
          setisYearOpen(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const [isLocationOpen, setisLocationOpen] = useState(false);

  const handleChangeLocation = async (values) => {
    if (values.includes("all")) {
      LocationRef.current = LocationwithSelectAll.map((option) => option.value);
    } else {
      LocationRef.current = values;
    }
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var formdata = new FormData();
    dataArrayRef.current.map((el, index) => {
      formdata.append(`type[]`, el);
    });
    MakeDataRef.current.map((ol, index) => {
      formdata.append("make[]", ol);
    });
    ModelDataRef.current.map((ul, index) => {
      formdata.append("model[]", ul);
    });
    YearDataRef.current.map((ql, index) => {
      formdata.append("year[]", ql);
    });
    LocationRef.current.map((ql, index) => {
      formdata.append("location[]", ql);
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(`${Base_Url}AllocationCases`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setCasesCount(result.TotalCases);
          setisLocationOpen(false);
        } else {
          setCasesCount("No Cases Found");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const [Branch , setBranch] = useState(false);


  const handleChangeBranch = (values) => {
    if (values.includes("all")) {
      BranchRef.current = BranchwithSelectAll.map((option) => option.value);
      setBranch(false);  
    } else {
      BranchRef.current = values;
      setBranch(false);  
    }
  };
  const handleOnSubmit = async () => {
    setloader(true);
    if (dataArrayRef) {
      if (MakeDataRef) {
        if (ModelDataRef) {
          if (YearDataRef) {
            if (LocationRef) {
              if (TotalCasesToAllocate) {
                if (BranchRef) {
                  var myHeaders = new Headers();
                  myHeaders.append("Accept", "application/json");
                  myHeaders.append("Authorization", `Bearer ${Token}`);

                  var formdata = new FormData();
                  dataArrayRef.current.map((el, index) => {
                    formdata.append(`type[]`, el);
                  });
                  MakeDataRef.current.map((ol, index) => {
                    formdata.append("make[]", ol);
                  });
                  ModelDataRef.current.map((ul, index) => {
                    formdata.append("model[]", ul);
                  });
                  YearDataRef.current.map((ql, index) => {
                    formdata.append("year[]", ql);
                  });
                  LocationRef.current.map((ql, index) => {
                    formdata.append("location[]", ql);
                  });
                  formdata.append("To_Allocate", TotalCasesToAllocate);
                  BranchRef.current.map((br, index) => {
                    formdata.append("branch_id[]", br);
                  });

                  var requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: formdata,
                    redirect: "follow",
                  };

                  await fetch(`${Base_Url}SendAllocationCases`, requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                      if (result.Status === 200) {
                        ApiFetch();
                        toast.success("Data Allocated Successfully");
                        setloader(false);
                      }
                    })
                    .catch((error) => console.log("error", error));
                } else {
                  toast.error("Type Is Required");
                }
              } else {
                toast.error("Make Is Required");
              }
            } else {
              toast.error("Model Is Required");
            }
          } else {
            toast.error("Year Is Required");
          }
        } else {
          toast.error("Location Is Required");
        }
      } else {
        toast.error("No Of Cases To Allocate Is Required");
      }
    } else {
      toast.error("Branch Is Required");
    }
  };
  const TypeOption = [
    {
      value: 1,
      label: "PVT CAR",
    },
    {
      value: 2,
      label: "GCV",
    },
    {
      value: 3,
      label: "HEALTH",
    },
  ];

  const allOption = {
    value: "all",
    label: "Select All",
  };
  const optionsWithSelectAll = [allOption, ...TypeOption];

  const MakeOptions = MakeData.map((item, index) => ({
    value: item.make,
    label: item.make,
  }));
  const MakewithSelectAll = [allOption, ...MakeOptions];

  const ModelOptions = ModelData.map((el, index) => ({
    label: el.model,
    value: el.model,
  }));
  const ModelwithSelectAll = [allOption, ...ModelOptions];

  const YearOptions = YearData.map((el, index) => ({
    label: el.year_of_manufacturing,
    value: el.year_of_manufacturing,
  }));
  const YearwithSelectAll = [allOption, ...YearOptions];

  const LocationOption = LocationData.map((el, index) => ({
    label: el.location,
    value: el.location,
  }));
  const LocationwithSelectAll = [allOption, ...LocationOption];

  const BranchwithSelectAll = [allOption, ...BranchData];

  return (
    <>
      {loader === true ? (
        <CustomLoader />
      ) : (
        <div>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              id: "25663",
              duration: 7000,
            }}
          />
          <div className=" bg-blue-200 text-black rounded-2xl p-5 mx-5 shadow ">
            <div className="grid grid-cols-4 my-3">
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p className="text-sm font-bold mt-2 text-center mb-2 text-blue-700">
                  Private Car
                </p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p className="font-semibold">Total Cases</p>
                <p>{CardsData.CAR_Cases ? CardsData.CAR_Cases : 0}</p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p className="font-semibold">Allocated</p>
                <p>{CardsData.CAR_Allocated ? CardsData.CAR_Allocated : 0}</p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p className="font-semibold">Unallocated</p>
                <p>
                  {CardsData.CAR_Nonallocate ? CardsData.CAR_Nonallocate : 0}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 my-3">
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p className="text-sm font-bold mt-1 text-center mb-2 text-blue-700">
                  GCV
                </p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p className="font-semibold">Total Cases</p>
                <p>{CardsData.GCV_Cases ? CardsData.GCV_Cases : 0}</p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p className="font-semibold">Allocated</p>
                <p>{CardsData.GCV_Allocated ? CardsData.GCV_Allocated : 0}</p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p className="font-semibold">Unallocated</p>
                <p>
                  {CardsData.GCV_Nonallocate ? CardsData.GCV_Nonallocate : 0}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4">
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p className="text-sm font-bold mt-1 text-center mb-2 text-blue-700">
                  Health
                </p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p className="font-semibold">Total Cases</p>
                <p>
                  {CardsData.HEALTH_TotalCases
                    ? CardsData.HEALTH_TotalCases
                    : 0}
                </p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p className="font-semibold">Allocated</p>
                <p>
                  {CardsData.HEALTH_Allocated ? CardsData.HEALTH_Allocated : 0}{" "}
                </p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p className="font-semibold">Unallocated</p>
                <p>
                  {CardsData.HEALTH_Nonallocate
                    ? CardsData.HEALTH_Nonallocate
                    : 0}
                </p>
              </div>
            </div>
          </div>
          <div className="m-5 p-5 bg-slate-200  rounded-2xl">
            <div className="flex flex-row justify-between items-center">
              <Header title="Data Allocation" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              <div className="flex flex-col justify-center w-full">
                <Label label="Select Product Type " />
                <Select
                  mode="multiple"
                  allowClear
                  open={isTypeOpen}
                  onDropdownVisibleChange={(open) => setisTypeOpen(open)}
                  onChange={handleTypeChange}
                  style={{
                    width: "100%",
                    overflowY: "scroll",
                  }}
                  maxTagCount={3}
                  placeholder="Please Select Product Type"
                  options={optionsWithSelectAll}
                />
              </div>
              <div className="flex flex-col justify-center w-full">
                <Label label="Select Make" />
                <Select
                  className="placeholder:text-gray-400 h-8"
                  mode="multiple"
                  allowClear
                  open={isMakeOpen}
                  onDropdownVisibleChange={(open) => setisMakeOpen(open)}
                  style={{
                    width: "100%",
                    overflowY: "scroll",
                  }}
                  placeholder="Please Select Make"
                  onChange={(values) => {
                    handleMakeChange(values);
                  }}
                  maxTagCount={2}
                  options={MakewithSelectAll}
                />
              </div>
              <div className="flex flex-col justify-center w-full">
                <Label label="Select Model" />
                <Select
                  className="placeholder:text-gray-400 h-8"
                  mode="multiple"
                  allowClear
                  open={isModalOpen}
                  onDropdownVisibleChange={(open) => setisModalOpen(open)}
                  style={{
                    width: "100%",
                    overflowY: "scroll",
                  }}
                  placeholder="Please Select Model"
                  onChange={(values) => {
                    handleModelChange(values);
                  }}
                  maxTagCount={2}
                  options={ModelwithSelectAll}
                />
              </div>

              <div className="flex flex-col justify-center w-full">
                <Label label="Select Year Of Manufacturing" />
                <Select
                  className="h-8 placeholder:text-gray-400"
                  mode="multiple"
                  allowClear
                  open = {isYearOpen}
                  onDropdownVisibleChange={(open) => setisYearOpen(open)}
                  style={{
                    width: "100%",
                    overflowY: "scroll",
                  }}
                  placeholder="Please Select Year Of Manufacturing"
                  onChange={(values) => {
                    handleYearChange(values);
                  }}
                  maxTagCount={2}
                  options={YearwithSelectAll}
                />
              </div>

              <div className="flex flex-col justify-center w-full">
                <Label label="Select Location" />
                <Select
                  className="h-8 placeholder:text-gray-400"
                  mode="multiple"
                  allowClear
                  open = {isLocationOpen}
                  onDropdownVisibleChange={(open) => setisLocationOpen(open)}
                  style={{
                    width: "100%",
                    overflowY: "scroll",
                  }}
                  placeholder="Please Select Location"
                  onChange={(values) => handleChangeLocation(values)}
                  maxTagCount={2}
                  options={LocationwithSelectAll}
                />
              </div>
              <div>
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
              <div>
                <Label label="No Of Cases To Allocate" />
                <input
                  style={{ borderRadius: "5px", width: "100%" }}
                  className="appearance-none block bg-white text-black border border-gray-200 rounded-xl py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm placeholder:text-gray-400"
                  type="number"
                  min={1}
                  max={CasesCount}
                  onChange={(e) => setTotalCasesToAllocate(e.target.value)}
                  placeholder="Please Enter Case Qty"
                />
              </div>

              <div className="flex flex-col justify-center w-full">
                <Label label="To Branch" />
                <Select
                  mode="multiple"
                  className="placeholder:text-gray-400 h-8"
                  allowClear
                  open ={Branch}
                  onDropdownVisibleChange={(open) => setBranch(open)}
                  style={{
                    width: "100%",
                    overflowY: "scroll",
                  }}
                  maxTagCount={2}
                  placeholder="Please Select Branch"
                  onChange={(values) => handleChangeBranch(values)}
                  options={BranchwithSelectAll}
                />
              </div>
            </div>
            <div className="flex justify-center items-center my-5">
              <CustomButton
                Onclick={handleOnSubmit}
                Title="Allocate"
                BgColor="#fa5b05"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RenderAllocation;
