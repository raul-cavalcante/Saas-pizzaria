"use client"

import { Product } from "@/generated/prisma";
import Image from "next/image";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/stores/cart";

type Props = {
    data: Product;
}

export const PizzaItem = ({ data }: Props) => {

    const cart = useCart()

    const handleAddToCart = () => {
        cart.addItem({
            productId: data.id.toString(),
            quantity: 1
        })
        cart.setOpen(true)
    }

    return(
        <div className="text-sm items-center p-4 bg-white rounded-lg shadow-md relative min-h-[400px] pb-16">
            <Image 
                src={data.image}
                alt={data.name}
                width={200}
                height={200}
                className="w-full mb-3 rounded-lg"
            />
            <div className="text-lg font-bold rounded">{data.name}</div>
            <div className="rounded ">{formatPrice(data.price)}</div>
            <div className="truncate mb-3 rounded">{data.description}</div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center w-full px-2">
                <Button className="rounded-lg text-sm md:text-base w-full md:w-auto py-2 px-3 md:px-4" onClick={handleAddToCart}>
                    Adicionar ao Carrinho
                </Button>
            </div>
        </div>
    )
}