import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [fetchingData, setFetchingData] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Everytime token is changed or component mounts
  // Also everytime user refreshes
  // Note that this/redirecting doesn't work if there is a token but it's not correct
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [token, navigate]);

  // Login only fetches and updates states
  const login = async (email, password) => {
    setFetchingData(true); // "loading" so that we can set button disabled etc.

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(response.status + " Invalid email or password");
        }
        throw new Error("Failed to login: " + response.status);
      }

      const data = await response.json();
      console.log("Login successful. Access Token:", data.access_token);
      localStorage.setItem("userEmail", email);
      setToken(data.access_token);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setFetchingData(false);
    }
  };

  // Provider values which we use with custom useAuth hook
  const value = {
    login,
    error,
    token,
    fetchingData,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Only allow access if there is a token*/}
      {token ? children : <Login />}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
