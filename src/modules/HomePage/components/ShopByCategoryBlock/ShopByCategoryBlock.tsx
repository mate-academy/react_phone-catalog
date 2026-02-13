import { Link } from 'react-router-dom';
import s from './ShopByCategoryBlock.module.scss';
import { categories } from '../../../../utils/variables/categories';
import { useProducts } from '../../../../context/products/useProducts';
import { BASE_URL } from '../../../../utils/variables/base';

export const ShopByCategoryBlock = () => {
  const { phones, tablets, accessories } = useProducts();
  const categoryCounts: Record<string, number> = {
    phones: phones.length,
    tablets: tablets.length,
    accessories: accessories.length,
  };

  return (
    <section className={s.section} aria-labelledby="categories">
      <h3 className={s.title}>Shop by category</h3>

      {categories.map(category => {
        return (
          <div className={s.categoryCard} key={category.name}>
            <Link
              to={`/${category.categoryId}`}
              className={s.categoryLink}
              style={{ backgroundColor: category.bGColor }}
            >
              <img
                src={`${BASE_URL}${category.img}`}
                alt={category.name}
                className={s.categoryImg}
              />
            </Link>

            <div className={s.categoryInfo}>
              <Link to={`/${category.categoryId}`} className={s.categoryName}>
                {category.name}
              </Link>
              <span className={s.categoryModels}>
                {categoryCounts[category.categoryId]} models
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
};
