import { NextResponse } from "next/server";
import IncomeDao from "@/app/dao/income.dao";

const incomeDao = new IncomeDao();

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const payload = await incomeDao.getIncomeById(Number(id));
        if(payload.length === 0) return NextResponse.json({ message: "No existe ingreso con ese id.." });
        return NextResponse.json({ message: "Ingreso obtenido por el id..", payload }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor.", error: error.message }, { status: 500 });
    }
};

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await incomeDao.deleteIncomeById(Number(id));
        return NextResponse.json({ message: "Ingreso eliminado por el id.." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor.", error: error.message }, { status: 500 });
    }
};

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const data = await request.json();
        const { descripcion, monto, fecha } = data;
        const modifiedData = { descripcion: String(descripcion), monto: Number(monto), fecha: String(fecha) };
        await incomeDao.updateIncomeById(Number(id), modifiedData);
        return NextResponse.json({ message: "Ingreso eliminado por el id..", modifiedData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor.", error: error.message }, { status: 500 });
    }
};