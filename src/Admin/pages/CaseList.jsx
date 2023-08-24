import React, { useEffect, useState } from "react";
import CustomLoader from "../components/CustomLoader";
import { useStateContext } from "../../contexts/ContextProvider";
import { FaTasks } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import CSV from "../data/Example.xlsx";
import CustomButton from "../components/AddProductForm/CustomButton";

const CaseList = () => {
  const [loader, setloader] = useState(false);
  const [ExcelFile, setExcelFile] = useState("")
  const Token = localStorage.getItem("token");
  const [CardsData, setCardsData] = useState({})
  const { Base_Url } = useStateContext();

  const ApiFetch = () => {

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}AllCase/type`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === 200) {
          setCardsData({
            TotalCases: result.TotalCases,
            PVT_CAR: result.PVT_CAR.CAR_Cases,
            GCV: result.GCV.GCV_Cases,
            HEALTH: result.HEALTH.HEALTH_TotalCases,
          })
        }

      })
      .catch(error => console.log('error', error));

  };
  useEffect(() => {
    ApiFetch();
  }, []);
  const handleOnSumbit = () => {
    if (ExcelFile) {
      setloader(true)
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${Token}`);

      var formdata = new FormData();
      formdata.append("file", ExcelFile);


      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(`${Base_Url}ImportExcel`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status === 200) {
            ApiFetch()
            setloader(false)
            toast.success("File Uploaded Successfully");
          }
        })
        .catch(error => console.log('error', error));
    } else {
      toast.error("File Field Required");
    }
  }
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
        <div>
          <div className="bg-blue-200 text-black rounded-2xl p-5 mx-5 mt-10 mb-4 shadow ">
            <div className="grid grid-cols-2 gap-5">
              <div className="w-full text-sm flex justify-center text-blue-700 items-center flex-col">
                <p className="font-semibold">Total Cases</p>
                <p>{CardsData.TotalCases ? CardsData.TotalCases : 0}</p>
              </div>
              <div className="w-full text-sm flex justify-center text-blue-700 items-center flex-col">
                <p className="font-semibold">Private Car</p>
                <p>{CardsData.PVT_CAR ? CardsData.PVT_CAR : 0}</p>
              </div>
              <div className="w-full text-sm flex justify-center text-blue-700 items-center flex-col">
                <p className="font-semibold">GCV</p>
                <p>{CardsData.GCV ? CardsData.GCV : 0}</p>
              </div>
              <div className="w-full text-sm flex justify-center text-blue-700 items-center flex-col">
                <p className="font-semibold">Health</p>
                <p>{CardsData.HEALTH ? CardsData.HEALTH : 0}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="mx-5 p-5 rounded-2xl bg-slate-200">
              <div className="mb-3">
                <a href={CSV} download="SampleCSVFile" className="text-blue-500">Click Here To Download Sample CSV</a>
                <a className="text-blue-500 float-right" href="https://myfiinbox.com/Rest/gbZc1bkumA/laravel8/public/api/DownloadCases">Click Here To Download Case CSV</a>
              </div>
              <input
                className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
                required
                id="multiple_files"
                type="file"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={(e) => setExcelFile(e.target.files[0])}
              />
              <div className="flex mt-5 gap-5 justify-center">
                <CustomButton
                  Onclick={handleOnSumbit}
                  Title="Submit"
                  BgColor="#fa5b05"
                />
              </div>

            </div>
          </div>
          {/* <div className="m-5 p-5 bg-slate-200  rounded-2xl">
            <div className="flex flex-row justify-between items-center">
              <Header title="List Case" />
              <button className="p-2 rounded-lg text-black hover:text-white font-bold w-40 hovernav">
                <Link to="/Cases">Add Case</Link>
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
                style={{ overflow: "scroll" }}
                dataSource={currentProducts}
                columns={columns}
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
          </div> */}
        </div>
      )}
    </>
  );
};

export default CaseList;
