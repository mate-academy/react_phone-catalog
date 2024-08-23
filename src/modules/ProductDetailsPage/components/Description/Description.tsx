import React from 'react';
import styles from './Description.module.scss';
import classNames from 'classnames';
import { useAppContext } from '../../../../context/AppContext';

export const Description: React.FC = () => {
  const { clickedProduct } = useAppContext();

  return (
    <section className={classNames(styles.descriptionSection, styles.section)}>
      <h3 className={styles.sectionTitle}>About</h3>
      <div className={styles.divider}></div>

      {clickedProduct !== undefined ? (
        clickedProduct.description.map((p, index) => (
          <article className={styles.descriptionSection} key={index}>
            <h4 className={styles.descriptionTitle}>
              {p.title}
            </h4>

            <p className={styles.descriptionText}>
              {p.text}
            </p>
          </article>
        ))
        ) : (
        ""
      )}
    </section>
  );
};
