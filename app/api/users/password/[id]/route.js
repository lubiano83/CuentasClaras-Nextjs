import { NextResponse } from "next/server";
import UserDao from "@/app/dao/user.dao";
import { createHash } from "@/app/utils/bcrypt.utils";

const userDao = new UserDao();

export async function PATCH(request, {params}) {
  try {
    const { id } = await params;
    const { password } = await request.json();
    if (String(password).length < 6 || String(password).length > 10) return NextResponse.json({ message: "La contraseña debe tener entre 6 y 10 caracteres.." }, { status: 400 });
    const user = await userDao.getUserById(Number(id));
    if(!user) return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    const hashedPassword =  await createHash(String(password));
    await userDao.changePassword(id, hashedPassword);
    return NextResponse.json({ message: "Contraseña actualizada correctamente.." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error interno del servidor.", error:error.message }, { status: 500 });
  }
};