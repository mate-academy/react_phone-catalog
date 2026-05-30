import { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './CatalogPage.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Product } from '../../types/Product';
import { SortBy } from '../../types/SortBy';
import { getData } from '../../utils/fetchClients';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Dropdown } from '../../components/Dropdown';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { Loader } from '../../components/Loader';

type Props = {
  title: string;
  category: 'phones' | 'tablets' | 'accessories';
};

export const CatalogPage: React.FC<Props> = ({ title, category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const countModels = products.length;

  const sortBy = searchParams.get('sort');
  const itemsOnPage = searchParams.get('perPage') || `${countModels}`;
  const currentPage = searchParams.get('page') || '1';

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = itemsOnPage ? Math.ceil(countModels / +itemsOnPage) : 1;

  const navigate = useNavigate();

  const sortProducts = products.sort((product1, product2) => {
    switch (sortBy) {
      case SortBy.price:
        return product1.price - product2.price;

      case SortBy.name:
        return product1.name.localeCompare(product2.name);

      default:
        return product1.year - product2.year;
    }
  });

  const currentProducts = [...sortProducts].slice(
    (+currentPage - 1) * +itemsOnPage,
    +currentPage * +itemsOnPage,
  );

  useEffect(() => {
    setLoading(true);

    getData<Product[]>(`api/products.json`)
      .then(data => {
        const filteredData = data.filter(
          product => product.category === category,
        );

        setProducts(filteredData);
      })
      .catch(() => {
        setError('Не вдалося завантажити дані. Спробуйте ще раз.');

        setTimeout(() => {
          navigate('..');
          setError(null);
        }, 2000);
      })
      .finally(() => setLoading(false));
  }, [category, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className={classNames('section', styles.catalog)}>
      <Breadcrumbs
        products={products}
        classNameProps={styles.catalog__breadcrumbs}
      />
      <h2 className={classNames('title', styles.catalog__title)}>{title}</h2>

      <p className={styles['count-models']}>{countModels} models</p>

      <div className={styles['catalog__filters-block']}>
        <Dropdown name="sort" className={styles['filter-block__item']} />
        <Dropdown name="perPage" className={styles['filter-block__item']} />
      </div>

      <div
        className={classNames(
          styles['catalog__block-items'],
          styles['block-items'],
        )}
      >
        {countModels ? (
          currentProducts.map(product => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                classNameProp={styles['block-items__item']}
              />
            );
          })
        ) : (
          <p className={styles['product-not-found']}>Product was not found</p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          className={styles.catalog__pagination}
          currentPage={+currentPage}
          totalPages={totalPages}
        />
      )}
    </section>
  );
};
