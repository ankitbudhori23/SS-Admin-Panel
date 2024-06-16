import React, { lazy, useEffect } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setuser } from "./features/common/userSlice";
import CheckAuth from "./app/auth";
import initializeApp from "./app/init";
import { useNavigate } from "react-router-dom";

// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));

// Initializing different libraries
initializeApp();

// Check for login and initialize axios
const token = CheckAuth();

function App() {
  const dispatch = useDispatch();
  const nav=useNavigate();
  const verify =async ()=>{
      document.body.classList.add('loading-indicator');
      await axios
        .get("/auth")
        .then((res) => {
          dispatch(setuser(res.data.data))
          nav("/app/dashboard",{replace:true});
          })
        .catch((res) => {
          console.log(res);
        });

        document.body.classList.remove('loading-indicator');
  }

  useEffect(() => {
    localStorage.getItem("token") && verify();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Place new routes over this */}
        <Route path="/app/*" element={<Layout />} />

        <Route
          path="*"
          element={
            <Navigate to={token ? "/app/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
