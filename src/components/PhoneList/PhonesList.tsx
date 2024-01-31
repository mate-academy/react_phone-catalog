/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PhoneItem } from '../PhoneItem/PhoneItem';
import './PhonesList.scss';
import { sortPhones } from '../../helper/sort';
import { getSearchWith } from '../../helper/searchHelper';
import { Pagination } from '../Pagination/Pagination';
import { Breadcrumbs } from '../Bredcrambs/Breadcrumbs';
import { IPhone } from '../../types/Phone.interface';
import { DropDown } from '../DropDown/DropDown';

type Props = {
  phones: IPhone[];
};

export const PhonesList: FC<Props> = ({ phones }) => {
  const [nameOfSort, setNameOfSort] = useState(() => {
    return localStorage.getItem('nameOfSort') || 'All';
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const perPage = +(searchParams.get('perPage') || 16);
  const page = +(searchParams.get('page') || '1');

  const sortedPhones = useMemo(() => {
    return sortPhones(phones, sort);
  }, [phones, sort]);

  const firstItem = (page - 1) * perPage;

  const lastItem = Math.min(
    (page) * perPage,
    sortedPhones.length,
  );

  const currentItems = sortedPhones.slice(firstItem, lastItem);

  const setSearchWith = (params: any) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const onPageChange = ((value: number) => {
    setSearchWith({ page: value || null });
  });

  const handleItemsPerPage = (value: string) => {
    const setValue = value === 'All' ? 71 : value;

    setSearchWith({ perPage: setValue || null, page: 1 });
  };

  const handleSortChange = (
    value: string,
  ) => {
    const sortValue = value === 'all' ? null : value;

    setSearchWith({ sort: sortValue || null });
  };

  const listSort = [
    ['all', 'All'],
    ['year', 'Newest'],
    ['price', 'Cheapest'],
    ['name', 'Alphabetically'],
  ];

  const listPerPage = [
    ['4', '4'],
    ['8', '8'],
    ['16', '16'],
    ['All', 'All'],
  ];

  useEffect(() => {
    localStorage.setItem('nameOfSort', nameOfSort);
  }, [nameOfSort]);

  return (
    <>
      <div className="phoneList">
        <Breadcrumbs />
        <h1 className="phoneList__title">Modile Phones</h1>

        <p className="phoneList__length">{`${phones.length} models`}</p>

        <div className="phoneList__dropdown">
          <DropDown
            label="Sort by"
            listOfProperties={listSort}
            handleClick={handleSortChange}
            setNameOfSort={setNameOfSort}
            nameProperties={nameOfSort}
          />

          <DropDown
            label="Items on page"
            listOfProperties={listPerPage}
            handleClick={handleItemsPerPage}
            nameProperties={perPage === 71 ? 'All' : perPage}
          />
        </div>

        <ul className="phoneList__grid">
          {currentItems.map((phone) => (
            <li className="phoneList__gridItem" key={phone.phoneId}>
              <PhoneItem phone={phone} searchParams={searchParams} />
            </li>
          ))}
        </ul>

        {perPage === 71 ? (
          ''
        ) : (
          <div className="phoneList__pagiantion">
            <Pagination
              totalItems={phones.length}
              currentPage={page}
              onPageChange={onPageChange}
              itemPerPage={perPage}
            />
          </div>
        )}
      </div>
    </>
  );
};
