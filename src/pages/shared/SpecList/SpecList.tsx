import { ProductFull } from '../../../types/Product_full';
import styles from './SpecList.module.scss';

type Props = {
  specsToShow: number;
  product: ProductFull;
};

export const SpecList: React.FC<Props> = ({ specsToShow, product }) => {
  type ProductEntry = [keyof ProductFull, ProductFull[keyof ProductFull]];

  const specs = Object.entries(product).slice(
    12,
    12 + specsToShow,
  ) as ProductEntry[];

  return (
    <ul className={styles.specList}>
      {specs.map(([label, value]) => {
        const spec = Array.isArray(value) ? value.join(', ') : value;
        const normalizedSpec =
          typeof spec === 'string' &&
          spec.replace(/OLED\s*\(Super Retina XDR\)/g, 'Super Retina XDR');

        return (
          <li key={label} className={styles.specList__spec}>
            <span className={styles.specList__label}>
              {label === 'ram' ? label.toUpperCase() : label}
            </span>
            <span className={styles.specList__value}>
              {typeof normalizedSpec === 'string'
                ? normalizedSpec.replace('display', '')
                : spec}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
