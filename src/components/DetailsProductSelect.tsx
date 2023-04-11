/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { ColorsDetails } from './ColorsDetails';
import { CapacityDetails } from './CapacityDetails';
import { ProductsContext } from '../context/ProductsContext';
import {
  addOneCart,
  cart,
} from '../utils/cartApi';
import { updateFavourites } from '../utils/favouritesApi';
import { Details } from '../types/Details';
import { Phone } from '../types/Phone';

type Props = {
  details: Details,
  phones: Phone[],
  currentPhone?: Phone,
};

export const DetailsProductSelect: React.FC<Props> = ({
  details,
  phones,
  currentPhone,
}) => {
  const colors = details.colorsAvailable;
  const capacities = details.capacityAvailable;
  const { cartList, setCartList } = useContext(ProductsContext);
  const {
    favouritesList,
    setFavouritesList,
  } = useContext(ProductsContext);

  const handleClickCartButton = () => {
    if (currentPhone !== undefined) {
      setCartList(addOneCart(cartList, cart(currentPhone)));
    }
  };

  const handleClickFavouritesButton = () => {
    if (currentPhone) {
      setFavouritesList(updateFavourites(favouritesList, currentPhone.id));
    }
  };

  const isSelectedFavourites = useMemo(() => {
    return currentPhone && favouritesList.includes(currentPhone.id);
  }, [favouritesList]);

  return (
    <div className="details-select-container">
      <ColorsDetails
        colors={colors}
        name={details.name}
        phones={phones}
      />
      <CapacityDetails
        capacities={capacities}
        name={details.name}
        phones={phones}
      />
      <div className="details-price">
        <div className="details-price__discount">
          $
          {details.priceDiscount}
        </div>
        {currentPhone?.year !== 2019 && (
          <div className="details-price__regular">
            $
            {details.priceRegular}
          </div>
        )}
      </div>
      <div className="details-button">
        <button
          className="details-button__add"
          type="button"
          onClick={() => handleClickCartButton()}
        >
          Add to cart
        </button>
        <button
          className={classNames(
            'details-button__favourite',
            { 'details-button__favourite--selected': isSelectedFavourites },
          )}
          type="button"
          onClick={() => handleClickFavouritesButton()}
        />
      </div>
      <div className="info-block">
        <div className="info-block__title">
          Screen
        </div>
        <div className="info-block__value">
          {details.screen}
        </div>
      </div>
      <div className="info-block">
        <div className="info-block__title">
          Resolution
        </div>
        <div className="info-block__value">
          {details.resolution}
        </div>
      </div>
      <div className="info-block">
        <div className="info-block__title">
          Processor
        </div>
        <div className="info-block__value">
          {details.processor}
        </div>
      </div>
      <div className="info-block">
        <div className="info-block__title">
          RAM
        </div>
        <div className="info-block__value">
          {details.capacity}
        </div>
      </div>
    </div>
  );
};
