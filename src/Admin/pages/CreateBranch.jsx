import React, { useEffect, useRef, useState } from "react";
import Input from "../components/AddProductForm/Input";
import CustomButton from "../components/AddProductForm/CustomButton";
import CustomLoader from "../components/CustomLoader";
import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast } from "react-hot-toast";
import { useStateContext } from "../../contexts/ContextProvider";
import Label from "../components/AddProductForm/Label";
import { Select } from "antd";


function CreateBranch() {
  const { Base_Url } = useStateContext();
  const [loader, setloader] = useState(false);
  const [Countries, setCountries] = useState([]);
  const [CountryID, setCountryID] = useState("");
  const [ApiFormData, setApiFormData] = useState({})
  const [States, setStates] = useState([]);
  const Token = localStorage.getItem("token");
  const [Cities, setCities] = useState([]);
  const [Photo, setPhoto] = useState("")
  const [IdProof, setIdProof] = useState("")
  const [AddressProof, setAddressProof] = useState("")
  const [ApplicationForm, setApplicationForm] = useState("")
  const [CancelationForm, setCancelationForm] = useState("")
  const [ParmanetsStates, setParmanetsStates] = useState([]);
  const [ParmanentCities, setParmanentCities] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([])

  const genders = [
    { name: "Male" },
    { name: "Female" },
  ]
  const education = [
    { name: "12th pass" },
    { name: "10th pass" },
    { name: "Diploma" },
    { name: "Bachelor's degree" },
    { name: "Master's degree" },
    { name: "Ph.D." },
    { name: "Professional certification" },
    { name: "Vocational training" },
    { name: "Other" },
  ];
  const GetAllCountries = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "X-CSCAPI-KEY",
      "ZzRCdFJRUjhGMnk5MEhublExMmRXczJXTHJwVTdjSFlabWZ1YVJZNQ=="
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // Make the API request when the component mounts
    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        const countryData = data.map((country) => ({
          id: country.iso2,
          name: country.name,
        }));
        setCountries(countryData);
      })
      .catch((error) => console.log("error", error));
  };
  const handleCountryChange = (e) => {
    let iso = e.target.value;
    Countries.map((el) => {
      if (iso === el.id) {
        setApiFormData({ ...ApiFormData, ["corresponding_country_name"]: el.name });
        setCountryID(el.id);
      }
    });

    var headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "ZzRCdFJRUjhGMnk5MEhublExMmRXczJXTHJwVTdjSFlabWZ1YVJZNQ=="
    );

    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    fetch(
      `https://api.countrystatecity.in/v1/countries/${iso}/states`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const StateData = result.map((country) => ({
          id: country.iso2,
          name: country.name,
        }));
        setStates(StateData);
      })
      .catch((error) => console.log("error", error));
  };
  const handleStateChange = (e) => {
    let iso = e.target.value;
    States.map((el) => {
      if (iso === el.id) {
        const foundState = StatesWithZones.find((state) => state.name === el.name);
        setApiFormData({ ...ApiFormData, ["zone"]: foundState.zone, ["coresponding_state_name"]: el.name });
      }
    });
    // CountryID
    var headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "ZzRCdFJRUjhGMnk5MEhublExMmRXczJXTHJwVTdjSFlabWZ1YVJZNQ=="
    );

    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    fetch(
      `https://api.countrystatecity.in/v1/countries/${CountryID}/states/${iso}/cities`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const CityData = result.map((country) => ({
          id: country.id,
          name: country.name,
        }));
        setCities(CityData);
      })
      .catch((error) => console.log("error", error));
  };
  const handleCityChange = (e) => {
    setApiFormData({ ...ApiFormData, ["coresponding_city_name"]: e.target.value });
  };
  useEffect(() => {
    GetAllCountries();
  }, []);
  const handleCheckboxAddressChange = (e) => {
    if (e.target.checked) {
      setApiFormData({
        ...ApiFormData,
        permanent_address1: ApiFormData.coresponding_address1,
        permanent_address2: ApiFormData.coresponding_address2,
        permanent_country_name: ApiFormData.corresponding_country_name,
        permanent_state_name: ApiFormData.coresponding_state_name,
        permanent_city_name: ApiFormData.coresponding_city_name,
        permanent_pincode: ApiFormData.coresponding_pincode,
      });
    } else {
      setApiFormData({
        ...ApiFormData,
        permanent_address1: "",
        permanent_address2: "",
        permanent_country_name: "",
        permanent_state_name: "",
        permanent_city_name: "",
        permanent_pincode: "",
      });

    }
  };
  const handleParmanentCountryChange = (e) => {
    let iso = e.target.value;
    Countries.map((el) => {
      if (iso === el.id) {
        setApiFormData({ ...ApiFormData, ["permanent_country_name"]: el.name });
        setCountryID(el.id);
      }
    });

    var headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "ZzRCdFJRUjhGMnk5MEhublExMmRXczJXTHJwVTdjSFlabWZ1YVJZNQ=="
    );

    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    fetch(
      `https://api.countrystatecity.in/v1/countries/${iso}/states`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const ParStateData = result.map((country) => ({
          id: country.iso2,
          name: country.name,
        }));
        setParmanetsStates(ParStateData);
      })
      .catch((error) => console.log("error", error));
  }
  const handleParmanrntStateChange = (e) => {
    let iso = e.target.value;
    ParmanetsStates.map((el) => {
      if (iso === el.id) {
        const foundState = StatesWithZones.find((state) => state.name === el.name);
        setApiFormData({ ...ApiFormData, ["zone"]: foundState.zone, ["permanent_state_name"]: el.name });
      }
    });
    // CountryID
    var headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "ZzRCdFJRUjhGMnk5MEhublExMmRXczJXTHJwVTdjSFlabWZ1YVJZNQ=="
    );

    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    fetch(
      `https://api.countrystatecity.in/v1/countries/${CountryID}/states/${iso}/cities`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const CityData = result.map((country) => ({
          id: country.id,
          name: country.name,
        }));
        setParmanentCities(CityData);
      })
      .catch((error) => console.log("error", error));
  };
  const handleParmanentCityChange = (e) => {
    setApiFormData({ ...ApiFormData, ["permanent_city_name"]: e.target.value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault()
    setloader(true)
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var formdata = new FormData();
    selectedTypes.map((el) => {
      formdata.append("user_type[]", el);
    })
    formdata.append("first_name", ApiFormData.first_name);
    formdata.append("last_name", ApiFormData.last_name);
    formdata.append("gender", ApiFormData.gender);
    formdata.append("date_of_birth", ApiFormData.date_of_birth);
    formdata.append("coresponding_address1", ApiFormData.coresponding_address1);
    formdata.append("coresponding_address2", ApiFormData.coresponding_address2);
    formdata.append("coresponding_city_name", ApiFormData.coresponding_city_name);
    formdata.append("coresponding_state_name", ApiFormData.coresponding_state_name);
    formdata.append("corresponding_country_name", ApiFormData.corresponding_country_name);
    formdata.append("coresponding_pincode", ApiFormData.coresponding_pincode);
    formdata.append("permanent_address1", ApiFormData.permanent_address1);
    formdata.append("permanent_address2", ApiFormData.permanent_address2);
    formdata.append("permanent_city_name", ApiFormData.permanent_city_name);
    formdata.append("permanent_state_name", ApiFormData.permanent_state_name);
    formdata.append("permanent_country_name", ApiFormData.permanent_country_name);
    formdata.append("permanent_pincode", ApiFormData.permanent_pincode);
    formdata.append("Education", ApiFormData.Education);
    formdata.append("Qualification", ApiFormData.Qualification);
    formdata.append("Experience_in_year", ApiFormData.Experience_in_year);
    formdata.append("Industry", ApiFormData.Industry);
    formdata.append("department", ApiFormData.department);
    formdata.append("personal_mobile_no", ApiFormData.personal_mobile_no);
    formdata.append("office_mobile_no", ApiFormData.office_mobile_no);
    formdata.append("email_id", ApiFormData.email_id);
    formdata.append("alternate_email_id", ApiFormData.alternate_email_id);
    formdata.append("date_of_joining", ApiFormData.date_of_joining);
    formdata.append("photo", Photo);
    formdata.append("Id_proof", IdProof);
    formdata.append("Address_proof", AddressProof);
    formdata.append("Application_form", ApplicationForm);
    formdata.append("branch_name", ApiFormData.branch_name);
    formdata.append("reporting_emp_name", ApiFormData.reporting_emp_name);
    formdata.append("cancellation_form", CancelationForm);
    formdata.append("zone", ApiFormData.zone);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${Base_Url}Add/Hub`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === 200) {
          setloader(false)
          toast.success("Hub Created Successfully");
        }
      })
      .catch(error => console.log('error', error));

  };
  const StatesWithZones = [

    {
      name: "Jammu and Kashmir",
      zone: "North"
    },
    {
      name: "Himachal Pradesh",
      zone: "North"
    },
    {
      name: "Punjab",
      zone: "North"
    },
    {
      name: "Haryana",
      zone: "North"
    },
    {
      name: "Uttarakhand",
      zone: "North"
    },
    {
      name: "Uttar Pradesh",
      zone: "North"
    },
    {
      name: "Delhi (National Capital Territory)",
      zone: "North"
    },
    {
      name: "Chhattisgarh",
      zone: "North"
    },


    // Western
    {
      name: "Rajasthan",
      zone: "West"
    },
    {
      name: "Gujarat",
      zone: "West"
    },
    {
      name: "Maharashtra",
      zone: "West"
    },
    {
      name: "Goa",
      zone: "West"
    },
    {
      name: "Dadra and Nagar Haveli and Daman and Diu (merged Union Territory)",
      zone: "West"
    },
    {
      name: "Madhya Pradesh",
      zone: "West"
    },

    // East
    {
      name: "Bihar",
      zone: "East"
    },
    {
      name: "Jharkhand",
      zone: "East"
    },
    {
      name: "Odisha",
      zone: "East"
    },
    {
      name: "West Bengal",
      zone: "East"
    },
    {
      name: "Sikkim",
      zone: "East"
    },

    // NorthEast
    {
      name: "Assam",
      zone: "NorthEast"
    },
    {
      name: "Arunachal Pradesh",
      zone: "NorthEast"
    },
    {
      name: "Manipur",
      zone: "NorthEast"
    },
    {
      name: "Meghalaya",
      zone: "NorthEast"
    },
    {
      name: "Mizoram",
      zone: "NorthEast"
    },
    {
      name: "Nagaland",
      zone: "NorthEast"
    },
    {
      name: "Tripura",
      zone: "NorthEast"
    },


    // Southern
    {
      name: "Andhra Pradesh",
      zone: "South"
    },
    {
      name: "Telangana",
      zone: "South"
    },
    {
      name: "Karnataka",
      zone: "South"
    },
    {
      name: "Tamil Nadu",
      zone: "South"
    },
    {
      name: "Kerala",
      zone: "South"
    },
    {
      name: "Puducherry (Union Territory)",
      zone: "South"
    },
    {
      name: "Lakshadweep (Union Territory)",
      zone: "South"
    },
    {
      name: "Andaman and Nicobar Islands (Union Territory)",
      zone: "South"
    }
  ];
  const handleTypeChange = async (values) => {
    setSelectedTypes(values);
  }
  const userType = [
    { value: 1, label: "BM" },
    { value: 2, label: "CS" },
    { value: 3, label: "i Partner" },
  ]

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
        <form onSubmit={handleOnSubmit}>
          <div className="m-5 py-3 px-5 rounded-2xl bg-slate-200">
            <div className="flex flex-col gap-5">
              <div>
                <Label label="Basic Details" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                <div>
                  <Label label="USER TYPE" />
                  <Select
                    mode="multiple"
                    allowClear
                    onChange={handleTypeChange}
                    style={{
                      width: '100%',
                      overflowY: "scroll"
                    }}
                    maxTagCount={2}
                    placeholder="Please Select User Type"
                    options={userType.map(option => ({
                      ...option,
                      disabled: (selectedTypes.includes(1) && option.value === 2) || (selectedTypes.includes(2) && option.value === 1)
                    }))}
                  />
                  {/* <select
                    style={{ borderRadius: "5px" }}
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["user_type"]: e.target.value,
                      });
                    }}
                    id="gender"
                    className="bg border text-black  border-gray-200 f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight font-bold"
                    required
                  >
                    <option className="text-gray-400 font-bold" disabled selected>
                      --Select--
                    </option>
                    {userType.map((user, index) => (
                      <option
                        key={index}
                        className=" font-bold"
                        value={user.id}
                      >
                        {user.name}
                      </option>
                    ))}
                  </select> */}
                </div>
                <div>
                  <Label label="First Name" />
                  <Input
                    placeholder="Enter First Name"
                    type="text"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["first_name"]: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* Last name */}
                <div>
                  <Label label="Last Name" />
                  <Input
                    placeholder="Enter Last Name"
                    type="text"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["last_name"]: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* select gender */}

                <div>
                  <Label label="Select Gender" />
                  <select
                    style={{ borderRadius: "5px" }}
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["gender"]: e.target.value,
                      });
                    }}
                    id="gender"
                    required
                    className="bg border  border-gray-200 f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight font-bold"
                  >
                    <option className="text-gray-400 font-bold" disabled selected>
                      Select Gender
                    </option>
                    {genders.map((gen, index) => (
                      <option
                        key={index}
                        className=" font-bold"
                        value={gen.name}
                      >
                        {gen.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* DATE OF BIRTH  */}

                <div>
                  <Label label="Date Of Birth" />
                  <div className="date-picker">
                    <Input
                      type="date"
                      name="branchName"
                      onChange={(e) => {
                        setApiFormData({
                          ...ApiFormData,
                          ["date_of_birth"]: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Corespondence Address */}
              <div>
                <Label label="Corespondence Address" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
                {/* address in row 4 */}
                <div>
                  <Label label="Adress1" />
                  <Input
                    placeholder="Enter Adress1"
                    type="text"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["coresponding_address1"]: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <Label label="Adress2" />
                  <Input
                    placeholder="Enter Adress2"
                    type="text"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["coresponding_address2"]: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* country */}
                <div>
                  <Label label="Select Country" />
                  <select
                    style={{ borderRadius: "5px" }}
                    onChange={handleCountryChange}
                    // onChange={(e) => {
                    //   setApiFormData({
                    //     ...ApiFormData,
                    //     ["country"]: e.target.value,
                    //   });
                    // }}
                    id="countries"
                    className="bg border text-gray-400 border-gray-200 f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
                  >
                    <option className="text-gray-400 font-bold" disabled selected>
                      Select Country
                    </option>
                    {Countries.map((country, index) => (
                      <option
                        key={index}
                        className="text-gray-400 font-bold"
                        value={country.id}
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* state */}
                <div>
                  <Label label="Select State" />
                  <select
                    style={{ borderRadius: "5px" }}
                    onChange={handleStateChange}
                    id="countries"
                    className="bg border text-gray-400 border-gray-200 f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
                  >
                    <option className="text-gray-400 font-bold" disabled selected>
                      Select State
                    </option>
                    {States.map((country, index) => (
                      <option
                        key={index}
                        className="text-gray-400 font-bold"
                        value={country.id}
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* city */}

                <div>
                  <Label label="Select City" />
                  <select
                    style={{ borderRadius: "5px" }}
                    onChange={handleCityChange}
                    id="countries"
                    className="bg border text-gray-400 border-gray-200 f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
                  >
                    <option className="text-gray-400 font-bold" disabled selected>
                      Select City
                    </option>
                    {Cities.map((country, index) => (
                      <option
                        key={index}
                        className="text-gray-400 font-bold"
                        value={country.name}
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* pincode */}
                <div>
                  <Label label="Pincode" />
                  <Input
                    placeholder="Enter Pincode"
                    type="number"
                    maxLength="6"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["coresponding_pincode"]: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center">
                  <input

                    type="checkbox"
                    value="1"
                    onChange={handleCheckboxAddressChange}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2 f02 font-semibold">Same as above</span>
                </label>
              </div>
              <div>
                <Label label="Permanent Address" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
                {/* address in row 4 */}
                <div>
                  <Label label="Adress1" />
                  <Input
                    placeholder="Enter Adress1"
                    type="text"
                    name="branchName"
                    value={ApiFormData.permanent_address1}
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["permanent_address1"]: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <Label label="Adress2" />
                  <Input
                    placeholder="Enter Adress2"
                    type="text"
                    name="branchName"
                    value={ApiFormData.permanent_address2}
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["permanent_address2"]: e.target.value,
                      });
                    }}
                  />
                </div>

                {/* country */}
                <div>
                  <Label label="Select Country" />
                  <select
                    style={{ borderRadius: "5px" }}
                    onChange={handleParmanentCountryChange}
                    id="countries"
                    className="bg border text-gray-400 border-gray-200 f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
                    required
                  >
                    {
                      ApiFormData.permanent_country_name ?
                        <option className="text-gray-400 font-bold" selected value={ApiFormData.permanent_country_name}>
                          {ApiFormData.permanent_country_name}
                        </option> :
                        <option className="text-gray-400 font-bold" disabled selected>
                          Select Country
                        </option>
                    }
                    {Countries.map((country, index) => (
                      <option
                        key={index}
                        className="text-gray-400 font-bold"
                        value={country.id}
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* state */}
                <div>
                  <Label label="Select State" />
                  <select
                    style={{ borderRadius: "5px" }}
                    onChange={handleParmanrntStateChange}
                    required
                    id="countries"
                    className="bg border text-gray-400 border-gray-200 f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
                  >
                    {
                      ApiFormData.permanent_state_name ?
                        <option className="text-gray-400 font-bold" selected value={ApiFormData.permanent_state_name}>
                          {ApiFormData.permanent_state_name}
                        </option> :
                        <option className="text-gray-400 font-bold" disabled selected>
                          Select State
                        </option>
                    }
                    {ParmanetsStates.map((state, index) => (
                      <option
                        key={index}
                        className="text-gray-400 font-bold"
                        value={state.id}
                      >
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* city */}
                <div>
                  <Label label="Select City" />
                  <select
                    style={{ borderRadius: "5px" }}
                    required
                    onChange={handleParmanentCityChange}
                    id="countries"
                    className="bg border text-gray-400 border-gray-200 f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
                  >
                    {
                      ApiFormData.permanent_city_name ?
                        <option className="text-gray-400 font-bold" selected value={ApiFormData.permanent_city_name}>
                          {ApiFormData.permanent_city_name}
                        </option> :
                        <option className="text-gray-400 font-bold" disabled selected>
                          Select City
                        </option>
                    }
                    {ParmanentCities.map((city, index) => (
                      <option
                        key={index}
                        className="text-gray-400 font-bold"
                        value={city.name}
                      >
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* pincode */}
                <div>
                  <Label label="Pincode" />
                  <Input
                    placeholder="Enter Picode"
                    type="text"
                    name="branchName"
                    maxLength="6"
                    value={ApiFormData.permanent_pincode}
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["permanent_pincode"]: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <Label label="Educactional qualification" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                <div>
                  <Label label="Select Qualification" />
                  <select
                    style={{ borderRadius: "5px" }}
                    required
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["Qualification"]: e.target.value,
                      });
                    }}
                    id="gender"
                    className="bg border text-gray-400 border-gray-200 f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
                  >
                    <option className="text-gray-400 font-bold" disabled selected>
                      Select Qualification
                    </option>
                    {education.map((edu, index) => (
                      <option
                        key={index}
                        className="text-gray-400 font-bold"
                        value={edu.name}
                      >
                        {edu.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label label="Education*" />
                  <Input
                    placeholder="Enter Education"
                    type="text"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["Education"]: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <Label label="Experience in Year" />
                  <Input
                    placeholder="Enter Experience in Year"
                    type="number"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["Experience_in_year"]: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <Label label="Industry" />
                  <Input
                    placeholder="Enter Industry"
                    type="text"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["Industry"]: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <Label label="Internal Details" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div>
                  <Label label="Department" />
                  <Input
                    placeholder="Enter Department"
                    type="text"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["department"]: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <Label label="Personal Mobile Number" />
                  <Input
                    placeholder="Enter Personal Mobile Number"
                    type="number"
                    maxLength="10"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["personal_mobile_no"]: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <Label label="Official Mobile Number" />
                  <Input
                    placeholder="Enter Official Mobile Number"
                    type="number"
                    name="branchName"
                    maxLength="10"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["office_mobile_no"]: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* email id */}
                <div>
                  <Label label="Email ID" />
                  <Input
                    placeholder="Enter Email ID"
                    type="email"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["email_id"]: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* alternate email id */}
                <div>
                  <Label label="Alternate Email ID" />
                  <Input
                    placeholder="Enter Alternate Email ID"
                    type="email"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["alternate_email_id"]: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* date of joining */}
                <div>
                  <Label label="Date of Joining" />
                  <Input
                    placeholder="Enter Date of Joining"
                    type="date"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["date_of_joining"]: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <Label label="Reporting Employee Name" />
                  <Input
                    placeholder="Enter Reporting Employee Name"
                    type="text"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["reporting_emp_name"]: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <Label label="Basic Details of Employee" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                <div className="text-center">
                  <Label label="Photo" />
                  <div className="relative">
                    <input
                      className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded f01 py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
                      id="multiple_files"
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <Label label="ID Proof" />
                  <div className="relative">
                    <input
                      required
                      className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded f01 py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
                      id="multiple_files"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setIdProof(e.target.files[0])}

                    />
                  </div>
                </div>
                <div className="text-center">
                  <Label label="Address Proof" />
                  <div className="relative">
                    <input
                      className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded f01 py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
                      id="multiple_files"
                      type="file"
                      required
                      accept="image/*"
                      onChange={(e) => setAddressProof(e.target.files[0])}


                    />
                  </div>
                </div >
                <div className="text-center">
                  <Label label="Application Form" />
                  <div className="relative">
                    <input
                      className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded f01 py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
                      id="multiple_files"
                      required
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setApplicationForm(e.target.files[0])}

                    />
                  </div>
                </div>

                <div className="text-center">
                  <Label label="Cancellation Check" />
                  <div className="relative">
                    <input
                      className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded f01 py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
                      id="multiple_files"
                      type="file"
                      accept=".pdf"
                      required
                      onChange={(e) => setCancelationForm(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
              <div className="flex mt-5 justify-center">
                <CustomButton
                  type={1}
                  Title="Submit"
                  BgColor="#fa5b05"
                />
              </div>
            </div>
          </div>
        </form>

      )
      }
    </>
  );
}

export default CreateBranch;
