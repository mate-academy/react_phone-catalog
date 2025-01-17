import { useTranslation } from 'react-i18next';
import styles from './CategoriesSection.module.scss';
import { useAppSelector } from '../../hooks/hooks';
import phonesImg from '../../images/phones-category.png';
import tabletsImg from '../../images/tablets-category.png';
import accessoriesImg from '../../images/accessories-category.png';
import { Categories } from '../../types/Categories';
import { Link } from 'react-router-dom';

type CategoryBlock = {
  title: string;
  image: string;
  type: Categories;
};

type CategoryOptions = {
  phones: CategoryBlock;
  tablets: CategoryBlock;
  accessories: CategoryBlock;
};

export const CategoriesSection = () => {
  const { products } = useAppSelector(state => state.products);
  const { t } = useTranslation();

  const categoryOptions: CategoryOptions = {
    phones: {
      title: t('homePage.categories.phonesTitle'),
      image: phonesImg,
      type: Categories.Phones,
    },
    tablets: {
      title: t('homePage.categories.tabletsTitle'),
      image: tabletsImg,
      type: Categories.Tablets,
    },
    accessories: {
      title: t('homePage.categories.accessoriesTitle'),
      image: accessoriesImg,
      type: Categories.Accessories,
    },
  };

  const productItemsCount = (type: Categories) => {
    const countedProducts = products.filter(
      product => product.category === type,
    );

    return countedProducts.length;
  };

  const getCountForm = (count: number) => {
    if (count === 1) {
      return 'one';
    }

    if (count > 1 && count <= 4) {
      return 'few';
    }

    if (count === 34 || count === 124) {
      return 'few';
    }

    if (count > 4) {
      return 'many';
    }

    return 'other';
  };

  return (
    <div className={styles.categories}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.mainTitle}>
            {t('homePage.categories.mainTitle')}
          </h2>

          <div className={styles.items}>
            {Object.values(categoryOptions).map(category => {
              const count = productItemsCount(category.type);
              const countForm = getCountForm(count);

              return (
                <div className={styles.item} key={category.title}>
                  <Link
                    to={category.type}
                    className={styles.link}
                    data-title={`${t('homePage.categories.shopLatest', { category: category.title.charAt(0).toLowerCase() + category.title.slice(1) })} – ${t('homePage.categories.performanceAndStyle')}`}
                  >
                    <img
                      src={category.image}
                      alt="Category Image"
                      className={styles.img}
                    />
                  </Link>

                  <div className={styles.details}>
                    <h3 className={styles.title}>{category.title}</h3>
                    <p className={styles.count}>
                      {t(`homePage.categories.count_${countForm}`, { count })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
