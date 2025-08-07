import { useQuery } from "@tanstack/react-query";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";

import { getCart } from "@/actions/get-cart";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => getCart(),
  });
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size={"icon"}>
          <ShoppingBagIcon />
        </Button>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Carrinho</SheetTitle>
          </SheetHeader>
          {cartIsLoading && <div>Carregando...</div>}
          {cart?.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <Image
                src={item.productVariant.imageUrl}
                alt={item.productVariant.product.name}
                width={100}
                height={100}
              />
              <div>
                <h3 className="font-semibold">
                  {item.productVariant.product.name}
                </h3>
              </div>
            </div>
          ))}
        </SheetContent>
      </SheetTrigger>
    </Sheet>
  );
};

export default Cart;
