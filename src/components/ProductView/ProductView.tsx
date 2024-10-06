import React, { useState } from 'react';
import './ProductView.module.scss';
import { CategoryProduct } from '../../types/CategoryProduct';
import { Product } from '../../types/Product';
import { UseAppDispatch, useAppSelector } from '../../utils/store';
import { actions as cartActions } from '../../utils/cart';
import { actions as favActions } from '../../utils/favourites';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  product: Product;
  currentProduct: CategoryProduct | undefined;
  deck: CategoryProduct[] | undefined;
};

export const ProductView: React.FC<Props> = ({
  product,
  currentProduct,
  deck,
}) => {
  const [item, setItem] = useState<CategoryProduct | undefined>(currentProduct);
  let activeImage = '';
  const [isActiveImage, setIsActiveImage] = useState<string>();

  if (item) {
    activeImage = item.images[0];
  }

  const location = useLocation();
  const title = location.pathname
    .split('/')[2]
    .replaceAll('-', ' ')
    .toUpperCase();

  const productColors = {
    white: 'white',
    midnight: '#2c2c2c',
    black: '#313237',
    spaceblack: '#454545',
    silver: '#cccccc',
    spacegray: '#646464',
    'space gray': '#646464',
    graphite: '#4a4a4a',
    blue: '#00628c',
    sierrablue: '#a0c5da',
    'sky blue': '#91eaf8',
    green: '#a4ffde',
    midnightgreen: '#266659',
    purple: '#ffe2fe',
    pink: '#ffddfd',
    coral: 'coral',
    yellow: '#ffff76',
    gold: '#ffe0b7',
    rosegold: '#ffd9df',
    'rose gold': '#ffd9df',
    red: '#f13c3c',
    starlight: '#edbfbf',
  };

  const dispatch = UseAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const favourites = useAppSelector(state => state.favourites);

  const addToCart = () => dispatch(cartActions.addItem(product));
  const takeFromCart = () => dispatch(cartActions.takeItems(product));
  const addToFav = () => dispatch(favActions.addItem(product));
  const takeFromFav = () => dispatch(favActions.takeItem(product));

  const handleQuery = (query: string, value: string) => {
    if (deck) {
      if (query === 'capacity') {
        setItem(
          deck.find(el => el.capacity === value && el.color === item?.color),
        );
      } else {
        setItem(
          deck.find(el => el.color === value && el.capacity === item?.capacity),
        );
      }
    }
  };

  return (
    <div className="product">
      {item && (
        <div className="wrapper">
          <h1 className="product__title">{title}</h1>
          <article className="product__main">
            <div className="product__slider">
              <ul className="product__list">
                {item.images.map(el => (
                  <li
                    key={el}
                    className={cn('list__image', {
                      'active--list__image': isActiveImage === el,
                    })}
                    onClick={() => setIsActiveImage(el)}
                  >
                    <img
                      src={el}
                      alt="image"
                      className="product__list__image"
                    />
                  </li>
                ))}
              </ul>

              <div className="list__image__wrapper">
                <img
                  src={isActiveImage ? isActiveImage : activeImage}
                  alt="image"
                  className="current--list__image"
                />
              </div>
            </div>

            <div className="product__sub">
              <div className="product__colors">
                <h3 className="product__colors__paragraph">Available colors</h3>
                <ul className="product__colors__list">
                  {item.colorsAvailable.map(el => {
                    const bgColor = {
                      backgroundColor:
                        productColors[el as keyof typeof productColors],
                    };

                    return (
                      <Link
                        to={`../${item.id.replace(item.color.toLowerCase(), el.toLowerCase())}`}
                        replace
                        key={el}
                        className={cn('product__color', {
                          'is-current__color': el === item.color,
                        })}
                        style={bgColor}
                        onClick={() => handleQuery('color', el)}
                      ></Link>
                    );
                  })}
                </ul>
              </div>

              <div className="product__capacity">
                <h3 className="product__capacity__paragraph">
                  Select capacity
                </h3>
                <ul className="product__capacity__list">
                  {item.capacityAvailable.map(el => (
                    <Link
                      key={el}
                      to={`../${item.id.replace(item.capacity.toLowerCase(), el.toLowerCase())}`}
                      className="link"
                    >
                      <button
                        className={cn('product__capacity__button', {
                          'is-current__capacity': el === item.capacity,
                        })}
                        onClick={() => handleQuery('capacity', el)}
                      >
                        {el}
                      </button>
                    </Link>
                  ))}
                </ul>
              </div>

              <div className="product__pricelist">
                <div className="product__currentprice">
                  <h2 className="product__card__price__discount price">
                    ${item.priceDiscount}
                  </h2>
                  <h2 className="product__card__price__regular price">
                    ${item.priceRegular}
                  </h2>
                </div>

                <div className="card__buttons">
                  {cart.some(el => el.id === product.id) === true ? (
                    <button className="add__button" onClick={takeFromCart}>
                      Added
                    </button>
                  ) : (
                    <button className="add__button" onClick={addToCart}>
                      Add to cart
                    </button>
                  )}

                  {favourites.some(el => el.id === product.id) === true ? (
                    <button className="fav__button" onClick={takeFromFav}>
                      <div className="favourites__icon is-filled"></div>
                    </button>
                  ) : (
                    <button className="fav__button" onClick={addToFav}>
                      <div className="favourites__icon"></div>
                    </button>
                  )}
                </div>
              </div>
              <div className="product__chars">
                <div className="chars">
                  <h3 className="chars__title">Screen</h3>
                  <p className="chars__description">{item.screen}</p>
                </div>
                <div className="chars">
                  <h3 className="chars__title">Resolution</h3>
                  <p className="chars__description">{item.resolution}</p>
                </div>
                <div className="chars">
                  <h3 className="chars__title">Processor</h3>
                  <p className="chars__description">{item.processor}</p>
                </div>
                <div className="chars">
                  <h3 className="chars__title">RAM</h3>
                  <p className="chars__description">{item.ram}</p>
                </div>
              </div>
            </div>
          </article>
          <div className="product__specification">
            <article className="About">
              <h2 className="About__title product__specification__title">
                About
              </h2>
              {item.description.map(el => (
                <div key={el.title} className="description">
                  <h2 className="description__title">{el.title}</h2>
                  <p className="description__paragraph">{el.text}</p>
                </div>
              ))}
            </article>
            <article className="TechSpecs">
              <h2 className="TechSpecs__title product__specification__title">
                Tech Specs
              </h2>
              <div className="TechSpecs__chars">
                <div className="chars">
                  <h3 className="chars__title">Screen</h3>
                  <p className="chars__description">{item.screen}</p>
                </div>
                <div className="chars">
                  <h3 className="chars__title">Resolution</h3>
                  <p className="chars__description">{item.resolution}</p>
                </div>
                <div className="chars">
                  <h3 className="chars__title">Processor</h3>
                  <p className="chars__description">{item.processor}</p>
                </div>
                <div className="chars">
                  <h3 className="chars__title">RAM</h3>
                  <p className="chars__description">{item.ram}</p>
                </div>
                <div className="chars">
                  <h3 className="chars__title">Built in memory</h3>
                  <p className="chars__description">{item.capacity}</p>
                </div>
                <div className="chars">
                  <h3 className="chars__title">Camera</h3>
                  <p className="chars__description">{item.camera}</p>
                </div>
                <div className="chars">
                  <h3 className="chars__title">Zoom</h3>
                  <p className="chars__description">{item.zoom}</p>
                </div>
                <div className="chars">
                  <h3 className="chars__title">Cell</h3>
                  <p className="chars__description">{item.cell}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}
    </div>
  );
};
