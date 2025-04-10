import { SmallSlider2 } from '../../components/Slider/SmallSlider2';
//import { ProductSlider } from '../../components/ProductSlider';
import { Product } from '../../types/Product';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/DispatchSelector';
import cn from 'classnames';
import { cartSlice } from '../../utils/cart';
import { favouriteSlice } from '../../utils/favourite';
import { useEffect, useState } from 'react';
import { Navigates } from '../../components/Navigate';
import s from './ProdDetailsPage.module.scss';
import { ProductsSlider } from '../../components/Slider/ProductsSlider';
import {
  getAccessories,
  getAllProducts,
  getPhones,
  getTablets,
} from '../../api/products';
import { ProductData } from '../../types/ProductData';
import { useNavigate } from 'react-router-dom';

export const ProdDetailsPage = () => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductData[]>([]);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const favourite = useAppSelector(state => state.favourite);
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.pathname.slice(1).split('/')[0];
  const isInCart = cart.find((item: Product) => item.itemId === product?.id);
  const isFavourite = favourite.find(
    (item: Product) => item.itemId === product?.id,
  );
  const mayLike = products.filter(
    (item: Product) => item.color === product?.color,
  );
  const goBack = () => navigate('..');

  useEffect(() => {
    getAllProducts().then(setProducts);
    let fetchCategory = null;

    switch (category) {
      case 'tablets':
        fetchCategory = getTablets();
        break;
      case 'accessories':
        fetchCategory = getAccessories();
        break;
      case 'phones':
      default:
        fetchCategory = getPhones();
        break;
    }

    fetchCategory.then(response => {
      const productToShow: ProductData = response.filter(
        (item: ProductData) => item.id === itemId,
      )[0];

      setCategoryProducts(response);
      setProduct(productToShow);
    });
  }, [category, itemId]);

  const getColorLink = (color: string) => {
    const productToLink: ProductData = categoryProducts.filter(
      (item: ProductData) =>
        item.color.replace(' ', '-') === color &&
        item.capacity === product?.capacity &&
        item.category === product?.category &&
        item.namespaceId === product?.namespaceId,
    )[0];

    return `/${product?.category}/${productToLink.id}`;
  };

  const getCapacityLink = (capacity: string) => {
    return `/${product?.category}/${product?.id.replace(product?.capacity.toLowerCase(), capacity.toLowerCase())}`;
  };

  const handleAddToCart = () => {
    const good = products.filter(item => item.itemId === product?.id)[0];

    if (isInCart) {
      dispatch(cartSlice.actions.deleteFromCart(good));

      return;
    }

    dispatch(cartSlice.actions.addToCart(good));
  };

  const handleAddToFavourite = () => {
    const good = products.filter(item => item.itemId === product?.id)[0];

    if (isFavourite) {
      dispatch(favouriteSlice.actions.removeFromFavourite(good));

      return;
    }

    dispatch(favouriteSlice.actions.addToFavourite(good));
  };

  const colorsAvailable = () => {
    return product?.colorsAvailable.map(color => color.replace(' ', '-')) || [];
  };

  const getId = () => {
    return products.filter(item => item.itemId === product?.id)[0]?.id ?? 0;
  };

  const backgroundColors: { [key: string]: string } = {
    'rose-gold': 'salmon',
    'sky-blue': 'skyblue',
    'space-gray': 'gray',
    graphite: 'SaddleBrown',
    sierrablue: 'CornflowerBlue',
  };

  const getBackgroundColor = (color: string) => {
    return backgroundColors[color] || color;
  };

  return (
    <main>
      <Navigates />
      <button className={s.back} onClick={goBack}>
        <div className={s.back__arrow}>
          <img src="../../../public/img/icons/arr_left.svg" alt="Arrow left" />
        </div>
        <span className={s.back__text}>Back</span>
      </button>

      {product && (
        <>
          <h2>{product.name}</h2>
          <div className={s.productOverview}>
            <SmallSlider2 />
            <div className={s.mainInformation}>
              <div className={s.mainInformation__itemId}>ID: {getId()}</div>
              <div className={s.mainInformation__color}>
                <h4 className={s.mainInformation__color__title}>
                  Available colors
                </h4>
                <div className={s.mainInformation__color__picker}>
                  {colorsAvailable().map((color, index) => (
                    <Link
                      to={getColorLink(color)}
                      key={index}
                      className={cn(s.colorContainer, {
                        [s['color-container--active']]:
                          product.color.replace(' ', '-') === color,
                      })}
                      style={{ background: getBackgroundColor(color) }}
                    >
                      <div className={s.colorItem}></div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className={s.divider}></div>
              <div className={s.mainInformation__capacity}>
                <h4 className={s.mainInformation__capacity__title}>
                  Select capacity
                </h4>
                <div className={s.mainInformation__capacity__picker}>
                  {product.capacityAvailable.map((capacity, index) => (
                    <Link
                      to={getCapacityLink(capacity)}
                      key={index}
                      className={cn(s.capacity__item, {
                        [s['capacity__item--active']]:
                          product.capacity === capacity,
                      })}
                    >
                      {capacity}
                    </Link>
                  ))}
                </div>
              </div>
              <div className={s.divider}></div>
              <div className={s.mainInformation__price}>
                <span className={s.regularPrice}>${product.priceDiscount}</span>
                <span className={s.fullPrice}>${product.priceRegular}</span>
              </div>
              <div className={s.mainInformation__actions}>
                <button
                  className={cn(s.mainInformation__actions__add, {
                    [s['main-information__actions__add--selected']]: isInCart,
                  })}
                  onClick={handleAddToCart}
                >
                  {isInCart ? 'Remove from cart' : 'Add to cart'}
                </button>
                <div
                  className={cn(s.mainInformation__actions__favourite, {
                    [s['mainInformation__actions__favourite--selected']]:
                      isFavourite,
                  })}
                  onClick={handleAddToFavourite}
                >
                  {isFavourite ? (
                    <img
                      src="../../../public/img/icons/Favourites\ Filled.png"
                      alt="Heart"
                    />
                  ) : (
                    <img
                      src="../../../public/img/icons/Favourites.png"
                      alt="Heart"
                    />
                  )}
                </div>
              </div>
              <ul className={s.mainInformation__description}>
                <li className={s.mainInformation__description__item}>
                  <span className={s.mainInformation__description__item__name}>
                    Screen
                  </span>
                  <span className={s.mainInformation__description__item__value}>
                    {product.screen}
                  </span>
                </li>
                <li className={s.mainInformation__description__item}>
                  <span className={s.mainInformation__description__item__name}>
                    Capacity
                  </span>
                  <span className={s.mainInformation__description__item__value}>
                    {product.capacity}
                  </span>
                </li>
                <li className={s.mainInformation__description__item}>
                  <span className={s.mainInformation__description__item__name}>
                    Processor
                  </span>
                  <span className="main-information__description__item__value">
                    {product.processor}
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
              {product.description.map((info, index) => (
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
                  <span className="tech-info__value">{product.screen}</span>
                </div>
                <div className="tech-info">
                  <span className="tech-info__name">Resolution</span>
                  <span className="tech-info__value">{product.resolution}</span>
                </div>
                <div className="tech-info">
                  <span className="tech-info__name">Processor</span>
                  <span className="tech-info__value">{product.processor}</span>
                </div>
                <div className="tech-info">
                  <span className="tech-info__name">RAM</span>
                  <span className="tech-info__value">{product.ram}</span>
                </div>
                <div className="tech-info">
                  <span className="tech-info__name">Built in memory</span>
                  <span className="tech-info__value">{product.capacity}</span>
                </div>
                {product.camera && (
                  <div className="tech-info">
                    <span className="tech-info__name">Camera</span>
                    <span className="tech-info__value">{product.camera}</span>
                  </div>
                )}
                {product.zoom && (
                  <div className="tech-info">
                    <span className="tech-info__name">Zoom</span>
                    <span className="tech-info__value">{product.zoom}</span>
                  </div>
                )}
                <div className="tech-info">
                  <span className="tech-info__name">Cell</span>
                  <span className="tech-info__value">{product.cell}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <h2>You may also like</h2>
      <ProductsSlider products={mayLike} />
    </main>
  );
};
