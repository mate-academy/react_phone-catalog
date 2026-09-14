import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import '../../styles/index.scss';
import './PhoneDetailsPage.scss';
import classNames from 'classnames';
import BloodHeart from '../../images/Union.png';
import heartImg from '../../images/Favourites(HeartLike).png';
import { NewModels } from '../../components/NewModels';
import { Title } from '../../types/Titel';
import { colors } from '../../utils/colors';
import { useFavorites } from '../../context/FavoritesContext';
import { useOrders } from '../../context/OrdersContext';
import { useProducts } from '../../context/ProductsContext';
import type { ProductCategory } from '../../repositories/productRepository';
export const PhoneDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const { pathname } = useLocation();
  const category = pathname.split('/').filter(Boolean)[0] as ProductCategory;
  const { details } = useProducts();
  const product =
    category && productId
      ? details[category]?.find(item => item.id === productId)
      : undefined;
  const navigate = useNavigate();
  const [firstPhoto, setFirstPhoto] = useState(product?.images[0]);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const { orders, addOrder, removeOrder } = useOrders();

  useEffect(() => {
    if (product) {
      setFirstPhoto(product?.images[0]);
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [product]);
  if (!product) {
    return <h1>Product not found</h1>;
  }

  const selectedProductId = product.id;

  function changeProduct(property: 'color' | 'capacity', value: string) {
    if (!product || !category) {
      return;
    }

    const matchingProduct = details[category].find(item => {
      if (
        item.namespaceId !== product.namespaceId ||
        item[property] !== value
      ) {
        return false;
      }

      return property === 'color'
        ? item.capacity === product.capacity
        : item.color === product.color;
    });

    if (matchingProduct) {
      navigate(`/${category}/${matchingProduct.id}`);
    }
  }

  const isFavorite = favorites.includes(selectedProductId);

  const isOrder = orders.includes(selectedProductId);

  function changeFavorite() {
    if (isFavorite) {
      removeFavorite(selectedProductId);
    } else {
      addFavorite(selectedProductId);
    }
  }

  function changeOrders() {
    if (isOrder) {
      removeOrder(selectedProductId);
    } else {
      addOrder(selectedProductId);
    }
  }

  function slicing(item: string) {
    const numbers: string[] = [];
    const letters: string[] = [];

    for (const char of item) {
      if (!isNaN(Number(char))) {
        numbers.push(char);
      } else {
        letters.push(char);
      }
    }

    return `${numbers.join('')} ${letters.join('')}`;
  }

  return (
    <div className="wrapper">
      <Breadcrumbs />

      <div className="container">
        <h1 className="titel">{product.name}</h1>

        <div className="product-photo">
          {product.images.map(photo => (
            <button
              type="button"
              className="product-photo--button"
              key={photo}
              onClick={() => setFirstPhoto(photo)}
              aria-label={`Show product image ${product.images.indexOf(photo) + 1}`}
            >
              <img className="product-photo--item" src={photo} alt="" />
            </button>
          ))}
        </div>
        <div className="product-photo-first">
          <img
            className="product-photo-first--item"
            src={firstPhoto}
            alt="Foto Product"
          />
        </div>
        <div className="product">
          <div className="product__box">
            <p className="product__box--text">Available colors</p>
            <div className="product__box__colors">
              {product.colorsAvailable.map(item => (
                <button
                  type="button"
                  key={item}
                  className={classNames('product__box__colors--item', {
                    ActiveColor: product.color === item,
                  })}
                  style={{ backgroundColor: colors[item] }}
                  onClick={() => changeProduct('color', item)}
                  aria-label={`Select ${item} color`}
                />
              ))}
            </div>
          </div>
          <div className="product--line"></div>
          <div className="product__box">
            <p className="product__box--text">Select capacity</p>
            <div className="product__box__gb">
              {product.capacityAvailable.map(item => (
                <button
                  type="button"
                  key={item}
                  className={classNames('product__box__gb--item', {
                    ActiveCapacity: product.capacity === item,
                  })}
                  onClick={() => changeProduct('capacity', item)}
                >
                  {slicing(item)}
                </button>
              ))}
            </div>
          </div>
          <div className="product--line"></div>
          <div className="product__price">
            <h3 className="product__price--item">${product.priceDiscount}</h3>
            <span className="product__price--item item-old">
              ${product.priceRegular}
            </span>
          </div>
          <div className="product__info__button">
            {isOrder ? (
              <button
                type="button"
                className="card__info__button--item item--Added"
                onClick={changeOrders}
              >
                Added
              </button>
            ) : (
              <button
                type="button"
                className="card__info__button--item item--button"
                onClick={changeOrders}
              >
                Add to cart
              </button>
            )}
            <button
              type="button"
              className="card__info__button--item item--BloodHeart"
              onClick={changeFavorite}
            >
              <img
                className="item--image"
                src={isFavorite ? BloodHeart : heartImg}
                alt="Remove from favorites"
              />
            </button>
          </div>
          <div className="product__info">
            <div className="product__info--items">
              <span>Screen</span>
              <span>{product.screen}</span>
            </div>
            <div className="product__info--items">
              <span>Resolution</span>
              <span>{product.resolution}</span>
            </div>
            <div className="product__info--items">
              <span>Processor</span>
              <span>{product.processor}</span>
            </div>
            <div className="product__info--items">
              <span>RAM</span>
              <span>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="info">
          <div className="info__about">
            <h2 className="info__About--titel">About</h2>
          </div>
          <div className="product--line"></div>
          {product.description.map(item => (
            <div key={item.title} className="info__text">
              <h3 className="info__text--titel">{item.title} </h3>
              <p className="info__text--paragafs">{item.text} </p>
            </div>
          ))}
        </div>
        <div className="tech">
          <div className="tech__info__about">
            <h2 className="tech__info__About--titel">Tech specs</h2>
          </div>
          <div className="product--line"></div>
          <div className="tech__info">
            <div className="tech__info--items">
              <span>Screen</span>
              <span>{product.screen}</span>
            </div>
            <div className="tech__info--items">
              <span>Resolution</span>
              <span>{product.resolution}</span>
            </div>
            <div className="tech__info--items">
              <span>Processor</span>
              <span>{product.processor}</span>
            </div>
            <div className="tech__info--items">
              <span>RAM</span>
              <span>{product.ram}</span>
            </div>
            {product.camera && (
              <div className="tech__info--items">
                <span>camera</span>
                <span>{product.camera}</span>
              </div>
            )}
            {product.zoom && (
              <div className="tech__info--items">
                <span>zoom</span>
                <span>{product.zoom}</span>
              </div>
            )}
            <div className="tech__info--items">
              <span>cell</span>
              <span>{product.cell.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <NewModels titel={Title.YouMayAlsolike} />
      </div>
    </div>
  );
};
