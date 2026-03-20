import React from 'react';
import { ProductDetail } from '@/types/ProductDetail';
import styles from './ProductDescription.module.scss';
import cn from 'classnames';

interface Props {
  product: ProductDetail;
}

export const ProductDescription: React.FC<Props> = ({ product }) => {
  const specs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built in memory', value: product.capacity },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell.join(', ') },
  ];

  return (
    <section className={styles.description}>
      <section className={cn(styles.about, styles.section)}>
        <h2 className={styles.title}>About</h2>
        <div className={styles.divider} />

        {product.description.map(item => (
          <article key={item.title} className={styles.section}>
            <h3 className={styles.subtitle}>{item.title}</h3>
            <p className={styles.text}>{item.text.join('\n\n')}</p>
          </article>
        ))}
      </section>

      <section className={cn(styles.specs, styles.section)}>
        <h2 className={styles.title}>Tech specs</h2>
        <div className={styles.divider} />

        <ul className={styles.list}>
          {specs.map(({ label, value }) => (
            <li key={label} className={styles.item}>
              <span className={styles.label}>{label}</span>
              <span className={styles.value}>{value}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};
