import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import Phones from '../../../assets/img/categories/phones.png';
import Tablets from '../../../assets/img/categories/tablets.png';
import Accessories from '../../../assets/img/categories/accessories.png';
import styles from './Categories.module.scss';

const categories = [
  { name: 'phones', label: 'Mobile phones', img: Phones },
  { name: 'tablets', label: 'Tablets', img: Tablets },
  { name: 'accessories', label: 'Accessories', img: Accessories },
];

export const Categories: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);

  return (
    <section className={styles.category}>
      <h2 className={styles.category_title}>Shop by category</h2>
      <ul className={styles.category_list}>
        {categories.map(({ name, label, img }) => {
          const count = products.filter(
            product => product.category === name,
          ).length;

          return (
            <li key={name} className={styles.category_item}>
              <Link to={name} className={styles[`category_${name}`]}>
                <img src={img} alt={name} className={styles.category_img} />
              </Link>

              <p className={styles.category_name}>{label}</p>
              <p className={styles.category_count}>{count} models</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
