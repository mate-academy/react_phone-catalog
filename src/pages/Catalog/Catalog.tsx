import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getGoods } from '../../store/index';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SortBlock }  from '../../components/SortBlock/SortBlock';
import { useParams, useLocation } from 'react-router-dom';
import { PaginationWithRouter } from '../../components/Pagination';
import { NotFoundPage } from '../NotFoundPage';
import { BreadCrumbs } from '../../components/BreadCrumbs';


const sortBy = (goods: Good[], sortType: string) => {

  if (sortType === 'age') {
    return [...goods].sort((a, b) => (Number(a.age) - Number(b.age)));
  }

  if (sortType === 'high_price') {
    return [...goods].sort((a, b) => (Number(a.price) - Number(b.price))*-1);
  }

  if (sortType === 'low_price') {
    return [...goods].sort((a, b) => (Number(a.price) - Number(b.price)));
  }

  return goods;
};


export const Catalog = () => {
  const goods: Good[] = useSelector(getGoods);
  let selectedItemsCount = 4;
  const [rowItemsCount, setRowItemsCount] = useState<number>(4);
  const [currentSectionGoods, setCurrentSectionGoods] = useState<Good[]>([])
  const [visibleGoods, setVisibleGoods] =  useState<Good[]>(currentSectionGoods);

  const { section } = useParams();
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const sortTypeFromURL = (searchParams.get('sortBy') || 'newest').toLowerCase();
  const queryFromURL = (searchParams.get('query') || '').toLowerCase();

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 8;

  const pageTitle = location.pathname.substr(1) === 'phones' ? 'mobile phones' : location.pathname.substr(1);


  const requestedGoods = useMemo(
    () => currentSectionGoods.filter(good => {
      return `${good.name} ${good.snippet}`.toLowerCase().includes(queryFromURL);
    }),
    [queryFromURL, currentSectionGoods],
  );

  const sortedGoods = useMemo(
    () => sortBy(requestedGoods, sortTypeFromURL),
    [requestedGoods, sortTypeFromURL],
  );


  useEffect(() => {
    setCurrentSectionGoods(goods.filter((good) => section.includes(good.type)))
  }, [section, goods])


  useEffect(() => {
    if (currentPage === 1) {
      setVisibleGoods([...sortedGoods].splice(0, perPage))
    } else {
      setVisibleGoods([...sortedGoods].splice(perPage*(currentPage-1), perPage))
    }
  }, [currentSectionGoods, perPage, currentPage, sortedGoods])


  useEffect(()=> {
    setRowItemsCount(selectedItemsCount)
  },[selectedItemsCount]);

  return (

    <>
      {visibleGoods.length ? (
      <div className="catalog">
        <BreadCrumbs />
        <p className="catalog__title">
        <h1>{pageTitle}</h1>
        </p>
        <p className="catalog__items-count">
          {goods.length} models
        </p>
        <SortBlock />
        <div className="catalog__products"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${rowItemsCount}, 272px)`,
            columnGap: "16px",
            rowGap: "40px",
          }}>
            {visibleGoods.map((good:Good) => {
              return (
              <ProductCard good={good} />
              )
            }
          )}
        </div>
        {(visibleGoods.length/ perPage >= 1)
        && <PaginationWithRouter goodCount={currentSectionGoods.length} />}
      </div>)
      :  <NotFoundPage />}
    </>
  )
}
