import { useAppContext } from "../../../../context/AppContext";
import ProductCardProduct from "../../../ProductCard/ProductCardProduct";

const HomeNewProductsSlider = () => {
  const { productsList } = useAppContext();
  const newProducts = productsList.filter((el) => el.year >= 2019);

  return (
    <section className="w-full overflow-hidden">
      <section
        style={{
          width: `${newProducts.length * (276 + 16) - 16}px`,
        }}
        className="grid grid-flow-col gap-8"
      >
        {newProducts.map((phone) => (
          <ProductCardProduct key={phone.id} product={phone} />
        ))}
      </section>
    </section>
  );
};

export default HomeNewProductsSlider;
