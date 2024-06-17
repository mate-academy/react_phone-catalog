import { useContext } from 'react';
import { LanguageContext } from '../../../../store/LanguageProvider';
import { CategoryList } from '../../../../utils/CategoryList';
import style from './CategoryLink.module.scss';
import { ProductsContext } from '../../../../store/ProductsProvider';

export const CategoryLink = () => {
  const { t } = useContext(LanguageContext);
  const { phones, tablets, accessories } = useContext(ProductsContext);
  const items = [phones.length, tablets.length, accessories.length];

  return (
    <div className={style.categoryItems}>
      <div className={style.categoryItems__list}>
        {CategoryList.map((photo, i) => (
          <div className={style.categoryItems__item} key={i}>
            <a href="#" className={style.categoryItems__imageLink}>
              <img
                className={style.categoryItems__image}
                src={photo.src}
                alt={photo.alt}
              />
            </a>
            <a href="#" className={style.categoryItems__titleLink}>
              {t(photo.title)}
            </a>
            <p className={style.categoryItems__items}>{items[i]} models</p>
          </div>
        ))}
      </div>
    </div>
  );
};
