import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import UserDao from "@/app/dao/user.dao";
import { isValidPassword } from "@/app/utils/bcrypt.utils";
import jwt from "jsonwebtoken";

const userDao = new UserDao();

export async function POST(request) {
  try {
    const data = await request.json();
    const { email, password } = data;
    if (!email || !password) return NextResponse.json({ message: "Todos los campos son requeridos.." }, { status: 400 });
    const cookieStore = await cookies();
    const userLogged = cookieStore.get(process.env.COOKIE_NAME)?.value;
    if (userLogged) return NextResponse.json({ message: "Ese usuario ya está logeado.." }, { status: 400 });
    const user = await userDao.getUserByEmail(email.toLowerCase());
    if (!user) return NextResponse.json({ message: "Ese usuario no está registrado.." }, { status: 404 });
    if (!user.password) return NextResponse.json({ message: "Usuario sin contraseña válida." }, { status: 400 });
    const passwordMatch = await isValidPassword(user, String(password));
    if (!passwordMatch) return NextResponse.json({ message: "La contraseña es incorrecta.." }, { status: 401 });
    const token = jwt.sign({ nombre: user.nombre.toLowerCase(), email: user.email, id: user.id, role: user.role }, process.env.COOKIE_KEY, { expiresIn: "1h" });
    cookieStore.set({ name: process.env.COOKIE_NAME, value: token, httpOnly: true, maxAge: 3600, secure: process.env.NODE_ENV === "production", sameSite: "none", path: "/" });
    return NextResponse.json({ message: "Login realizado con éxito", token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error interno del servidor.", error: error.message },{ status: 500 });
  }
}
