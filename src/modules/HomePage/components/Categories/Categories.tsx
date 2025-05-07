import { useEffect, useState } from 'react';
import { Article } from '../../../../shared/types/Article';
import styles from './Categories.module.scss';
import { getDataPublic } from '../../../../shared/functions/getDataPublic';
import { Products } from '../../../../shared/types/Products';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../../shared/Loader';
import { useTranslation } from 'react-i18next';

export const Categories: React.FC = () => {
  const [products, setProducts] = useState<Article[] | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getDataPublic('products').then((response: Article[]) => {
      setProducts(response);
    });
  }, []);

  function findCount(category: Products) {
    return products?.filter((el: Article) => el.category === category).length;
  }

  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>{t('categories_title')}</h2>

      {products ? (
        <div className={styles.categories__content}>
          <div
            onClick={() => navigate('/phones')}
            className={styles.categories__category}
          >
            <div className={styles.categories__window}>
              <img
                className={styles.categories__image}
                src={`${import.meta.env.BASE_URL}/img/category-phones1.webp`}
                alt="Category Image"
              />
              <div
                style={{ backgroundColor: '#6D6474' }}
                className={styles.categories__background}
              ></div>
            </div>
            <h3 className={styles.categories__name}>
              {t('categories_phones')}
            </h3>
            <p
              className={styles.categories__value}
            >{`${findCount(Products.Phones)} ${t('categories_models')}`}</p>
          </div>

          <div
            onClick={() => navigate('/tablets')}
            className={styles.categories__category}
          >
            <div className={styles.categories__window}>
              <img
                className={styles.categories__image}
                src={`${import.meta.env.BASE_URL}/img/category-tablets1.webp`}
                alt="Category Image"
              />
              <div
                style={{ backgroundColor: '#8D8D92' }}
                className={styles.categories__background}
              ></div>
            </div>
            <h3 className={styles.categories__name}>
              {t('categories_tablets')}
            </h3>
            <p className={styles.categories__value}>
              {`${findCount(Products.Tablets)} ${t('categories_models')}`}
            </p>
          </div>

          <div
            onClick={() => navigate('/accessories')}
            className={styles.categories__category}
          >
            <div className={styles.categories__window}>
              <img
                className={styles.categories__image}
                src={`${import.meta.env.BASE_URL}/img/category-accessories1.webp`}
                alt="Category Image"
              />
              <div
                style={{ backgroundColor: '#973D5F ' }}
                className={styles.categories__background}
              ></div>
            </div>
            <h3 className={styles.categories__name}>
              {t('categories_accessories')}
            </h3>
            <p
              className={styles.categories__value}
            >{`${findCount(Products.Accessories)} ${t('categories_models')}`}</p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};
