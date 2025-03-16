import style from './Tablets.module.scss';
import React from 'react';
import homeIcon from '../../shared/assets/icons/home.svg';
import rightIcon from '../../shared/assets/icons/chevron-arrow-right.svg';
import tablets from '../../../public/api/tablets.json';
import { Product } from '../../type/Product';
import { ProductCart } from '../../components/ProductCart/ProductCart';

export const Tablets: React.FC = () => {
  return (
    <div className={style.tablets}>
      <div className={style.navigation}>
        <img src={homeIcon} alt="home icon" />
        <img src={rightIcon} alt="arrow right icon" />
        <p className={style.navTitle}>Tablets</p>
      </div>

      <div className={style.pageInfo}>
        <h1 className={style.title}>Tablets</h1>
        <p className={style.description}>
          {tablets.length} {tablets.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className={style.container}>
          {tablets.map((item: Product) => (
            <ProductCart product={item} key={item.id} isDiscount/>
          ))}
        </div>
    </div>
  )
}
