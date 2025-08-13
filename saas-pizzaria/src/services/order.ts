import { prisma } from "@/lib/prisma";
import { CartItem } from "@/types/cart-item";

export const createNewOrder = async (userId: number, cart: CartItem[]) => {
    const orderProducts = []
    let subtotal = 0

    for (let item of cart) {
        const product = await prisma.product.findUnique({
            where: { id: item.productId}
        })

        if (product) {
            orderProducts.push({
                productId: product.id,
                price: parseFloat(product.price.toString()),
                quantity: item.quantity
            })
            subtotal += parseFloat(product.price.toString()) * item.quantity;
        }
    }

    const newOrder = await prisma.order.create({
        data:{
            userId,
            subtotal,
            OrderProducts: {
                createMany: {
                    data: orderProducts
                }
            }
        },
        include: {
            OrderProducts: {
                select: {
                    quantity: true,
                    product: {
                        select: {
                            name: true,
                            price: true
                        }
                    }
                }
            }
        }
    })

    return newOrder;
}