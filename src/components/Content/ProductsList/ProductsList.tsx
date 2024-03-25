import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Products } from '../../../type/Productes';
import { Card } from '../Card';
import { Loader } from '../../Loader';
import { SortProduct } from '../../../type/type';
import { Pagination } from '../Pagination';
import { NoResults } from '../../NoResults';

import style from './ProductsList.module.scss';

type Props = {
  produkt: Products[];
  loader: boolean;
  title: string;
};

export const ProductsList: React.FC<Props> = ({ produkt, loader, title }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visiblePhones, setVisiblePhones] = useState<Products[]>([]);
  const [itemsOnPage, setItemsOnPage] = useState<string>('16');
  const params = new URLSearchParams(searchParams);
  const search = params.get('sort');
  const [sortBy, setSortBy] = useState(search || SortProduct.None);
  const [page, setPage] = useState(Number(params.get('page')) || 1);

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newValue = event.target.value;

    setItemsOnPage(newValue);
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;

    setSortBy(newValue);
    setPage(1);

    params.set('sort', newValue);
    setSearchParams(params);
  };

  useEffect(() => {
    let updatedPhones = [...produkt];

    switch (sortBy) {
      case SortProduct.Name:
        updatedPhones.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortProduct.Age:
        updatedPhones.sort((a, b) => a.year - b.year);
        break;
      case SortProduct.Price:
        updatedPhones.sort((a, b) => a.price - b.fullPrice);
        break;
      default:
        break;
    }

    if (Number(itemsOnPage)) {
      const startIndex = (page - 1) * +itemsOnPage;
      const endIndex = startIndex + +itemsOnPage;

      updatedPhones = updatedPhones.slice(startIndex, endIndex);
    }

    setVisiblePhones(updatedPhones);
  }, [produkt, page, itemsOnPage, sortBy]);

  useEffect(() => {
    if (page === 1) {
      params.delete('page');
      setSearchParams(params);

      return;
    }

    params.set('page', `${page}`);
    setSearchParams(params);
  }, [page]);

  return (
    <div className={style.productPage}>
      {produkt.length === 0 && !loader ? (
        <NoResults title={title} />
      ) : (
        <>
          {loader ? (
            <Loader />
          ) : (
            <>
              <h1 className={style.productPage__title}>{title}</h1>
              <span
                className={style.productPage__numPhone}
              >{`${produkt.length} models`}</span>
              <div className={style.productPage__sort}>
                <div className={style.productPage__select}>
                  <span className={style.productPage__select_title}>
                    Sort by
                  </span>
                  <select onChange={handleSortByChange} value={sortBy}>
                    <option value={SortProduct.Age}>Newest</option>
                    <option value={SortProduct.Name}>Alphabetically</option>
                    <option value={SortProduct.Price}>Cheapest</option>
                  </select>
                </div>
                <div className={style.productPage__select}>
                  <span className={style.productPage__select_title}>
                    Items on page
                  </span>
                  <select
                    data-cy="perPageSelector"
                    onChange={handleItemsPerPageChange}
                    value={itemsOnPage}
                  >
                    <option value="All">All</option>
                    <option value="16">16</option>
                    <option value="8">8</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
              <div className={style.productPage__cards}>
                {visiblePhones.map((phone: Products) => (
                  <div className={style.productPage__card} key={phone.id}>
                    <Card produkt={phone} />
                  </div>
                ))}
              </div>

              <Pagination
                total={produkt.length}
                perPage={itemsOnPage}
                page={page}
                setPage={setPage}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
