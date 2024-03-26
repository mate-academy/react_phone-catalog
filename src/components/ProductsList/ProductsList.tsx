import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsList.scss';

type Props = {
  items: Product[];
  setFavorites?: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const ProductsList: React.FC<Props> = ({ items, setFavorites }) => {
  return (
    <ul className="catalog-grid" data-cy="productList">
      {items.map(item => {
        return (
          <li className="catalog-grid__cell" key={item.id}>
            <ProductCard item={item} setFavorites={setFavorites} />
          </li>
        );
      })}
    </ul>
  );
};
