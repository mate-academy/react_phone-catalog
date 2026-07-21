import { FC } from 'react';
import { ProductDetails } from '../../../shared/types/Product';
import styles from './ProductTechSpecs.module.scss';

type Props = {
  productDetails: ProductDetails;
};

export const ProductTechSpecs: FC<Props> = ({ productDetails }) => {
  const specs = Object.entries({
    Screen: productDetails.screen,
    Resolution: productDetails.resolution,
    Processor: productDetails.processor,
    RAM: productDetails.ram,
    [productDetails.category === 'accessories' ? 'Size' : 'Built in memory']:
      productDetails.capacity,
    Camera: productDetails.camera,
    Zoom: productDetails.zoom,
    Cell: productDetails.cell.join(', '),
  }).filter(([, value]) => value);

  return (
    <section className={styles.techSpecs}>
      <h3 className={styles.techSpecs__title}>Tech specs</h3>

      <dl className={styles.techSpecs__list}>
        {specs.map(([name, value]) => (
          <div className={styles.techSpecs__item} key={name}>
            <dt className={styles.techSpecs__name}>{name}</dt>
            <dd className={styles.techSpecs__value}>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
