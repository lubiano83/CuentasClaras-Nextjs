"use client";
import React, { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";

const LoginForm = () => {

  const { loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Credenciales inválidas: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 bg-gray-700 bg-opacity-75 p-8 rounded-xl border-2 border-white shadow-lg">
        <h1 className="underline text-xl text-white font-bold">Login:</h1>
        <input type="email" required placeholder="Ingresa tu Email.." className="border-2 rounded-lg h-8 w-64 px-2 border-white text-white" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" required placeholder="Ingresa tu Password.." className="border-2 rounded-lg h-8 w-64 px-2 border-white text-white" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <div className="flex justify-center items-center gap-2">
            <Link href={"/app/pages/users/auth/register/page"}>
                <button className="bg-blue-600 text-white px-4 py-1 rounded-lg border-2 border-white">Registrar</button>
            </Link>
            <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded-lg border-2 border-white">Ingresar</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;