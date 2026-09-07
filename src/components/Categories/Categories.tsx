import { Link } from 'react-router-dom';
import style from './Categories.module.scss';
import { useCategories } from './hooks/useCategories';

export const Categories = () => {
  const categories = useCategories();

  return (
    <section>
      <h2 className={style.sectionTitle}>Shop by category</h2>
      <div className={style.categoryWrapper}>
        {categories.map((category, index) => (
          <article className={style.categoryCard} key={index}>
            <Link
              to={category.url}
              className={style.categoryLink}
              style={{ background: category.background }}
            >
              <img
                src={category.image}
                alt={category.title}
                className={style.categoryImg}
              />
            </Link>

            <div>
              <h4 className={style.categoryTitle}>{category.title}</h4>
              <p className={style.categoryQuantity}>
                {category.quantity} models
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
