import useWindowSize from "../hooks/useWindowSize.hook";
import { Product } from "../types/product";
import ProductCard from "./ProductCard/ProductCard";

type Props = {
  curElem: number;
  newProducts: Product[];
  isSectHP?: boolean;
};

const Slider = ({ curElem, newProducts, isSectHP }: Props) => {
  const screen = useWindowSize();
  const containerSize = 276 + 32;
  const containerSizeSmall = 212 + 32;
  const xxx = screen.width < 640 ? containerSizeSmall : containerSize;

  return (
    <section className="max-w-slider overflow-hidden">
      <section
        style={{
          transform: `translateX(-${xxx * curElem}px)`,
        }}
        className="flex w-full gap-8 duration-150"
      >
        {newProducts.map((phone) => (
          <ProductCard
            key={phone.id}
            product={phone}
            isSectHP={isSectHP}
            isSlider={true}
          />
        ))}
      </section>
    </section>
  );
};

export default Slider;
