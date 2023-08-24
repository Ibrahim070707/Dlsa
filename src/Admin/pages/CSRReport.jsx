import React, { useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";
import { useEffect } from "react";
import { FaArrowDown, FaEye } from "react-icons/fa";
import ViewEmployeesData from "../components/ViewEmployeesData";

function CSRReport() {
    const Token = localStorage.getItem("token");
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("");
    const [data, setdata] = useState([])
    const [EmployeesData, setEmployeesData] = useState([])
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [loader, setloader] = useState(false);
    const { Base_Url } = useStateContext();
    const UserData = JSON.parse(localStorage.getItem("data"));
    const [ModelOpen, setModelOpen] = useState(false)



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
    const handleOpenNewSite = (id) => {
        window.open(`https://flymingotech.co.in/ExcelExport/CsrReport.php?EmpID=${id}`);
    }
    const columns = [
        {
            title: <div className="text-center f01 ">EmployeeID</div>,
            dataIndex: "employee_id",
            key: "employee_id",
            ...getColumnSearchProps("employee_id"),
            sorter: (a, b) => a.employee_id.length - b.employee_id.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => (
                <div className="text-center f01">{text}</div>
            ),
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
            render: (text) => (
                <div className="text-center f01">{text}</div>
            ),
        },
        {
            title: <div className="text-center f01 ">Convience</div>,
            dataIndex: "Convience",
            key: "Convience",
            render: (text) => (
                <div className="text-center f01">{text}</div>
            ),
        },
        {
            title: <div className="text-center f01 ">Appointment</div>,
            dataIndex: "Appointment",
            key: "Appointment",
            render: (text) => (
                <div className="text-center f01">{text}</div>
            ),
        },
        {
            title: <div className="text-center f01 ">Convert</div>,
            dataIndex: "Convert",
            key: "Convert",
            render: (text) => (
                <div className="text-center f01">{text}</div>
            ),
        },
        {
            title: <div className="text-center f01 ">Lost</div>,
            dataIndex: "Lost",
            key: "Lost",
            render: (text) => (
                <div className="text-center text-red-500 f01">{text}</div>
            ),
        },
        {
            title: <div className="text-center f01 ">View Employee</div>,
            dataIndex: "id",
            key: "id",
            render: (text) => <div className="flex justify-center items-center cursor-pointer f01">
                <FaEye className="hover:text-blue-700 text-lg" onClick={() => HandleViewEmployee(text)} />
            </div>
        },
    ];
    useEffect(() => {
        setloader(true);
        ApiFetch();
    }, []);
    const ApiFetch = () => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${Base_Url}GetBranchCallStatus`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setdata(result.Data)
                }
                setloader(false)
            })
            .catch(error => console.log('error', error));
    }
    const HandleZoneChange = (e) => {
        if (e === "All") {
            ApiFetch()
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${Token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${Base_Url}GetBranchCallStatusByZone/${e}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.Status === 200) {
                        setdata(result.Data)
                    }
                })
                .catch(error => console.log('error', error));
        }
    }
    const HandleViewEmployee = (e) => {
        setModelOpen(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(`${Base_Url}GetEmployeesCallHistoryByBranch/${e}`,
            requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setEmployeesData(result.Data);
            })
            .catch((error) => console.log("error", error));
    }
    const Url = `https://myfiinbox.com/Rest/gbZc1bkumA/laravel8/public/api/GetCsrReports`

    return (
        <>
            {loader === true ? (
                <CustomLoader />
            ) : (
                <div>
                    <Modal
                        open={ModelOpen}
                        title="Employees Data"
                        onCancel={() => {
                            setModelOpen(false)
                        }} footer="" width="60%">

                        <ViewEmployeesData data={EmployeesData} />
                    </Modal>
                    <div className="mt-2 mx-5">
                        <select
                            style={{ borderRadius: "5px", width: "100%" }}
                            className="appearance-none block bg-white dark:bg-secondary-dark-bg dark:text-white text-gray-700 border border-gray-200 rounded-xl py-2  px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black font-bold placeholder:font-bold f01"
                            onChange={(e) => HandleZoneChange(e.target.value)}  >
                            <option className="text-gray-400 dark:text-white font-bold text-center" value="All">All Zone</option>
                            <option className="text-gray-400 dark:text-white font-bold text-center" value="West">West</option>
                            <option className="text-gray-400 dark:text-white font-bold text-center" value="North">North</option>
                            <option className="text-gray-400 dark:text-white font-bold text-center" value="East">East</option>
                            <option className="text-gray-400 dark:text-white font-bold text-center" value="NorthEast">NorthEast</option>
                            <option className="text-gray-400 dark:text-white font-bold text-center" value="South">South</option>
                        </select>
                    </div>
                    <div className="m-5 p-5 bg-slate-200 rounded-2xl">
                        <div className="text-sm mb-5 mt-1 text-blue-500 font-semibold flex justify-start items-center gap-1 ">
                            <a className="inline-flex cursor-pointer gap-2 items-center" href={Url}>Download Csr Report <FaArrowDown /> </a>
                        </div>
                        <div className="overflow-y-scroll">
                            <Table
                                columns={columns}
                                dataSource={data}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CSRReport