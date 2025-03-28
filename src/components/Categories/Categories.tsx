import React from 'react';
import styles from './Categories.module.scss';

export const Categories: React.FC = () => {
  return (
    <>
      <div className={`${styles.category_main_container}`}>
        <h2 className={`${styles.category_title}`}>Shop by category</h2>
        <div className={`${styles.all_categories}`}>
          {[1, 2, 3].map(id => {
            return (
              <div className={`${styles.category_card}`} key={id}>
                <img
                  src="../../img/products/phones/category-phone.png"
                  alt="phone image"
                  className={`${styles.category_image}`}
                />
                <div className={`${styles.category_info_container}`}>
                  <h4 className={`${styles.category_name}`}>Mobile phones</h4>
                  <p className={`${styles.category_items_count}`}>95 models</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
