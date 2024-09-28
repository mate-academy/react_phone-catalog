import { Product } from "../../../types/product";
import ProductCard from "../../../UI/ProductCard/ProductCard";

type Props = {
  curElem: number;
  newProducts: Product[];
  isSectHP?: boolean;
};

const HomeSlider = ({ curElem, newProducts, isSectHP }: Props) => {
  const containerSize = 276 + 32;

  return (
    <section className="max-w-[1200px] overflow-hidden">
      <section
        style={{
          transform: `translateX(-${containerSize * curElem}px)`,
        }}
        className="flex w-full gap-8 duration-150"
      >
        {newProducts.map((phone) => (
          <ProductCard key={phone.id} product={phone} isSectHP={isSectHP} />
        ))}
      </section>
    </section>
  );
};

export default HomeSlider;
