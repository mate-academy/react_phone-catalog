import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useTranslate } from '../../hooks/useTranslate';
import { getProductsByCategory } from '../../utils/getProductsByCategory';
import { CATEGORY_LIST } from '../../constants/Products/productsCategory';
import style from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  const { productsList: products } = useProducts();
  const t = useTranslate();

  const categoriesWithQty = useMemo(
    () =>
      CATEGORY_LIST.map(category => ({
        ...category,
        modelsCount: getProductsByCategory(products, category.key).length,
      })),
    [products],
  );

  return (
    <ul className={style.categories}>
      {categoriesWithQty.map(category => {
        const { key, to, image, modelsCount } = category;

        return (
          <li key={key} className={style.categoryItem}>
            <Link to={to} className={style.categoryLink}>
              <figure className={style.categoryFigure}>
                <img
                  className={style.categoryImg}
                  src={image}
                  alt={t(`categories.${key}`)}
                  loading="lazy"
                />
                <figcaption className={style.categoryCaption}>
                  <h3 className={style.categoryTitle}>
                    {t(`categories.${key}`)}
                  </h3>
                  <p className={style.categoryQty}>
                    {modelsCount}{' '}
                    {t('byCategory.models', { count: modelsCount })}
                  </p>
                </figcaption>
              </figure>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
