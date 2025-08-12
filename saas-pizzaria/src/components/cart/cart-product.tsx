"use client";

import { useProducts } from "@/stores/products";
import { CartItem } from "@/types/cart-item";
import { formatPrice } from "@/lib/utils"
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import { useCart } from "@/stores/cart";

type Props = {
    data: CartItem
}

export const CartProduct = ({data}: Props) => {

    const [qt, setQt] = useState(data.quantity)

    const cart = useCart()
    const products = useProducts()
    let product = products.products.find(item => item.id === data.productId)

    if (!product) return null

    const handlerMinsClick = () => {
         if (qt - 1 <= 0) {
            cart.removeItem(data.productId)
         } else {
            cart.addItem({productId: data.productId, quantity: -1})
            setQt(qt - 1)
         }
    }

    const handlerPlusClick = () => {
        cart.addItem({productId: data.productId, quantity: 1})
        setQt(qt + 1)
    }

    return (
        <div className="flex items-center gap-4">
            <div className="w-10">
                <Image 
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="w-full"
                />
            </div>
            <div className="flex-1">
                <div>{product.name}</div>
                <div className="text-sm">{formatPrice(product.price)}</div>
            </div>
            <div className="flex items-center bg-secondary p2 rounded-md">
                <Button size= "sm" variant= "ghost" onClick={handlerMinsClick}> - </Button>
                <div className="mx-1">{qt}</div>
                <Button size= "sm" variant= "ghost" onClick={handlerPlusClick}> + </Button>
            </div>
        </div>
    )
}