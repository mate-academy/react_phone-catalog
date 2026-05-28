import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store/store';
import phonesImg from '../../../images/categories/phones.png';
import tabletsImg from '../../../images/categories/tablets.png';
import accessoriesImg from '../../../images/categories/accessories.png';
import styles from './Categories.module.scss';

const categories = [
  { name: 'phones', label: 'Mobile phones', img: phonesImg },
  { name: 'tablets', label: 'Tablets', img: tabletsImg },
  { name: 'accessories', label: 'Accessories', img: accessoriesImg },
];

export const Categories: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);

  const categoryCounts = useMemo(() => {
    return products.reduce(
      (acc, product) => {
        const { category } = product;

        return {
          ...acc,
          [category]: (acc[category] || 0) + 1,
        };
      },
      {} as Record<string, number>,
    );
  }, [products]);

  return (
    <section className={styles.category}>
      <h2 className={styles.category_title}>Shop by category</h2>
      <ul className={styles.category_list}>
        {categories.map(({ name, label, img }) => {
          const count = categoryCounts[name] || 0;

          return (
            <li key={name} className={styles.category_item}>
              <Link to={`/${name}`} className={styles[`category_${name}`]}>
                <img src={img} alt={label} className={styles.category_img} />
              </Link>

              <h3 className={styles.category_name}>{label}</h3>
              <p className={styles.category_count}>{count} models</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
