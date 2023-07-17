import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { Context } from '../../context/Context';
import { getProductDetails } from '../../api/Products';
import { Error } from '../../types/ErrorType';
import './ProductCard.scss';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    products,
    setSelectedProduct,
    setIsError,
    setIsLoading,
  } = useContext(Context);

  const {
    id,
    type,
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
  } = product;

  const {
    cart, changeCart, favorite, changeFavorite,
  } = useContext(Context);

  const isInCart = cart.length > 0
    ? cart.find(item => item.id === id) : false;

  const isInFavs = favorite.length > 0
    ? favorite.find(item => item.id === id) : false;

  const currentProduct = products.find(
    productCard => productCard.id === id,
  );

  const discountPrice = price - (price / 100) * discount;

  const getCardDetails = async (productId: string) => {
    setIsError(null);
    setIsLoading(true);

    try {
      const currentProductDetails = await getProductDetails(productId);

      setSelectedProduct(currentProductDetails);
    } catch {
      setIsError(Error.GET_PRODUCT_DETAILS);
    } finally {
      setIsLoading(false);
    }
  };

  const features = {
    keys: ['screen', 'capacity', 'RAM'],
    values: [`${screen}`, `${capacity}`, `${ram}`],
  };

  return (
    <div className="product-card">
      <div className="product-card__container" data-cy="cardsContainer">
        <Link
          to={`/${product.type}s/${product.id}`}
          className="product-card__link"
          onClick={() => currentProduct && getCardDetails(currentProduct.id)}
        >
          <img src={`${imageUrl}`} alt={`${type}`} className="product-card__image" />
          <p className="product-card__title">{name}</p>
        </Link>

        <div className="product-card__prices">
          <span className="product-card__price">{`$${price}`}</span>
          {discount > 0 && <span className="product-card__discount">{`$${discountPrice}`}</span>}
        </div>

        <div className="product-card__features">
          <ul className="product-card__list">
            {features.keys.map((key) => (
              <li key={key} className="product-card__key">
                {key}
              </li>
            ))}
          </ul>

          <ul className="product-card__list">
            {features.values.map((value) => (
              <li key={value} className="product-card__value">
                {value}
              </li>
            ))}
          </ul>
        </div>
        <div className="product-card__buttons">
          <button
            type="button"
            className={classNames(
              'product-card__buttons__to-cart',
              { 'product-card__buttons__to-cart--selected': isInCart },
            )}
            onClick={() => {
              changeCart(product);
            }}
          >
            {`${isInCart ? 'Added' : 'Add'} to cart`}
          </button>
          <button
            data-cy="addToFavorite"
            type="button"
            className={classNames(
              'product-card__buttons__to-favs',
            )}
            onClick={() => {
              changeFavorite(product);
            }}
          >
            {isInFavs ? (
              <span
                className="product-card__buttons__to-favs--icon--selected"
              />
            ) : (
              <span
                className="product-card__buttons__to-favs--icon"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
