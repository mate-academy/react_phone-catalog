// import './NewModels.module.scss';
import React, { useEffect, useState } from 'react';
import './NewModels.scss';
import { Product } from '../../../types/products';
import classNames from 'classnames';
import { useSwipe } from '../../../units/useSwipe';
import { sortNewestYear } from '../../../units/functions';

// const getLastYearModels = (allPhones: Product[]) => {
//   // const lastYear: number = ;
//   // const lastYear = 2022;
//   const allPhonesCopy = [...allPhones];
//   const maxYear = allPhonesCopy.reduce(
//     (max, phone) => (phone.year > max ? phone.year : max),
//     allPhonesCopy[0].year,
//   );

//   return allPhonesCopy.filter(phone => phone.year === maxYear);
// };

const CARD_WIDTH_WITH_GAP = 288;

type Props = {
  phones: Product[];
};

export const NewModels: React.FC<Props> = ({ phones }) => {
  const [newestPhones, setNewestPhones] = useState<Product[]>([]);
  const [transition, setTransition] = useState(0);

  useEffect(() => {
    setNewestPhones(
      sortNewestYear(phones).sort((p1, p2) => p2.price - p1.price),
    );
  }, [phones]);

  const handleSlideLeft = () => {
    setTransition(prev => prev - CARD_WIDTH_WITH_GAP);
  };

  const handleSlideRight = () => {
    setTransition(prev => prev + CARD_WIDTH_WITH_GAP);
  };

  const elementRef = useSwipe(handleSlideLeft, handleSlideRight);

  return (
    <div className="new-models">
      <div className="new-models__head">
        <h2 className="new-models__title">Brand new models</h2>
        <div className="new-models__head-buttons">
          <button
            className={classNames(
              'new-models__button-left new-models__button',
              { 'disabled-button__left': transition === 0 },
            )}
            disabled={transition === 0}
            onClick={handleSlideLeft}
          />
          <button
            className={classNames(
              'new-models__button-right new-models__button',
              {
                'disabled-button__right':
                  transition ===
                  CARD_WIDTH_WITH_GAP * phones.length - CARD_WIDTH_WITH_GAP * 2,
              },
            )}
            disabled={
              transition ===
              CARD_WIDTH_WITH_GAP * phones.length - CARD_WIDTH_WITH_GAP * 2
            }
            onClick={handleSlideRight}
          />
        </div>
      </div>

      <div className="new-models__window" ref={elementRef}>
        <div
          className="new-models__carousel"
          style={{
            width: `${phones.length * CARD_WIDTH_WITH_GAP}px`,
            transform: `translateX(-${transition}px)`,
          }}
        >
          {newestPhones.map(phone => {
            const { itemId, image, name, price, screen, capacity, ram } = phone;

            return (
              <div className="card" key={itemId}>
                <img className="card__image" src={image} alt={itemId} />

                <div className="card__title">{name}</div>

                <div className="card__price">{`$${price}`}</div>

                <div className="card__characteristics">
                  <div className="card__discription">
                    <span className="discription__title">Screen</span>
                    <span className="description__value">{screen}</span>
                  </div>
                  <div className="card__discription">
                    <span className="discription__title">Capacity</span>
                    <span className="description__value">{capacity}</span>
                  </div>
                  <div className="card__discription">
                    <span className="discription__title">RAM</span>
                    <span className="description__value">{ram}</span>
                  </div>
                </div>

                <div className="card__buttons">
                  <a href="#" className="button__add">
                    Add to card
                  </a>
                  <a href="#" className="card-button__favourite">
                    <img src="./img/icons-image/heart_empty.svg" alt="" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
