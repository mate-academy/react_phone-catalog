import React from 'react';
import styles from './Capacity.module.scss';

import { ProductFullInfo } from '../../../../shared/Utills/types';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../../../shared/Utills/ProductContext';

type Props = {
  product: ProductFullInfo;
};

export const Capacity: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const { products } = useProducts();

  const handleCapacityChange = (capacity: string) => {
    if (!product) {
      return;
    }

    type Propo = {
      accessories?: ProductFullInfo[];
      phones?: ProductFullInfo[];
      tablets?: ProductFullInfo[];
    };

    type Category = keyof Propo;
    const selectedCategory = product.category as Category;

    const categoryProducts = products[selectedCategory] ?? [];

    const target = categoryProducts.find(
      p => p.namespaceId === product.namespaceId && p.capacity === capacity,
    );

    if (target) {
      navigate(`/${target.category}/product/${target.id}`);
    }
  };

  return (
    <div className={styles.capacity}>
      <p>Select capacity</p>

      <div className={styles.container}>
        {product.capacityAvailable?.map((capacity, index) => (
          <span
            key={index}
            className={`${styles.button}
                  ${capacity === product.capacity ? styles.button__active : ''}`}
            onClick={() => handleCapacityChange(capacity)}
          >
            {capacity}
          </span>
        ))}
      </div>
    </div>
  );
};
