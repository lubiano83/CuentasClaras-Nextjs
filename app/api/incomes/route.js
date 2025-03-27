import { NextResponse } from "next/server";
import IncomeDao from "@/app/dao/income.dao";
import { getUserFromToken } from '@/app/utils/token.utils';

const incomeDao = new IncomeDao();

export async function GET() {
    try {
        const payload = await incomeDao.getIncomes();
        return NextResponse.json({ message: "Ingreso obtenido por el id..", payload }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor.", error: error.message }, { status: 500 });
    }
};

export async function POST(request) {
    try {
        const data = await request.json();
        const user = await getUserFromToken();
        if (!user?.id) return NextResponse.json({ message: "Usuario no autenticado" }, { status: 401 });
        const { descripcion, monto, fecha } = data;
        const modifiedData = { usuario_id: Number(user.id), descripcion: String(descripcion), monto: Number(monto), fecha: String(fecha) };
        const payload = await incomeDao.createIncome(modifiedData);
        return NextResponse.json({ message: "Ingreso creado exitosamente.", payload }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor.", error: error.message }, { status: 500 });
    }
};

export async function DELETE() {
    try {
        await incomeDao.deleteAllIncomes();
        return NextResponse.json({ message: "Todos los Ingresos eliminados.." });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor.", error: error.message }, { status: 500 });
    }
};