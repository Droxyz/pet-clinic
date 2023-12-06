import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NotFoundPage from "./NotFoundPage";
import { useEffect } from "react";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "../components/AuthContext";

export default function App() {
  return (
    <>
      <Container
        style={{ minHeight: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <BrowserRouter>
          <AuthProvider>
            <Navigate to="/login" replace="true"></Navigate>
            <Routes>
              <Route path="/" />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </Container>
    </>
  );
}
