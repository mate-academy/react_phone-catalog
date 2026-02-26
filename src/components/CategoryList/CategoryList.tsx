import { Category } from "../../types/types";
import React, { useContext, useMemo } from "react";
import { StateContext } from "../../providers/GlobalStateProvider";
import styles from "./Category.module.scss";
import { Link } from "react-router-dom";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";
import { getAssetPath } from "../../utils";

export const CategoryList: React.FC = () => {
  const { allProducts } = useContext(StateContext);
  const { labels } = useContext(AppSettingsContext);

  const productsLengthByCategory = useMemo(() => {
    return allProducts.reduce(
      (acc, product) => {
        const category = product.category as Category;

        return {
          ...acc,
          [category]: (acc[category] || 0) + 1,
        };
      },
      {} as Record<Category, number>,
    );
  }, [allProducts]);

  const backgroundColor: Record<string, string> = {
    [Category.Phones]: "#6D6474",
    [Category.Tablets]: "#8D8D92",
    [Category.Accessories]: "#973D5F",
  };

  return (
    <section className={styles.category}>
      <div className={styles.heading}>
        <h2 className="heading__title title text-h2">
          {labels.shopByCategory}
        </h2>
      </div>
      <ul className={styles.categoryList}>
        {Object.values(Category).map(category => {
          return (
            <li key={category} className={styles.categoryItem}>
              <Link
                style={{ backgroundColor: backgroundColor[category] }}
                to={`/${category}`}
                className={styles.categoryLink}
              >
                <img
                  src={getAssetPath(`img/category-${category}.webp`)}
                  alt={category}
                  className={styles.categoryImage}
                />
              </Link>
              <div className="category__description">
                <p className={`${styles.categoryName} text-h4`}>
                  {category === Category.Phones
                    ? labels.mobilePhones
                    : category === Category.Tablets
                      ? labels.tablets
                      : labels.accessories}
                </p>
                <p className="category__amount text-small">
                  {labels.models(productsLengthByCategory[category] ?? 0)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
