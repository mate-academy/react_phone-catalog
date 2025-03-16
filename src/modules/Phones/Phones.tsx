import style from './Phones.module.scss';
import React from 'react';
import homeIcon from '../../shared/assets/icons/home.svg';
import rightIcon from '../../shared/assets/icons/chevron-arrow-right.svg';
import phones from '../../../public/api/phones.json';
import { Product } from '../../type/Product';
import { ProductCart } from '../../components/ProductCart/ProductCart';

export const Phones: React.FC = () => {
  return (
    <div className={style.phone}>
      <div className={style.navigation}>
        <img src={homeIcon} alt="home icon" />
        <img src={rightIcon} alt="arrow right icon" />
        <p className={style.navTitle}>Phones</p>
      </div>

      <div className={style.pageInfo}>
        <h1 className={style.title}>Mobile phones</h1>
        <p className={style.description}>
          {phones.length} {phones.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className={style.container}>
          {phones.map((item: Product) => (
            <ProductCart product={item} key={item.id} isDiscount/>
          ))}
        </div>
    </div>
  );
};
