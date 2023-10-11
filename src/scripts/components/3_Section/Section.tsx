/* eslint-disable no-nested-ternary */
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../helpers/context/context';
import './section.scss';
import { ProductsList } from '../3_ProductsList/ProductsList';

type Props = {
  title: string;
};

export const Section: React.FC<Props> = ({ title }) => {
  const {
    goods,
  } = useContext(Context);
  const [filterList, setFilterList] = useState([]);

  const [num, setNum] = useState(0);

  const chooseItem = (number: number): void => {
    if ((num + number) >= (filterList.length + 4)) {
      setNum(0);
    } else if ((num + number) >= 0 && (filterList.length > 4)) {
      setNum(num + number);
    } else if (filterList.length <= 4) {
      setNum(0);
    } else {
      setNum(filterList.length - 3 + number);
    }
  };

  useEffect(() => {
    setFilterList(goods.filter((good: {
      price: number;
      age: number;
      discount: number;
    }) => {
      return (
        (title === 'Hot prices') ? (good.discount > 0)
          : (title === 'Brand new models') ? (good.age <= 3)
            : (good.price > 0)
      );
    })
      .sort((a: { price: number; }, b: { price: number; }) => b.price - a.price)
      .splice(num));
  }, [num]);

  return (
    <>
      <div className="section">
        <div className="section__container">
          <h1 className="section__title">{title}</h1>

          <div className="section__actions">
            <button
              type="button"
              title="top"
              className="section__button"
              onClick={() => chooseItem(-1)}
            >
              <span className="section__left" />
            </button>
            <button
              type="button"
              title="top"
              className="section__button"
              onClick={() => chooseItem(1)}
            >
              <span className="section__right" />
            </button>
          </div>

        </div>

        <ProductsList goods={filterList} />
      </div>
    </>
  );
};
