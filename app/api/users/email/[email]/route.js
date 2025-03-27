import { NextResponse } from "next/server";
import UserDao from "@/app/dao/user.dao";

const userDao = new UserDao();

export async function GET(request, {params}) {
  try {
    const { email } = await params;
    const payload = await userDao.getUserByEmail(email.toLowerCase());
    if(!payload) return NextResponse.json({ message: "Usuario no encontrado.." });
    return NextResponse.json({ message: "Todos los usuarios..", payload }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error interno del servidor.", error: error.message }, { status: 500 });
  }
};