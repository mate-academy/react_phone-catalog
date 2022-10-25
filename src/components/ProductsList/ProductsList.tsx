/* eslint-disable no-console */
import './ProductsList.scss';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { SortBy, ItemsPage } from '../../types/Sort';
import { Pagination } from '../Pagination/Pagination';

const { New, Name, Price } = SortBy;
const sortBy = [New, Name, Price];

const {
  Four, Eight, Sixteen, All,
} = ItemsPage;

const itemsOnPage = [
  Four, Eight, Sixteen, All,
];

type Props = {
  phones: Product[];
};

export const ProductsList: React.FC<Props> = ({ phones }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');
  const page = searchParams.get('page');

  const [currentPage, changeCurrentPage] = useState(page ? +page : 1);
  const [itemsPerPage, addItemsPerPage] = useState(perPage || +Sixteen);
  const countPages = Math.ceil(phones.length / +itemsPerPage);

  const visiblePhones = useMemo(() => {
    let sortedPhones = [...phones];

    switch (sort) {
      case Price:
        sortedPhones.sort((a, b) => a.price - b.price);
        break;

      case Name:
        sortedPhones.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        sortedPhones.sort((a, b) => a.age - b.age);
        break;
    }

    if (currentPage < countPages) {
      sortedPhones = sortedPhones
        .slice((currentPage - 1) * +itemsPerPage,
          +itemsPerPage * currentPage);
    }

    if (currentPage === countPages) {
      sortedPhones = sortedPhones
        .slice((currentPage - 1) * +itemsPerPage, sortedPhones.length);
    }

    return sortedPhones;
  }, [phones, sort, perPage, currentPage]);

  function updateSearch(params: { [key: string]: string | null }) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });

    setSearchParams(searchParams);
  }

  const handlePageParams = (number: number | null) => {
    if (number === null) {
      updateSearch({ page: number });
      changeCurrentPage(1);
    }

    if (number !== currentPage && number !== null) {
      updateSearch({ page: number.toString() });
      changeCurrentPage(number);
    }
  };

  const handleSortParams = (value: string) => {
    handlePageParams(null);
    updateSearch({ sort: value });
  };

  const handlePerPageParams = (value: string) => {
    handlePageParams(null);
    updateSearch({ perPage: value });

    if (value !== All) {
      addItemsPerPage(+value);
    } else {
      addItemsPerPage(phones.length);
    }
  };

  return (
    <section
      className="Phones__productsList ProductsList"
      data-cy="productList"
    >
      <div className="ProductsList__filterSelects">
        <div className="ProductsList__filterSelect">
          <span className="ProductsList__filterName">Sort by</span>
          <CustomSelect
            optionsList={sortBy}
            default={sort || New}
            size="176px"
            filterBy={handleSortParams}
          />
        </div>
        <div className="ProductsList__filterSelect">
          <span className="ProductsList__filterName">Items on page</span>
          <CustomSelect
            optionsList={itemsOnPage}
            default={perPage || Sixteen}
            size="128px"
            filterBy={handlePerPageParams}
          />
        </div>
      </div>
      <div className="ProductsList__content">
        {visiblePhones.map(phone => (
          <ProductCard product={phone} key={phone.id} />
        ))}
      </div>
      <div className="ProductsList__pagination">
        {visiblePhones.length < phones.length && (
          <Pagination
            currentPage={currentPage}
            countPages={countPages}
            handlePageParams={handlePageParams}
          />
        )}
      </div>
    </section>
  );
};
