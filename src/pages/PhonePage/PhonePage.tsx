// eslint-disable-next-line
// @ts-nocheck
import { useState, useEffect } from 'react';
import { GadgetsList } from '../../components/GadgetsList/GadgetsList';
import { PhoneFromServer } from '../../types/Phone';
import { DropDown } from '../../components/DropDown';
import { Pagination } from '../../components/Pagination';
import './PhonePage.scss';
import './PhonePageDesktop.scss';
import './PhonePageTablet.scss';
import './PhonePage__Phone.scss';
import { useSearchParams } from 'react-router-dom';
import { sortingByVariants } from '../../variables/dropDownSorting';
import { perPageVariants } from '../../variables/dropDownSorting';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';

export const PhonePage = () => {
  const [phones, setPhones] = useState<PhoneFromServer[]>([]);
  const [displayedPhones, setDisplayedPhones] = useState<PhoneFromServer[]>([]);
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');

  const perPage = parseInt(searchParams.get('perPage')) || 4;
  const currentPage = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch('api/phones.json');

        if (!response.ok) {
          throw new Error('response is not ok');
        }

        const data = await response.json();

        setPhones(data);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchPhones();
  }, []);

  useEffect(() => {
    if (sortBy) {
      phones.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'price':
            return a.priceDiscount - b.priceDiscount;
          default:
            return 0;
        }
      });
    }

    const startIndex = (currentPage - 1) * perPage;

    const paginatedPhones = phones.slice(startIndex, startIndex + perPage);

    setDisplayedPhones(paginatedPhones);
  }, [sortBy, perPage, currentPage, phones]);

  return (
    <main className="main">
      <div className="container">
        <BreadCrumbs pageName="Phones" />
        <h1 className="title">Mobile phones</h1>
        <h3 className="main__subtitle">{phones.length} Models</h3>
        <div className="dropdown-container">
          <DropDown title="sort by" dropDownData={sortingByVariants} />
          <DropDown title="items on page" dropDownData={perPageVariants} />
        </div>
        <GadgetsList phones={displayedPhones} />
        <Pagination
          total={phones.length}
          perPage={perPage}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
};
