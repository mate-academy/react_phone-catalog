import { useContext } from 'react';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';
import { Cards } from '../Cards';
import style from './ProductList.module.scss';
import { StateContext } from '../../store/StateProvider';

type Props = {
  title: string;
};

export const ProductList: React.FC<Props> = ({ title }) => {
  const { favorites } = useContext(StateContext);

  return (
    <div className={style.favorites}>
      <div className={style.favorites__container}>
        <BreadCrumbs />
        <h1 className={style.favorites__title}>{title}</h1>

        <p className={style.favorites__items}>
          {favorites.length > 0
            ? favorites.length === 1
              ? `${favorites.length} item`
              : `${favorites.length} items`
            : ''}
        </p>

        <Cards gadgets={favorites} />
      </div>
    </div>
  );
};
