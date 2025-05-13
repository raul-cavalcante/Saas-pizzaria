const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient()
async function main() {
    const pizzas = [
        {
            id: 1,
            name: 'Calabresa com Cebola',
            price: 42.9,
            image: 'calabresa.jpg',
            description: 'Calabresa, cebola, mussarela, molho de tomate'
        },
        {
            id: 2,
            name: 'Margherita',
            price: 39.9,
            image: 'margherita.jpg',
            description: 'Mussarela, tomate, manjericão, molho de tomate'
        },
        {
            id: 3,
            name: 'Quatro Queijos',
            price: 47.5,
            image: 'quatro-queijos.jpg',
            description: 'Mussarela, parmesão, gorgonzola, provolone, molho de tomate'
        },
        {
            id: 4,
            name: 'Pepperoni',
            price: 44.9,
            image: 'pepperoni.jpg',
            description: 'Pepperoni, mussarela, molho de tomate'
        },
        {
            id: 5,
            name: 'Portuguesa',
            price: 45.0,
            image: 'portuguesa.jpg',
            description: 'Presunto, ovo, cebola, azeitona, mussarela, molho de tomate'
        },
        {
            id: 6,
            name: 'Vegetariana',
            price: 41.5,
            image: 'vegetariana.jpg',
            description: 'Pimentão, cebola, tomate, champignon, milho, mussarela, molho de tomate'
        }
    ];


    for (let pizza of pizzas) {
        await prisma.product.upsert({
            where: { id: pizza.id },
            update: {},
            create: {
                name: pizza.name,
                price: pizza.price,
                image: pizza.image,
                description: pizza.description
            }
        });
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })