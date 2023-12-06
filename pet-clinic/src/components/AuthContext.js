import { createContext, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
};
