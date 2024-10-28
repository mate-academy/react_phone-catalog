import React from 'react';
import { DescriptionProduct } from '../../../../types/Product';
import styles from './ProductDescription.module.scss';
import classNames from 'classnames';

type Props = {
  descriptions: DescriptionProduct[];
  otherClass?: string;
};
export const ProductDescription: React.FC<Props> = ({
  descriptions,
  otherClass,
}) => {
  return (
    <div className={classNames(styles.ProductDescription, otherClass)}>
      {descriptions.map(description => (
        <div
          className={styles.ProductDescription__block}
          key={description.title}
        >
          <h4 className={styles.ProductDescription__blockTitle}>
            {description.title}
          </h4>

          <div className={styles.ProductDescription__blockText}>
            {description.text.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
