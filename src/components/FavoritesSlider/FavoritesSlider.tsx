import { ProductCard } from '../ProductCard';
import './FavoritesSlider.scss';

type Props = {
  products: Product[],
};

export const FavoritesSlider: React.FC<Props> = ({ products }) => {
  return (
    <div className="FavoritesSlider">
      <ul className="FavoritesSlider__list">
        {products.map((product: Product) => {
          return (
            <li key={product.id} className="FavoritesSlider__item">
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
