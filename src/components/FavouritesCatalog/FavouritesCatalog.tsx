import { Product } from '../../types/Product';
import BreadCrumbs from '../BreadCrumbs';
import { PhoneCard } from '../PhoneCard/PhoneCard';
import { Sorting } from '../Sorting/Sorting';
import style from './FavouritesCatalog.module.scss';

type Props = {
  products: Product[];
};

export const FavouritesCatalog: React.FC<Props> = ({ products }) => {
  return (
    <>
      <div className={style.catalog}>
        <BreadCrumbs />
        <h1 className={style.catalog__title}>Favourites</h1>
        <p className={style.catalog__counter}>{products.length} models</p>
        <Sorting />
        <div className={style.catalog__phones}>
          {products.map(product => (
            <PhoneCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};
