import { stripe } from "@/lib/stripe";
import { getUserByToken } from "@/services/auth";
import { createNewOrder } from "@/services/order";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const headersList = await headers()
    const origin = headersList.get("origin")

    const {cart} = await request.json();
    const loggedUser = await getUserByToken();

    if (!loggedUser) return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    if (!cart || (cart && cart.length <= 0)) return NextResponse.json({ error: "Carrinho vazio" }, { status: 400 });

    const order = await createNewOrder(loggedUser.id, cart);    
    if(!order) return NextResponse.json({ error: "Erro ao criar pedido" })

    const paymentItems = []
    for (let item of order.OrderProducts) {
        paymentItems.push({
            price_data: {
                currency: 'BRL',
                unit_amount: parseFloat(item.product.price.toString()) * 100,
                product_data: {
                    name: item.product.name,
                }
            },
            quantity: item.quantity
        })
    }

    const paymantSession = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}`,
        line_items: paymentItems,
        customer_email: loggedUser.email,
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    display_name: 'Frete padrão',
                    fixed_amount: {
                        currency: 'BRL',
                        amount: 1000
                    }
                }
            }
        ],
        metadata:{
            order_id: order.id
        }
    })

    return NextResponse.json({ order, url: paymantSession.url }, { status: 201 });
}