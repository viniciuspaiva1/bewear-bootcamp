"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="space-y-4">
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
  );
};

export default QuantitySelector;
