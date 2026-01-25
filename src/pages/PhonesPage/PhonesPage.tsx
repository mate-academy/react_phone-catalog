import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Phone } from '../../types/Phone';
import { ProductCard } from '../../components/ProductCard';
import styles from './PhonesPage.module.scss';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const loadPhones = async () => {
      const phonesResponse = await fetch('/api/phones.json');
      const phonesData = await phonesResponse.json();

      const productsResponse = await fetch('/api/products.json');
      const productsData = await productsResponse.json();

      const phonesWithYear = phonesData.map((phone: Phone) => {
        const foundProduct = productsData.find(
          (product: { itemId: string; year: number }) =>
            product.itemId === phone.id,
        );

        const year = foundProduct ? foundProduct.year : 0;

        return {
          ...phone,
          year: year,
        };
      });

      setPhones(phonesWithYear);
    };

    loadPhones();
  }, []);

  const sortedPhones = useMemo(() => {
    const sorted = [...phones];

    switch (sort) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        sorted.sort((a, b) => {
          const priceA = a.priceDiscount || a.priceRegular;
          const priceB = b.priceDiscount || b.priceRegular;

          return priceA - priceB;
        });
        break;
      case 'age':
        sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      default:
        break;
    }

    return sorted;
  }, [phones, sort]);

  const totalItems = sortedPhones.length;
  const itemsPerPage = perPage === 'all' ? totalItems : Number(perPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const visiblePhones = sortedPhones.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;

    setSearchParams(params => {
      params.set('sort', newSort);
      params.set('page', '1');

      return params;
    });
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = event.target.value;

    setSearchParams(params => {
      params.set('perPage', newPerPage);
      params.set('page', '1');

      return params;
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setSearchParams(params => {
      params.set('page', newPage.toString());

      return params;
    });
  };

  const paginationItems = useMemo(() => {
    const items: number[] = [];
    const maxVisible = 4;

    let start = Math.max(1, page - Math.floor((maxVisible - 1) / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    return items;
  }, [page, totalPages]);

  return (
    <div className={styles.phonesPage}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <a href="/" className={styles.homeLink}>
            <img src="/img/Home_breadcrumb.svg" alt="Home" />
          </a>
          <span className={styles.arrow}>
            <img src="/img/arrow_right_gray.svg" alt="arrow right" />
          </span>
          <span className={styles.currentCrumb}>Phones</span>
        </div>

        <h1 className={styles.title}>Mobile phones</h1>
        <p className={styles.modelsCount}>{phones.length} models</p>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label htmlFor="sort" className={styles.label}>
              Sort by
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="sort"
                value={sort}
                onChange={handleSortChange}
                className={styles.select}
              >
                <option value="age">Newest</option>
                <option value="name">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="perPage" className={styles.label}>
              Items on page
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="perPage"
                value={perPage}
                onChange={handlePerPageChange}
                className={styles.select}
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {visiblePhones.map(phone => (
            <ProductCard key={phone.id} phone={phone} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              &lt;
            </button>
            <div className={styles.pageNumbers}>
              {paginationItems.map(item => (
                <button
                  key={item}
                  className={classNames(styles.pageBtn, {
                    [styles.active]: item === page,
                  })}
                  onClick={() => handlePageChange(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className={styles.pageBtn}
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
