"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <div className="space-y-4 px-5">
        <h3 className="font-medium">Quantidade</h3>
        <div className="flex w-[100px] items-center justify-between rounded-lg border">
          <Button variant="ghost" onClick={decrement} size="icon">
            <MinusIcon />
          </Button>
          <p>{quantity}</p>
          <Button variant="ghost" onClick={increment} size="icon">
            <PlusIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-5 px-5">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <Button className="rounded-full" variant="default">
          Comprar agora
        </Button>
      </div>
    </>
  );
};

export default ProductActions;
