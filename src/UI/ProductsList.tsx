import { Product } from "../types/product";
import ProductCard from "./ProductCard/ProductCard";

type Props = {
  products: Product[];
};

const ProductsList = ({ products }: Props) => {
  return (
    <section className="grid grid-cols-1 gap-4 small:grid-cols-2 section:grid-cols-3 desktop:grid-cols-4">
      {products.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </section>
  );
};

export default ProductsList;
