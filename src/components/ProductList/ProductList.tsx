import { useContext } from 'react';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';
import { CardsContainer } from '../CardsContainer';
import style from './ProductList.module.scss';
import { StateContext } from '../../store/StateProvider';
import classNames from 'classnames';

type Props = {
  title: string;
};

export const ProductList: React.FC<Props> = ({ title }) => {
  const { favorites, activeMenu } = useContext(StateContext);

  return (
    <div
      className={classNames(style.favorites, {
        [style.favorites__activeAsideMenu]: activeMenu,
      })}
    >
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

        <CardsContainer gadgets={favorites} />
      </div>
    </div>
  );
};
