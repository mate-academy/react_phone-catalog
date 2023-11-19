import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { Way } from '../../components/way/Way';
import { GlobalContext } from '../../reducer';
import { Product } from '../../types/product';
import { Card } from '../../components/card/Card';
import './productCatalog.scss';
import { Pagination } from '../../components/pagination/Pagination';
import { Loader } from '../../components/Loader/Loader';

enum SortProducts {
  'name' = 'Name',
  'price' = 'Price',
  'ram' = 'Ram',
  'screen' = 'Screen',
  'age' = 'Age',
}

const optionsListPageCount = ['16', '8', '4'];

export const ProductCatalog = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'Default');
  const [items, setItems] = useState(searchParams.get('perPage') || '16');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(16);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);
  const [state] = useContext(GlobalContext);
  const query = searchParams.get('query');

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const renderFilterList = useMemo(() => {
    if (pathname.includes('phones')) {
      return state.catalogsProducts.filter(
        (el: Product) => el.type === 'phone',
      );
    }

    if (pathname.includes('tablets')) {
      return state.catalogsProducts.filter(
        (el: Product) => el.type === 'tablet',
      );
    }

    return state.catalogsProducts.filter(
      (el: Product) => el.type === 'accessorie',
    );
  }, [pathname, state.catalogsProducts]);

  useEffect(() => {
    setStart(0);
    setEnd(+items);
  }, [items, pathname]);

  const renderTitle = () => {
    if (pathname.includes('phones')) {
      return 'Mobile phones';
    }

    if (pathname.includes('tablets')) {
      return 'Tablets';
    }

    return 'Accessories';
  };

  const sortListProducts = useMemo(() => {
    const result = [...renderFilterList];

    switch (sortBy) {
      case SortProducts.name:
        return result.sort((a, b) => a.name.localeCompare(b.name));
      case SortProducts.price:
        return result.sort((a, b) => b.price - a.price);
      case SortProducts.ram:
        return result.sort((a, b) => parseFloat(a.ram) - parseFloat(b.ram));
      case SortProducts.screen:
        return result
          .sort((a, b) => parseFloat(a.screen) - parseFloat(b.screen));
      case SortProducts.age:
        return result
          .sort((a, b) => b.age - a.age);
      default:
        return result;
    }
  }, [sortBy, state.catalogsProducts, pathname]);

  const filterBySearchField = useMemo(() => {
    const result = [...sortListProducts];

    if (query) {
      return result
        .filter((el: Product) => el.name.toLowerCase()
          .includes(query.toLowerCase() as string));
    }

    return result;
  }, [searchParams.get('query'), sortListProducts]);

  const paginationNext = () => {
    if (end < renderFilterList.length) {
      setStart(end);
      setEnd(end + +items);
      setCurrentStep(currentStep + 1);
    }
  };

  const paginationPrev = () => {
    if (start) {
      setStart(start - +items);
      setEnd(end - +items);
      setCurrentStep(currentStep - 1);
    }
  };

  const setNumberStep = (index: number) => {
    if (start && index < currentStep) {
      setStart(start - (currentStep - index) * +items);
      setEnd(end - (currentStep - index) * +items);
    }

    if (end < renderFilterList.length && index > currentStep) {
      setStart(start + (index - currentStep) * +items);
      setEnd(end + (index - currentStep) * +items);
    }
  };

  useEffect(() => {
    const length = Math.floor(renderFilterList.length / +items);

    setSteps(Array(length).fill(''));
  }, [renderFilterList, items]);

  return (
    <section className="products">
      {!query ? (
        <Way />
      ) : (
        <div className="result">
          {`${filterBySearchField.length} ${
            filterBySearchField.length > 1 ? 'results' : 'result'
          }`}
        </div>
      )}
      {!query ? (
        <>
          <div className="products__describe">
            <h1>{renderTitle()}</h1>
            <span>
              {renderFilterList.length}
              {' '}
              model
            </span>
          </div>
          {filterBySearchField.length ? (
            <div className="products__dropdowns">
              <div className="drop-first">
                <h3>Sort by</h3>
                <Dropdown
                  listOptions={['Name', 'Price', 'Ram', 'Screen', 'Age']}
                  selected={sortBy}
                  choosSelected={setSortBy}
                />
              </div>
              <div className="drop-second">
                <h3>Items on page</h3>
                <Dropdown
                  listOptions={optionsListPageCount}
                  selected={items}
                  choosSelected={setItems}
                  lengthList={renderFilterList.length}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        ''
      )}
      {state.loader ? (
        <Loader />
      ) : (
        <div className="pagination" data-cy="productList">
          {filterBySearchField.slice(start, end).map((el: Product) => (
            <div className="pagination__wrapper-card" key={el.age}>
              <Card product={el} />
            </div>
          ))}
        </div>
      )}
      {!query && filterBySearchField.length > 4 ? (
        <Pagination
          prev={paginationPrev}
          next={paginationNext}
          currentStep={currentStep}
          stepsCount={steps}
          setCurrenStep={setCurrentStep}
          setNumberStep={setNumberStep}
        />
      ) : (
        <></>
      )}
      {!filterBySearchField.length && (
        <div>List products is empty, please check later</div>
      )}
    </section>
  );
};
