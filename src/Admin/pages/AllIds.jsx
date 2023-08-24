import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input, Select, Table } from "antd";
import {  SearchOutlined } from "@ant-design/icons";
import { Header } from "../components";
import CustomLoader from "../components/CustomLoader";
import { useStateContext } from "../../contexts/ContextProvider";
import { FaEye } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
function AllIds() {
  const { Base_Url } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [loader, setloader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [productAsc, setproductAsc] = useState([]);

  const [ActiveNavtabs, setActiveNavtabs] = useState("Branch");
  const [CardData, setCardData] = useState({});
  const Token = localStorage.getItem("token");

  useEffect(() => {
    document.getElementById("EmployeeCreation").classList.add("activenav");
    document.getElementById("AllIds").classList.add("activenavLinks");
    setloader(true);
    ApiFetch();
    return () => {
      document.getElementById("AllIds").classList.remove("activenavLinks");
      document.getElementById("EmployeeCreation").classList.remove("activenav");
    };
  }, []);

  const ApiFetch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}get/Employee`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.Status === 200) {
          setproductAsc(result.Data);
          setloader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const BranchColums = [
    {
      title: <div className="text-center">Name</div>,
      dataIndex: "branch_name",
      key: "id",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: <div className="text-center">Address</div>,
      dataIndex: "address",
      render: (text) => <div className="text-center">{text}</div>,
      key: "id",
    },
    {
      title: <div className="text-center">State</div>,
      dataIndex: "state",
      key: "id",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: <div className="text-center">City</div>,
      dataIndex: "city",
      key: "id",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: <div className="text-center">Status</div>,
      dataIndex: "status",
      key: "id",
      render: (text) => (
        <div className="text-center">
          {text == 1 ? (
            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              Active
            </span>
          ) : (
            <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
              Inactive
            </span>
          )}
        </div>
      ),
    },
    {
      title: <div className="text-center">Employee</div>,
      key: "action",
      dataIndex: "id",
      render: (text, record) => (
        <div className="text-center flex flex-row gap-3 justify-center">
          <Link to={`/ViewEmployee/${text}`} className="hover:text-green-600">
            <FaEye className="text-xl hover:text-green-600 text-center font-bold " />
          </Link>
        </div>
      ),
    },
  ];
  const EmployeeColums = [
    {
      title: <div className="text-center">Name</div>,
      dataIndex: "branch_name",
      key: "id",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: <div className="text-center">Address</div>,
      dataIndex: "address",
      render: (text) => <div className="text-center">{text}</div>,
      key: "id",
    },
    {
      title: <div className="text-center">State</div>,
      dataIndex: "state",
      key: "id",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: <div className="text-center">City</div>,
      dataIndex: "city",
      key: "id",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: <div className="text-center">Status</div>,
      dataIndex: "status",
      key: "id",
      render: (text) => (
        <div className="text-center">
          {text == 1 ? (
            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              Active
            </span>
          ) : (
            <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
              Inactive
            </span>
          )}
        </div>
      ),
    },
    {
      title: <div className="text-center">Employee</div>,
      key: "action",
      dataIndex: "id",
      render: (text, record) => (
        <div className="text-center flex flex-row gap-3 justify-center">
          <Link to={`/ViewEmployee/${text}`} className="hover:text-green-600">
            <FaEye className="text-xl hover:text-green-600 text-center font-bold " />
          </Link>
        </div>
      ),
    },
  ];
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProducts = productAsc.filter((product) =>
    product.branch_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const [perPage, setPerPage] = useState(5); // new state variable for selected value from dropdown

  const handlePerPageChange = (value) => {
    setPerPage(value); // update state with selected value from dropdown
    setProductsPerPage(value); // update productsPerPage state variable
  };

  const perPageOptions = [5, 10, 25, 50, 100, 300, 600]; // options for dropdown

  // dropdown component
  const perPageDropdown = (
    <Select
      value={perPage}
      onChange={handlePerPageChange}
      style={{ width: "10%" }}
    >
      {perPageOptions.map((el, i) => (
        <option key={i} value={el}>
          {el}
        </option>
      ))}
    </Select>
  );

  const Cards = [
    {
      Type: "Branch",
      background: "linear-gradient(320deg, #552cd1,#9372f7)",
      backgroundcolor: "#552cd1",
      number: CardData.TotalBranch ? CardData.TotalBranch : 0,
      title: "Total Branch",
    },
    {
      Type: "Branch",
      background:
        "linear-gradient(320deg, rgb(250, 91, 5), rgb(245, 148, 95));",
      backgroundcolor: "rgb(250, 91, 5)",
      number: CardData.Active ? CardData.Active : 0,
      title: "Active",
    },
    {
      Type: "Branch",
      background:
        "linear-gradient(320deg, rgb(42, 184, 106), rgb(132, 245, 183));",
      backgroundcolor: "rgb(42, 184, 106)",
      number: CardData.Inactive ? CardData.Inactive : 0,
      title: "Inactive",
    },
    {
      Type: "Employee",
      background: "linear-gradient(320deg, #552cd1,#9372f7)",
      backgroundcolor: "#552cd1",
      number: CardData.TotalBranch ? CardData.TotalBranch : 0,
      title: "Total Employee",
    },
    {
      Type: "Employee",
      background:
        "linear-gradient(320deg, rgb(250, 91, 5), rgb(245, 148, 95));",
      backgroundcolor: "rgb(250, 91, 5)",
      number: CardData.Active ? CardData.Active : 0,
      title: "Active",
    },
    {
      Type: "Employee",
      background:
        "linear-gradient(320deg, rgb(42, 184, 106), rgb(132, 245, 183));",
      backgroundcolor: "rgb(42, 184, 106)",
      number: CardData.Inactive ? CardData.Inactive : 0,
      title: "Inactive",
    },
  ];
  const handleChangeTabs = (id) => {
    setActiveNavtabs(id);
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
      {loader === true ? (
        <CustomLoader />
      ) : (
        <div>
          <div className="grid grid-cols-2 m-5 gap-5">
            {ActiveNavtabs == "Branch" ? (
              <button
                style={{ width: "100%" }}
                className="p-2 rounded-lg  font-bold NavTabs active"
                onClick={() => [handleChangeTabs("Branch")]}
              >
                Branch
              </button>
            ) : (
              <button
                style={{ width: "100%" }}
                className="p-2 rounded-lg  font-bold NavTabs "
                onClick={() => [handleChangeTabs("Branch")]}
              >
                Branch
              </button>
            )}
            {ActiveNavtabs == "Employee" ? (
              <button
                style={{ width: "100%" }}
                className="p-2 rounded-lg  font-bold NavTabs active"
                onClick={() => [handleChangeTabs("Employee")]}
              >
                Employees
              </button>
            ) : (
              <button
                style={{ width: "100%" }}
                className="p-2 rounded-lg  font-bold NavTabs "
                onClick={() => [handleChangeTabs("Employee")]}
              >
                Employees
              </button>
            )}
          </div>
          {ActiveNavtabs == "Branch" ? (
            <div>
              <div className="mt-5  gap-2  m-5 grid grid-cols-3">
                {Cards &&
                  Cards.map((el, index) => {
                    return el.Type == "Branch" ? (
                      <div
                        key={index}
                        style={{
                          background: `${el.background}`,
                          backgroundColor: `${el.backgroundcolor}`,
                          width: "100%",
                          height: "7.5rem",
                        }}
                        className="mx-1 rounded-2xl text-white flex flex-col justify-center items-center"
                      >
                        <p className="mt-3">
                          <span className="text-2xl font-semibold">
                            {el.number}
                          </span>
                        </p>
                        <p className="text-3xl text-white font-extrabold mt-1">
                          {el.title}
                        </p>
                      </div>
                    ) : (
                      ""
                    );
                  })}
              </div>
              <div className="m-5 p-5 bg-slate-200  rounded-2xl">
                <div className="flex flex-row justify-between items-center">
                  <Header title="List Branch" />
                  <button className="p-2 rounded-lg text-black hover:text-white font-bold w-40 hovernav">
                    <Link to="/AddBranch">Add Branch</Link>
                  </button>
                </div>
                <div className="overflow-y-scroll">
                  <Input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    suffix={<SearchOutlined />}
                    className="mb-10 w h-12 text-lg text-gray-500 font-bold"
                  />
                  <Table
                    dataSource={currentProducts}
                    columns={BranchColums}
                    pagination={{
                      current: currentPage,
                      pageSize: productsPerPage,
                      total: filteredProducts.length,
                      onChange: handlePageChange,
                      showSizeChanger: false,
                    }}
                    rowKey="id"
                    footer={() => (
                      <div className="flex justify-end">
                        <span className="mr-2 font-semibold text-[#008000] mt-1">
                          Products per page:
                        </span>
                        {perPageDropdown}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="mt-5  gap-2  m-5 grid grid-cols-3">
                {Cards &&
                  Cards.map((el, index) => {
                    return el.Type == "Employee" ? (
                      <div
                        key={index}
                        style={{
                          background: `${el.background}`,
                          backgroundColor: `${el.backgroundcolor}`,
                          width: "100%",
                          height: "7.5rem",
                        }}
                        className=" mx-1 rounded-2xl text-white flex flex-col justify-center items-center"
                      >
                        <p className="mt-3">
                          <span className="text-2xl font-semibold">
                            {el.number}
                          </span>
                        </p>
                        <p className="text-3xl text-white font-extrabold mt-1">
                          {el.title}
                        </p>
                      </div>
                    ) : (
                      ""
                    );
                  })}
              </div>
              <div className="m-5 p-5 bg-slate-200  rounded-2xl">
                <div className="flex flex-row justify-between items-center">
                  <Header title="List Employee" />
                  <button className="p-2 rounded-lg text-black hover:text-white font-bold w-40 hovernav">
                    <Link to="/AddEmployee">Add Employee</Link>
                  </button>
                </div>
                <div className="overflow-y-scroll">
                  <Input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    suffix={<SearchOutlined />}
                    className="mb-10 w h-12 text-lg text-gray-500 font-bold"
                  />
                  <Table
                    dataSource={currentProducts}
                    columns={EmployeeColums}
                    pagination={{
                      current: currentPage,
                      pageSize: productsPerPage,
                      total: filteredProducts.length,
                      onChange: handlePageChange,
                      showSizeChanger: false,
                    }}
                    rowKey="id"
                    footer={() => (
                      <div className="flex justify-end">
                        <span className="mr-2 font-semibold text-[#008000] mt-1">
                          Products per page:
                        </span>
                        {perPageDropdown}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AllIds;
