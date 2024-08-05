import { Product } from '../../helper/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductList.scss';

interface Props {
  products: Product[];
}

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="productList__container">
      {products.map(product => (
        <ProductCard
          product={product}
          sectionType="brandNew"
          key={product.id}
        />
      ))}
    </div>
  );
};
