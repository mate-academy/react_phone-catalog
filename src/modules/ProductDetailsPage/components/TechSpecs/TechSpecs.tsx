import React from 'react';
import { ProductDetails } from '../../../shared/types/ProductDetails';
import { getSpecs } from '../../utils/getSpecs';
import styles from './TechSpecs.module.scss';
import classNames from 'classnames';

interface Props {
  product: ProductDetails;
}

export const TechSpecs: React.FC<Props> = ({ product }) => {
  const specs = getSpecs(product);

  return (
    <div className={styles.fullTechSpecs}>
      <h3 className={styles.sectionTitle}>Tech specs</h3>

      {specs.map(
        ({ label, value }) =>
          value && (
            <div className={styles.specRow} key={label}>
              <span className="body-text">{label}</span>
              <span className={classNames(styles.fullTechSpecsValue, 'body-text')}>{value}</span>
            </div>
          ),
      )}
    </div>
  );
};
