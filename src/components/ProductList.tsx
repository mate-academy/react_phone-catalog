import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Product } from '../types/Product';
import DropDown from './DropDown';
import ProductCard from './ProductCard';
import NotFaundImg from '../assets/images/no-result.png';

type Props = {
  list: Product[];
  showSorting?: boolean
};

const ProductList: React.FC<Props> = ({ list, showSorting = true }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParams = searchParams.get('sort') || 'Newest';
  const queryParams = searchParams.get('query') || '';
  const perPage = searchParams.get('perPage') || 'All';
  const currentPage = searchParams.get('page') || '1';
  const step = perPage === 'All' ? list.length : +perPage;
  const lastIndexOfProduct = (+currentPage) * +step;
  const firstIndeOfProduct = lastIndexOfProduct - +perPage;

  const filtretList = queryParams ? list.filter(product => (
    product.name.toLowerCase().includes(queryParams.toLowerCase())))
    : [...list];

  const prepareList = () => {
    if (sortParams === 'Newest') {
      return filtretList.sort((a, b) => +a.age - +b.age);
    }

    if (sortParams === 'Alphabetically') {
      return filtretList.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtretList.sort((a, b) => +a.price - +b.price);
  };

  const listForRender = prepareList();
  // eslint-disable-next-line
  const changeSortType = (e: any) => {
    searchParams.set('sort', e.target.textContent);
    setSearchParams(searchParams);
  };
  // eslint-disable-next-line
  const paginate = (e: any) => {
    searchParams.set('perPage', e.target.textContent);
    setSearchParams(searchParams);
  };
  // eslint-disable-next-line
  const handlePageClick = (event: any) => {
    searchParams.set('page', event.selected + 1);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const indexPage = Math.ceil(listForRender.length / +perPage);

    if (+currentPage > indexPage) {
      searchParams.set('page', (indexPage).toString());
      setSearchParams(searchParams);
    }
  }, [perPage, queryParams]);

  if (!listForRender.length) {
    return (
      <div className="ProductList__notFound-container">
        <h1>Try to find something else</h1>
        <img
          src={NotFaundImg}
          alt="img-not-faund"
          className="ProductList__notFound-page"
        />
      </div>
    );
  }

  return (
    <div className="ProductList">
      <p className="ProductPage__amount">
        {`${listForRender.length} models`}
      </p>
      {showSorting && (
        <div className="ProductList__dropdownContainer">
          <DropDown
            options={['Newest', 'Alphabetically', 'Cheapest']}
            title="Sort By"
            handleChange={changeSortType}
            defaultValue={sortParams}
          />
          <DropDown
            options={['All', '4', '8', '16']}
            title="Items on page"
            handleChange={paginate}
            defaultValue={perPage}
          />
        </div>
      )}
      <ul className="ProductList__list">
        {listForRender.slice(firstIndeOfProduct, lastIndexOfProduct)
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
      {(listForRender.length / +perPage > 1) && (
        <div className="ProductList__pagination">
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            breakLabel="..."
            pageCount={Math.ceil(listForRender.length / +perPage)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName="Pagination__container"
            pageClassName="Pagination__btn"
            pageLinkClassName="Pagination__link"
            previousClassName="Pagination__btn--previous Pagination__btn"
            previousLinkClassName="Pagination__link Pagination__previous-link"
            nextClassName="Pagination__btn--next Pagination__btn"
            nextLinkClassName="Pagination__link Pagination__next-link"
            breakClassName="Pagination__btn--breack Pagination__btn"
            breakLinkClassName="Pagination__link Pagination__breack--link"
            activeClassName="Pagination__btn--active Pagination__btn"
            activeLinkClassName="Pagination__link--active Pagination__link"
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
