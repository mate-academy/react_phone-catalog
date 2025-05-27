import styles from './Categories.module.scss';
import Phones from '../../../img/categories/phones.png';
import Tablets from '../../../img/categories/tablets.png';
import Accessories from '../../../img/categories/accessories.png';
import { Link } from 'react-router-dom';
import React from 'react';
import { Product } from '../../../types/Product';

type Props = {
  products: Product[];
};

export const Categories: React.FC<Props> = ({ products }) => {
  const categories = [
    { name: 'phones', label: 'Mobile phones', img: Phones },
    { name: 'tablets', label: 'Tablets', img: Tablets },
    { name: 'accessories', label: 'Accessories', img: Accessories },
  ];

  return (
    <section className={styles.category}>
      <h2 className={styles.category__title}>Shop by categories</h2>
      <ul className={styles.category__list}>
        {categories.map(({ name, label, img }) => {
          const amount = products.filter(
            product => product.category === name,
          ).length;

          return (
            <li key={name} className={styles.category__item}>
              <Link to={name} className={styles.category__link}>
                <img src={img} alt={name} className={styles.category__img} />
              </Link>

              <div className={styles.category__info}>
                <p className={styles.category__name}>{label}</p>
                <p className={styles.category__amount}>{amount} models</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
