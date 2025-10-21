/* eslint-disable max-len */
import './ProductPage.module.scss';
import styles from './ProductPage.module.scss';
import productData from '../../../public/api/products.json';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../shared/components/ProductCard/ProductCard';
import classNames from 'classnames';
import { Breadcrumb } from '../shared/components/Breadcrumb/Breadcrumb';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'alpha', label: 'Alphabetically' },
  { value: 'cheapest', label: 'Cheapest' },
];

const PAGINATION_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: '16', label: '16' },
  { value: '8', label: '8' },
  { value: '4', label: '4' },
];

export const ProductPage = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'newest';
  const perPage = searchParams.get('perPage') || 'all';
  const page = searchParams.get('page') ?? '1';

  const typeOfProduct = pathname.split('/').find(part => part[1]);

  const category = () => {
    switch (typeOfProduct) {
      case 'phones':
        const phones = productData.filter(phone => phone.category === 'phones');

        return phones;
      case 'tablets':
        const tablets = productData.filter(tablet => tablet.category === 'tablets');

        return tablets;
      case 'accessories':
        const accessories = productData.filter(accessor => accessor.category === 'accessories');

        return accessories;
      default:
        return [];
    }
  };

  const total = category().length;

  const totalPages = perPage !== 'all' ? Math.ceil(total / +perPage) : 1;

  const sortedProduct = [...category()].sort((p1, p2) => {
    switch (sort) {
      case 'alpha':
        return p2.name.localeCompare(p1.name);

      case 'cheapest':
        return p1.price - p2.price;

      default:
        return p2.year - p1.year;
    }
  });

  const start = (+page - 1) * +perPage;
  const end = start + +perPage;

  const productPerPage = perPage !== 'all' ? sortedProduct.slice(start, end) : sortedProduct;

  function handleSortBy(s: string) {
    const params = new URLSearchParams(searchParams);

    if (!s || s === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', s);
    }

    params.delete('page');
    setSearchParams(params);
  }

  function handlePerPage(num: string) {
    const params = new URLSearchParams(searchParams);

    if (!num || num === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', num);
    }

    params.delete('page');
    setSearchParams(params);
  }

  function handlePage(pageNum: number) {
    const params = new URLSearchParams(searchParams);

    if (pageNum <= 1) {
      params.delete('page');
    } else {
      params.set('page', pageNum.toString());
    }

    setSearchParams(params);
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__wrapper}>
        <div className={styles.catalog__container}>
          <section className={styles.catalog__navigation}>
            <Breadcrumb />
          </section>

          <section className={styles.catalog__header}>
            <div className={styles.header}>
              <h1 className={styles.header__title}>{typeOfProduct}</h1>
              <h3 className={styles.header__subtitle}>{`${category().length} models`}</h3>
            </div>
          </section>

          <section className={styles.catalog__products}>
            <div className={styles.catalog__filter}>
              <div className={styles.filter__list}>
                <div className={styles.filter__sort}>
                  <div className={styles.filter__title}>Sort by</div>
                  <select
                    id="sort_by"
                    className={styles.filter__menu}
                    value={sort || 'newest'}
                    onChange={e => handleSortBy(e.target.value)}
                  >
                    {SORT_OPTIONS.map(opt => {
                      return (
                        <option key={opt.value} value={opt.value} className={styles.filter__option}>
                          {opt.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className={styles.filter__item}>
                  <div className={styles.filter__title}>Items on page</div>
                  <select
                    id="items_on_page"
                    className={styles.filter__menu}
                    value={perPage}
                    onChange={e => handlePerPage(e.target.value)}
                  >
                    {PAGINATION_OPTIONS.map(opt => {
                      return (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.product__list}>
              <ProductCard productsArray={productPerPage} />
            </div>
          </section>

          {totalPages > 1 && (
            <section className={styles.catalog__slider}>
              <div className={styles.slider__header}>
                <div className={styles.slider__buttons}>
                  <button
                    className={`${styles.slider__button}  ${styles.left}`}
                    disabled={+page === 1}
                    onClick={() => handlePage(+page - 1)}
                  ></button>
                  <div className={styles.slider__pages}>
                    {Array.from({ length: totalPages }, (_, i) => {
                      const indexNorm = i + 1;

                      if (indexNorm >= +page - 1) {
                        if (page === '1' && i < +page + 3) {
                          return (
                            <button
                              key={indexNorm}
                              className={`${styles.slider__button}  ${styles.number} ${classNames(indexNorm === +page && styles.active)}`}
                              onClick={() => handlePage(i + 1)}
                            >
                              {indexNorm}
                            </button>
                          );
                        }

                        if (indexNorm < +page + 3) {
                          return (
                            <button
                              key={indexNorm}
                              className={`${styles.slider__button}  ${styles.number} ${styles.number} ${classNames(indexNorm === +page && styles.active)}`}
                              onClick={() => handlePage(i + 1)}
                            >
                              {indexNorm}
                            </button>
                          );
                        }
                      }
                    })}
                  </div>
                  <button
                    className={`${styles.slider__button}  ${styles.right}`}
                    disabled={+page === totalPages}
                    onClick={() => handlePage(+page + 1)}
                  ></button>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
