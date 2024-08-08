import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsSlider } from '../../components/ProductsSlider';
import { HeadingLevel } from '../../types/HeadingLevel';
import { Title } from '../../components/Title';
import { ProductSlider } from '../../components/ProductSlider';
import { Product } from '../../types/Product';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { cartSlice } from '../../features/cart';
import { favouriteSlice } from '../../features/favourite';
import { BackButton } from '../../components/BackButton';

export const ProductPage = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const favourite = useAppSelector(state => state.favourite);
  const { itemId } = useParams();
  const products = useAppSelector(state => state.products);
  const product: Product = products.filter(
    (item: Product) => item.data.id === itemId,
  )[0];

  const isInCart = cart.find((item: Product) => item.id === product.id);
  const isFavourite = favourite.find((item: Product) => item.id === product.id);
  const mayLike = products.filter(
    (item: Product) => item.data.namespaceId === product?.data.namespaceId,
  );

  const getColorLink = (color: string) => {
    const productToLink: Product = products.filter(
      (item: Product) =>
        item.color === color &&
        item.capacity === product.capacity &&
        item.category === product.category &&
        item.data.namespaceId === product.data.namespaceId,
    )[0];

    return `/${product.category}/${productToLink.data.id}`;
  };

  const getCapacityLink = (capacity: string) => {
    const productToLink: Product = products.filter(
      (item: Product) =>
        item.capacity === capacity &&
        item.category === product.category &&
        item.color === product.color &&
        item.data.namespaceId === product.data.namespaceId,
    )[0];

    return `/${product.category}/${productToLink.data.id}`;
  };

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(cartSlice.actions.deleteFromCart(product));

      return;
    }

    dispatch(cartSlice.actions.addToCart(product));
  };

  const handleAddToFavourite = () => {
    if (isFavourite) {
      dispatch(favouriteSlice.actions.removeFromFavourite(product));

      return;
    }

    dispatch(favouriteSlice.actions.addToFavourite(product));
  };

  return (
    <main>
      <Breadcrumbs />
      <BackButton />
      {product && (
        <>
          <Title level={HeadingLevel.h2}>{product.data.name}</Title>
          <div className="product-overview">
            <ProductSlider product={product} />
            <div className="main-information">
              <div className="main-information__item-id">ID: {product.id}</div>
              <div className="main-information__color">
                <h4 className="main-information__color__title">
                  Available colors
                </h4>
                <div className="main-information__color__picker">
                  {product.data.colorsAvailable.map((color, index) => (
                    <Link
                      to={getColorLink(color)}
                      key={index}
                      className={classNames('color-container', {
                        'color-container--active': product.color === color,
                      })}
                      style={{ background: color }}
                    >
                      <div className="color-item"></div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="divider"></div>
              <div className="main-information__capacity">
                <h4 className="main-information__capacity__title">
                  Select capacity
                </h4>
                <div className="main-information__capacity__picker">
                  {product.data.capacityAvailable.map((capacity, index) => (
                    <Link
                      to={getCapacityLink(capacity)}
                      key={index}
                      className={classNames('capacity__item', {
                        'capacity__item--active': product.capacity === capacity,
                      })}
                    >
                      {capacity}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="divider"></div>
              <div className="main-information__price">
                <span className="regular-price">
                  ${product.data.priceDiscount}
                </span>
                <span className="full-price">${product.data.priceRegular}</span>
              </div>
              <div className="main-information__actions">
                <button
                  className={classNames('main-information__actions__add', {
                    'main-information__actions__add--selected': isInCart,
                  })}
                  onClick={handleAddToCart}
                >
                  {isInCart ? 'Remove from cart' : 'Add to cart'}
                </button>
                <div
                  className={classNames(
                    'main-information__actions__favourite',
                    {
                      'main-information__actions__favourite--selected':
                        isFavourite,
                    },
                  )}
                  onClick={handleAddToFavourite}
                >
                  {isFavourite ? (
                    <img src="./img/icons/heart-filled.svg" alt="Heart" />
                  ) : (
                    <img src="./img/icons/favourites-heart.svg" alt="Heart" />
                  )}
                </div>
              </div>
              <ul className="main-information__description">
                <li className="main-information__description__item">
                  <span className="main-information__description__item__name">
                    Screen
                  </span>
                  <span className="main-information__description__item__value">
                    {product.screen}
                  </span>
                </li>
                <li className="main-information__description__item">
                  <span className="main-information__description__item__name">
                    Capacity
                  </span>
                  <span className="main-information__description__item__value">
                    {product.capacity}
                  </span>
                </li>
                <li className="main-information__description__item">
                  <span className="main-information__description__item__name">
                    Processor
                  </span>
                  <span className="main-information__description__item__value">
                    {product.data.processor}
                  </span>
                </li>
                <li className="main-information__description__item">
                  <span className="main-information__description__item__name">
                    Ram
                  </span>
                  <span className="main-information__description__item__value">
                    {product.ram}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="product-description">
            <div className="product-description__part">
              <h3 className="product-description__part__title">About</h3>
              <div className="divider"></div>
              {product.data.description.map((info, index) => (
                <div key={index}>
                  <h4 className="product-description__part__subtitle">
                    {info.title}
                  </h4>
                  {info.text.map((text, i) => (
                    <p key={i} className="product-description__part__text">
                      {text}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <div className="product-description__part">
              <h3 className="product-description__part__title">Tech specs</h3>
              <div className="divider"></div>
              <div className="product-description__tech">
                <div className="tech-info">
                  <span className="tech-info__name">Screen</span>
                  <span className="tech-info__value">
                    {product.data.screen}
                  </span>
                </div>
                <div className="tech-info">
                  <span className="tech-info__name">Resolution</span>
                  <span className="tech-info__value">
                    {product.data.resolution}
                  </span>
                </div>
                <div className="tech-info">
                  <span className="tech-info__name">Processor</span>
                  <span className="tech-info__value">
                    {product.data.processor}
                  </span>
                </div>
                <div className="tech-info">
                  <span className="tech-info__name">RAM</span>
                  <span className="tech-info__value">{product.data.ram}</span>
                </div>
                <div className="tech-info">
                  <span className="tech-info__name">Built in memory</span>
                  <span className="tech-info__value">
                    {product.data.capacity}
                  </span>
                </div>
                {product.data.camera && (
                  <div className="tech-info">
                    <span className="tech-info__name">Camera</span>
                    <span className="tech-info__value">
                      {product.data.camera}
                    </span>
                  </div>
                )}
                {product.data.zoom && (
                  <div className="tech-info">
                    <span className="tech-info__name">Zoom</span>
                    <span className="tech-info__value">
                      {product.data.zoom}
                    </span>
                  </div>
                )}
                <div className="tech-info">
                  <span className="tech-info__name">Cell</span>
                  <span className="tech-info__value">{product.data.cell}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Title level={HeadingLevel.h2}>You may also like</Title>
      <ProductsSlider products={mayLike} />
    </main>
  );
};
