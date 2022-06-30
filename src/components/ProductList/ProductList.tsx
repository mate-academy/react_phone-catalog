import { ProductCard } from '../ProductCard';
import './ProductList.scss';

type Props = {
  products: Product[],
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="ProductList">
      <ul className="ProductSlider__list">
        {products.map((product: Product) => {
          return (
            <li key={product.id} className="ProductSlider__item">
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
