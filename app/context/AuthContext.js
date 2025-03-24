"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [ logged, setLogged ] = useState(false);
  const [ user, setUser ] = useState(null);
  const [ nombre, setNombre ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const router = useRouter();

  useEffect(() => {
    
  }, []);

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      setEmail("");
      setPassword("");
      alert("Login realizado con exito..");
      router.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async(e) => {
    e.preventDefault();
    try {
      await logoutUser();
      alert("logout realizado con exito..");
      router.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      await registerUser();
      setNombre("");
      setEmail("");
      setPassword("");
      alert("Register realizado con exito..");
      router.push("/pages/auth/login");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleProfile = async() => {
    try {
      await profileUser();
    } catch (error) {
      alert(error.message);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setLogged(true);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logoutUser = async() => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if(!response.ok) throw new Error(data.message);
      setLogged(false);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const registerUser = async() => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, password }),
      });
      const data = await response.json();
      if(!response.ok) throw new Error(data.message);
      setUser(data);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const profileUser = async() => {
    try {
      const response = await fetch(`/api/users/`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if(!response.ok) throw new Error(data.message);
      setUser(data);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ logged, user, nombre, setNombre, email, setEmail, password, setPassword, handleLogin, handleLogout, handleRegister, handleProfile }}>
      {children}
    </AuthContext.Provider>
  );
};