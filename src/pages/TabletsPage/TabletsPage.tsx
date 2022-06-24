import { useState } from 'react';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ProductList } from '../../components/ProductList';
import { Address } from '../../components/Address';
import { Pagination } from '../../components/Pagination';

import './TabletsPage.scss';

type Props = {
  tablets: Product[],
};

export const TabletsPage: React.FC<Props> = ({ tablets }) => {
  const [sortBy, setSortBy] = useState('age');
  const [visibleItems, setvisibleItems] = useState({
    start: 0,
    end: 16,
  });
  const [step, setStep] = useState(16);

  let visibleTablets = tablets.sort((a, b) => {
    return (
      b.age - a.age
    );
  });

  if (sortBy === 'price') {
    visibleTablets = tablets.sort((a, b) => {
      return (
        (a.price * (1 - a.discount / 100)) - (b.price * (1 - b.discount / 100))
      );
    });
  } else if (sortBy === 'name') {
    visibleTablets = tablets.sort((a, b) => {
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

  const pageCount:number = Math.ceil(visibleTablets.length / step);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.id === 'SortBy') {
      setSortBy(event.target.value);
    }

    setStep(+event.target.value);

    setvisibleItems({
      start: 0,
      end: +event.target.value,
    });
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
    if (visibleItems.start + step < tablets.length) {
      setvisibleItems({
        start: visibleItems.start + step,
        end: visibleItems.end + step,
      });
    }
  };

  const handlePagination = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (+event.currentTarget.value === pageCount) {
      setvisibleItems({
        start: visibleTablets.length - step,
        end: visibleTablets.length,
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
      <Header />
      <div className="TabletsPage wrapper">
        <div className="TabletsPage__nav">
          <Address />
        </div>
        <h1 className="TabletsPage__title">Tablets</h1>
        <p className="TabletsPage__models-count">{`${tablets.length} models`}</p>

        <div className="TabletsPage__sort">

          <div className="TabletsPage__sort-item">
            <label
              htmlFor="SortBy"
              className="TabletsPage__sort-label"
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

          <div className="TabletsPage__sort-item">
            <label htmlFor="VisibleItems" className="TabletsPage__sort-label">
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
                <option value={visibleTablets.length}>all</option>
              </select>
            </div>
          </div>
        </div>

        <div className="TabletsPage__products">
          <ProductList
            products={
              visibleTablets.slice(visibleItems.start, visibleItems.end)
            }
          />
        </div>

        <div className="Tablets__pages">
          <Pagination
            step={step}
            pages={pageCount}
            index={visibleItems}
            length={visibleTablets.length}
            back={handleClickBack}
            forward={handleClickForward}
            pageNumber={handlePagination}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
