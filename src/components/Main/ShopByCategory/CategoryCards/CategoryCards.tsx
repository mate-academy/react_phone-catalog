import { useContext } from 'react';
import { LanguageContext } from '../../../../store/LanguageProvider';
import { CategoryList } from '../../../../utils/CategoryList';
import style from './CategoryCards.module.scss';
import { ProductsContext } from '../../../../store/ProductsProvider';
import { Link } from 'react-router-dom';

export const CategoryCards = () => {
  const { t } = useContext(LanguageContext);
  const { phones, tablets, accessories } = useContext(ProductsContext);
  const items = [phones.length, tablets.length, accessories.length];

  return (
    <div className={style.category}>
      <div className={style.category__container}>
        {CategoryList.map((photo, i) => (
          <div className={style.category__card} key={i}>
            <Link to={photo.link} className={style.category__cardLink}>
              <img
                className={style.category__cardImage}
                src={photo.src}
                alt={photo.alt}
              />
            </Link>
            <Link to={photo.link} className={style.category__cardName}>
              {t(photo.title)}
            </Link>
            <p className={style.category__cardQuantity}>
              {items[i]} {t('models')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
