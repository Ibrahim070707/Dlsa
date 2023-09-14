import React, { useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";
import { useEffect } from "react";
import { FaArrowDown, FaDownload } from "react-icons/fa";

function BusinessReports() {
    const Token = localStorage.getItem("token");
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("");
    const [data, setdata] = useState([])
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [loader, setloader] = useState(false);
    const UserData = JSON.parse(localStorage.getItem("data"));
    const [QuotesData, setQuotesData] = useState([])
    const { Base_Url } = useStateContext();
    useEffect(() => {
        setloader(true);
        ApiFetch();
    }, []);
    const ApiFetch = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${Base_Url}GetBusinessReport`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.Status === 200) {
                    setdata(result.Data)
                    setQuotesData(result.Data.Quote)
                }
                setloader(false)
            })
            .catch(error => console.log('error', error));
    }
    const ProductWise = [
        {
            "name": "PVT Car",
            "nop": data?.Pvt?.NOP,
            "premium": data?.Pvt?.Amount,
        },
        {
            "name": "Gcv",
            "nop": data?.Gcv?.NOP,
            "premium": data?.Gcv?.Amount,
        },
        {
            "name": "Health",
            "nop": data?.health?.NOP,
            "premium": data?.health?.Amount,
        },
        {
            "name": "Total",
            "nop": data?.health?.NOP + data?.Gcv?.NOP + data?.Pvt?.NOP,
            "premium": data?.health?.Amount + data?.Gcv?.Amount + data?.Pvt?.Amount,
        },
    ];
    return (
        <>
            {loader === true ? (
                <CustomLoader />
            ) : (
                <div>
                    <div className="m-5 p-5 bg-slate-200  rounded-2xl">
                        <div className="grid grid-cols-2 gap-10">
                            <div className="bg-white rounded-lg">
                                <p className="text-center font-bold mt-2">Product Wise</p>
                                <div className="grid grid-cols-3 text-center mt-2">
                                    <p className="text-sm font-semibold">Product</p>
                                    <p className="text-sm font-semibold">No. Of Policy</p>
                                    <p className="text-sm font-semibold">Total Premium</p>
                                </div>
                                {ProductWise && ProductWise.map((el, index) => {
                                    return (
                                        <div className="grid grid-cols-3 text-center mt-1 mb-3" key={index}>
                                            <p className="f01">{el.name}</p>
                                            <p className="f01">{el.nop}</p>
                                            <p className="f01">₹{el.premium}/-</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="bg-white rounded-lg" style={{ maxHeight: "180px", overflowY: "scroll" }}>
                                <p className="text-center font-bold mt-2">Insurance Co Wise</p>
                                <div className="grid grid-cols-3 text-center mt-2">
                                    <p className="text-sm font-semibold">Insurer</p>
                                    <p className="text-sm font-semibold">No. Of Policy</p>
                                    <p className="text-sm font-semibold">Total Premium</p>
                                </div>
                                {QuotesData && QuotesData.map((ela, index) => {
                                    return (
                                        <div className="grid grid-cols-3 text-center mt-1 mb-3" key={index}>
                                            <p className="f01">{ela.Name}</p>
                                            <p className="f01">{ela.Premuim}</p>
                                            <p className="f01">₹{ela.Amount}/-</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="text-sm mt-5 text-blue-500 font-semibold flex justify-start items-center gap-1 ">
                            <a href="https://myfiinbox.com/Rest/gbZc1bkumA/laravel8/public/api/DownloadBusinessReports" className="inline-flex cursor-pointer gap-2 items-center">Download Business Report <FaArrowDown /> </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default BusinessReports