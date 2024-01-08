import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "../components/AuthContext";
import DashBoard from "./DashBoard";

export default function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<DashBoard/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}
