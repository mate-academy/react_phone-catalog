import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ProductPreview } from '../ProductPreview';
import { getProducts } from '../../store/index';
import { Product } from '../../interfaces';
import { Pages } from './Pages';
import { ProductsSort } from './ProductsSort';

interface Props {
  info: string;
  description: string;
}

export const ProductPage: React.FC<Props> = () => {
  const products: Product[] = useSelector(getProducts);
  const history = useHistory();
  const location = useLocation();
  const typeOfDevices = location.pathname.split('/').join('').trim();
  const typeOfDevice = typeOfDevices.substring(0, typeOfDevices.length - 1);
  const filteredProducts = products.filter(product => product.type === `${typeOfDevice}`);
  const [sortedList, setSortedList] = useState<Product[]>(filteredProducts);
  const searchParams = new URLSearchParams(location.search);
  const sortByOption: string = searchParams.get('sortBy') || 'name';
  const perPage: string = searchParams.get('perPage') || '4';
  const page: string = searchParams.get('page') || '1';
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(4);

  const changePage = (option: string) => {
    const value: number = (option === 'back') ? +page - 1 : +page + 1;

    searchParams.set('page', `${value}`);
    history.push({
      search: searchParams.toString(),
    });
  };

  const setParams = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    searchParams.set('sortBy', `${value}`);
    history.push({
      search: searchParams.toString(),
    });
  };

  const setPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    searchParams.set('perPage', `${value}`);
    history.push({
      search: searchParams.toString(),
    });
  };

  const setPage = (value: string) => {
    searchParams.set('page', `${value}`);
    history.push({
      search: searchParams.toString(),
    });
  };

  useMemo(() => {
    let sorted: Product[];
    const tempPage = page ? +page : 1;
    const index = +perPage * (tempPage - 1);
    const tempLastIndex = (index + +perPage) > products.length
      ? products.length
      : (index + +perPage);

    setStartIndex(index);
    setLastIndex(tempLastIndex);

    switch (sortByOption) {
      case 'price':
        sorted = [...filteredProducts].sort((a, b) => a[sortByOption] - b[sortByOption]);
        setSortedList(sorted);
        break;

      case 'name':
        sorted = [...filteredProducts]
          .sort((a, b) => a[sortByOption].localeCompare(b[sortByOption]));
        setSortedList(sorted);
        break;

      default:
    }
  }, [sortByOption, products, page, perPage, typeOfDevices]);

  return (
    <section className="phones">
      <h2 className="title">
        {typeOfDevices.toUpperCase()}
      </h2>
      <p className="phones__number">{`${filteredProducts.length} models`}</p>
      {
        sortedList.length
          ? (
            <>
              <ProductsSort
                sortByOption={sortByOption}
                perPage={perPage}
                setParams={setParams}
                setPerPage={setPerPage}
              />
              <ul className="phones__list">
                {
                  sortedList.slice(startIndex, lastIndex).map(product => (
                    <ProductPreview product={product} path={location.pathname} key={product.id} />
                  ))
                }
              </ul>
              <Pages
                changePage={changePage}
                page={page}
                setPage={setPage}
                length={filteredProducts.length}
                perPage={perPage}
              />
            </>
          )
          : (
            <h3>
              There are no products in this section yet
            </h3>
          )
      }
    </section>
  );
};
