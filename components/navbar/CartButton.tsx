import Link from "next/link";
import { Button } from "../ui/button";
import { LuShoppingCart } from "react-icons/lu";

async function CartButton() {
  const items = 9;
  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative"
    >
      <Link href="/cart">
        <LuShoppingCart />
        <span className="absolute -top-3 -right-3 flex justify-center items-center bg-primary text-xs text-white rounded-full w-6 h-6">
          {items}
        </span>
      </Link>
    </Button>
  );
}
export default CartButton;
