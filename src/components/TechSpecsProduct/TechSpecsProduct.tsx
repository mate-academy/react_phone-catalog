import { TypesOfProducts } from '../../types/TypesOfProducts';
import styles from './TechSpecsProduct.module.scss';

type Props = {
  product: TypesOfProducts;
};

export const getTechSpecs = (product: TypesOfProducts) => ({
  screen: product.screen,
  resolution: product.resolution,
  processor: product.processor,
  ram: product.ram,
  camera: 'camera' in product ? product.camera : null,
  zoom: 'zoom' in product ? product.zoom : null,
  cell: 'cell' in product ? product.cell : null,
});

export const TechSpecsProduct = ({ product }: Props) => {
  const specs = getTechSpecs(product);

  return (
    <div className={styles.techSpecs}>
      <div className={styles.techSpecs__top}>
        <span className={styles.techSpecs__topTitle}>Tech Specs</span>

        <div className={styles.techSpecs__topDivider}></div>
      </div>

      <ul className={styles.techSpecs__list}>
        {Object.entries(specs).map(([key, value]) =>
          value ? (
            <li key={key} className={styles.techSpecs__item}>
              <span className={styles.techSpecs__itemTitle}>{key}</span>
              {Array.isArray(value) ? (
                <span className={styles.techSpecs__itemText}>
                  {value.join(', ')}
                </span>
              ) : (
                <span className={styles.techSpecs__itemText}>{value}</span>
              )}
            </li>
          ) : null,
        )}
      </ul>
    </div>
  );
};
