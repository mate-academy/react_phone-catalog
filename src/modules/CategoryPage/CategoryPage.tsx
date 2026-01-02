import { ProductsList } from '../ProductsList';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { Footer } from '../shared/Footer';
import { Header } from '../shared/Header';
import apiProducts from '../../../public/api/products.json';
import React, { useEffect, useState } from 'react';
import styles from './CategoryPage.module.scss';
import { CustomSelect } from './CustomSelect';

enum Category {
  phones = 'phones',
  tablets = 'tablets',
  accessories = 'accessories',
}

export const CategoryPage: React.FC<{ category: string; title: string }> = ({
  category,
  title,
}) => {
  const [countModels, setCountModels] = useState(0);
  const [sort, setSort] = useState('newest');
  const [perPage, setPerPage] = useState('16');
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getModelsCount = (category: string) => {
    if (category === Category.phones) {
      return apiProducts.filter(product => product.category === Category.phones)
        .length;
    } else if (category === Category.tablets) {
      return apiProducts.filter(
        product => product.category === Category.tablets,
      ).length;
    } else if (category === Category.accessories) {
      return apiProducts.filter(
        product => product.category === Category.accessories,
      ).length;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    setCountModels(getModelsCount(category));
  }, [category]);

  return (
    <>
      <Header />
      <div className={styles.categoryPage}>
        <Breadcrumbs category={category} />
        <h1 className={styles.categoryPage__title}>{title}</h1>
        <p className={styles.categoryPage__countmodels__p}>
          {countModels} models
        </p>
        {/* {зробити СЕЛЕКТИ ХОВЕР ФОКУСИ ТА ЗАВДЯКИ ВІДЕО МЕЙТ ЗРОБИТИ СОРТУВАННЯ} */}
        <div className={styles.categoryPage__filteredmodel}>
          <div className={styles.categoryPage__sort}>
            <label htmlFor="sort" className={styles.categoryPage__label}>
              Sort by
            </label>
            <CustomSelect
              id="sort"
              value={sort}
              onChange={setSort}
              options={[
                { value: 'newest', label: 'Newest' },
                { value: 'oldest', label: 'Oldest' },
                { value: 'alpha-asc', label: 'Alphabetically, A-Z' },
                { value: 'alpha-desc', label: 'Alphabetically, Z-A' },
                { value: 'price-low-high', label: 'Price: Low to High' },
                { value: 'price-high-low', label: 'Price: High to Low' },
              ]}
              ariaLabel="Sort products"
            />
          </div>
          <div className={styles.categoryPage__sort}>
            <label htmlFor="perPage" className={styles.categoryPage__label}>
              Items on page
            </label>
            <CustomSelect
              id="perPage"
              value={perPage}
              onChange={setPerPage}
              options={[
                { value: '4', label: '4' },
                { value: '8', label: '8' },
                { value: '16', label: '16' },
                { value: 'all', label: 'all' },
              ]}
              ariaLabel="Items on page"
            />
          </div>
        </div>
        <ProductsList category={category} />
      </div>
      <Footer />
    </>
  );
};
