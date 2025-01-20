import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import './UnderNav.scss';
import './ProductPage.scss';
import './Grid.scss';
import Home from '../img/Home.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import products from '../../public/api/products.json';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { CartContextType, FavoritesContextType, Product } from './types';
import { CartContext, FavoritesContext } from './AppProvaider';
import FavoriteAdd from '../img/Favorite-add.svg';
import FavoriteAddActive from '../img/Favorite-add-active.svg';

export const ProductPage = () => {
  const { pathname } = useLocation();
  const gadgetId = pathname.split('/').pop();
  const gadget = products.find(product => product.itemId === gadgetId);
  const [product, setProduct] = useState<Product>();
  const [selectedImage, setSelectedImage] = useState<string>();
  const navigate = useNavigate();
  const cartContext = useContext<CartContextType>(CartContext);
  const favoritesContext = useContext<FavoritesContextType>(FavoritesContext);

  if (!cartContext) {
    throw new Error('CartContext должен использоваться внутри провайдера');
  }

  if (!favoritesContext) {
    throw new Error('favoritesContext должен использоваться внутри провайдера');
  }

  const { addToCart, removeFromCart, cartInclude } = cartContext;
  const { addToFavorites, removeFromFavorites, favoritesInclude } =
    favoritesContext;

  useEffect(() => {
    if (gadget) {
      let foundProduct: Product | null;

      switch (gadget.category) {
        case 'phones':
          foundProduct = phones.find(phone => phone.id === gadgetId) || null;
          break;
        case 'accessories':
          foundProduct =
            accessories.find(accessory => accessory.id === gadgetId) || null;
          break;
        case 'tablets':
          foundProduct = tablets.find(tablet => tablet.id === gadgetId) || null;
          break;
        default:
          foundProduct = null;
      }

      setProduct(foundProduct);
      setSelectedImage(foundProduct?.images[0]);
    }
  }, [gadget, gadgetId]);

  const changeLocation = (capacity: string, color: string) => {
    if (capacity) {
      navigate(
        `/product/${product?.namespaceId}-${capacity.toLowerCase()}-${product?.color.replace(' ', '-')}`,
      );
    } else {
      navigate(
        `/product/${product?.namespaceId}-${product?.capacity.toLowerCase()}-${color.replace(' ', '-')}`,
      );
    }
  };

  return (
    <>
      <div className="under-nav">
        <div className="under-nav__back">
          <div className="under-nav__back__text">
            <a href="/">
              <img src={Home} alt="home" />
            </a>
            <a href="/phones">{' > Phones > '}</a>
            {` ${gadget?.name}`}
          </div>
        </div>
        <a href="/phones" className="greyText">{`< Back`}</a>
        <h1 className="under-nav__h1">{gadget?.name}</h1>
      </div>

      <div className="grid-container product-container">
        <div className="images">
          {product &&
            product.images.map(image => (
              <img
                className="image-to-select"
                src={image}
                alt="product image"
                key={image}
                onClick={() => setSelectedImage(image)}
                style={{
                  border:
                    selectedImage === image
                      ? '1px solid black'
                      : '1px solid #E2E6E9',
                }}
              />
            ))}
        </div>
        <div className="main-image-container">
          <img
            className="selected-image"
            src={selectedImage}
            alt="selectedImage"
          />
        </div>
        <div className="select-panel">
          Available colors <br />
          {product?.colorsAvailable.map(color => (
            <button
              key={color}
              className={`select-panel__select-color ${product.color === color ? 'active' : ''}`}
              onClick={() => changeLocation('', color.replace(' ', '-'))}
              style={{
                backgroundColor: color.replace(' ', '-'),
              }}
            ></button>
          ))}
          <div className="grey-line"></div>
          Select capacity <br />
          {product?.capacityAvailable.map(capacity => (
            <button
              key={capacity}
              className="select-panel__select-capacity"
              onClick={() => changeLocation(capacity, '')}
              style={{
                backgroundColor:
                  capacity === product.capacity ? '#0F0F11' : 'white',
                color: capacity === product.capacity ? 'white' : '#0F0F11',
              }}
            >
              {capacity}
            </button>
          ))}
          <div className="grey-line"></div>
          <div className="price">
            <div className="price__discond">{`$${product?.priceDiscount}`}</div>
            <div className="price__regular">{`$${product?.priceRegular}`}</div>
          </div>
          <div className="select-panel__buttons">
            <button
              className={classNames(' select-panel__buttons__add button__add', {
                button__add__active: cartInclude(product),
              })}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                cartInclude(product)
                  ? removeFromCart(product)
                  : addToCart(product);
              }}
            >
              {cartInclude(product) ? 'Remove from cart' : 'Add to cart'}
            </button>
            <img
              className="button__favorite"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                favoritesInclude(product)
                  ? removeFromFavorites(product.id)
                  : addToFavorites(product);
              }}
              src={favoritesInclude(product) ? FavoriteAddActive : FavoriteAdd}
              alt=""
            />
          </div>
          <div className="card__specs">
            <div className="card__specs__string">
              {product?.screen && 'Screen'}
              <div className="card__specs__string__value">
                {product?.screen}
              </div>
            </div>
            <div className="card__specs__string">
              Capacity
              <div className="card__specs__string__value">
                {product?.capacity}
              </div>
            </div>
            <div className="card__specs__string">
              RAM
              <div className="card__specs__string__value">{product?.ram}</div>
            </div>
          </div>
        </div>
        <div className="about">
          <div className="h3 description__title">About</div>
          <div className="grey-line"></div>
          <h4>{product?.description[0].title}</h4>
          <div className="greyText">{product?.description[0].text}</div>
          <h4>{product?.description[1].title}</h4>
          <div className="greyText">{product?.description[1].text}</div>
          <h4>{product?.description[2].title}</h4>
          <div className="greyText">{product?.description[2].text}</div>
        </div>
        <div className="tech-specs">
          <div className="h3 description__title">Tech specs</div>
          <div className="grey-line "></div>
          <div className="greyText tech-specs-line">
            {product?.screen && ' Screen'}
            <div className="bodyText">{product?.screen}</div>
          </div>
          <div className="greyText tech-specs-line">
            {product?.resolution && 'Resolution'}
            <div className="bodyText">{product?.resolution}</div>
          </div>
          <div className="greyText tech-specs-line">
            {product?.processor && 'Processor'}
            <div className="bodyText">{product?.processor}</div>
          </div>
          <div className="greyText tech-specs-line">
            {product?.ram && 'RAM'}
            <div className="bodyText">{product?.ram}</div>
          </div>
          <div className="greyText tech-specs-line">
            {product?.capacity && 'Built in memory'}
            <div className="bodyText">{product?.capacity}</div>
          </div>
          <div className="greyText tech-specs-line">
            {product?.camera && 'Camera'}
            <div className="bodyText">{product?.camera}</div>
          </div>
          <div className="greyText tech-specs-line">
            {product?.zoom && 'Zoom'}
            <div className="bodyText">{product?.zoom}</div>
          </div>
          <div className="greyText tech-specs-line">
            {product?.cell && 'Cell'}
            <div className="bodyText">{product?.cell}</div>
          </div>
        </div>
      </div>
    </>
  );
};
