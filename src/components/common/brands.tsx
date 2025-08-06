import Image from "next/image";

import { Card, CardContent } from "../ui/card";

const brand = [
  {
    id: 1,
    img: "/nike.svg",
    alt: "Nike",
  },
  {
    id: 2,
    img: "/adidas.svg",
    alt: "Adidas",
  },
  {
    id: 3,
    img: "/puma.svg",
    alt: "Puma",
  },
  {
    id: 4,
    img: "/newbalance.svg",
    alt: "New Balance",
  },
];
const Brands = () => {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">Marcas Parceiras</h3>
      <div className="flex gap-x-6 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {brand.map((b) => (
          <div key={b.id} className="flex flex-col gap-4">
            <Card className="flex h-[80px] w-[80px] items-center justify-center">
              <Image src={b.img} alt={b.alt} width={32} height={32} />
            </Card>
            <p className="text-center text-xs font-semibold">{b.alt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
