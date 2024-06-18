import { useContext } from 'react';
import { LanguageContext } from '../../../../store/LanguageProvider';
import { CategoryList } from '../../../../utils/CategoryList';
import style from './CategoryCards.module.scss';
import { ProductsContext } from '../../../../store/ProductsProvider';

export const CategoryCards = () => {
  const { t } = useContext(LanguageContext);
  const { phones, tablets, accessories } = useContext(ProductsContext);
  const items = [phones.length, tablets.length, accessories.length];

  return (
    <div className={style.category}>
      <div className={style.category__container}>
        {CategoryList.map((photo, i) => (
          <div className={style.category__card} key={i}>
            <a href="#" className={style.category__cardLink}>
              <img
                className={style.category__cardImage}
                src={photo.src}
                alt={photo.alt}
              />
            </a>
            <a href="#" className={style.category__cardName}>
              {t(photo.title)}
            </a>
            <p className={style.category__cardQuantity}>{items[i]} models</p>
          </div>
        ))}
      </div>
    </div>
  );
};
