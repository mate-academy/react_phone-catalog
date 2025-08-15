import React from 'react';
import { Product } from '../../../types/Product';
import styles from './ProductSpecs.module.scss';

type Props = {
  product: Product;
};

export const ProductSpecs: React.FC<Props> = ({ product }) => {
  const specList = [
    ['Screen', product.screen],
    ['Resolution', product.resolution],
    ['Processor', product.processor],
    ['RAM', product.ram],
    ['Built-in memory', product.capacity],
    ['Camera', product.camera],
    ['Zoom', product.zoom],
    ['Cell', product.cell?.join(', ')],
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Tech specs</h2>

      <table className={styles.table}>
        <tbody>
          {specList.map(([label, value]) => (
            <tr key={label}>
              <td>{label}</td>
              <td>{value || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
