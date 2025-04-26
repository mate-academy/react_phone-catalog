import { CSSProperties, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchProducts } from '../../utils/fetchProducts';

import styles from './Category.module.scss';
const {
  category,
  category__link,
  category__imgWrapper,
  category__img,
  category__description,
  category__name,
  category__amount,
} = styles;

type CategoryProps = {
  photo: string;
  name: 'Mobile phones' | 'Tablets' | 'Accessories';
  products: string;
  url: string;
  additionalStyles?: CSSProperties;
};

export const Category = ({
  photo,
  name,
  products,
  url,
  additionalStyles,
}: CategoryProps) => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetchProducts(products).then((items) => setAmount(items.length));
  }, [products]);

  return (
    <div className={category}>
      <Link className={category__link} to={url}>
        <div className={category__imgWrapper} style={additionalStyles}>
          <img src={photo} alt={`${name} category`} className={category__img} />
        </div>
      </Link>

      <div className={category__description}>
        <h3 className={category__name}>{name}</h3>

        <p className={category__amount}>{amount} models</p>
      </div>
    </div>
  );
};
