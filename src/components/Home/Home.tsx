import React, { FC, useEffect, useMemo, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { SimpleSlider } from '../SimpleSlider/SimpleSlider';

import './Home.css';

import {
  loadPhones as loadPhonesStore,
} from '../../store/store';
import { PhoneCard } from '../PhoneCard/PhoneCard';

interface StateProps {
  phones: PhonesWithDetails[];
}

interface DispatchProps {
  loadPhones: () => void;
}

export const HomeTemplate: FC<StateProps & DispatchProps> = ({
  loadPhones, phones,
}) => {
  const [marginLeftLowPrice, setMarginLeftLowPrice] = useState(0);
  const [marginLeftnewModels, setMarginLeftNewModels] = useState(0);
  const [visiblePhonesQuantity] = useState(4);

  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  const lowPricePhoneList = useMemo(() => {
    const sorted = [...phones].sort((a, b) => (
      a.priceDiscount - b.priceDiscount
    ));

    sorted.length = 10;

    return sorted;
  }, [phones]);

  const newModelPhoneList = useMemo(() => {
    const sorted = [...phones].sort((a, b) => (
      a.year - b.year
    )).reverse();

    sorted.length = 10;

    return sorted;
  }, [phones]);

  const handleSlideModels = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const { pagination } = event.currentTarget.dataset;

      switch (pagination) {
        case 'lowPriceRight':
          if (marginLeftLowPrice
            !== -(lowPricePhoneList.length - visiblePhonesQuantity) * 288) {
            setMarginLeftLowPrice(marginLeftLowPrice - 288);
          }

          break;

        case 'lowPriceLeft':
          if (marginLeftLowPrice !== 0) {
            setMarginLeftLowPrice(marginLeftLowPrice + 288);
          }

          break;

        case 'newModelsRight':
          if (marginLeftnewModels
            !== -(newModelPhoneList.length - visiblePhonesQuantity) * 288) {
            setMarginLeftNewModels(marginLeftnewModels - 288);
          }

          break;

        case 'newModelsLeft':
          if (marginLeftnewModels !== 0) {
            setMarginLeftNewModels(marginLeftnewModels + 288);
          }

          break;

        default:
          break;
      }
    },
    [
      marginLeftLowPrice,
      marginLeftnewModels,
      visiblePhonesQuantity,
      lowPricePhoneList,
      newModelPhoneList,
    ],
  );

  return (
    <>
      <SimpleSlider />
      <section className="phones__low-price">
        <h2 className="low-price__heading main__heding">
          Hot prices
        </h2>
        <div className="pagination-buttons">
          <button
            type="button"
            className="button__pagination button__pagination-left"
            data-pagination="lowPriceLeft"
            disabled={marginLeftLowPrice === 0}
            onClick={handleSlideModels}
          />
          <button
            type="button"
            className="button__pagination button__pagination-right"
            data-pagination="lowPriceRight"
            disabled={marginLeftLowPrice
              === -(lowPricePhoneList.length - visiblePhonesQuantity) * 288}
            onClick={handleSlideModels}
          />
        </div>
        <div
          className="main__models-container"
          style={{ marginLeft: marginLeftLowPrice }}
        >
          {lowPricePhoneList.map(phone => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </section>
      <section className="phones__new-models">
        <h2 className="new-models__heading main__heding">
          Brand new models
        </h2>
        <div className="pagination-buttons">
          <button
            type="button"
            className="button__pagination button__pagination-left"
            data-pagination="newModelsLeft"
            disabled={marginLeftnewModels === 0}
            onClick={handleSlideModels}
          />
          <button
            type="button"
            className="button__pagination button__pagination-right"
            data-pagination="newModelsRight"
            disabled={marginLeftnewModels
              === -(newModelPhoneList.length - visiblePhonesQuantity) * 288}
            onClick={handleSlideModels}
          />
        </div>
        <div
          className="main__models-container"
          style={{ marginLeft: marginLeftnewModels }}
        >
          {newModelPhoneList.map(phone => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state: State) => ({
  phones: state.phones,
});

const mapDispatchToProps = {
  loadPhones: loadPhonesStore,
};

export const Home = connect<StateProps, DispatchProps, {}, State>(
  mapStateToProps, mapDispatchToProps,
)(HomeTemplate);
