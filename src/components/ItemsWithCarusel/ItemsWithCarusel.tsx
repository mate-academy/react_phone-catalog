import classNames from 'classnames';
import React, { useState } from 'react';
import { Item } from '../../types';
import ProductCart from '../ProductCart/ProductCart';
import './ItemsWithCarusel.scss';

type Props = {
  items: Item[];
  title: string;
};

const ItemsWithCarusel: React.FC<Props> = ({ items, title }) => {
  const [position, setPosition] = useState(0);

  const lengthItems = items.length;
  const step = 4;
  const frameSize = 4;
  const imgOff = lengthItems - step === position;

  const moveRight = () => {
    if ((position + step) < lengthItems) {
      setPosition(position + step);
    } else {
      setPosition(lengthItems - frameSize);
    }
  };

  const moveLeft = () => {
    if ((position - step) >= frameSize) {
      setPosition(position - step);
    } else {
      setPosition(0);
    }
  };

  return (
    <section className="itemsWithCarusel">
      <div className="itemsWithCarusel__wrap">
        <div className="itemsWithCarusel__top">
          <h2 className="itemsWithCarusel__title">{title}</h2>
          <div className="itemsWithCarusel__btns">
            <button
              className="itemsWithCarusel__btn"
              type="button"
              onClick={moveLeft}
              disabled={position === 0}
            >
              <img
                className={classNames(
                  { 'itemsWithCarusel__img-off': position === 0 },
                )}
                src="/img/icon/arrow_left.svg"
                alt="btn"
              />
            </button>
            <button
              className="itemsWithCarusel__btn"
              type="button"
              onClick={moveRight}
              disabled={imgOff}
            >
              <img
                className={classNames(
                  { 'itemsWithCarusel__img-off': imgOff },
                )}
                src="/img/icon/arrow_right.svg"
                alt="btn"
              />
            </button>
          </div>
        </div>
        <ul
          className="itemsWithCarusel__list"
          style={{
            marginLeft: `-${position * 288}px`,
            transition: '0.8s',
          }}
        >
          {items.map(item => (
            <ProductCart item={item} key={item.id} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ItemsWithCarusel;
