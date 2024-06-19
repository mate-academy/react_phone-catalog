import { useContext } from 'react';
import style from './ShopByCategory.module.scss';
import { LanguageContext } from '../../../store/LanguageProvider';
import { CategoryCards } from './CategoryCards/CategoryCards';

export const ShopByCategory = () => {
  const { t } = useContext(LanguageContext);

  return (
    <section className={style.shopByCategory}>
      <h2 className={style.shopByCategory__title}>{t('shopByCategory')}</h2>

      <CategoryCards />
    </section>
  );
};