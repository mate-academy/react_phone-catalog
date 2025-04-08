import './ProductList.style.scss';

import { Product } from "../../../types/Product";
import { ProductCard } from "../ProductCard/ProductCard";

type Props = {
  products: Product[];
}

export const ProductList:React.FC<Props> = ({ products }) => {
  return (
    <div className="product-list">
      {products.length > 0 &&
        products.map((item: Product) => (
          <ProductCard key={item.id} product={item} />
        ))}
    </div>
  );
};
