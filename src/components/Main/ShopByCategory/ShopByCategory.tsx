import { useContext } from 'react';
import style from './ShopByCategory.module.scss';
import { LanguageContext } from '../../../store/LanguageProvider';
import { CategoryCards } from './CategoryCards/CategoryCards';
import { ProductsContext } from '../../../store/ProductsProvider';
import { Skeleton } from '../../Skeleton';

export const ShopByCategory = () => {
  const { t } = useContext(LanguageContext);
  const { isLoading } = useContext(ProductsContext);

  return (
    <section className={style.shopByCategory}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <h2 className={style.shopByCategory__title}>{t('shopByCategory')}</h2>
      )}

      <CategoryCards />
    </section>
  );
};
