import React from 'react';
import styles from './Categories.module.scss';

export const Categories: React.FC = () => {
  const CategoriesCollection = [
    {
      src: "../../img/categories/phones.png",
      alt: "phone image",
      title: "Mobile phones",
      count: "95",
    },
    {
      src: "../../img/categories/tablets.png",
      alt: "tablet image",
      title: "Tablets",
      count: "24",
    },
    {
      src: "../../img/categories/accessories.png",
      alt: "phone image",
      title: "Accessories",
      count: "100",
    }
  ]

  return (
    <>
      <div className={`${styles.category_main_container}`}>
        <h2 className={`${styles.category_title}`}>Shop by category</h2>
        <div className={`${styles.all_categories}`}>
          {CategoriesCollection.map((category, id) => {
            return (
              <div className={`${styles.category_card}`} key={id}>
                <img
                  src={category.src}
                  alt={category.alt}
                  className={`${styles.category_image}`}
                />
                <div className={`${styles.category_info_container}`}>
                  <h4 className={`${styles.category_name}`}>{category.title}</h4>
                  <p className={`${styles.category_items_count}`}>{category.count} models</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
