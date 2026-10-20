import type React from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../../../../helper';
import styles from './Category.module.scss';

type Props = {
  imageUrl: string;
  name: string;
  url: string;
  color: string;
  quantity: number;
};

export const Category: React.FC<Props> = ({
  imageUrl,
  name,
  url,
  color,
  quantity,
}) => {
  return (
    <Link to={url} className={styles.category}>
      <div
        className={styles['image-wrapper']}
        style={{ backgroundColor: color }}
      >
        <img src={asset(imageUrl)} alt="" className={styles.image} />
      </div>

      <h3 className={styles.name}>{name}</h3>
      <p className={styles.quantity}>
        {quantity === null
          ? '\u00A0'
          : `${quantity} ${quantity === 1 ? 'model' : 'models'}`}
      </p>
    </Link>
  );
};
