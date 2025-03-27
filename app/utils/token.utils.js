import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getUserFromToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(process.env.COOKIE_NAME)?.value;

    if (!token) throw new Error('Token no encontrado..');

    const decoded = jwt.verify(token, process.env.COOKIE_KEY);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido o expirado..');
  }
}