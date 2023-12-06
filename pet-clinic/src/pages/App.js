import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NotFoundPage from "./NotFoundPage";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "../components/AuthContext";
import DashBoard from "./DashBoard";

export default function App() {
  return (
    <Container
      style={{ minHeight: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/">
              <Route path="" element={<DashBoard/>}/>
              <Route path="pets" element={<>petsss</>} />
              <Route path="pets/:id" element={<>id</>} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Container>
  );
}