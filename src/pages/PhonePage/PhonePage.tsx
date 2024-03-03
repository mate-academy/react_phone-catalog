import { useEffect, useState } from 'react';
import './PhonePage.scss';
import { useSearchParams } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import { getPhones } from '../../helpers/getPhones';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Loader } from '../../components/Loader';
import { DropDown } from '../../components/DropDown';
import { perPageVariants, sortByVariants } from '../../constants';
import { Pagination } from '../../components/Pagination';
// import { SearchLink } from '../../components/SearchLink';

export const PhonePage = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [displayedPhones, setDisplayedPhones] = useState<Phone[]>([]);

  let sortedPhones = phones;

  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const perPage = searchParams.get('perPage') || sortedPhones.length.toString();
  const currentPage = searchParams.get('page') || 1;

  if (sortBy === 'age') {
    sortedPhones = phones.sort((a, b) => a.age - b.age);
  }

  if (sortBy === 'name') {
    sortedPhones = phones.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === 'price') {
    sortedPhones = phones.sort((a, b) => a.price - b.price);
  }

  useEffect(() => {
    setIsLoading(true);
    getPhones()
      .then(data => {
        setPhones(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const newArr = [];

    for (let i = 0; i < sortedPhones.length; i += +perPage) {
      newArr.push(sortedPhones.slice(i, i + +perPage));
    }

    setDisplayedPhones(newArr[+currentPage - 1] || []);
  }, [sortBy, perPage, currentPage, sortedPhones]);

  return (
    <div className="container">
      <h1 className="title">Mobile phones</h1>
      <p className="phones-count">{phones.length} models</p>
      <div className="catalog__settings">
        <DropDown title="Sort by" dropDownArrayData={sortByVariants} />
        <DropDown title="Items on page" dropDownArrayData={perPageVariants} />

        {/* <SearchLink params={{ perPage: `4`, page: '1' }} className="testLink">
          4
        </SearchLink>
        <SearchLink params={{ perPage: `8`, page: '1' }} className="testLink">
          8
        </SearchLink>
        <SearchLink params={{ perPage: `16`, page: '1' }} className="testLink">
          16
        </SearchLink>
        <SearchLink params={{ perPage: null, page: '1' }} className="testLink">
          All
        </SearchLink> */}
      </div>

      {+perPage < phones.length && (
        <Pagination
          total={phones.length}
          perPage={perPage}
          currentPage={+currentPage}
        />
      )}

      {isLoading && <Loader />}
      {!isLoading && <ProductsList phones={displayedPhones} />}
    </div>
  );
};
