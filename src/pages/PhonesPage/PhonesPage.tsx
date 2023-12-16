/* eslint-disable import/no-extraneous-dependencies */
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import {
  client,
  getAllPhones,
} from '../../helpers/utils/fetchData';
import { Phone } from '../../Types/Phone';
import { Categories } from '../HomePage/HomePage';
import { Loader } from '../../components/Loader/Loader';
import { Card } from '../../components/Card/Card';
import { SortDropdown } from '../../components/Dropdowns/SortDropdown';
import {
  ItemsPerPageDropdown,
} from '../../components/Dropdowns/ItemsPerPageDropdown';
import homeImage from '../../images/home.svg';
import arrowRight from '../../images/arrow-right-secondary-color.svg';

export const PhonesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);
  const [itemOffset, setItemOffset] = useState(0);
  const [sortField, setSortField] = useState('Newest');

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetchPhones();

        const mappedData = data.map((phone) => {
          return { ...phone, name: `${phone.name} (iMT9G2FS/A)` };
        });

        setPhones(getAllPhones(mappedData, Categories.Phones));
        setIsLoading(false);
      } catch (error) {
        throw new Error();
      }
    };

    fetchData();
  }, [setPhones]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = phones.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(phones.length / itemsPerPage);

  const handlePageClick = (event: { selected: number; }) => {
    const newOffset = (event.selected * itemsPerPage) % phones.length;

    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="phones">
        <div className="path">
          <img src={homeImage} alt="home_icon" />
          <img src={arrowRight} alt="arrow_right" />
          <h3>{location.pathname.slice(1)}</h3>
        </div>
        <h1 className="phones__title">Mobile phones</h1>
        <h3 className="phones__subtitle">95 models</h3>
        <div className="dropdowns-container">
          <SortDropdown setSortField={setSortField} currentField={sortField} />
          <ItemsPerPageDropdown
            setItemsPerPage={setItemsPerPage}
            currentAmount={itemsPerPage}
            length={phones.length}
          />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="phones-container">
            {currentItems.map(phone => (
              <Card card={phone} discount key={phone.id} />
            ))}
          </div>
        )}
        {(itemsPerPage >= 4 && itemsPerPage < phones.length) && (
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel=""
            renderOnZeroPageCount={null}
          />
        )}
      </div>
    </>
  );
};
