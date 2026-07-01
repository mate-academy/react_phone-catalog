import React from 'react';
import { Phone } from '../../../types/Phone';
import styles from './ProductInfo.module.scss';
import { Tablet } from '../../../types/Tablet';
import { Accessories } from '../../../types/Accessories';

type Props = {
  selectedProduct: Phone | Tablet | Accessories | null;
};

export const ProductInfo: React.FC<Props> = ({ selectedProduct }) => {
  if (!selectedProduct) {
    return null;
  }

  const {
    description = [],
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell = [],
  } = selectedProduct as Phone;

  const techSpecs = [
    { label: 'Screen', value: screen },
    { label: 'Resolution', value: resolution },
    { label: 'Processor', value: processor },
    { label: 'RAM', value: ram },
    { label: 'Capacity', value: capacity },
    { label: 'Camera', value: camera },
    { label: 'Zoom', value: zoom },
    { label: 'Cell', value: cell.length > 0 ? cell.join(', ') : null },
  ];

  return (
    <div className={styles.productInfo_container}>
      {description.length > 0 && (
        <section className={styles.productInfo_aboutContainer}>
          <h3 className={styles.productInfo_title}>About</h3>
          <ul className={styles.productInfo_aboutContainer_list}>
            {description.map((item, index) => (
              <li
                key={`${item.title}-${index}`}
                className={styles.productInfo_aboutContainer_item}
              >
                {item.title && (
                  <h4 className={styles.productInfo_aboutContainer_title}>
                    {item.title}
                  </h4>
                )}
                {item.text && (
                  <p className={styles.productInfo_text}>
                    {Array.isArray(item.text) ? item.text.join(' ') : item.text}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className={styles.productInfo_techSpecsContainer}>
        <h3 className={styles.productInfo_title}>Tech specs</h3>
        <ul className={styles.productInfo_techSpecsContainer_list}>
          {techSpecs.map(({ label, value }) =>
            value ? (
              <li
                key={label}
                className={styles.productInfo_techSpecsContainer_item}
              >
                <p className={styles.productInfo_text}>{label}</p>
                <p className={styles.productInfo_details}>{value}</p>
              </li>
            ) : null,
          )}
        </ul>
      </section>
    </div>
  );
};
