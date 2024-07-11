import { useContext } from 'react';
import { LanguageContext } from '../../../../store/LanguageProvider';
import { CategoryList } from '../../../../utils/CategoryList';
import style from './CategoryCards.module.scss';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../../../store/ProductsProvider';
import { Category } from '../../../../enums/Category';
import { Skeleton } from '../../../Skeleton';

export const CategoryCards = () => {
  const { t } = useContext(LanguageContext);
  const { products } = useContext(ProductsContext);
  const { isLoading } = useContext(ProductsContext);

  const items = products.reduce(
    (counts, product) => {
      let phoneCounts = counts[0];
      let tabletCounts = counts[1];
      let accessoriesCounts = counts[2];

      if (product.category === Category.phones) {
        phoneCounts++;
      } else if (product.category === Category.tablets) {
        tabletCounts++;
      } else if (product.category === Category.accessories) {
        accessoriesCounts++;
      }

      return [phoneCounts, tabletCounts, accessoriesCounts];
    },
    [0, 0, 0],
  );

  return (
    <div className={style.category}>
      <div className={style.category__container}>
        {CategoryList.map((photo, i) => (
          <div className={style.category__card} key={i}>
            {!isLoading ? (
              <Link to={photo.link} className={style.category__cardLink}>
                <img
                  className={style.category__cardImage}
                  src={photo.src}
                  alt={photo.alt}
                />
              </Link>
            ) : (
              <div className={style.category__skeletonCenter}>
                <Skeleton
                  className={`${style.category__container} ${style.category__card} `}
                  width={350}
                  height={350}
                />
              </div>
            )}

            {!isLoading ? (
              <Link to={photo.link} className={style.category__cardName}>
                {t(photo.title)}
              </Link>
            ) : (
              <Skeleton
                className={style.category__cardName}
                width={100}
                height={26}
              />
            )}

            {!isLoading ? (
              <p className={style.category__cardQuantity}>
                {items[i]} {t('models')}
              </p>
            ) : (
              <Skeleton
                className={style.category__cardQuantity}
                width={80}
                height={12}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
