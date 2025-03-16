import style from './Accessories.module.scss';
import React from 'react';
import homeIcon from '../../shared/assets/icons/home.svg';
import rightIcon from '../../shared/assets/icons/chevron-arrow-right.svg';
import accessories from '../../../public/api/accessories.json';
import { Product } from '../../type/Product';
import { ProductCart } from '../../components/ProductCart/ProductCart';

export const Accessories: React.FC = () => {
  return (
    <div className={style.accessories}>
      <div className={style.navigation}>
        <img src={homeIcon} alt="home icon" />
        <img src={rightIcon} alt="arrow right icon" />
        <p className={style.navTitle}>Accessories</p>
      </div>

      <div className={style.pageInfo}>
        <h1 className={style.title}>Accessories</h1>
        <p className={style.description}>
          {accessories.length} {accessories.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className={style.container}>
          {accessories.map((item: Product) => (
            <ProductCart product={item} key={item.id} />
          ))}
        </div>
    </div>
  )
}
