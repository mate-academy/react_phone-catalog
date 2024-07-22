import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone } from '../../types/phones';
import home from '../../img/icons/home.svg';
import arrowRight from '../../img/icons/arrowRight.svg';
import arrowLeft from '../../img/icons/arrowLeft.svg';
import phones from '../../api/phones.json';
import { Colors } from '../../types/colors';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { useArrayContext } from '../../ArrayContext';
import productsFromApi from '../../api/products.json';
import { Product } from '../../types/product';

type Props = {
  item: Phone;
};

export const ItemOptionBlock: React.FC<Props> = ({ item }) => {
  const [activeColor, setActiveColor] = useState(item.color);
  const [activeCapacity, setActiveCapacity] = useState(item.capacity);
  const [activeImg, setActiveImg] = useState(item.images[0]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveCapacity(item.capacity);
    setActiveColor(item.color);
    setActiveImg(item.images[0]);
  }, [item]);
  const { favoriteProducts, cartProducts, handleLike, handleCart } =
    useArrayContext();

  const product: Product = productsFromApi.find(a => a.itemId === item.id)!;

  function getArr(option: string, optionArray: string[]) {
    if (item) {
      const prepare = item.id.split('-');
      const index = prepare.findIndex(a => a === option);
      const arrayofOption: Phone[] = [];

      for (const n of optionArray) {
        const i = [...prepare];

        i[index] = n.toLowerCase();

        const result = phones.find(phone => phone.id === i.join('-'));

        if (result) {
          arrayofOption.push(result);
        }
      }

      return arrayofOption;
    }

    return;
  }

  const images = item.images;

  return (
    <div className="item__section item-option-block">
      <div className="item-option-block__nav">
        <Link to={'/'}>
          <img src={home} alt="" />
        </Link>
        <Link
          to={location.pathname.split('/').slice(0, 2).join('/')}
          className="item-option-block__nav-part"
        >
          <img src={arrowRight} alt="" />
          <p className="item-option-block__nav-text">{item.category}</p>
        </Link>
        <div className="item-option-block__nav-part">
          <img src={arrowRight} alt="" />
          <p className="item-option-block__nav-text-semi">{item.name}</p>
        </div>
      </div>
      <div className="item-option-block__title">
        <button
          className="item-option-block__backbutton"
          onClick={() => {
            navigate(-1);
          }}
        >
          <img
            className="item-option-block__backbutton-img"
            src={arrowLeft}
            alt=""
          />
          <p className="item-option-block__backbutton-text">Back</p>
        </button>
        <h2>{item.name}</h2>
      </div>
      <div className="item-option-block__container">
        <div className="item-option-block__imagies">
          <div className="item-option-block__imagies-list">
            {images.map(image => (
              <img
                key={image}
                className={classNames('item-option-block__img', {
                  'active-img': activeImg === image,
                })}
                src={`${image}`}
                alt=""
                onClick={() => {
                  setActiveImg(image);
                }}
              />
            ))}
          </div>
          <div className="item-option-block__current-img-container">
            <img
              src={activeImg}
              className="item-option-block__imagies-current"
              alt=""
            />
          </div>
        </div>
        <div className="item-option-block__right-bar">
          <div className="item-option-block__options">
            <div className="item-option-block__option-container">
              <p className="item-option-block__option-title">
                Available colors
              </p>
              <div className="item-option-block__option-list">
                {getArr(item.color, item.colorsAvailable)?.map(a => (
                  <Link
                    key={a.id}
                    to={
                      location.pathname.split('/').slice(0, -1).join('/') +
                      '/' +
                      a.id
                    }
                    className={classNames(
                      'item-option-block__color-container',
                      {
                        'color-container-active': activeColor === a.color,
                      },
                    )}
                  >
                    <div
                      className="item-option-block__color"
                      style={{
                        backgroundColor: Colors[a.color as keyof typeof Colors],
                      }}
                    />
                  </Link>
                ))}
              </div>
            </div>
            <div className="underline" />
            <div className="item-option-block__option-container">
              <p className="item-option-block__option-title">Select capacity</p>
              <div className="item-option-block__option-list">
                {getArr(
                  item.capacity.toLowerCase(),
                  item.capacityAvailable,
                )?.map(a => (
                  <Link
                    key={a.id}
                    to={
                      location.pathname.split('/').slice(0, -1).join('/') +
                      '/' +
                      a.id
                    }
                    className={classNames('item-option-block__capacity', {
                      'capacity-container-active':
                        activeCapacity === a.capacity,
                    })}
                  >
                    {a.capacity}
                  </Link>
                ))}
              </div>
            </div>
            <div className="underline" />
          </div>
          <div className="item-option-block__price-buttons">
            <div className="item-option-block__price">
              <p className="item-option-block__price-new">
                ${item.priceDiscount}
              </p>
              <p className="item-option-block__price-old">
                ${item.priceRegular}
              </p>
            </div>
            <div className="item-option-block__buttons">
              <button
                className={classNames('button-add ', {

                  'button-add__added': cartProducts
                    .map(a => a.id)
                    .includes(product.id),
                })}
                onClick={() => handleCart(product)}
              >
                {cartProducts.includes(product)
                  ? 'Added to cart'
                  : 'Add to cart'}
              </button>
              <button
                className={classNames('button-heart button-size-big', {
                  'button-heart-filled': favoriteProducts
                    .map(a => a.id)
                    .includes(product.id),
                })}
                onClick={() => handleLike(product)}
              >
              </button>
            </div>
          </div>
          <ul className="item-option-block__short-info">
            <li className="item-option-block__short-info-section">
              <p className="item-option-block__short-info-section-title">
                Screen
              </p>
              <p className="item-option-block__short-info-section-value">
                {item.screen}
              </p>
            </li>
            <li className="item-option-block__short-info-section">
              <p className="item-option-block__short-info-section-title">
                Resolution
              </p>
              <p className="item-option-block__short-info-section-value">
                {item.resolution}
              </p>
            </li>
            <li className="item-option-block__short-info-section">
              <p className="item-option-block__short-info-section-title">
                Processor
              </p>
              <p className="item-option-block__short-info-section-value">
                {item.processor}
              </p>
            </li>
            <li className="item-option-block__short-info-section">
              <p className="item-option-block__short-info-section-title">RAM</p>
              <p className="item-option-block__short-info-section-value">
                {item.ram}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
