import { Product } from "../../../../types/product";
import ProductCardProduct from "../../../ProductCard/ProductCardProduct";

type Props = {
  curElem: number;
  newProducts: Product[];
};

const HomeNewProductsSlider = ({ curElem, newProducts }: Props) => {
  const containerSize = 276 + 32;

  return (
    <section className="max-w-full overflow-hidden">
      <section
        style={{
          width: `${newProducts.length * containerSize - 32}px`,
          transform: `translateX(-${containerSize * curElem}px)`,
        }}
        className="grid grid-flow-col gap-8 outline outline-8 outline-green duration-150"
      >
        {newProducts.map((phone) => (
          <ProductCardProduct key={phone.id} product={phone} />
        ))}
      </section>
    </section>
  );
};

export default HomeNewProductsSlider;
