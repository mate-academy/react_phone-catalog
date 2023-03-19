import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { Way } from '../../components/way/Way';
import { GlobalContext } from '../../reducer';
import { Product } from '../../types/product';
import { Card } from '../../components/card/Card';
import './productCatalog.scss';
import { Pagination } from '../../components/pagination/Pagination';

enum SortProducts {
  'name' = 'Name',
  'price' = 'Price',
  'ram' = 'Ram',
  'screen' = 'Screen',
}

export const ProductCatalog = () => {
  const { pathname } = useLocation();
  const [sortBy, setSortBy] = useState('Default');
  const [items, setItems] = useState('16');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(16);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);
  const [state] = useContext(GlobalContext);

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

  const renderFilterList = useMemo(() => {
    if (pathname.includes('phones')) {
      return state.catalogsProducts.filter((el:Product) => el.type === 'phone');
    }

    if (pathname.includes('tablets')) {
      return state.catalogsProducts
        .filter((el:Product) => el.type === 'tablet');
    }

    return state.catalogsProducts
      .filter((el:Product) => el.type === 'accessorie');
  }, [pathname, state.catalogsProducts]);

  const sortListProducts = useMemo(() => {
    const result = [...renderFilterList];

    if (sortBy === SortProducts.name) {
      return result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === SortProducts.price) {
      return result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === SortProducts.ram) {
      return result.sort((a, b) => parseFloat(a.ram) - parseFloat(b.ram));
    }

    if (sortBy === SortProducts.screen) {
      return result.sort((a, b) => parseFloat(a.screen) - parseFloat(b.screen));
    }

    return result;
  }, [sortBy, state.catalogsProducts, pathname]);

  const paginationNext = () => {
    if (end < renderFilterList.length) {
      setStart(end);
      setEnd(end + (+items));
      setCurrentStep(currentStep + 1);
    }
  };

  const paginationPrev = () => {
    if (start) {
      setStart(start - (+items));
      setEnd(end - (+items));
      setCurrentStep(currentStep - 1);
    }
  };

  const setNumberStep = (index:number) => {
    if (start && index < currentStep) {
      setStart(start - ((currentStep - index) * +items));
      setEnd(end - ((currentStep - index) * +items));
    }

    if (end < renderFilterList.length && index > currentStep) {
      setStart(start + ((index - currentStep) * +items));
      setEnd(end + ((index - currentStep) * +items));
    }
  };

  useEffect(() => {
    const length = Math.floor(renderFilterList.length / +items);

    setSteps(Array(length).fill(''));
  }, [renderFilterList, items]);

  return (
    <section className="products">
      <Way />
      <div className="products__describe">
        <h1>{renderTitle()}</h1>
        <span>
          {renderFilterList.length}
          {' '}
          model
        </span>
      </div>
      <div className="products__dropdowns">
        <div className="drop-first">
          <h3>Sort by</h3>
          <Dropdown
            listOptions={['Name', 'Price', 'Ram', 'Screen']}
            selected={sortBy}
            choosSelected={setSortBy}
          />
        </div>
        <div className="drop-second">
          <h3>Items on page</h3>
          <Dropdown
            listOptions={['16', '8', '4']}
            selected={items}
            choosSelected={setItems}
            lengthList={renderFilterList.length}
          />
        </div>
      </div>
      <div className="pagination">
        {sortListProducts.slice(start, end).map((el:Product) => (
          <div className="pagination__wrapper-card" key={el.age}>
            <Card
              product={el}
              move={0}
            />
          </div>
        ))}
      </div>
      <Pagination
        prev={paginationPrev}
        next={paginationNext}
        currentStep={currentStep}
        stepsCount={steps}
        setCurrenStep={setCurrentStep}
        setNumberStep={setNumberStep}
      />
    </section>
  );
};
