import React from 'react';
import styles from './Colors.module.scss';
import { useNavigate } from 'react-router-dom';
import { ProductFullInfo } from '../../../../shared/Utills/types';
import { useProducts } from '../../../../shared/Utills/ProductContext';

type Props = {
  product: ProductFullInfo;
};

export const Colors: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const { products } = useProducts();

  const handleColorChange = (color: string) => {
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
      p => p.namespaceId === product.namespaceId && p.color === color,
    );

    if (target) {
      navigate(`/${target.category}/product/${target.id}`);
    }
  };

  return (
    <div className={styles.colors}>
      <p>Available colors</p>

      <div className={styles.container}>
        {product.colorsAvailable?.map((color, index) => (
          <div
            key={index}
            className={`${styles.icons}
            ${color === product.color ? styles.active : ''}  

          `}
            onClick={() => handleColorChange(color)}
          >
            <span className={styles[color]}></span>
          </div>
        ))}
      </div>
    </div>
  );
};
