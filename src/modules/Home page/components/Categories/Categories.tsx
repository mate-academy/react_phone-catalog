import classNames from 'classnames';
import styles from './Categories.module.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const Categories = () => {
  const { t } = useTranslation();
  const loadProduct = async (category: string) => {
    const response = await fetch(`./api/${category}.json`);
    const data = await response.json();

    return data;
  };

  const [phones, setPhones] = React.useState<[]>([]);
  const [tablets, setTablets] = React.useState<[]>([]);
  const [accessories, setAccessories] = React.useState<[]>([]);

  React.useEffect(() => {
    const loadAll = async () => {
      const phonesData = await loadProduct('phones');
      const tabletsData = await loadProduct('tablets');
      const accessoriesData = await loadProduct('accessories');

      setPhones(phonesData);
      setTablets(tabletsData);
      setAccessories(accessoriesData);
    };

    loadAll();
  }, []);

  return (
    <div className={styles.Categories}>
      <div className={styles.Categories__title}>
        {t('categories.shop_by_category')}
      </div>
      <div className={styles.Categories__container}>
        <div className={styles.Categories__item}>
          <Link to="/phones">
            <img
              src="./img/category-phones.webp"
              alt="Mobile phones category"
              className={classNames(
                styles.Categories__image,
                styles.Categories__image_phones,
              )}
            />
          </Link>
          <h3 className={styles.Categories__item__title}>
            {t('categories.phones')}
          </h3>
          <p
            className={styles.Categories__amount}
          >{`${phones.length} models`}</p>
        </div>
        <div className={styles.Categories__item}>
          <Link to="/tablets">
            <img
              src="./img/category-tablets.webp"
              alt="Mobile phones category"
              className={classNames(
                styles.Categories__image,
                styles.Categories__image_tablets,
              )}
            />
          </Link>
          <h3 className={styles.Categories__item__title}>
            {t('categories.tablets')}
          </h3>
          <p
            className={styles.Categories__amount}
          >{`${tablets.length} models`}</p>
        </div>
        <div className={styles.Categories__item}>
          <Link to="/accessories">
            <img
              src="./img/category-accessories.webp"
              alt="Mobile phones category"
              className={classNames(
                styles.Categories__image,
                styles.Categories__image_accessories,
              )}
            />
          </Link>
          <h3 className={styles.Categories__item__title}>
            {t('categories.accessories')}
          </h3>
          <p
            className={styles.Categories__amount}
          >{`${accessories.length} ${t('categories.models')}`}</p>
        </div>
      </div>
    </div>
  );
};
