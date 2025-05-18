import s from './Categories.module.scss';

const categories = ['phones.webp', 'tablets.webp', 'accessories.png'];

export const Categories = () => {
  return (
    <div className={s.categories}>
      <span className={s.categories__title}>Shop by category</span>
      <div className={s.categories__grid}>
        {categories.map((category, index) => {
          return (
            <div key={index} className={s.category}>
              <div className={s.category__background}>
                <img
                  className={s.category__img}
                  src={`img/category-${category}`}
                  alt=""
                />
              </div>

              <span className={s.category__name}>
                {index === 1
                  ? 'Mobile phones'
                  : index === 2
                    ? 'Tablets'
                    : 'Accessories'}
              </span>
              <span className={s.category__items_count}></span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
