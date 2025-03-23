import { jwtVerify } from "jose";

const getUserFromToken = async (token) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.COOKIE_KEY)
    );
    return payload;
  } catch (e) {
    return null;
  }
};

export async function isDeveloper(token) {
  const user = await getUserFromToken(token);
  return user && user.role === "developer";
}

export async function isPremium(token) {
  const user = await getUserFromToken(token);
  return user && (user.role === "premium" || user.role === "developer");
}

export async function isUsuario(token) {
  const user = await getUserFromToken(token);
  return (
    user &&
    (user.role === "usuario" || user.role === "premium" || user.role === "developer")
  );
}