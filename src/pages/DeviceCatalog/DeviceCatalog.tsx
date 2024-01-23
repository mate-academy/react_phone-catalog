import React, { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Notification } from '../../components/Notification';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { Selector } from '../../components/Selector';
import { Phone } from '../../types/Phone';
import { PhoneContext } from '../../utils/PhoneContext';
import phoneList from '../../api/products.json';

export const DeviceCatalog: React.FC = () => {
  const phones = phoneList;
  const [correctList, setCorrectList] = useState<Phone[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();

  const sortValue = searchParams.get('sort');
  const countItems = searchParams.get('count') || '4';
  const inputValue = searchParams.get('query');

  const start = (currentPage - 1) * Number(countItems);
  const end = (
    (currentPage - 1) * Number(countItems)
      + Number(countItems)) > correctList.length - 1
    ? correctList.length - 1
    : (currentPage - 1) * Number(countItems) + Number(countItems);

  useEffect(() => {
    switch (sortValue) {
      case 'Еxpensive':
        setCorrectList([...phones].sort(
          (a, b) => b.price - a.price,
        ));
        setCurrentPage(1);
        break;

      case 'Сheapest':
        setCorrectList([...phones].sort(
          (a, b) => a.price - b.price,
        ));
        setCurrentPage(1);
        break;

      case 'Newest':
        setCorrectList([...phones].sort(
          (a, b) => b.year - a.year,
        ));
        setCurrentPage(1);
        break;

      default:
        setCorrectList([...phones]);
        setCurrentPage(1);
        break;
    }
  }, [sortValue]);

  useEffect(() => {
    setCurrentPage(1);
  }, [countItems]);

  useEffect(() => {
    setCurrentPage(1);
    setCorrectList([...phones]);

    if (inputValue) {
      setCorrectList(
        [...phones].filter(
          item => (item.name.toLowerCase()).includes(inputValue.toLowerCase()),
        ),
      );
    }
  }, [inputValue]);

  const correctItems = correctList.slice(start, end);
  const { isAddCart, isAddFav } = useContext(PhoneContext);

  return (
    <div className="DeviceCatalog">
      {isAddCart && (
        <Notification title="Succes" text="Was added to shopping cart" />
      )}
      {isAddFav && (
        <Notification title="Succes" text="Was added to favorites" />
      )}
      <nav className="DeviceCatalog_navigation">
        <Link to="/home" className="DeviceCatalog_navigation_home" />
        <span className="DeviceCatalog_navigation_text">
          {'>'}
        </span>
        <span className="DeviceCatalog_navigation_text">
          Phones
        </span>
      </nav>

      <h1 className="DeviceCatalog_title">
        Mobile phones
      </h1>

      <span className="DeviceCatalog_count">
        {`${correctList.length} models`}
      </span>

      <div className="DeviceCatalog_select">
        <Selector />
      </div>

      <div className="DeviceCatalog_list">
        {Boolean(correctItems.length) && correctItems.map(device => (
          <ProductCard
            phone={device}
            position={0}
            key={device.id}
          />
        ))}
        {Boolean(!correctItems.length) && (
          <div className="DeviceCatalog_title DeviceCatalog_no-criteria">
            There are no devices matching current filter criteria
          </div>
        )}
      </div>

      {Boolean(correctList.length) && (
        <div className="DeviceCatalog_pagination">
          <Pagination
            total={correctList.length}
            perPage={+countItems}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
