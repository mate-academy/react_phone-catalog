import './ProductItem.scss';
import { useFavourites } from '../../../context/FavouritesContext';
import { useCart } from '../../../context/CartContext';
import { Link } from 'react-router-dom';

type Props = {
  id: string;
  link: string;
  productName: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  image: string;
  column: boolean;
  showDiscount: boolean;
};

export const ProductItem = ({
  id,
  link,
  productName,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
  image,
  column,
  showDiscount,
}: Props) => {
  const { favourites, toggleFavourite } = useFavourites();
  const { cart, toggleCart } = useCart();

  return (
    <>
      <div className="product-card">
        <div className="product-card__content">
          <Link to={link}>
            <img
              className="product-card__img"
              src={image}
              alt=""
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            />
          </Link>
          <Link to={link} className="product-card__title-link">
            <h3 className="product-card__title">{productName}</h3>
          </Link>
          <div className="product-card__price">
            {(fullPrice !== price && column) || showDiscount ? (
              <div className="product-card__price--discount">
                <div className="product-card__price--current">
                  {`$${price}`}
                </div>
                <div className="product-card__price--full-price">
                  {`$${fullPrice}`}
                </div>
              </div>
            ) : (
              <div className="product-card__price--full">{`$${price}`}</div>
            )}
          </div>

          <section className="product-card__details">
            <div className="product-card__detail">
              <span className="product-card__detail-name">Screen</span>
              <span className="product-card__detail-value">{screen}</span>
            </div>

            <div className="product-card__detail">
              <span className="product-card__detail-name">Capacity</span>
              <span className="product-card__detail-value">{capacity}</span>
            </div>

            <div className="product-card__detail">
              <span className="product-card__detail-name">RAM</span>
              <span className="product-card__detail-value">{ram}</span>
            </div>
          </section>

          <section className="product-card__add">
            <button
              className={`product-card__add__cart ${cart.includes(id) ? 'product-card__add__cart-added' : ''}`}
              onClick={() => toggleCart(id)}
            >
              {cart.includes(id) ? (
                <div>Added to cart</div>
              ) : (
                <div>Add to cart</div>
              )}
            </button>

            <button
              className={`product-card__add__favourite ${favourites.includes(id) ? 'product-card__add__favourite-added' : ''}`}
              onClick={() => toggleFavourite(id)}
            >
              {favourites.includes(id) ? (
                <img
                  className="product-card__add__favourite-img-added"
                  src="icons/Favourites-Filled.png"
                  alt=""
                />
              ) : (
                <img
                  className="product-card__add__favourite-img"
                  src="icons/Favourites.png"
                  alt=""
                />
              )}
            </button>
          </section>
        </div>
      </div>
    </>
  );
};
