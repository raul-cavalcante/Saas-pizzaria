import { createUserToken, validateAuth } from "@/services/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password } = await request.json()
    if (!email || !password) {
        return new Response('Campos incompletos', { status: 400 });
    }

    const user = await validateAuth(email, password);
    if (!user) {
        return new NextResponse('Usuário ou senha inválidos', { status: 401 });
    }

    const token = await createUserToken(user.id)

    return NextResponse.json({ user, token})
}