import React from 'react';
import styles from './CardsCarusel.module.scss';
import { Products } from '../../../type/Products';
import Slick from './Slick';

interface Props {
  props: Products[];
  discount?: boolean;
  carusel?: boolean;
  amount?: number;
  name?: string;
}

export const CardsCarusel: React.FC<Props> = ({
  props,
  discount = false,
  name = '',
}) => {
  const cards = [...props];

  return (
    <div className={styles.container}>
      <Slick products={cards} discount={discount} name={name} />
    </div>
  );
};
