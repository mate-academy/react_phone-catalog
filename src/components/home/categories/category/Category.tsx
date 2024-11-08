import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Title } from '@ui/index';

import { scrollToTop } from '@utils/helpers/scrollToTop';
import { ICategory } from '@utils/types/category.interface';

import styles from './Category.module.scss';

type TProps = {
  categories: ICategory;
};

export const Category: FC<TProps> = ({ categories }) => {
  const { t } = useTranslation();
  const { category, color, img } = categories;
  const quantityOfProducts = categories.length;

  const localName = t(`home.categories.category.${category}`);
  const localAlt = t('home.categories.alt', { name: localName });
  const lowerCase = localName.toLowerCase();
  const localSub = t('home.categories.sub', { name: lowerCase });
  const localModel = t(`home.categories.model`, { count: quantityOfProducts });

  return (
    <div className={styles.item}>
      <Link to={category} title={localSub} onClick={scrollToTop}>
        <div className={styles.image} style={{ backgroundColor: `${color}` }}>
          <img src={img} alt={localAlt} />
        </div>

        <div className={styles.text}>
          <Title level={3}>{localName}</Title>

          <span>{localModel}</span>
        </div>
      </Link>
    </div>
  );
};
