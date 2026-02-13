import { Products } from '../../../types/Products';
import { ProductCard } from '../ProductCard';
import style from './GridFavourites.module.scss';

interface Props {
  products: Products[];
}

export const GridFavourites: React.FC<Props> = ({ products }) => {
  return (
    <ul className={style['grid-favourites__list']}>
      {products.map(product => {
        return (
          <li className={style['grid-favourites__item']} key={product.id}>
            <ProductCard products={product} />
          </li>
        );
      })}
    </ul>
  );
};
