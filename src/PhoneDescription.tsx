/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import {
  IphoneDetailed, getNewIphones, getProductById,
} from './api/iphones';
import { ShopCard } from './ShopCard';
import { Iphone } from './types/Iphone';
import { Loader } from './Loader';

type Props = {
  selectPhone: (iphoneId: string | undefined) => void,
  selectedIphoneId: string | null,
  selectPhoneToBuy: (iphoneId: string | undefined) => void,
  selectedIphoneIdToBuy: string | null,
};

type IphoneWithSlug = IphoneDetailed & { slug: string };

export const PhoneDescription: React.FC<Props> = ({
  selectPhone,
  selectedIphoneId,
  selectPhoneToBuy,
  selectedIphoneIdToBuy,
}) => {
  const [selectedIphone, setSelectedIphone] = useState<IphoneWithSlug | null>(null);
  const { iphoneId } = useParams();
  const [iphoneRecommend, setIphoneRecommend] = useState<Iphone[]>([]);
  const navigate = useNavigate();
  const [isSelectedToCart, setIsSelectedToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>(selectedIphone ? selectedIphone.color : '');
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(
    selectedIphone ? selectedIphone.capacity : null,
  );

  const scrollToPhoneDescription = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const baseUrl = 'https://mate-academy.github.io/react_phone-catalog/_new/';

  const availableColors: { [key: string]: string } = {
    spacegray: '#4d4c4a',
    midnightgreen: '#3c4a3f',
    purple: '#a49bb0',
    rosegold: '#c999b0',
    green: '#8df0c3',
    silver: '#a6a6a6',
    gold: '#fcdbc1',
    yellow: '#f7d043',
    red: '#d62b2b',
    coral: '#e66565',
    black: '#000',
  };

  useEffect(() => {
    if (iphoneId !== undefined) {
      getProductById(iphoneId)
        .then((product) => {
          setSelectedIphone({ ...product, slug: iphoneId });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [iphoneId]);

  useEffect(() => {
    getNewIphones().then((items) => setIphoneRecommend(items));
  }, []);

  const handleSelectCapacity = (capacity: string) => {
    if (iphoneId !== undefined) {
      const parts = iphoneId.split('-');

      const capacityIndex = parts.findIndex(el => el.includes('gb'));
      const updatedItem = parts[capacityIndex].replace(/\d+gb/, capacity.toLowerCase());

      parts[capacityIndex] = updatedItem;

      const updatedIphoneId = parts.join('-');

      navigate(`/phones/${updatedIphoneId}`);
      setSelectedCapacity(capacity);
    }
  };

  const handleSelectColor = (color: string) => {
    if (iphoneId !== undefined) {
      const parts = iphoneId.split('-');

      if (selectedIphone?.color !== undefined) {
        const colorIndex = parts.findIndex(el => el.includes(selectedIphone?.color));
        const updatedItem = parts[colorIndex].replace(selectedIphone?.color, color.toLowerCase());

        parts[colorIndex] = updatedItem;

        const updatedIphoneId = parts.join('-');

        navigate(`/phones/${updatedIphoneId}`);
        setSelectedColor(color);
      }
    }
  };

  const handleImg = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const item = event.currentTarget;

    if (item && item.href) {
      const newImgSrc = item.href;
      const mainImgElement = document.querySelector('.item-main-img');

      if (mainImgElement) {
        mainImgElement.setAttribute('src', newImgSrc);
      }
    }
  };

  return (
    <section
      className="page page__body item"
    >
      <div className="filter__nav">
        <div className="filter__nav--1-item">
          <NavLink to="/home" className="filter__nav-link filter__nav-item">
            <svg
              className="filter__nav-item"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M7.59075 0.807088C7.83149 0.619846 8.16859 0.619846 8.40933 0.807088L14.4093 5.47375C14.5717 5.60006 14.6667 5.79426 14.6667 5.99999V13.3333C14.6667 13.8638 14.456 14.3725 14.0809 14.7475C13.7058 15.1226 13.1971 15.3333 12.6667 15.3333H3.33337C2.80294 15.3333 2.29423 15.1226 1.91916 14.7475C1.54409 14.3725 1.33337 13.8638 1.33337 13.3333V5.99999C1.33337 5.79426 1.42836 5.60006 1.59075 5.47375L7.59075 0.807088ZM2.66671 6.32605V13.3333C2.66671 13.5101 2.73695 13.6797 2.86197 13.8047C2.98699 13.9298 3.15656 14 3.33337 14H12.6667C12.8435 14 13.0131 13.9298 13.1381 13.8047C13.2631 13.6797 13.3334 13.5101 13.3334 13.3333V6.32605L8.00004 2.1779L2.66671 6.32605Z" fill="#313237" />
              <path fillRule="evenodd" clipRule="evenodd" d="M5.33337 8.00001C5.33337 7.63182 5.63185 7.33334 6.00004 7.33334H10C10.3682 7.33334 10.6667 7.63182 10.6667 8.00001V14.6667C10.6667 15.0349 10.3682 15.3333 10 15.3333C9.63185 15.3333 9.33337 15.0349 9.33337 14.6667V8.66668H6.66671V14.6667C6.66671 15.0349 6.36823 15.3333 6.00004 15.3333C5.63185 15.3333 5.33337 15.0349 5.33337 14.6667V8.00001Z" fill="#313237" />
            </svg>
          </NavLink>
          <svg
            className="filter__nav-link--arrow-right"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 0.528606C0.788986 0.268256 1.2111 0.268256 1.47145 0.528606L5.47145 4.52861C5.73179 4.78896 5.73179 5.21107 5.47145 5.47141L1.47145 9.47141C1.2111 9.73176 0.788986 9.73176 0.528636 9.47141C0.268287 9.21107 0.268287 8.78896 0.528636 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287 1.21107 0.268287 0.788955 0.528636 0.528606Z" fill="#B4BDC4" />
          </svg>

          <NavLink
            to="/phones"
            className="filter__nav-link filter__nav-link--main filter__nav-item"
          >
            Phones
          </NavLink>
          <svg
            className="filter__nav-icons"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 0.528606C0.788986 0.268256 1.2111 0.268256 1.47145 0.528606L5.47145 4.52861C5.73179 4.78896 5.73179 5.21107 5.47145 5.47141L1.47145 9.47141C1.2111 9.73176 0.788986 9.73176 0.528636 9.47141C0.268287 9.21107 0.268287 8.78896 0.528636 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287 1.21107 0.268287 0.788955 0.528636 0.528606Z" fill="#B4BDC4" />
          </svg>

          <div className="filter__nav-phone-title filter__nav-item">
            {selectedIphone?.name}
          </div>

        </div>
        <div className="filter__nav--2-item">
          <NavLink
            onClick={() => navigate(-1)}
            className="item__link"
            to="#"
          >
            Back
          </NavLink>

        </div>
      </div>

      {loading ? (<Loader />) : (
        <>
          <article className="grid
          grid--tablet
          grid--desktop
          item__article "
          >
            <h1 className="page__title item-title
            grid__item--tabletSmall--1-4
            grid__item--tablet--1-6
            grid__item--desktop--1-10"
            >
              {selectedIphone?.name}
            </h1>

            <div
              className="grid__item
              grid__item--imgs
              grid__item--tablet--1-1
              grid__item--tabletSmall--1-2
              grid__item--desktop--1-2"
            >
              <a
                href={`${baseUrl}${selectedIphone?.images[0]}`}
                onClick={handleImg}
              >
                <img
                  src={`${baseUrl}${selectedIphone?.images[0]}`}
                  alt="img1"
                  className="item__list-img"
                />
              </a>
              <a
                href={`${baseUrl}${selectedIphone?.images[1]}`}
                onClick={handleImg}
              >
                <img
                  src={`${baseUrl}${selectedIphone?.images[1]}`}
                  alt="img2"
                  className="item__list-img"
                />

              </a>
              <a
                href={`${baseUrl}${selectedIphone?.images[2]}`}
                onClick={handleImg}
              >
                <img
                  src={`${baseUrl}${selectedIphone?.images[2]}`}
                  alt="img3"
                  className="item__list-img"
                />
              </a>
              <a
                href={`${baseUrl}${selectedIphone?.images[3]}`}
                className={classNames({ 'item__list--link': selectedIphone?.images[3] === undefined })}
                onClick={handleImg}
              >
                <img
                  src={`${baseUrl}${selectedIphone?.images[3]}`}
                  alt="img4"
                  className="item__list-img"
                />
              </a>
            </div>
            <img
              src={`${baseUrl}${selectedIphone?.images[0]}`}
              alt="img1"
              className="item-main-img grid__item
              grid__item--main-img
              grid__item--tabletSmall--3-4
              grid__item--tablet--2-3
              grid__item--desktop--4-10"
            />

            <div className="item__list--description grid__item
            grid__item--tabletSmall--1-2
            grid__item--tablet--5-6
            grid__item--desktop--14-20"
            >
              <div className="item__text--secondary">
                Available colors
              </div>
              <div className="item__list--colors">
                {selectedIphone?.colorsAvailable.map((color: string) => {
                  return (
                    <button
                      className="item__color"
                      type="button"
                      onClick={() => handleSelectColor(color)}
                      key={color}
                    >
                      <svg
                        className="item__color--1"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="28"
                          height="28"
                          rx="14"
                          fill={availableColors[color] || 'transparent'}
                          stroke="white"
                          strokeWidth="2"
                        />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="31"
                          height="31"
                          rx="15.5"
                          stroke={selectedColor === color ? 'black' : '#E2E6E9'}
                        />
                      </svg>

                    </button>
                  );
                })}
              </div>
              <p className="item__text--secondary">
                Select capacity
              </p>
              <div className="item__list--buttons">
                {selectedIphone?.capacityAvailable.map((iphoneCapacity) => {
                  return (
                    <button
                      type="button"
                      className={classNames('item__button', {
                        'item__button--focus': selectedCapacity === iphoneCapacity,
                      })}
                      onClick={() => handleSelectCapacity(iphoneCapacity)}
                    >
                      {iphoneCapacity}
                    </button>
                  );
                })}
              </div>

              <div className="item__list--price">
                <p className="item__price item__price--discount">
                  $1099
                </p>
                <p className="item__price ">
                  $1199
                </p>

              </div>

              <div className="button__container button__container--descr">
                {selectedIphoneIdToBuy === iphoneId
                  ? (
                    <button
                      type="button"
                      onClick={() => {
                        selectPhoneToBuy('');
                        setIsSelectedToCart(!isSelectedToCart);
                      }}
                      className={classNames('button', 'button--add', 'button--add--descr',
                        {
                          'button--add--selected': isSelectedToCart,
                        })}
                    >
                      {!isSelectedToCart ? 'Add to cart' : 'Added to cart'}

                    </button>

                  )
                  : (
                    <button
                      type="button"
                      onClick={() => {
                        selectPhoneToBuy(iphoneId);
                        setIsSelectedToCart(!isSelectedToCart);
                      }}
                      className={classNames('button', 'button--add', 'button--add--descr',
                        {
                          'button--add--selected': isSelectedToCart,
                        })}

                    >
                      {!isSelectedToCart ? 'Add to cart' : 'Added to cart'}
                    </button>
                  )}

                {selectedIphoneId === iphoneId
                  ? (
                    <button
                      type="button"
                      className="button button--like"
                      onClick={() => {
                        selectPhone('');
                        setIsLiked(!isLiked);
                      }}
                    >
                      {isLiked
                        ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.3 1.29877C10.7264 1.29877 10.1584 1.41178 9.62852 1.63136C9.09865 1.85091 8.61711 2.17281 8.21162 2.57846L8.00005 2.79003L7.78835 2.57834C6.96928 1.75927 5.85839 1.29912 4.70005 1.29912C3.54171 1.29912 2.43081 1.75927 1.61174 2.57834C0.792668 3.39741 0.33252 4.50831 0.33252 5.66665C0.33252 6.82499 0.792668 7.93589 1.61174 8.75496L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75496C14.794 8.34947 15.1158 7.86805 15.3353 7.33817C15.5549 6.80825 15.6679 6.24026 15.6679 5.66665C15.6679 5.09304 15.5549 4.52505 15.3353 3.99513C15.1158 3.46531 14.7941 2.98392 14.3885 2.57846C13.983 2.17276 13.5015 1.85093 12.9716 1.63136C12.4416 1.41178 11.8737 1.29877 11.3 1.29877Z" fill="#EB5757" />
                          </svg>
                        )
                        : (
                          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.62846 0.631356C10.1584 0.411782 10.7264 0.298767 11.3 0.298767C11.8736 0.298767 12.4416 0.411782 12.9715 0.631356C13.5014 0.85093 13.9829 1.17276 14.3884 1.57846C14.794 1.98392 15.1157 2.46531 15.3353 2.99513C15.5549 3.52505 15.6679 4.09304 15.6679 4.66665C15.6679 5.24026 15.5549 5.80825 15.3353 6.33817C15.1157 6.86805 14.7939 7.34947 14.3883 7.75496C14.3883 7.755 14.3883 7.75492 14.3883 7.75496L8.49496 13.6483C8.22159 13.9217 7.77838 13.9217 7.50501 13.6483L1.61168 7.75496C0.792607 6.93589 0.332458 5.82499 0.332458 4.66665C0.332458 3.50831 0.792607 2.39741 1.61168 1.57834C2.43075 0.759273 3.54165 0.299124 4.69999 0.299124C5.85833 0.299124 6.96922 0.759273 7.78829 1.57834L7.99999 1.79003L8.21156 1.57846C8.21152 1.5785 8.2116 1.57842 8.21156 1.57846C8.61705 1.17281 9.09859 0.850909 9.62846 0.631356ZM13.3982 2.56818C13.1227 2.29255 12.7956 2.0739 12.4356 1.92472C12.0756 1.77555 11.6897 1.69877 11.3 1.69877C10.9103 1.69877 10.5244 1.77555 10.1644 1.92472C9.80435 2.0739 9.47724 2.29255 9.20174 2.56818L8.49496 3.27496C8.22159 3.54833 7.77838 3.54833 7.50501 3.27496L6.79834 2.56829C6.24182 2.01177 5.48702 1.69912 4.69999 1.69912C3.91295 1.69912 3.15815 2.01177 2.60163 2.56829C2.04511 3.12481 1.73246 3.87961 1.73246 4.66665C1.73246 5.45369 2.04511 6.20849 2.60163 6.76501L7.99999 12.1634L13.3983 6.76501C13.674 6.48951 13.8927 6.16229 14.0419 5.80227C14.1911 5.44224 14.2679 5.05635 14.2679 4.66665C14.2679 4.27695 14.1911 3.89106 14.0419 3.53103C13.8927 3.17101 13.6739 2.84367 13.3982 2.56818Z" fill="#333333" />
                          </svg>
                        )}

                    </button>

                  )
                  : (
                    <button
                      type="button"
                      className="button button--like"
                      onClick={() => {
                        selectPhone(selectedIphone?.phoneId);
                        setIsLiked(!isLiked);
                      }}
                    >
                      {isLiked
                        ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.3 1.29877C10.7264 1.29877 10.1584 1.41178 9.62852 1.63136C9.09865 1.85091 8.61711 2.17281 8.21162 2.57846L8.00005 2.79003L7.78835 2.57834C6.96928 1.75927 5.85839 1.29912 4.70005 1.29912C3.54171 1.29912 2.43081 1.75927 1.61174 2.57834C0.792668 3.39741 0.33252 4.50831 0.33252 5.66665C0.33252 6.82499 0.792668 7.93589 1.61174 8.75496L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75496C14.794 8.34947 15.1158 7.86805 15.3353 7.33817C15.5549 6.80825 15.6679 6.24026 15.6679 5.66665C15.6679 5.09304 15.5549 4.52505 15.3353 3.99513C15.1158 3.46531 14.7941 2.98392 14.3885 2.57846C13.983 2.17276 13.5015 1.85093 12.9716 1.63136C12.4416 1.41178 11.8737 1.29877 11.3 1.29877Z" fill="#EB5757" />
                          </svg>
                        )
                        : (
                          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.62846 0.631356C10.1584 0.411782 10.7264 0.298767 11.3 0.298767C11.8736 0.298767 12.4416 0.411782 12.9715 0.631356C13.5014 0.85093 13.9829 1.17276 14.3884 1.57846C14.794 1.98392 15.1157 2.46531 15.3353 2.99513C15.5549 3.52505 15.6679 4.09304 15.6679 4.66665C15.6679 5.24026 15.5549 5.80825 15.3353 6.33817C15.1157 6.86805 14.7939 7.34947 14.3883 7.75496C14.3883 7.755 14.3883 7.75492 14.3883 7.75496L8.49496 13.6483C8.22159 13.9217 7.77838 13.9217 7.50501 13.6483L1.61168 7.75496C0.792607 6.93589 0.332458 5.82499 0.332458 4.66665C0.332458 3.50831 0.792607 2.39741 1.61168 1.57834C2.43075 0.759273 3.54165 0.299124 4.69999 0.299124C5.85833 0.299124 6.96922 0.759273 7.78829 1.57834L7.99999 1.79003L8.21156 1.57846C8.21152 1.5785 8.2116 1.57842 8.21156 1.57846C8.61705 1.17281 9.09859 0.850909 9.62846 0.631356ZM13.3982 2.56818C13.1227 2.29255 12.7956 2.0739 12.4356 1.92472C12.0756 1.77555 11.6897 1.69877 11.3 1.69877C10.9103 1.69877 10.5244 1.77555 10.1644 1.92472C9.80435 2.0739 9.47724 2.29255 9.20174 2.56818L8.49496 3.27496C8.22159 3.54833 7.77838 3.54833 7.50501 3.27496L6.79834 2.56829C6.24182 2.01177 5.48702 1.69912 4.69999 1.69912C3.91295 1.69912 3.15815 2.01177 2.60163 2.56829C2.04511 3.12481 1.73246 3.87961 1.73246 4.66665C1.73246 5.45369 2.04511 6.20849 2.60163 6.76501L7.99999 12.1634L13.3983 6.76501C13.674 6.48951 13.8927 6.16229 14.0419 5.80227C14.1911 5.44224 14.2679 5.05635 14.2679 4.66665C14.2679 4.27695 14.1911 3.89106 14.0419 3.53103C13.8927 3.17101 13.6739 2.84367 13.3982 2.56818Z" fill="#333333" />
                          </svg>
                        )}
                    </button>

                  )}
              </div>

              <table className="item__table">
                <tbody>
                  <tr className="item__table-row">
                    <td className="item__table-property">Screen</td>
                    <td className="item__table-value">{selectedIphone?.screen}</td>
                  </tr>
                  <tr className="item__table-row">
                    <td className="item__table-property">Capacity</td>
                    <td className="item__table-value">{selectedIphone?.capacity}</td>
                  </tr>
                  <tr className="item__table-row">
                    <td className="item__table-property">RAM</td>
                    <td className="item__table-value">{selectedIphone?.ram}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </article>
          <article className="item__article
          grid
          item__description item__description-container"
          >
            <div className="item__description--1
            grid__item--tabletSmall--3-4
            grid__item--desktop--1-12"
            >
              <h2 className="item__description-title">About</h2>
              <h3 className="item__description-text item__description-text--main">
                And then there was Pro
              </h3>
              <p className="item__description-text item__description-text--secondary">
                A transformative triple‑camera system that adds tons of capability without complexity.

                An unprecedented leap in battery life. And a mind‑blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.
              </p>
              <h3 className="item__description-text item__description-text--main">
                Camera
              </h3>
              <p className="item__description-text item__description-text--secondary">
                Meet the first triple‑camera system to combine cutting‑edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest‑quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.
              </p>
              <h3 className="item__description-text item__description-text--main">
                Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.
              </h3>
              <p className="item__description-text item__description-text--secondary">
                iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.
              </p>
            </div>
            <div className="item__description--2 grid__item
            grid__item--tablet--1-6
            grid__item--desktop--14-24"
            >
              <h2 className="item__description-title">Tech specs</h2>
              <table className="item__table">
                <tbody>
                  <tr className="item__table-row">
                    <td className="item__table-property">Screen</td>
                    <td className="item__table-value">{selectedIphone?.screen}</td>
                  </tr>
                  <tr className="item__table-row">
                    <td className="item__table-property">Resolution</td>
                    <td className="item__table-value">{selectedIphone?.resolution}</td>
                  </tr>
                  <tr className="item__table-row">
                    <td className="item__table-property">Processor</td>
                    <td className="item__table-value">{selectedIphone?.processor}</td>
                  </tr>
                  <tr className="item__table-row">
                    <td className="item__table-property">RAM</td>
                    <td className="item__table-value">{selectedIphone?.ram}</td>
                  </tr>
                  <tr className="item__table-row">
                    <td className="item__table-property">Built in memory</td>
                    <td className="item__table-value">{selectedIphone?.capacity}</td>
                  </tr>
                  <tr className="item__table-row">
                    <td className="item__table-property">Camera</td>
                    <td className="item__table-value">{selectedIphone?.camera}</td>
                  </tr>
                  <tr className="item__table-row">
                    <td className="item__table-property">Zoom</td>
                    <td className="item__table-value">{selectedIphone?.zoom}</td>
                  </tr>
                  <tr className="item__table-row">
                    <td className="item__table-property">Cell</td>
                    <td className="item__table-value">{selectedIphone?.cell}</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </article>
          <article className="item__article item__recommends">
            <h1 className="item__recommends-title">
              You may also like
            </h1>
            <div className="item__recommends-container grid grid--tablet grid--desktop">
              {iphoneRecommend.slice(0, 4).map((iphone, index) => {
                const classNumberMobile = index % 2;
                const classNumberTablet = index % 3;
                const classNumberTabletSmall = index % 2;

                const classNumberDesktop = index % 4;

                return (
                  <div
                    className={classNames('grid__item', {
                      'grid__item--mobile--1-2': classNumberMobile === 0,
                      'grid__item--mobile--3-4': classNumberMobile === 1,

                      'grid__item--tabletSmall--1-2': classNumberTabletSmall === 0,
                      'grid__item--tabletSmall--3-4': classNumberTabletSmall === 1,

                      'grid__item--tablet--1-2': classNumberTablet === 0,
                      'grid__item--tablet--3-4': classNumberTablet === 1,
                      'grid__item--tablet--5-6': classNumberTablet !== 1 && classNumberTablet !== 0,

                      'grid__item--desktop--1-6': classNumberDesktop === 0,
                      'grid__item--desktop--7-12': classNumberDesktop === 1,
                      'grid__item--desktop--13-18': classNumberDesktop === 2,
                      'grid__item--desktop--19-24': classNumberDesktop === 3,

                    })}
                  >
                    <ShopCard
                      iphone={iphone}
                      iphoneTitleRef={scrollToPhoneDescription}
                    />
                  </div>
                );
              })}
            </div>
          </article>
        </>
      )}
    </section>
  );
};
