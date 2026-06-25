import { Model } from '../../modules/shared/types/Model';
import { Product } from '../../modules/shared/types/Product';
import styles from './ModelCharact.module.scss';

type Props = {
  product: Product | Model;
  property: string;
  weight: number;
};

export const ModelCharact: React.FC<Props> = ({
  product,
  property,
  weight,
}) => {
  const key = property as keyof (Product | Model);

  if (!product[key]) {
    return null;
  }

  return (
    <div className={styles.characteristic}>
      <span
        className={styles.characteristic__value}
        style={{ color: '#89939A', fontWeight: weight }}
      >
        {property === 'capacity'
          ? 'Built-in memory'
          : property.charAt(0).toUpperCase() + property.slice(1)}
      </span>

      <span
        className={styles.characteristic__value}
        style={{ color: '#313237', fontWeight: weight }}
      >
        {String(product[key])}
      </span>
    </div>
  );
};
