import { Details } from '../types/Details';
import { Phone } from '../types/Phone';
import { ColorsDetails } from './ColorsDetails';
import { CapacityDetails } from './CapacityDetails';
import {
  useLocalstorage,
  addOneCart,
  cart,
} from '../utils/cartApi';

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
  const [cartList, setCartList] = useLocalstorage('cartList', []);

  const handleClick = () => {
    if (currentPhone !== undefined) {
      setCartList(addOneCart(cartList, cart(currentPhone)));
    }
  };

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
          onClick={() => handleClick()}
        >
          Add to cart
        </button>
        <div className="details-button__favourite" />
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
