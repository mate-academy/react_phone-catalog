import { useTranslation } from 'react-i18next';

import { useCategoryCountsQuery } from '@/modules/home/queries';
import { ROUTES } from '@/shared/constants';

import accessoriesImg from '../../../../../public/img/category-accessories.png';
import phonesImg from '../../../../../public/img/category-phones.png';
import tabletsImg from '../../../../../public/img/category-tablets.png';

import styles from './Categories.module.scss';
import { CategoryItem } from './CategoryItem';

export const Categories = () => {
  const { t } = useTranslation();

  const { data: categoryCounts } = useCategoryCountsQuery();

  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>{t('shopByCategory')}</h2>

      <div className={styles.cards}>
        <CategoryItem
          image={phonesImg}
          name={t('mobilePhones')}
          link={ROUTES.PHONES}
          count={categoryCounts?.phones ?? 0}
        />
        <CategoryItem
          image={tabletsImg}
          name={t('tablets')}
          link={ROUTES.TABLETS}
          count={categoryCounts?.tablets ?? 0}
        />
        <CategoryItem
          image={accessoriesImg}
          name={t('accessories')}
          link={ROUTES.ACCESSORIES}
          count={categoryCounts?.accessories ?? 0}
        />
      </div>
    </section>
  );
};
