# 🍕 Pizzasfy - Sistema de Pedidos de Pizza

Sistema completo de e-commerce para pizzarias, desenvolvido com Next.js, Prisma e Stripe.

## ✨ Demonstração

### Catálogo de Pizzas e Carrinho
Sistema intuitivo de seleção de pizzas com carrinho em tempo real.
![Catálogo e Carrinho](./public/demo/catalogo.png)

### Gerenciamento do Carrinho
Controle total sobre seus pedidos, com ajuste de quantidade e cálculo automático de valores.
![Gerenciamento do Carrinho](./public/demo/carrinho.png)

### Checkout Seguro
Integração com Stripe para pagamentos seguros e rápidos.
![Checkout](./public/demo/checkout.png)

## 🚀 Tecnologias

- **Frontend:** Next.js 14 com App Router
- **Estilização:** Tailwind CSS + Shadcn/ui
- **Backend:** Node.js com Prisma ORM
- **Banco de Dados:** PostgreSQL
- **Pagamentos:** Stripe
- **Deploy:** Vercel

## 🌟 Features

- [x] Cadastro e autenticação de usuários
- [x] Catálogo de pizzas com imagens
- [x] Carrinho de compras em tempo real
- [x] Checkout seguro com Stripe
- [x] Gestão de pedidos
- [x] Sistema de status de pedidos
- [x] Interface responsiva

## 🛠️ Estrutura do Projeto

```plaintext
saas-pizzaria/
├── src/
│   ├── app/         # Rotas e páginas
│   ├── components/  # Componentes React
│   ├── lib/         # Configurações e utilidades
│   └── services/    # Serviços e integrações
├── prisma/
│   └── schema.prisma # Schema do banco de dados
└── public/          # Arquivos estáticos
```

## 📦 Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/pizzasfy.git
```

2. Instale as dependências
```bash
cd pizzasfy
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

4. Execute as migrações do Prisma
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

## 🔐 Variáveis de Ambiente

```env
DATABASE_URL="postgresql://..."
STRIPE_SECRET_KEY="..."
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="..."
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Feito por Raul Cavalcante
