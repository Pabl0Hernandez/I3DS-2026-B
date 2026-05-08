import { useState } from "react";
import { AuthContext } from "./AuthContext";

function getInitialUser() {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    localStorage.removeItem("user");
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  function login(userData) {
    const userPayload = {
      nome: userData.nome ?? userData.username ?? userData.email ?? "",
      tipo: userData.tipo ?? userData.role ?? "CLIENTE",
      email: userData.email ?? userData.username ?? "",
    };

    setUser(userPayload);
    localStorage.setItem("user", JSON.stringify(userPayload));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  function switchUser() {
    if (!user) return;
    const newTipo = user.tipo === "ADMIN" ? "CLIENTE" : "ADMIN";
    const userData = { ...user, tipo: newTipo };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, switchUser }}>
      {children}
    </AuthContext.Provider>
  );
}
