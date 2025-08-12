"use client"

import { useAuth } from "@/stores/auth";
import { useState } from "react";
import z, { email, set } from "zod";
import { CustomInput } from "../layout/custom-input";
import { Button } from "../ui/button";
import { api } from "@/lib/axios";

const schema = z.object({
    name: z.string().min(2, "Campo Obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Senha deve ter no mínimo 6 caracteres")
}).refine((data: any) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"]
})

type Props = {
    email: string;
}

export const LoginAreaSgnup = ({email}: Props) => {

    const auth = useAuth();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>(null);

    const [nameField, setNameField] = useState("");
    const [emailField, setEmailField] = useState(email);
    const [passwordField, setPasswordField] = useState("");
    const [confirmPasswordField, setConfirmPasswordField] = useState("");

    const handleButton = async () => {
        setErrors(null);
        const validData = schema.safeParse({
            name: nameField,
            email: emailField,  
            password: passwordField,
            confirmPassword: confirmPasswordField
        })
        if (!validData.success) {
            setErrors(validData.error.flatten().fieldErrors);
            return false
        }

        try {
            setLoading(true);
            const signupReq = await api.post("/auths/signup", {
                name: validData.data.name,
                email: validData.data.email,
                password: validData.data.password
            });

            setLoading(false);

            if(!signupReq.data.token) {
                alert(signupReq.data.error)
            } else{
                auth.setToken(signupReq.data.token);
                auth.setOpen(false);
            }

        } catch {
            setLoading(false);
        }
    }

    return (
        <>
            <div>
                <p className="mb-2">Digite seu nome</p>
                <CustomInput
                    name="name"
                    error ={errors}
                    disabled={loading}
                    type="text"
                    value={nameField}
                    onChange={e => setNameField(e.target.value)}
                    autoFocus
                />
            </div>

            <div>
                <p className="mb-2">Digite seu email</p>
                <CustomInput
                    name="email"
                    error ={errors}
                    disabled={loading}
                    type="text"
                    value={emailField}
                    onChange={e => setEmailField(e.target.value)}
                />
            </div>

            <div>
                <p className="mb-2">Digite sua senha</p>
                <CustomInput
                    name="password"
                    error ={errors}
                    disabled={loading}
                    type="password"
                    value={passwordField}
                    onChange={e => setPasswordField(e.target.value)}
                />
            </div>

            <div>
                <p className="mb-2">Repita sua senha</p>
                <CustomInput
                    name="confirmPassword"
                    error ={errors}
                    disabled={loading}
                    type="password"
                    value={confirmPasswordField}
                    onChange={e => setConfirmPasswordField(e.target.value)}
                />
            </div>

            <Button
                disabled={loading}
                onClick={handleButton}
            >
                Continuar
            </Button>
        </>
    )
}