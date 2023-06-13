import './PhoneCard.scss';
import { Link } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import { FavouritesButton } from '../FavouritesButton/FavouritesButton';
import { CartButton } from '../CartButton/CartButton';
import { CartItem } from '../../types/CartItem';

type Props = {
  phone: Phone,
  setLikedProducts: React.Dispatch<React.SetStateAction<Phone[]>>,
  likedProducts: Phone[],
  cartProducts: CartItem[],
  setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>,
};

export const PhoneCard: React.FC<Props> = ({
  phone,
  likedProducts,
  setLikedProducts,
  cartProducts,
  setCartProducts,
}) => {
  const {
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
    phoneId,
  } = phone;

  return (
    <div className="phone-card">
      <div className="phone-card__content">
        <div className="phone-card__phone phone">
          <div
            className="phone__container"
            data-cy="cardsContainer"
          >
            <Link to={`/phones/${phoneId}`} className="page__link">
              <img src={`new/${image}`} alt={name} className="phone__image" />

              <p className="phone__title">
                {name}
              </p>
            </Link>

            <div className="phone__priceholder">
              <p className="phone__price">
                {`$${price}`}
              </p>

              <p className="phone__price--old">
                {`$${fullPrice}`}
              </p>
            </div>

            <div className="phone__description">
              <div className="phone__description--names">
                Screen
                {' '}
                <br />
                {' '}
                Capacity
                {' '}
                <br />
                {' '}
                RAM
              </div>
              <div className="phone__description--data">
                {screen}
                {' '}
                <br />
                {' '}
                {capacity}
                {' '}
                <br />
                {' '}
                {ram}
              </div>
            </div>

            <div className="phone__bottom">
              <CartButton
                phone={phone}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
              />

              <FavouritesButton
                phone={phone}
                likedProducts={likedProducts}
                setLikedProducts={setLikedProducts}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
