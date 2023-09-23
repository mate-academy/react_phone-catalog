import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { DetailsPhone } from '../../Type/DetailsPhone';
import './productParams.scss';
import { ColorPallette } from '../../Type/Colors';

type Props = {
  colors: string[];
  currentCapacity: string;
  nameId: string;
  currentColor: string;
  phone: DetailsPhone;
  capacities: string[];
};

export const ProductParams: React.FC<Props> = ({
  colors,
  currentCapacity,
  nameId,
  currentColor,
  phone,
  capacities,
}) => {
  return (
    <div className="params">
      <div className="params__color">
        <p className="params__color--heading">Available colors</p>

        <div className="colors__list">
          {colors.map(color => (
            <div
              key={color}
              className="colors__item"
            >
              <div className={classNames('colors__border', {
                'colors__border--selected': color === currentColor,
              })}
              >
                <Link
                  to={`/Phones/${nameId}-${currentCapacity.toLocaleLowerCase()}-${color}`}
                  className="colors__circle"
                  style={{ backgroundColor: `${ColorPallette[color]}` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="params__capacity">
        <p className="params__capacity--heading">Select capacity</p>

        <div className="capacities__list">
          {capacities.map(capacity => (
            <Link
              to={`/Phones/${nameId}-${capacity.toLocaleLowerCase()}-${currentColor}`}
              className={classNames('capacities__link', {
                'capacities__link--selected': capacity === currentCapacity,
              })}
              key={capacity}
            >
              {capacity}
            </Link>
          ))}
        </div>
      </div>
      <div className="params__shop">
        <div className="params__shop__price">
          <h2 className="params__shop__price--current">{`$${phone.priceDiscount}`}</h2>
          <h2 className="params__shop__price--discount">{`$${phone.priceRegular}`}</h2>
        </div>

        <div className="params__shop__button">
          <button
            type="button"
            className="params__shop__button--add"
          >
            Add to cart
          </button>
          <button
            type="button"
            aria-label="Mute volume"
            className="params__shop__button--favourites"
          />
        </div>
      </div>
      <div className="params__description">
        <div className="params__description--specs">
          <p className="params__description--name">
            Screen
          </p>

          <p className="params__description--value">
            {phone?.screen}
          </p>
        </div>

        <div className="params__description--specs">
          <p className="params__description--name">
            Resolution
          </p>

          <p className="params__description--value">
            {phone?.resolution}
          </p>
        </div>

        <div className="params__description--specs">
          <p className="params__description--name">
            Processor
          </p>

          <p className="params__description--value">
            {phone?.processor}
          </p>
        </div>

        <div className="params__description--specs">
          <p className="params__description--name">
            RAM
          </p>

          <p className="params__description--value">
            {phone?.ram}
          </p>
        </div>
      </div>
    </div>
  );
};
