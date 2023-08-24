import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Input, Space, Table, Button } from "antd";
import CustomLoader from "../components/CustomLoader";
import { useStateContext } from "../../contexts/ContextProvider";
import { FaPen, FaTasks } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import { Toaster, toast } from "react-hot-toast";
import Highlighter from "react-highlight-words";


function ListBranch() {
  const { Base_Url } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [loader, setloader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [productAsc, setproductAsc] = useState([]);
  const [CardData, setCardData] = useState({});
  const Token = localStorage.getItem("token");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const ApiFetch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}get/Hub`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === 201) {
          setCardData({
            TotalHub: result.TotalHub,
            ActiveHub: result.ActiveHub,
            InActiveHub: result.InActiveHub,
          })
          setproductAsc(result.data);
        }
        setloader(false);
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    setloader(true);
    ApiFetch();
  }, []);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: <div className="text-center">Employee id</div>,
      dataIndex: "employee_id",
      key: "employee_id",
      ...getColumnSearchProps("employee_id"),
      sorter: (a, b) => a.employee_id.length - b.employee_id.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <div className="text-center f01">{text}</div>,
    },
    {
      title: <div className="text-center">Branch Name</div>,
      dataIndex: "branch_name",
      key: "branch_name",
      ...getColumnSearchProps("branch_name"),
      sorter: (a, b) => a.branch_name.length - b.branch_name.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <div className="text-center f01">{text}</div>,
    },
    {
      title: <div className="text-center">Employee Name</div>,
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <div className="text-center f01">{text}</div>,
    },
    {
      title: <div className="text-center">Contact Number</div>,
      dataIndex: "personal_mobile_no",
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
      title: <div className="text-center">Action</div>,
      key: "action",
      dataIndex: "id",
      render: (text, record) => (
        <div className="text-center flex flex-row gap-3 justify-center">
          <Link to={`/UpdateBranch/${text}`} className="hover:text-green-600">
            <FaPen className="text-xl hover:text-green-600 text-center font-bold " />
          </Link>
        </div>
      ),
    },
  ];
  const paginationConfig = {
    pageSize: 6
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
          <div className="h-200 bg-blue-200 text-black rounded-2xl p-5 m-5 shadow ">
            <div className="grid grid-cols-3">
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p>Total Hubs</p>
                <p>{CardData.TotalHub ? CardData.TotalHub : 0}</p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p>Active</p>
                <p>{CardData.ActiveHub ? CardData.ActiveHub : 0}</p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p>Inactive</p>
                <p>{CardData.InActiveHub ? CardData.InActiveHub : 0}</p>
              </div>
            </div>
          </div>

          <div className="m-5 p-5 bg-slate-200  rounded-2xl">
            <div className="overflow-y-scroll">
              <Table
                pagination={paginationConfig}
                columns={columns}
                dataSource={productAsc}
                className="overflow-x-scroll overflow-y-scroll"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListBranch;
