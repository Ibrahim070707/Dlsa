import React, { useState } from "react";
import "./newLogin.css";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import { useStateContext } from "./contexts/ContextProvider";
import { Toaster, toast } from "react-hot-toast";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bg1 from "./assets/video.mp4";
import crmLogo from "./Admin/data/crmLogo2.png";
// crmLogo2.png
function Login({ setLoginValid }) {
  const { Base_Url } = useStateContext();
  const [FormData, setFormData] = useState({ username: "", password: "" });
  const [ButtonDisabled, setButtonDisabled] = useState(false);
  const handleLogin = () => {
    if (FormData.username) {
      if (FormData.password) {
        setButtonDisabled(true);
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          username: FormData.username,
          password: FormData.password,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${Base_Url}Adminlogin`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.Status === 200) {
              setButtonDisabled(false);
              localStorage.setItem("IsLoggedIn", "true");
              localStorage.setItem("data", JSON.stringify(result.Data));
              localStorage.setItem("token", result.Token);
              setLoginValid(true);
            } else if (result.Status === 420) {
              toast.error("Invalid UserName");
              setButtonDisabled(false);
            } else if (result.Status === 421) {
              toast.error("Incorrect Password");
              setButtonDisabled(false);
            }
          })
          .catch((error) => console.log("LoginError", error));
      } else {
        toast.error("Password Field Is Required");
      }
    } else {
      toast.error("UserName Field Is Required");
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
          duration: 2000,
        }}
      />
      <div className="BgVideo">
        <video
          src={bg1}
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        ></video>
      </div>
      <img src={crmLogo} alt="" width="80px" className="absolute top-6 left-6" />
      <div className="body">
        <form return="false">
          <section className="flex flex-col ">
            <h1 style={{ fontFamily: "Poppins", color: "white" }} >Admin Login Page</h1>
            <div className="inputbox mt-4">
              <input
                type="test"
                required
                onChange={(e) => {
                  setFormData({ ...FormData, ["username"]: e.target.value });
                  setButtonDisabled(false);
                }}
              />
              <label
                htmlFor=""
                style={{ display: "flex", alignItems: "center" }}
              >
                <FaRegEnvelope
                  style={{ fontSize: "25px" }}
                  className="text-white mr-2"
                />
                UserName
              </label>
            </div>
            <div className="inputbox mt-7">
              <input
                type="password"
                required
                onChange={(e) => {
                  setFormData({ ...FormData, ["password"]: e.target.value });
                  setButtonDisabled(false);
                }}
              />
              <label
                htmlFor=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FaLock
                  className="text-white mr-2"
                  style={{ fontSize: "25px" }}
                />
                Password
              </label>
            </div>
            {ButtonDisabled ? (
              <div className="flex my-5 justify-center items-center">
                <div className="lds-ring mt-7 text-white">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <button className="LoginBtn mt-7" onClick={handleLogin}>
                Log in
              </button>
            )}
          </section>
        </form>
      </div>
    </>
  );
}

export default Login;
