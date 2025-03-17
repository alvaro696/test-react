import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { message } from "antd";
import { defineAbilitiesFor } from "../abilities"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") return null;
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parseando el usuario almacenado:", error);
      return null;
    }
  });

  const [ability, setAbility] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        return defineAbilitiesFor(parsedUser);
      } catch (error) {
        console.error("Error al establecer la ability inicial:", error);
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      console.log("Intentando iniciar sesión con:", username, password);
      const response = await api.post("/api/auth/login", { username, password });
      const { token: jwtToken, user: userData } = response.data;

      setUser(userData);
      setToken(jwtToken);
      const newAbility = defineAbilitiesFor(userData);
      setAbility(newAbility);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", jwtToken);

      api.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

      navigate("/dashboard");
      //window.location.href = "http://localhost:8080/unisersoft_bk/dashboard.php?user=" + userData.username;
    } catch (error) {
      console.error("Error en el login:", error);
      message.error("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAbility(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, ability, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
