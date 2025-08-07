import { ShoppingBagIcon } from "lucide-react";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size={"icon"}>
          <ShoppingBagIcon />
        </Button>
        <SheetContent></SheetContent>
      </SheetTrigger>
    </Sheet>
  );
};

export default Cart;
