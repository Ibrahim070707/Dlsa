import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Navbar, Sidebar, ThemeSettings } from "../src/Admin/components";
import "./App.css";
import { useStateContext } from "../src/contexts/ContextProvider";

// Admin Imports
import {
  AdminAddEmployee,
  AdminAllIds,
  AdminAllocation,
  AdminBusinessReports,
  AdminCSRReport,
  AdminCases,
  AdminCaseList,
  AdminCaseUpdate,
  AdminCreateBranch,
  AdminDashboard,
  AdminListBranch,
  AdminListEmployee,
  AdminReAllocation,
  AdminUpdateBranch,
} from "./Admin/imports";
import Login from "./Login";
import NonFound from "./Admin/pages/NonFound";

const App = () => {
  const { currentMode, activeMenu, themeSettings, setCurrentMode } =
    useStateContext();
  const LoginValid = sessionStorage.getItem("LoginValid");
  const ChangeState = (e) => {
    if (e === false) {
      sessionStorage.removeItem("LoginValid");
    } else {
      sessionStorage.setItem("LoginValid", true);
    }
    window.location.reload();
  };
  const [OnChangeTheme, setOnChangeTheme] = useState("light");
  return (
    <>
      <BrowserRouter basename="/">
        {LoginValid ? (
          <div className={OnChangeTheme}>
            <div className="flex relative dark:bg-main-dark-bg">
              {activeMenu ? (
                <div
                  className="fixed sidebar dark:bg-secondary-dark-bg "
                  style={{
                    width: "15%",
                    transition: "0.5s",
                    backgroundColor: "#33373E",
                    color: "white",
                  }}
                >
                  <Sidebar />
                </div>
              ) : (
                <div
                  className="w-0 dark:bg-secondary-dark-bg"
                  style={{ transition: "0.5s" }}
                >
                  <Sidebar />
                </div>
              )}
              <div
                className={
                  activeMenu
                    ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen w-full ML15  "
                    : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
                }
              >
                <div className="fixed md:static dark:bg-main-dark-bg navbar w-full ">
                  <Navbar
                    OnChangeState={ChangeState}
                    OnChangeTheme={setOnChangeTheme}
                  />
                </div>
                <div style={{ height: "auto" }}>
                  {themeSettings && <ThemeSettings />}

                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/AddBranch" element={<AdminCreateBranch />} />
                    <Route path="/ListBranch" element={<AdminListBranch />} />
                    <Route
                      path="/UpdateBranch/:id"
                      element={<AdminUpdateBranch />}
                    />
                    <Route path="/Allocation" element={<AdminAllocation />} />
                    <Route
                      path="/ReAllocation"
                      element={<AdminReAllocation />}
                    />
                    <Route path="/AllIds" element={<AdminAllIds />} />
                    <Route path="/AddEmployee" element={<AdminAddEmployee />} />
                    <Route
                      path="/ListEmployee"
                      element={<AdminListEmployee />}
                    />
                    <Route path="/Cases" element={<AdminCases />} />
                    <Route
                      path="/CaseUpdate/:id"
                      element={<AdminCaseUpdate />}
                    />
                    <Route path="/CaseList" element={<AdminCaseList />} />
                    <Route
                      path="/BusinessReports"
                      element={<AdminBusinessReports />}
                    />
                    <Route path="/CsrReports" element={<AdminCSRReport />} />
                    <Route path="*" element={<NonFound />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login setLoginValid={ChangeState} />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};
export default App;
