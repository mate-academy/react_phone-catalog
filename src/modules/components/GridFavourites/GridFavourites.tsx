import styles from './GridFavourites.module.scss';
import { Products } from '../../../types/Products';
import { ProductCard } from '../../HomePage/components/ProductCard';

interface Props {
  products: Products[];
}
export const GridFavourites: React.FC<Props> = ({ products }) => {
  return (
    <ul className={styles['grid-favourites__list']}>
      {products.map(product => {
        return (
          <li className={styles['grid-favourites__item']} key={product.id}>
            <ProductCard products={product} />
          </li>
        );
      })}
    </ul>
  );
};
