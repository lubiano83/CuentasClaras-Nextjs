import { NextResponse } from "next/server";
import UserDao from "@/app/dao/user.dao";
import { createHash } from "@/app/utils/bcrypt.utils"; 

const userDao = new UserDao();

export async function POST(request) {
    try {
        const data = await request.json();
        const { nombre, email, password } = data;
        if (!nombre || !email || !password) return NextResponse.json({ message: "Todos los campos son requeridos.." }), { status: 400 };
        const existingUser = await userDao.getUserByEmail(email.toLowerCase());
        if (existingUser) return NextResponse.json({ message: "Ese usuario ya está registrado.." }, { status: 409 });
        if (password.length < 6 || password.length > 10) return NextResponse.json({ message: "La contraseña debe tener entre 6 y 10 caracteres.." }, { status: 400 });
        const hashedPassword =  await createHash(String(password));
        const newUser = { nombre: nombre.toLowerCase(), email: email.toLowerCase(), password: hashedPassword };
        await userDao.addUser(newUser);
        const payload = await userDao.getUserByEmail(email.toLowerCase());
        return NextResponse.json({ message: "Usuario registrado con exito..", payload }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor.", error:error.message }, { status: 500 });
    };
};