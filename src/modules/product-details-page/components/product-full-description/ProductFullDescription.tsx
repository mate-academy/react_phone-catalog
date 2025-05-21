import React from 'react';
import styles from './ProductFullDescription.module.scss';
import { ProductData } from '../../../../types/types';

interface Props {
  product: ProductData;
}

export const ProductFullDescription: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.description}>
      <div className={styles.description__section}>
        <h3 className={styles['description__section-title']}>About</h3>
        <div className="divider"></div>
        {product.description.map((info, index) => (
          <div key={index}>
            <h4 className={styles['description__section-subtitle']}>
              {info.title}
            </h4>
            {info.text.map((text, i) => (
              <p key={i} className={styles.description__text}>
                {text}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.description__section}>
        <h3 className={styles['description__section-title']}>Tech specs</h3>
        <div className="divider"></div>
        <ul className={styles['description__tech-specs-list']}>
          <li className={styles['description__tech-spec-item']}>
            <span className={styles['description__tech-spec-name']}>
              Screen
            </span>
            <span className={styles['description__tech-spec-value']}>
              {product.screen}
            </span>
          </li>
          <li className={styles['description__tech-spec-item']}>
            <span className={styles['description__tech-spec-name']}>
              Resolution
            </span>
            <span className={styles['description__tech-spec-value']}>
              {product.resolution}
            </span>
          </li>
          <li className={styles['description__tech-spec-item']}>
            <span className={styles['description__tech-spec-name']}>
              Processor
            </span>
            <span className={styles['description__tech-spec-value']}>
              {product.processor}
            </span>
          </li>
          <li className={styles['description__tech-spec-item']}>
            <span className={styles['description__tech-spec-name']}>RAM</span>
            <span className={styles['description__tech-spec-value']}>
              {product.ram}
            </span>
          </li>
          <li className={styles['description__tech-spec-item']}>
            <span className={styles['description__tech-spec-name']}>
              Built in memory
            </span>
            <span className={styles['description__tech-spec-value']}>
              {product.capacity}
            </span>
          </li>
          {product.camera && (
            <li className={styles['description__tech-spec-item']}>
              <span className={styles['description__tech-spec-name']}>
                Camera
              </span>
              <span className={styles['description__tech-spec-value']}>
                {product.camera}
              </span>
            </li>
          )}
          {product.zoom && (
            <li className={styles['description__tech-spec-item']}>
              <span className={styles['description__tech-spec-name']}>
                Zoom
              </span>
              <span className={styles['description__tech-spec-value']}>
                {product.zoom}
              </span>
            </li>
          )}
          <li className={styles['description__tech-spec-item']}>
            <span className={styles['description__tech-spec-name']}>Cell</span>
            <span className={styles['description__tech-spec-value']}>
              {Array.isArray(product.cell)
                ? product.cell.join(', ')
                : product.cell}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
