import './ProductsList.scss';
import { useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { SortBy, ItemsPage } from '../../types/Sort';
import { Pagination } from '../Pagination/Pagination';
import { updateSearch } from '../../helpers/updateSearch';
import { NoSearchResults } from '../NoSearchResults/NoSearchResults';

const { New, Name, Price } = SortBy;
const sortBy = [New, Name, Price];

const {
  Four, Eight, Sixteen, All,
} = ItemsPage;

const itemsOnPage = [
  Four, Eight, Sixteen, All,
];

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const path = location.pathname;

  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');
  const page = searchParams.get('page');
  const query = searchParams.get('query');

  const [currentPage, changeCurrentPage] = useState(page ? +page : 1);
  const [itemsPerPage, addItemsPerPage] = useState(perPage || +Sixteen);
  const countPages = Math.ceil(products.length / +itemsPerPage);

  const visiblePhones = useMemo(() => {
    let sortedPhones = [...products];

    if (query) {
      sortedPhones = sortedPhones
        .filter(device => {
          return (
            device.name.toLowerCase().includes(query.trim().toLowerCase())
          );
        });

      return sortedPhones;
    }

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
  }, [products, sort, perPage, currentPage, query]);

  const handlePageParams = (number: number | null) => {
    if (number === null) {
      setSearchParams(
        updateSearch(searchParams, { page: number }),
      );
      changeCurrentPage(1);
    }

    if (number !== currentPage && number !== null) {
      setSearchParams(
        updateSearch(searchParams, { page: number.toString() }),
      );
      changeCurrentPage(number);
    }
  };

  const handleSortParams = (value: string) => {
    handlePageParams(null);
    setSearchParams(
      updateSearch(searchParams, { sort: value }),
    );
  };

  const handlePerPageParams = (value: string) => {
    handlePageParams(null);
    setSearchParams(
      updateSearch(searchParams, { perPage: value }),
    );

    if (value !== All) {
      addItemsPerPage(+value);
    } else {
      addItemsPerPage(products.length);
    }
  };

  return (
    <section
      className="Phones__productsList ProductsList"
      data-cy="productList"
    >
      {query && visiblePhones.length > 0 && (
        <div className="ProductsList__countResult">
          {`${visiblePhones.length} results`}
        </div>
      )}

      {query && visiblePhones.length === 0 && (
        <NoSearchResults />
      )}

      {!path.includes('favorites') && !query && (
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
      )}

      <div className="ProductsList__content">
        {visiblePhones.map(phone => (
          <ProductCard product={phone} key={phone.id} />
        ))}
      </div>
      <div className="ProductsList__pagination">
        {visiblePhones.length < products.length && !query && (
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
