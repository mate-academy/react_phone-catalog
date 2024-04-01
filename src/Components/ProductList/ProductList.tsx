import { Product } from '../../helper/Product';
import { NoResults } from '../NoResults/NoResults';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductList.scss';

interface Props {
  products: Product[];
}

export const ProductList: React.FC<Props> = ({ products }) => {
  return !products.length ? (
    <NoResults />
  ) : (
    <div className="productList__container">
      {products.map(product => (
        <ProductCard
          product={product}
          sectionType="hotPrices"
          key={product.id}
        />
      ))}
    </div>
  );
};
