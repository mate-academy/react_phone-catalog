import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getProducts } from '../../../api';
import { Products } from '../../../type/Productes';

import style from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  const [produkts, setProdukts] = useState<Products[]>();

  useEffect(() => {
    getProducts().then((data: Products[]) => {
      setProdukts(data);
    });
  }, []);

  if (!produkts) {
    return null;
  }

  const phones = produkts.filter(
    (produkt: Products) => produkt.category === 'phones',
  );
  const tablets = produkts.filter(
    (produkt: Products) => produkt.category === 'tablets',
  );
  const accessories = produkts.filter(
    (produkt: Products) => produkt.category === 'accessories',
  );

  return (
    <div className={style.category}>
      <div className={style.category__container}>
        <h3 className={style.category__title}>Shop by category</h3>
        <div className={style.category__cards} data-cy="categoryLinksContainer">
          <Link to="/phones" className={style.category__card}>
            <div className={`${style.category__img} ${style.phones}`} />
            <h3 className={style.category__card_title}>Mobile phones</h3>
            <span>{`${phones.length} models`}</span>
          </Link>
          <Link to="/tablets" className={style.category__card}>
            <div className={`${style.category__img} ${style.tablets}`} />
            <h3 className={style.category__card_title}>Tablets</h3>
            <span>{`${tablets.length} models`}</span>
          </Link>
          <Link to="/accessories" className={style.category__card}>
            <div className={`${style.category__img} ${style.accessories}`} />
            <h3 className={style.category__card_title}>Accessories</h3>
            <span>{`${accessories.length} models`}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
