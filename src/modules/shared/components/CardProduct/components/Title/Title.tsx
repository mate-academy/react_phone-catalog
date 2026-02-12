import React from 'react';
import styles from './Title.module.scss';
import { useProductActions } from '../../../../hooks/useProductActions';
import { Product } from '../../../../../../ProductsContext/TabsContext';

interface TitleProps {
  element: Product;
}
export const Title: React.FC<TitleProps> = ({ element }) => {
  const { openProduct } = useProductActions(element);

  return (
    <div className={styles.title} onClick={openProduct}>
      {element.name}
    </div>
  );
};
