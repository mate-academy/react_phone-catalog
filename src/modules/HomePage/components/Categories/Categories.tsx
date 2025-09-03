import scss from './Categories.module.scss';

export const Categories = () => {
  return (
    <div className={scss.categories}>
      <h2>Shop by category</h2>
      <a className={scss.categories__link} href="/phones">
        <div className={scss.categories__media}>
          <img
            src="/img/category-phones.png"
            alt=""
            className={scss.categories__image}
          />
        </div>
        <div className={scss.categories__wrapper}>
          <span className={scss.categories__title}>Mobile phones</span>
          <span className={scss.categories__counter}>Models</span>
        </div>
      </a>
    </div>
  );
};
