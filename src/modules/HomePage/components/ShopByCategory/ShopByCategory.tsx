import React, { useMemo } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useFetchProducts } from '../../../../features/products';
import type { Product } from '../../../../types/product';
import styles from './ShopByCategory.module.scss';
import phonesImg from '../../../../assets/images/phones.png';
import tabletsImg from '../../../../assets/images/tablets.png';
import accessoriesImg from '../../../../assets/images/accessories.png';

const CATEGORIES = [
  { id: 'phones', title: 'Mobile phones', img: phonesImg },
  { id: 'tablets', title: 'Tablets', img: tabletsImg },
  { id: 'accessories', title: 'Accessories', img: accessoriesImg },
];

export const ShopByCategory: React.FC = () => {
  const { products, isLoading } = useFetchProducts();

  const counts = useMemo(() => {
    const map: Record<string, number> = {
      phones: 0,
      tablets: 0,
      accessories: 0,
    };

    if (!products || products.length === 0) {
      return map;
    }

    for (const p of products as Product[]) {
      const cat = p.category;

      if (cat in map) {
        map[cat] += 1;
      }
    }

    return map;
  }, [products]);

  return (
    <div className={styles.shopByCategory}>
      <div className={styles.shopByCategory__grid}>
        {CATEGORIES.map(c => (
          <Link
            key={c.id}
            to={`/${c.id}`}
            className={cn(styles.shopByCategory__card, styles[`shopByCategory__card--${c.id}`])}
          >
            <div className={styles.shopByCategory__preview}>
              <img
                src={c.img}
                alt={c.title}
                className={styles.shopByCategory__image}
                loading="lazy"
              />
            </div>

            <div className={styles.shopByCategory__info}>
              <div className={styles.shopByCategory__title}>{c.title}</div>
              <div className={styles.shopByCategory__count}>
                {isLoading ? '...' : `${counts[c.id] ?? 0} models`}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
