import React from 'react';
import styles from './Description.module.scss';
import { IProductDetails } from '../../../../interfaces/ProductDetails.interface';

const Description: React.FC<{ product: IProductDetails }> = ({ product }) => {
  const specs = [
    { label: "Screen", value: product?.screen },
    { label: "Resolution", value: product?.resolution },
    { label: "Processor", value: product?.processor },
    { label: "RAM", value: product?.ram },
    { label: "Capacity", value: product?.capacity },
    { label: "Camera", value: product?.camera },
    { label: "Zoom", value: product?.zoom },
    { label: "Cell", value: product?.cell.join(", ") },
  ];

  return (
    <div className={styles.description}>
      <div className={styles.about}>
        <h2>About</h2>
        <div className={styles.line}></div>
        {product.description.map(item => (
          <div className={styles.about__item}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <div className={styles.techSpecs}>
        <h2>Tech specs</h2>
        <div className={styles.line}></div>
        <div className={styles.techSpecs__items}>
          {specs.map((spec, index) => (
            spec.value && (
              <div key={index}>
                <h4>{spec.label}</h4>
                <p>{spec.value}</p>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  )
}

export default Description;
