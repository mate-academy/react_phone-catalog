import { useContext } from 'react';

import { ProductContext } from '../../context/ProductContext';
import { Breadcrumb } from '../../components/Content/Breadcrumb';
import { Products } from '../../type/Productes';

import style from './Favorites.module.scss';
import { Card } from '../../components/Content/Card';

export const Favourites = () => {
  const { favourites } = useContext(ProductContext);
  const pach = ['Favourites'];

  return (
    <div className={style.productPage}>
      <Breadcrumb path={pach} />
      {favourites.length ? (
        <>
          <h1 className={style.productPage__title}>Favorites</h1>
          <span
            className={style.productPage__numPhone}
          >{`${favourites.length} models`}</span>
          <div className={style.productPage__cards}>
            {favourites.map((phone: Products) => (
              <div className={style.productPage__card} key={phone.id}>
                <Card produkt={phone} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1>There are no favorite products</h1>
      )}
    </div>
  );
};
