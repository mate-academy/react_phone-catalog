import ProductCard from "../components/ProductCard/ProductCard";
import { Product } from "../types/product";

type Props = {
  products: Product[];
};

const ProductsList = ({ products }: Props) => {
  return (
    <section className="grid grid-cols-1 gap-4 small:grid-cols-4">
      {products.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </section>
  );
};

export default ProductsList;
