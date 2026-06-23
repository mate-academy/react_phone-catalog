import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import style from './ProductsPage.module.scss';
import { getProducts } from '../../utils/service';
import { ProductsCart } from '../../components/ProductsCart';
import { SearchLink } from '../../utils/SearchLink';
import { Pagination } from '../../components/Pagination';

import { Products } from '../../types/products';
import { NotFound } from '../ProductDetailsPage/components/NotFound';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { SkeletonProducts } from './SkeletonProducts';
import arrow from '../../../public/img/my-icon/arrow-right.svg';

type Props = {
  type: string;
};

const quantityItems = ['4', '8', '16', 'All'];
const sort = ['Newest', 'Alphabetically', 'Cheapest'];

const fulltermList = (list: Products[], sortParam?: string) => {
  const newList = [...list];

  if (sortParam) {
    newList.sort((a, b) => {
      switch (sortParam) {
        case 'Newest':
          return b.year - a.year;

        case 'Alphabetically':
          return a.name.localeCompare(b.name);

        case 'Cheapest':
          return b.price - a.price;

        default:
          return 0;
      }
    });
  }

  return newList;
};

export const ProductsPage: React.FC<Props> = ({ type }) => {
  const [productsList, setProductsList] = useState<Products[]>([]);

  const [searchParams] = useSearchParams();
  const [loader, setloader] = useState(false);
  const [dropdownItems, setDropdownItems] = useState<boolean>(false);
  const [dropdownSort, setDropdownSort] = useState<boolean>(false);
  const [notFound, setNotFound] = useState(false);

  const perPage = searchParams.get('perPage') || 'All';
  const pages = searchParams.get('pages') || '1';
  const sorts = searchParams.get('sort') || 'Newest';

  const visibleProductsList = fulltermList(productsList, sorts);

  useEffect(() => {
    setNotFound(false);
    setloader(true);

    setTimeout(() => {
      getProducts(type)
        .then(setProductsList)

        .catch(() => setNotFound(true))
        .finally(() => setloader(false));
    }, 500);
  }, [type]);

  const total = productsList.length;
  const normalize = isNaN(+perPage) ? total : Number(perPage);
  const start = Math.max(0, (+pages - 1) * +normalize);
  const end = Math.min(total, start + normalize);
  const visibleProducts = visibleProductsList.slice(start, end);
  const title = type[0].toUpperCase() + type.slice(1);
  const pagesLength = total / normalize;

  const sortRef = useRef<HTMLDivElement>(null);
  const perPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownSort && !dropdownItems) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (perPageRef.current && !perPageRef.current.contains(target)) {
        setDropdownItems(false);
      }

      if (sortRef.current && !sortRef.current.contains(target)) {
        setDropdownSort(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownSort, dropdownItems]);

  if (notFound) {
    return <NotFound />;
  }

  if (visibleProducts.length <= 0) {
    <h2>There are no phones/tablets/accessories yet</h2>;
  }

  return (
    <>
      <h1 hidden>{title} catalog</h1>

      <section className={style['products-list']}>
        <Breadcrumbs type={type} />
        <div className={style['products-list__info']}>
          <h2 className={style['products-list__title']}>{title}</h2>
          {!loader ? (
            <p className={style['products-list__quantity']}>{total} models</p>
          ) : (
            <p className="subtitle has-skeleton" style={{ height: '21px' }}>
              Subtitle
            </p>
          )}
        </div>
        <div className={style.dropdown}>
          <div className={style.dropdown__sort}>
            <p className={style.dropdown__title}>Sort by</p>
            <div ref={sortRef} className={style.dropdown__trigger}>
              <button
                className={style.dropdown__button}
                onClick={() => setDropdownSort(prev => !prev)}
              >
                <span style={{ overflow: 'hidden' }}>{sorts}</span>
                <div className={style.dropdown__icon}>
                  <img
                    className={cn(style.dropdown__arrow, {
                      [style['dropdown__arrow--active']]: dropdownSort,
                    })}
                    src={arrow}
                  />
                </div>
              </button>
            </div>
            <div
              className={style.dropdown__menu}
              style={{ display: dropdownSort ? '' : 'none' }}
            >
              <div className={style.dropdown__content}>
                {sort.map(item => (
                  <SearchLink
                    key={item}
                    params={{ sort: item }}
                    className={style.dropdown__item}
                    onClick={() => setDropdownSort(prev => !prev)}
                  >
                    {item}
                  </SearchLink>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={perPageRef}
            className={cn(style.dropdown__items, {
              'is-active': dropdownItems,
            })}
          >
            <p className={style.dropdown__title}>Items on page</p>
            <div className={style.dropdown__trigger}>
              <button
                className={style.dropdown__button}
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                onClick={() => setDropdownItems(prev => !prev)}
              >
                <span>{perPage}</span>
                <div className={style.dropdown__icon}>
                  <img
                    className={cn(style.dropdown__arrow, {
                      [style['dropdown__arrow--active']]: dropdownItems,
                    })}
                    src={arrow}
                  />
                </div>
              </button>
            </div>
            <div
              className={style.dropdown__menu}
              style={{ display: dropdownItems ? '' : 'none' }}
            >
              <div className={style.dropdown__content}>
                {quantityItems.map(item => (
                  <SearchLink
                    key={item}
                    params={{
                      perPage: item !== 'All' ? item : null,
                      pages: null,
                    }}
                    className={cn(style.dropdown__item, {
                      'is-active': perPage == item,
                    })}
                    onClick={() => setDropdownItems(prev => !prev)}
                  >
                    {item}
                  </SearchLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        {loader && (
          <div className={style.list}>
            <SkeletonProducts />
            <SkeletonProducts />
            <SkeletonProducts />
            <SkeletonProducts />
            <SkeletonProducts />
            <SkeletonProducts />
            <SkeletonProducts />
            <SkeletonProducts />
          </div>
        )}

        {!loader && (
          <>
            <div className={style.list}>
              {visibleProducts.map(product => (
                <ProductsCart
                  product={product}
                  key={product.id}
                  modifier="page"
                />
              ))}
            </div>

            {pagesLength > 1 && (
              <div className={style['products-list__pagination']}>
                <Pagination
                  total={total}
                  currentPage={+pages}
                  perPage={normalize}
                />
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};
