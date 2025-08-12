"use client"

import { ComponentProps } from "react"
import { Input } from "../ui/input"
import { checkFieldError } from "@/lib/utils"

type Props = ComponentProps<"input"> & {
    name: string
    error: any
}

export const CustomInput = (props: Props) => {

    const error = checkFieldError(props.name, props.error)

    return (
        <>
            <Input 
                {...props}
                className= {`${error ? 'border border-red-800' : ''}`}

            />
            {error && 
                <div className="mt-1 text-sm text-red-800">{error}</div>
            }
        </>
    )
}