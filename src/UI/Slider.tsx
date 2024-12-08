import useWindowSize from "../hooks/useWindowSize.hook";
import { Product } from "../types/product";
import ProductCard from "./ProductCard/ProductCard";

type Props = {
  curElem: number;
  newProducts: Product[];
  isSectHP?: boolean;
};

const Slider = ({ curElem, newProducts, isSectHP }: Props) => {
  const { width } = useWindowSize();
  const widthX = width - 48;
  const containerCurrentSize = width < 640 ? 212 + 32 : 276 + 32;
  const maxTranslate = newProducts.length * containerCurrentSize - 32;
  const currentPosition = containerCurrentSize * curElem;
  const windowPosition = widthX + currentPosition;
  const position =
    windowPosition > maxTranslate ? maxTranslate - widthX : currentPosition;

  return (
    <section className="max-w-slider overflow-hidden">
      <section
        style={{
          transform: `translateX(-${position}px)`,
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
