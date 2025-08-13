import Link from "next/link"
import { Button } from "../ui/button"
import { CartButton } from "../cart/cart-button"
import { LoginAreaButton } from "../login-area/login-area-button"
import { cookies } from "next/headers"


export const Header = async () => {

  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  return (
    <header className="container mx-auto flex my-4 p-5 justify-between items-center h-20 bg-secundary rounded-md border-b-2 border-gray-200 ">
      <Link href="/">
        <div className=" text-2xl font-bold">Pizzasfy</div>
      </Link>
      <div className="flex gap-2">
        <LoginAreaButton initialState={token ? true : false}/>
        <CartButton />

      </div>
    </header>
  )
}