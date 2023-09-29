import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { ProductDetails } from '../../Types/ProductDetails';
import { Product } from '../../Types/Product';
import './SingleProductPage.scss';
import { getDiscountPrice } from '../../helpers/getDiscountPrice';
import Favourite from '../../icons/Favourites.svg';
import Favourite_red from '../../icons/Favourites_red.svg';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { addItems } from '../../features/cart/cartSlice';
import { addToFavorites } from '../../features/favourites/favourites';

type Props = {
  productDetails?: ProductDetails;
  product?: Product;
};

const SingleProductPage:React.FC<Props> = ({
  productDetails,
  product,
}) => {
  const dispatch = useAppDispatch();
  const favorite = useAppSelector(state => state.favorites.items);
  const cart = useAppSelector(state => state.cart.items);
  const [currentImg, setCurrentImg] = useState<string | undefined>();
  const colors = [
    ['#FCDBC1', 'Biege'], ['#5F7170', 'Green'],
    ['#4C4C4C', 'Grey'], ['#F0F0F0', 'White'],
  ];
  const capasity = [64, 256, 512];
  const [currentColor, setCurrentColor]
    = useState<string | string[]>(colors[0][1]);
  const [currentCapasity, setCurrentCapasity] = useState(capasity[0]);
  const [isInCart, setIsInCart] = useState(false);
  const [isInFavorites, setisinFavorites] = useState(false);

  const discountPrice = useMemo(() => {
    if (product) {
      return getDiscountPrice(product);
    }

    return 0;
  }, [product]);

  const findFavorite = useMemo(() => favorite.some(
    item => item.id === product?.id,
  ), [favorite]);

  const findInCart = useMemo(() => cart.some(
    item => item.id === product?.id,
  ), [cart]);

  const onAddToCard = () => {
    setIsInCart(true);
    const item = {
      id: product?.id,
      title: product?.name,
      imageUrl: product?.imageUrl,
      price: discountPrice,
      color: currentColor,
      capasity: currentCapasity,
    };

    dispatch(addItems(item));
  };

  const onAddToFavourites = () => {
    setisinFavorites(true);
    dispatch(addToFavorites(product));
    setisinFavorites(false);
  };

  useEffect(() => {
    setCurrentImg(productDetails?.images[0]);
  }, [productDetails?.images]);

  return (
    <section className="productDetails">
      <h1 className="productDetails__title">{productDetails?.name}</h1>
      <div className="productDetails__top">
        <div className="productDetails__images-list">
          <div className="productDetails__images">
            {productDetails?.images.map((imageUrl) => (
              <div
                role="button"
                key={imageUrl}
                className="productDetails__image"
                onClick={() => setCurrentImg(imageUrl)}
                onKeyPress={() => {}}
                tabIndex={-1}
              >
                <img
                  src={imageUrl}
                  alt="photoLittle"
                  className={classNames(
                    'productDetails__img-little',
                    { active: imageUrl === currentImg },
                  )}
                />
              </div>
            ))}
          </div>
          <div className="productDetails__img-current">
            <img
              src={currentImg}
              alt="phone"
              className="productDetails__img-big"
            />
          </div>
        </div>
        <div className="productDetails__info">
          <div className="productDetails__colors">
            <h3 className="productDetails__subTitle">
              Available colors
            </h3>
            <div className="productDetails__select__container">
              {colors.map((color, ind) => (
                <button
                  key={color[ind]}
                  className={classNames(
                    'productDetails__colors__button',
                    { active: color[1] === currentColor },
                  )}
                  type="button"
                  onClick={() => setCurrentColor(color[1])}
                >
                  <div
                    className="productDetails__colors__backGround"
                    style={{ backgroundColor: color[0] }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="productDetails__capasity">
            <h3 className="productDetails__subTitle">Select capacity</h3>
            <div
              className="productDetails__select__container"
            >
              {capasity.map(el => (
                <button
                  key={el}
                  type="button"
                  onClick={() => setCurrentCapasity(el)}
                  className={classNames(
                    'productDetails__capasity__btn',
                    {
                      'productDetails__capasity__btn-active':
                        currentCapasity === el,
                    },
                  )}
                >
                  {`${el} GB`}
                </button>
              ))}
            </div>
          </div>
          <div className="productDetails__price-container">
            {product?.discount ? (
              <>
                <div className="productDetails__price">{`$${discountPrice}`}</div>
                <div className="productDetails__price productDetails__price-crossed">{`$${product?.price}`}</div>
              </>
            ) : (
              <div className="productDetails__price">{`$${product?.price}`}</div>
            )}
          </div>

          <div className="productDetails__button">
            <button
              type="button"
              className={classNames('productDetails__button-add', {
                'productDetails__button-add--active': findInCart,
              })}
              onClick={onAddToCard}
            >
              {!isInCart && !findInCart
                ? ('Add to card') : ('Added to cart')}
            </button>
            <button
              type="button"
              className="productDetails__button-favourite"
              data-cy="addToFavorite"
              onClick={onAddToFavourites}
            >
              {!isInFavorites && !findFavorite ? (
                <img
                  src={Favourite}
                  alt="favourite"
                  className="productDetails__img-favourite"
                />
              ) : (
                <img
                  src={Favourite_red}
                  alt="favourite"
                  className="productDetails__img-favourite"
                />
              )}
            </button>
          </div>

          <div className="productDetails__spec">
            <div className="productDetails__spec__list">
              <span className="productDetails__spec__name">
                Screen
              </span>
              <span className="productDetails__spec__name">
                Resolution
              </span>
              <span className="productDetails__spec__name">
                Processor
              </span>
              <span className="productDetails__spec__name">
                RAM
              </span>
            </div>
            <div className="productDetails__spec__list">
              <span className="productDetails__spec__value">
                {productDetails?.display.screenSize}
              </span>
              <span className="productDetails__spec__value">
                {productDetails?.display.screenResolution}
              </span>
              <span className="productDetails__spec__value">
                {productDetails?.hardware.cpu}
              </span>
              <span className="productDetails__spec__value">
                {productDetails?.storage.ram}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productDetails__bottom">
        <div className="productDetails__about">
          <h3 className="productDetails__heading">About</h3>
          <div className="productDetails__description">
            {productDetails?.description}
          </div>
        </div>

        <div className="productDetails__techSpecs">
          <h3 className="productDetails__heading">Tech Specs</h3>
          <div className="productDetails__techSpecs__container">
            <div className="productDetails__spec__list">
              <span
                className="productDetails__spec__name
                productDetails__spec--detailed"
              >
                Screen
              </span>
              <span
                className="productDetails__spec__name
                productDetails__spec--detailed"
              >
                Resolution
              </span>
              <span
                className="productDetails__spec__name
                productDetails__spec--detailed"
              >
                Processor
              </span>
              <span
                className="productDetails__spec__name
                productDetails__spec--detailed"
              >
                RAM
              </span>
              <span
                className="productDetails__spec__name
                productDetails__spec--detailed"
              >
                Battery
              </span>
              <span
                className="productDetails__spec__name
                productDetails__spec--detailed"
              >
                Camera
              </span>
              <span
                className="productDetails__spec__name
                productDetails__spec--detailed"
              >
                Weight
              </span>
            </div>
            <div className="productDetails__spec__list">
              <span
                className="productDetails__spec__value
                productDetails__spec--detailed"
              >
                {productDetails?.display.screenSize}
              </span>
              <span
                className="productDetails__spec__value
                productDetails__spec--detailed"
              >
                {productDetails?.display.screenResolution}
              </span>
              <span
                className="productDetails__spec__value
                productDetails__spec--detailed"
              >
                {productDetails?.hardware.cpu}
              </span>
              <span
                className="productDetails__spec__value
                productDetails__spec--detailed"
              >
                {productDetails?.storage.ram}
              </span>
              <span
                className="productDetails__spec__value"
                productDetails__spec--detailed
              >
                {productDetails?.battery.type}
              </span>
              <span
                className="productDetails__spec__value
                productDetails__spec--detailed"
              >
                {productDetails?.camera.primary}
              </span>
              <span
                className="productDetails__spec__value
                productDetails__spec--detailed"
              >
                {productDetails?.sizeAndWeight.weight}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage;
