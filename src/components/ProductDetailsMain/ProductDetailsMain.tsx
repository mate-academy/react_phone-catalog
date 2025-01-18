import { useContext } from 'react';
import { StateContext } from '../../store/GlobalProvider';
import { Product } from '../../types/Product';
import { colors } from '../../utils/colors';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useCart, useFavourite } from '../../utils/useToggleItem';

type Props = {
  prodId: Product;
};

export const ProductDetailsMain: React.FC<Props> = ({ prodId }) => {
  const { selectedProduct } = useContext(StateContext);
  const { isItem: like, toggleItem: toggleFavourite } = useFavourite(prodId);
  const { isItem: inCart, toggleItem: toggleCart } = useCart(prodId);

  const normalizedColors = selectedProduct?.colorsAvailable.map(color =>
    color.replace(' ', '-'),
  );

  const prodWithoutColor = normalizedColors?.reduce(
    (result, color) => result?.replace(`-${color}`, ''),
    selectedProduct?.id,
  );

  const prodWithoutCap = selectedProduct?.id.split('-').slice(0, -2).join('-');

  const { screen, resolution, processor, ram } = selectedProduct || {};

  return (
    <section className="productDetailsMain">
      <div className="productDetailsMain__title-box">
        <p className="productDetailsMain__title">Available colors</p>
        <p className="productDetailsMain__id">{`ID: ${prodId?.id}`}</p>
      </div>
      <div className="productDetailsMain__colors">
        {selectedProduct?.colorsAvailable.map(color => {
          const background = colors[color];

          return (
            <div
              key={color}
              className={classNames('productDetailsMain__bg', {
                productDetailsMain__select: selectedProduct.color === color,
              })}
            >
              <Link
                to={`/${selectedProduct.category}/${prodWithoutColor}-${color}`}
                className="productDetailsMain__color"
                style={{ background }}
              />
            </div>
          );
        })}
      </div>

      <div className="productDetailsMain__capacity-box">
        <p className="productDetailsMain__title">Select capacity</p>
        <div className="productDetailsMain__capacity">
          {selectedProduct?.capacityAvailable.map(cap => {
            return (
              <Link
                key={cap}
                to={`/${selectedProduct.category}/${prodWithoutCap}-${cap.toLowerCase()}-${selectedProduct.color}`}
                className={classNames('productDetailsMain__cap', {
                  'productDetailsMain__select-cap':
                    selectedProduct.capacity === cap,
                })}
              >
                {cap}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="productDetailsMain__price-box">
        <h1 className="productDetailsMain__price">
          {`$${selectedProduct?.priceDiscount}`}
        </h1>
        <h2 className="productDetailsMain__full-price">
          {`$${selectedProduct?.priceRegular}`}
        </h2>
      </div>

      <div className="productDetailsMain__buttons">
        <button className="productCard__add" onClick={toggleCart}>
          {inCart ? 'Added' : 'Add to cart'}
        </button>
        <button
          className="productCard__favourite icon icon__favourite"
          onClick={toggleFavourite}
        >
          <img
            src={
              like ? 'img/icons/select-heart.svg' : 'img/icons/heart-like.svg'
            }
            alt="favourites"
            className="icon__img"
          />
        </button>
      </div>

      <div className="productDetailsMain__details-box">
        <ul className="productDetailsMain__details">
          <li className="productCard__key">
            Screen
            <span className="productCard__value">{screen}</span>
          </li>

          <li className="productCard__key">
            Resolution
            <span className="productCard__value">{resolution}</span>
          </li>

          <li className="productCard__key">
            Processor
            <span className="productCard__value">{processor}</span>
          </li>

          <li className="productCard__key">
            RAM
            <span className="productCard__value">{ram}</span>
          </li>
        </ul>
      </div>
    </section>
  );
};
