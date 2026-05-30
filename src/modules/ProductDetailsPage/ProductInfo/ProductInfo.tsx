import React from 'react';
import { Phone } from '../../../types/Phone';
import styles from './ProductInfo.module.scss';

type Props = {
  selectedProduct: Phone | null;
};

export const ProductInfo: React.FC<Props> = ({ selectedProduct }) => {
  if (!selectedProduct) {
    return null;
  }

  return (
    <div className={styles.productInfo_container}>
      {selectedProduct.description?.length > 0 && (
        <section className={styles.productInfo_aboutContainer}>
          <h3 className={styles.productInfo_title}>About</h3>
          <ul className={styles.productInfo_aboutContainer_list}>
            {selectedProduct.description.map((describe, index) => (
              <li
                key={index}
                className={styles.productInfo_aboutContainer_item}
              >
                {describe.title && (
                  <h4 className={styles.productInfo_aboutContainer_title}>
                    {describe.title}
                  </h4>
                )}
                {describe.text && (
                  <p className={styles.productInfo_text}>{describe.text}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className={styles.productInfo_techSpecsContainer}>
        <h3 className={styles.productInfo_title}>Tech specs</h3>
        <ul className={styles.productInfo_techSpecsContainer_list}>
          {selectedProduct.screen && (
            <li className={styles.productInfo_techSpecsContainer_item}>
              <p className={styles.productInfo_text}>Screen</p>
              <p className={styles.productInfo_details}>
                {selectedProduct.screen}
              </p>
            </li>
          )}
          {selectedProduct.resolution && (
            <li className={styles.productInfo_techSpecsContainer_item}>
              <p className={styles.productInfo_text}>Resolution</p>
              <p className={styles.productInfo_details}>
                {selectedProduct.resolution}
              </p>
            </li>
          )}
          {selectedProduct.processor && (
            <li className={styles.productInfo_techSpecsContainer_item}>
              <p className={styles.productInfo_text}>Processor</p>
              <p className={styles.productInfo_details}>
                {selectedProduct.processor}
              </p>
            </li>
          )}
          {selectedProduct.ram && (
            <li className={styles.productInfo_techSpecsContainer_item}>
              <p className={styles.productInfo_text}>RAM</p>
              <p className={styles.productInfo_details}>
                {selectedProduct.ram}
              </p>
            </li>
          )}
          {selectedProduct.capacity && (
            <li className={styles.productInfo_techSpecsContainer_item}>
              <p className={styles.productInfo_text}>Built-in memory</p>
              <p className={styles.productInfo_details}>
                {selectedProduct.capacity}
              </p>
            </li>
          )}
          {selectedProduct.camera && (
            <li className={styles.productInfo_techSpecsContainer_item}>
              <p className={styles.productInfo_text}>Camera</p>
              <p className={styles.productInfo_details}>
                {selectedProduct.camera}
              </p>
            </li>
          )}
          {selectedProduct.zoom && (
            <li className={styles.productInfo_techSpecsContainer_item}>
              <p className={styles.productInfo_text}>Zoom</p>
              <p className={styles.productInfo_details}>
                {selectedProduct.zoom}
              </p>
            </li>
          )}
          {selectedProduct.cell?.length > 0 && (
            <li className={styles.productInfo_techSpecsContainer_item}>
              <p className={styles.productInfo_text}>Cell</p>
              <p className={styles.productInfo_details}>
                {selectedProduct.cell.join(', ')}
              </p>
            </li>
          )}
        </ul>
      </section>
    </div>
  );
};
