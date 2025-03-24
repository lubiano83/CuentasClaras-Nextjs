"use client";
import React from "react";
import { useAuth } from "@/app/hooks/useAuth";

const LoginForm = () => {

  const { handleLogin, email, setEmail, password, setPassword } = useAuth();

  return (
    <div className="flex justify-center items-center w-full h-full">
      <form onSubmit={handleLogin} className="flex flex-col justify-center items-center gap-4 bg-gray-900 p-8 rounded-xl border-2 border-white shadow-md">
        <h1 className="underline text-xl text-white font-bold">Login:</h1>
        <input type="email" required placeholder="Ingresa tu Email.." className="border-2 rounded-lg h-8 w-64 px-2 border-white text-white" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" required placeholder="Ingresa tu Password.." className="border-2 rounded-lg h-8 w-64 px-2 border-white text-white" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded-lg border-2 border-white">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginForm;