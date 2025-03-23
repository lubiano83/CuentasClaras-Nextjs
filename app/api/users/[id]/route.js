import { NextResponse } from "next/server";
import UserDao from "@/app/dao/user.dao";

const userDao = new UserDao();

export async function GET(request, {params}) {
  try {
    const { id } = await params;
    const payload = await userDao.getUserById(Number(id));
    if(!payload) return NextResponse.json({ message: "Usuario no encontrado.." });
    return NextResponse.json({ message: "Todos los usuarios..", payload }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error interno del servidor.", error:error.message }, { status: 500 });
  }
};

export async function DELETE(request, {params}) {
  try {
    const { id } = await params;
    const user = await userDao.getUserById(Number(id));
    if(!user) return NextResponse.json({ message: "Usuario no encontrado.." });
    await userDao.deleteUserById(Number(id));
    return NextResponse.json({ message: "Usuario eliminado con exito.." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error interno del servidor.", error:error.message }, { status: 500 });
  }
};

export async function PUT(request, {params}) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { nombre, email } = data;
    if(!nombre, !email) return NextResponse.json({ message: "Todos los campos son requeridos.." }, { status: 400 });
    const user = await userDao.getUserById(Number(id));
    if(!user) return NextResponse.json({ message: "Usuario no encontrado.." }, { status: 404 });
    const updatedUser = { nombre: nombre.toLowerCase(), email: email.toLowerCase() };
    await userDao.updateUser(Number(id), updatedUser);
    return NextResponse.json({ message: "Usuario modificado con exito..", user: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error interno del servidor.", error:error.message }, { status: 500 });
  }
};

