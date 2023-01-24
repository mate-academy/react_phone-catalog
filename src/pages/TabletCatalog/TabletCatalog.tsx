import React, { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Notification } from '../../components/Notification';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { Selector } from '../../components/Selector';
import { Tablet } from '../../types/Tablet';
import { getNewApi } from '../../utils/getNewApi';
import { PhoneContext } from '../../utils/PhoneContext';
import tabletList from '../../api/tablets.json';

export const TabletCatalog: React.FC = () => {
  const tablets: Tablet[] = tabletList;
  const [correctList, setCorrectList] = useState<Tablet[]>([...tablets]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();

  const sortValue = searchParams.get('sort');
  const countItems = searchParams.get('count') || 4;
  const inputValue = searchParams.get('query');

  useEffect(() => {
    setCurrentPage(1);
    if (inputValue) {
      setCorrectList(
        [...tablets].filter(
          item => (item.name.toLowerCase()).includes(inputValue.toLowerCase()),
        ),
      );
    }
  }, [inputValue]);

  const start = (currentPage - 1) * Number(countItems);
  const end = (
    (currentPage - 1) * Number(countItems)
      + Number(countItems)) > correctList.length - 1
    ? correctList.length - 1
    : (currentPage - 1) * Number(countItems) + Number(countItems);

  let list = [...correctList].filter(item => item.type === 'tablet');

  useEffect(() => {
    switch (sortValue) {
      case 'Еxpensive':
        list = [...correctList].sort(
          (a, b) => b.price - a.price,
        ).filter(item => item.type === 'tablet');

        setCorrectList(list);
        break;

      case 'Сheapest':
        list = [...correctList].sort(
          (a, b) => a.price - b.price,
        ).filter(item => item.type === 'tablet');

        setCorrectList(list);
        break;

      case 'Newest':
        list = [...correctList].sort(
          (a, b) => b.age - a.age,
        ).filter(item => item.type === 'tablet');

        setCorrectList(list);
        break;

      default:
        list = [...correctList].filter(item => item.type === 'tablet');

        setCorrectList(list);
        break;
    }
  }, [sortValue]);

  const correctItems = list.slice(start, end);
  const isShowPagination = Boolean(Math.ceil(
    list.length / Number(countItems),
  ) > Number(countItems));

  const { isAddCart, isAddFav } = useContext(PhoneContext);

  return (
    <div className="TabletCatalog">
      {isAddCart && (
        <Notification title="Succes" text="Was added to shopping cart" />
      )}
      {isAddFav && (
        <Notification title="Succes" text="Was added to favorites" />
      )}
      <nav className="TabletCatalog_navigation">
        <Link to="/home" className="TabletCatalog_navigation_home" />
        <span className="TabletCatalog_navigation_text">
          {'>'}
        </span>
        <span className="TabletCatalog_navigation_text">
          Tablets
        </span>
      </nav>

      <h1 className="TabletCatalog_title">
        Tablets
      </h1>

      <span className="TabletCatalog_count">
        {`${correctList.length - 1} models`}
      </span>

      <div className="TabletCatalog_select">
        <Selector />
      </div>

      <div className="TabletCatalog_list">
        {list && correctItems.map(device => {
          return (
            <ProductCard
              phone={getNewApi(device)}
              position={0}
              key={device.id}
            />
          );
        })}
      </div>

      <div className="TabletCatalog_pagination">
        {isShowPagination && (
          <Pagination
            total={list.length}
            perPage={+countItems}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};
