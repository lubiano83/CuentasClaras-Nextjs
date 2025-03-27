import { NextResponse } from "next/server";
import UserDao from "@/app/dao/user.dao";

const userDao = new UserDao();

export async function PATCH(request, {params}) {
  try {
    const { id } = await params;
    const { role } = await request.json();
    const user = await userDao.getUserById(Number(id));
    if(!user) return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    const rolesPermitidos = ["usuario", "premium", "developer"];
    if (!rolesPermitidos.includes(role)) return NextResponse.json({ message: "Rol inválido. Los roles permitidos son: usuario, premium, developer." }, { status: 400 });
    await userDao.changeRole(id, role);
    return NextResponse.json({ message: "Role actualizado correctamente.." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error interno del servidor.", error: error.message }, { status: 500 });
  }
};