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

export const PhonesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [itemOffset, setItemOffset] = useState(0);

  const location = useLocation();

  // console.log(location);

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

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = phones.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(phones.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % phones.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );

    setItemOffset(newOffset);
  };

  return (
    <>
      <div>
        <i />
        <h3>{location.pathname}</h3>
      </div>
      <h1>Mobile phones</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="phones-container">
          {currentItems.map(phone => (
            <Card card={phone} discount key={phone.id} />
          ))}
        </div>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
