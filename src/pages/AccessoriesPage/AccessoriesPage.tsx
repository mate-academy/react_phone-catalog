import { useState } from 'react';

import { Header } from '../../components/Header';
import { ProductList } from '../../components/ProductList';
import { Address } from '../../components/Address';
import { Pagination } from '../../components/Pagination';
import { Footer } from '../../components/Footer';

import './AccessoriesPage.scss';

type Props = {
  accessories: Product[],
};

export const AccessoriesPage: React.FC<Props> = ({ accessories }) => {
  const [sortBy, setSortBy] = useState('age');
  const [visibleItems, setvisibleItems] = useState({
    start: 0,
    end: 16,
  });
  const [step, setStep] = useState(16);

  let visibleAccessories = accessories.sort((a, b) => {
    return (
      b.age - a.age
    );
  });

  if (sortBy === 'price') {
    visibleAccessories = accessories.sort((a, b) => {
      return (
        (a.price * (1 - a.discount / 100)) - (b.price * (1 - b.discount / 100))
      );
    });
  } else if (sortBy === 'name') {
    visibleAccessories = accessories.sort((a, b) => {
      const lowerB = b.name.toLowerCase();
      const lowerA = a.name.toLowerCase();

      if (lowerA < lowerB) {
        return -1;
      }

      if (lowerA > lowerB) {
        return 1;
      }

      return 0;
    });
  }

  const pageCount:number = Math.ceil(visibleAccessories.length / step);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.id === 'SortBy') {
      setSortBy(event.target.value);
    } else if (event.target.id !== 'SortBy') {
      setStep(+event.target.value);

      setvisibleItems({
        start: 0,
        end: +event.target.value,
      });
    }
  };

  const handleClickBack = () => {
    if (visibleItems.start > 0) {
      setvisibleItems({
        start: visibleItems.start - step,
        end: visibleItems.end - step,
      });
    }
  };

  const handleClickForward = () => {
    if (visibleItems.start + step < accessories.length) {
      setvisibleItems({
        start: visibleItems.start + step,
        end: visibleItems.end + step,
      });
    }
  };

  const handlePagination = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (+event.currentTarget.value === pageCount) {
      setvisibleItems({
        start: visibleAccessories.length - step,
        end: visibleAccessories.length,
      });
    } else if (+event.currentTarget.value === 1) {
      setvisibleItems({
        start: 0,
        end: step,
      });
    } else {
      setvisibleItems({
        start: step * (+event.currentTarget.value - 1),
        end: step * (+event.currentTarget.value - 1) + step,
      });
    }
  };

  return (
    <>
      <div className="content">
        <Header />
        <div className="AccessoriesPage wrapper">
          <div className="AccessoriesPage__nav">
            <Address />
          </div>
          <h1 className="AccessoriesPage__title">Accessories</h1>
          <p className="AccessoriesPage__models-count">{`${accessories.length} models`}</p>

          <div className="AccessoriesPage__sort">

            <div className="AccessoriesPage__sort-item">
              <label
                htmlFor="SortBy"
                className="AccessoriesPage__sort-label"
              >
                Sort by
              </label>
              <div className="select">
                <select
                  name="SortBy"
                  id="SortBy"
                  className="select__item select__item--sort"
                  onChange={handleChange}
                >
                  <option value="age">Newest</option>
                  <option value="name">Alphabetically</option>
                  <option value="price">Cheapest</option>
                </select>
              </div>
            </div>

            <div className="AccessoriesPage__sort-item">
              <label
                htmlFor="VisibleItems"
                className="AccessoriesPage__sort-label"
              >
                Items on page
              </label>
              <div className="select">
                <select
                  name="VisibleItems"
                  id="VisibleItems"
                  className="select__item select__item--number"
                  onChange={handleChange}
                >
                  <option value={16}>16</option>
                  <option value={8}>8</option>
                  <option value={4}>4</option>
                  <option value={visibleAccessories.length}>all</option>
                </select>
              </div>
            </div>
          </div>

          <div className="AccessoriesPage__products">
            <ProductList
              products={
                visibleAccessories.slice(visibleItems.start, visibleItems.end)
              }
            />
          </div>

          <div className="Accessories__pages">
            <Pagination
              step={step}
              pages={pageCount}
              index={visibleItems}
              length={visibleAccessories.length}
              back={handleClickBack}
              forward={handleClickForward}
              pageNumber={handlePagination}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
