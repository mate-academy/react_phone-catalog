import classNames from 'classnames';
import styles from './ProductPage.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { toggleFunction } from '../shared/utils/functions';
import { CatalogProduct, Products } from '../shared/types/Products';
import { useEffect, useMemo, useState } from 'react';
import { getProductsFromApi } from '../shared/utils/api';

interface ProductPageProps {
  category: Products[];
  categoryType: 'Phones' | 'Tablets' | 'Accessories';
}

export const ProductPage = ({ category, categoryType }: ProductPageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [catalog, setCatalog] = useState<CatalogProduct[]>([]);

  const page = +(searchParams.get('page') || 1);
  const perPageParam = searchParams.get('perPage');
  const sortField = searchParams.get('sort') || 'newest';
  const perPageValue = +(searchParams.get('perPage') || 0);

  const [addedDevice, setAddedDevice] = useState<Products['id'][]>(() => {
    const savedPhones = localStorage.getItem(`addedProduct-${categoryType}`);

    return savedPhones ? JSON.parse(savedPhones) : [];
  });

  const [favIconsId, setFavIconsId] = useState<Products['id'][]>(() => {
    const savedIcons = localStorage.getItem(`favouriteProduct-${categoryType}`);

    return savedIcons ? JSON.parse(savedIcons) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      `addedProduct-${categoryType}`,
      JSON.stringify(addedDevice),
    );
  }, [addedDevice, categoryType]);

  useEffect(() => {
    localStorage.setItem(
      `favouriteProduct-${categoryType}`,
      JSON.stringify(favIconsId),
    );
  }, [favIconsId, categoryType]);

  useEffect(() => {
    getProductsFromApi().then(product => {
      setCatalog(product);
    });
  }, []);

  const yearById = useMemo(
    () => new Map(catalog.map(item => [item.itemId, item.year])),
    [catalog],
  );

  const countOfPages =
    perPageParam && perPageParam !== '0'
      ? Math.ceil(category.length / +perPageParam)
      : 1;

  const countArray = [];

  for (let i = 1; i <= countOfPages; i++) {
    countArray.push(i);
  }

  const goToPage = (value: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(value));
    setSearchParams(params);
  };

  const goToPrevPage = () => {
    goToPage(page === 1 ? countOfPages : page - 1);
  };

  const goToNextPage = () => {
    goToPage(page === countOfPages ? 1 : page + 1);
  };

  const paginationPage = (option: React.FormEvent<HTMLSelectElement>) => {
    const optionValue = option.currentTarget.value;
    const params = new URLSearchParams(searchParams);

    params.set('perPage', optionValue);

    setSearchParams(params);
  };

  const sortingPage = (option: React.FormEvent<HTMLSelectElement>) => {
    const optionValue = option.currentTarget.value;
    const params = new URLSearchParams(searchParams);

    params.set('sort', optionValue);

    setSearchParams(params);
  };

  const phones = useMemo(() => {
    const sortedPhones = [...category].sort((prev, next) => {
      switch (sortField) {
        case 'newest': {
          const prevYear = yearById.get(prev.id) ?? 0;
          const nextYear = yearById.get(next.id) ?? 0;

          return nextYear - prevYear;
        }

        case 'alphabet': {
          return prev.name.localeCompare(next.name);
        }

        case 'cheapset': {
          const prevPrice = prev.priceDiscount || prev.priceRegular;
          const nextPrice = next.priceDiscount || next.priceRegular;

          return prevPrice - nextPrice;
        }

        default: {
          return 0;
        }
      }
    });

    return perPageValue
      ? sortedPhones.slice((page - 1) * perPageValue, page * perPageValue)
      : sortedPhones;
  }, [perPageValue, category, page, sortField, yearById]);

  return (
    <div className={styles.phone}>
      <div className={styles.navigation}>
        <Link to="/">
          <img src="./img/home.svg" alt="homePhoto" />
        </Link>
        <img src="./img/arrowRight.svg" alt="arrowLeft" />
        <p>{categoryType}</p>
      </div>

      <div className={styles.title}>
        <h1>{categoryType} page</h1>
        <p className={styles.text}>{category.length} models</p>
      </div>

      <div className={styles.sortblocks}>
        <div className={styles.selectWrapper}>
          <p className={styles.text}>Sort by</p>
          <select
            name="sortBy"
            id="sortBy"
            className={styles.sort}
            onChange={sortingPage}
            defaultValue={searchParams.get('sort') || 'newest'}
          >
            <option value="newest">Newest</option>
            <option value="alphabet">Alphabetically</option>
            <option value="cheapset">Cheapest </option>
          </select>
        </div>
        <div className={styles.selectWrapper}>
          <p className={styles.text}>Items on page</p>
          <select
            name="sortPage"
            id="sortPage"
            defaultValue={searchParams.get('perPage') || '4'}
            className={styles.sort}
            onChange={paginationPage}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16 </option>
            <option value="0">all </option>
          </select>
        </div>
      </div>
      <div className={styles.products}>
        {phones.map(phone => {
          const {
            id,
            name,
            priceRegular,
            priceDiscount,
            screen,
            capacity,
            ram,
            images,
          } = phone;

          const isFavourite = favIconsId.includes(id);

          return (
            <div className={styles.catalog} key={id}>
              <img
                src={images[0]}
                alt="photo"
                className={styles.catalogPhoto}
              />

              <p className={styles.catalogName}>{name}</p>
              <div className={styles.catalogPrice}>
                <p className={styles.catalogCurrentPrice}>
                  ${priceDiscount || priceRegular}
                </p>

                {priceDiscount && (
                  <p className={styles.catalogOldPrice}>${priceRegular}</p>
                )}
              </div>

              <div className={styles.catalogSettings}>
                <table className={styles.table}>
                  <tbody>
                    <tr>
                      <td className={styles.title}>screen</td>
                      <td className={styles.result}>{screen}</td>
                    </tr>
                    <tr>
                      <td className={styles.title}>capacity</td>
                      <td className={styles.result}>{capacity}</td>
                    </tr>
                    <tr>
                      <td className={styles.title}>RAM</td>
                      <td className={styles.result}>{ram}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.catalogButtons}>
                <button
                  className={classNames(styles.button, {
                    [styles.selectedPhone]: addedDevice.includes(id),
                    [styles.buttonsBuy]: !addedDevice.includes(id),
                  })}
                  onClick={() => {
                    toggleFunction(id, setAddedDevice);
                  }}
                >
                  {addedDevice.includes(id) ? 'Selected' : 'Add to card'}
                </button>
                <button
                  className={classNames(
                    styles.button,
                    styles.buttonsLike,
                    'icons',
                  )}
                  onClick={() => {
                    toggleFunction(id, setFavIconsId);
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/img/${isFavourite ? 'likeClicked.svg' : 'like.svg'}`}
                    alt="logo"
                    className="logo"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {countOfPages > 1 && (
        <div className={styles.buttonSlides}>
          <button
            onClick={() => goToPrevPage()}
            className={classNames(styles.buttonLeft, styles.buttonScroll)}
          >
            <img src={`${import.meta.env.BASE_URL}/img/arrowLeft.svg`} alt="" />
          </button>
          {countArray.map(count => {
            return (
              <button
                onClick={() => goToPage(count)}
                key={count}
                className={classNames(styles.buttonScroll, {
                  [styles.isActive]: count === page,
                })}
              >
                {count}
              </button>
            );
          })}
          <button
            onClick={() => goToNextPage()}
            className={classNames(styles.buttonRight, styles.buttonScroll)}
          >
            <img
              src={`${import.meta.env.BASE_URL}/img/arrowRight.svg`}
              alt=""
            />
          </button>
        </div>
      )}
    </div>
  );
};
