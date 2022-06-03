import React, { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { api, createSession, createUser, getIsAdm } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdm, setIsAdm] = useState(false);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("token");

    if (recoveredUser) {
      setToken(recoveredUser);
      api.defaults.headers.Authorization = `Bearer ${recoveredUser}`;
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await createSession(email, password);

    const token = response.data;

    localStorage.setItem("token", token);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    toast.success("Login bem sucedido");
    setToken(token);
    const response2 = await getIsAdm();
    setIsAdm(response2.data)
    navigate("/");
  };

  const register = async (username, email, password) => {
    await createUser(username, email, password);

    toast.success("Usuário registrado com sucesso");

    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setToken(null);
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{
        authenticated: !!token,
        token,
        loading,
        login,
        register,
        logout,
        isAdm
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
