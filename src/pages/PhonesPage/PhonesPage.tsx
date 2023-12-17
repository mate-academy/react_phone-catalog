/* eslint-disable import/no-extraneous-dependencies */
import { useLocation, useSearchParams } from 'react-router-dom';
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
import {
  SortDropdown, SortField,
} from '../../components/Dropdowns/SortDropdown';
import {
  ItemsPerPageDropdown,
} from '../../components/Dropdowns/ItemsPerPageDropdown';
import homeImage from '../../images/home.svg';
import arrowRight from '../../images/arrow-right-secondary-color.svg';
import { getSearchWith } from '../../helpers/utils/seacrhHelper';

export const PhonesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [phones, setPhones] = useState<Phone[]>([]);
  // const [itemOffset, setItemOffset] = useState(0);
  const sort = searchParams.get('sort') || '';
  const itemsPerPage = +(searchParams.get('perPage') || 16);
  const currentPage = +(searchParams.get('page') || 1);
  const [preparedPhones, setPreparedPhones] = useState(phones);
  const itemOffset = currentPage * itemsPerPage;

  useEffect(() => {
    const getSorted = () => {
      const sortedPhones = [...phones];

      switch (sort) {
        case SortField.PRICE:
          sortedPhones.sort((a, b) => (a.price - b.price));

          break;

        case SortField.NAME:
          sortedPhones.sort((a, b) => (a.name.localeCompare(b.name)));

          break;

        default:
          sortedPhones.sort((a, b) => (b.year - a.year));
      }

      return sortedPhones;
    };

    const newPhones = getSorted();

    setPreparedPhones(newPhones);
  }, [phones, sort]);

  // useEffect(() => {

  // });

  const { pathname } = useLocation();

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
  const currentItems = preparedPhones.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(phones.length / itemsPerPage);

  // const handlePageClick = (event: { selected: number; }) => {
  //   const newOffset = (event.selected * itemsPerPage) % phones.length;

  //   setItemOffset(newOffset);
  // };
  const handlePageClick = (event: { selected: number; }) => {
    // console.log(event.selected);
    getSearchWith(searchParams, { page: (event.selected + 1).toString() });
    console.log(searchParams.get('page'));
  };

  return (
    <>
      <div className="phones">
        <div className="path">
          <img src={homeImage} alt="home_icon" />
          <img src={arrowRight} alt="arrow_right" />
          <h3>{pathname.slice(1)}</h3>
        </div>
        <h1 className="phones__title">Mobile phones</h1>
        <h3 className="phones__subtitle">95 models</h3>
        <div className="dropdowns-container">
          <SortDropdown />
          <ItemsPerPageDropdown
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
            nextLabel=""
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
