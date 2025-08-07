import Link from "next/link"
import { Button } from "../ui/button"
import { CartButton } from "../cart/cart-button"


export const Header = () => {
  return (
    <header className="container mx-auto flex my-4 p-5 justify-between items-center h-20 bg-secundary rounded-md border-b-2 border-gray-200 ">
      <Link href="/">
        <div className=" text-2x1 font-bold">Pizzasfy</div>
      </Link>
      <div className="flex gap-2">
        <Button>Login / Cadastro</Button>
        <CartButton></CartButton>

      </div>
    </header>
  )
}