import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import ProductCard from '../ProductCard/ProductCard';
// import { getData } from '../../helpers/api';

type Props = {
  title: string;
  getData: Function;
};

const ProductsSlider: React.FC<Props> = ({ title, getData }) => {
  const [x, setX] = useState(0);
  // const [newPhones, setNewPhones] = useState([]);
  // const [discountPhones, setDiscountPhones] = useState([]);
  const [isDisabledR, setDisabledR] = useState(false);
  const [isDisabledL, setDisabledL] = useState(true);
  const [data, setData] = useState([]);

  const rightLength = data.length;
  const visibleItemsInSlider = 4;
  const widthOfCartBox = 288;

  useEffect(() => {
    getData()
      .then((data:any) => {
        setData(data);
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
          />

          <button
            type="button"
            className={classNames('prices__goRight', { 'prices__goRight--disabled': -widthOfCartBox * (rightLength - visibleItemsInSlider) === x })}
            onClick={goRight}
            disabled={isDisabledR}
          />

        </div>
      </div>
      <div className="prices__hot--list--box">
        <div className="prices__hot--list" style={{ transform: `translateX(${x}px)` }}>
          {data.map((item) => (
              <ProductCard
                item={item}
                title={title}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSlider;
