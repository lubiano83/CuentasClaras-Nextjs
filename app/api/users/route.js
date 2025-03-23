import { NextResponse } from "next/server";
import UserDao from "@/app/dao/user.dao";

const userDao = new UserDao();

export async function GET() {
    try {
        const users = await userDao.getUsers();
        return NextResponse.json({ message: "Todos los usuarios..", users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor.", error:error.message }, { status: 500 });
    }
};

export async function DELETE() {
    try {
      const users = await userDao.truncateUsers();
      return NextResponse.json({ message: "Usuarios eliminados con exito..", users }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error interno del servidor.", error:error.message }, { status: 500 });
    }
};