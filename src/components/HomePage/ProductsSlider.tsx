import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import ProductCard from '../ProductCard/ProductCard';
import { getPreparedPhones } from '../helpers/api';

type Props = {
  title: string;
};

const ProductsSlider: React.FC<Props> = ({ title }) => {
  const [x, setX] = useState(0);
  const [newPhones, setNewPhones] = useState([]);
  const [discountPhones, setDiscountPhones] = useState([]);
  const [isDisabledR, setDisabledR] = useState(false);
  const [isDisabledL, setDisabledL] = useState(true);

  const rightLength = title === 'Hot prices' ? discountPhones.length : newPhones.length;
  const visibleItemsInSlider = 4;
  const widthOfCartBox = 288;

  useEffect(() => {
    getPreparedPhones()
      .then(phones => {
        setNewPhones(phones.sort((a: any, b: any) => a - b));
        setDiscountPhones(phones.filter((item: any): any => item.discount));
      });
  }, []);

  const goLeft = () => {
    if (x === 0) {
      setDisabledL(true);

      return;
    }

    setDisabledR(false);
    setX(x + widthOfCartBox);
  };

  const goRight = () => {
    if ((-widthOfCartBox * (rightLength - visibleItemsInSlider)) === x) {
      setDisabledR(true);

      return;
    }

    setDisabledL(false);
    setX(x - widthOfCartBox);
  };

  return (
    <div className="prices prices__hot">
      <div className="prices__nav">
        <h1 className="prices__h1">{title}</h1>
        <div className="prices__nav--button">
          <button
            type="button"
            className={classNames('prices__goLeft', { 'prices__goLeft--disabled': x === 0 })}
            onClick={goLeft}
            disabled={isDisabledL}
          >
            <img src="../img/icons/Vleft.svg" alt="goLeft" />
          </button>
          <button
            type="button"
            className={classNames('prices__goRight', { 'prices__goRight--disabled': -widthOfCartBox * (rightLength - visibleItemsInSlider) === x })}
            onClick={goRight}
            disabled={isDisabledR}
          >
            <img src="../img/icons/Vright.svg" alt="goRight" />
          </button>
        </div>
      </div>
      <div className="prices__hot--list--box">
        <div className="prices__hot--list" style={{ transform: `translateX(${x}px)` }}>
          {title === 'Hot prices'
            ? discountPhones.map((item) => (
              <ProductCard item={item} />
            ))
            : newPhones.map((item) => (
              <ProductCard
                item={item}
                title={title}
              />
            ))}
          {}
        </div>
      </div>
    </div>
  );
};

export default ProductsSlider;
