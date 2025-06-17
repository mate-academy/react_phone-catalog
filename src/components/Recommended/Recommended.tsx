/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import products from '../../../public/api/products.json';
import { Link } from 'react-router-dom';
import './Recommended.scss';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import { addToFavorites, removeFromFavorites }
  from '../../redux/favoritesSlice';
import { useProductState } from '../Phones/Phones';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useWindowWidth } from '../Navbar/Navbar';

type Props = {
  title: string,
};

export const emptyHeart = (
  <svg width="16" height="16" viewBox="0 0 16 16"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 1.63137C10.1584 1.4118 10.7264 1.29878 11.3 1.29878C11.8737 1.29878 12.4416 1.4118 12.9716 1.63137C13.5015 1.85094 13.983 2.17277 14.3885 2.57847C14.7941 2.98394 15.1158 3.46532 15.3353 3.99514C15.5549 4.52506 15.6679 5.09305 15.6679 5.66667C15.6679 6.24028 15.5549 6.80827 15.3353 7.33819C15.1158 7.86806 14.794 8.34949 14.3884 8.75497C14.3883 8.75501 14.3884 8.75493 14.3884 8.75497L8.49502 14.6483C8.22165 14.9217 7.77844 14.9217 7.50507 14.6483L1.61174 8.75497C0.792668 7.9359 0.33252 6.82501 0.33252 5.66667C0.33252 4.50833 0.792668 3.39743 1.61174 2.57836C2.43081 1.75929 3.54171 1.29914 4.70005 1.29914C5.85839 1.29914 6.96928 1.75929 7.78835 2.57836L8.00005 2.79005L8.21162 2.57847C8.21158 2.57851 8.21166 2.57844 8.21162 2.57847C8.61711 2.17283 9.09865 1.85092 9.62852 1.63137ZM13.3983 3.56819C13.1228 3.29256 12.7957 3.07392 12.4357 2.92474C12.0756 2.77556 11.6898 2.69878 11.3 2.69878C10.9103 2.69878 10.5245 2.77556 10.1644 2.92474C9.80441 3.07392 9.4773 3.29256 9.2018 3.56819L8.49502 4.27497C8.22165 4.54834 7.77844 4.54834 7.50507 4.27497L6.7984 3.56831C6.24189 3.01179 5.48708 2.69914 4.70005 2.69914C3.91301 2.69914 3.15821 3.01179 2.60169 3.56831C2.04517 4.12483 1.73252 4.87963 1.73252 5.66667C1.73252 6.4537 2.04517 7.20851 2.60169 7.76502L8.00005 13.1634L13.3984 7.76502C13.674 7.48953 13.8928 7.16231 14.042 6.80228C14.1911 6.44226 14.2679 6.05637 14.2679 5.66667C14.2679 5.27696 14.1911 4.89107 14.042 4.53105C13.8928 4.17103 13.6739 3.84369 13.3983 3.56819Z" fill="#313237"/>
  </svg>
);

export const filledHeart = (
  <svg width="16" height="16" viewBox="0 0 16 16"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.3 1.29878C10.7264 1.29878 10.1584 1.4118 9.62852 1.63137C9.09865 1.85092 8.61711 2.17283 8.21162 2.57847L8.00005 2.79005L7.78835 2.57836C6.96928 1.75929 5.85839 1.29914 4.70005 1.29914C3.54171 1.29914 2.43081 1.75929 1.61174 2.57836C0.792668 3.39743 0.33252 4.50833 0.33252 5.66667C0.33252 6.82501 0.792668 7.9359 1.61174 8.75497L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75497C14.794 8.34949 15.1158 7.86806 15.3353 7.33819C15.5549 6.80827 15.6679 6.24028 15.6679 5.66667C15.6679 5.09305 15.5549 4.52506 15.3353 3.99514C15.1158 3.46532 14.7941 2.98394 14.3885 2.57847C13.983 2.17277 13.5015 1.85094 12.9716 1.63137C12.4416 1.4118 11.8737 1.29878 11.3 1.29878Z" fill="#EB5757"/>
  </svg>
);

export const Recommended: React.FC<Props> = ({ title }) => {
  const [items, setItems] = useState(products);
  const [miniHeader, setMiniHeader] = useState(title);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isInCart, isInFavorites } = useProductState();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();

  const cardSize = () => {
    if (windowWidth < 640) {
      return 212;
    }

    if (windowWidth < 1200) {
      return 237;
    }

    return 272;
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;

    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;

    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (title === 'brand_new_models') {
      setMiniHeader('Brand new models');

      // Create a new sorted array without mutating the original
      const filteredItems = [...products]
        .sort((a, b) => b.year - a.year)
        .slice(0, 9);

      setItems(filteredItems);
    }

    if (title === 'hot_prices') {
      setMiniHeader('Hot prices');

      // Create a new sorted array without mutating the original
      const filteredItems = [...products]
        .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price))
        .slice(0, 9);

      setItems(filteredItems);
    }

    if (title.includes('may_like')) {
      const itemRelation = title.slice(9); // reference product to finetune recomnedations for

      setMiniHeader('You may also like');

      const filteredItems = [];

      for (let i = 0; i < 10; i++) {
        const random = Math.floor(Math.random() * products.length);

        filteredItems.push(products[random]);
      }

      setItems(filteredItems);
    }
  }, [title]);


  return (
    <div className="rec__body">
      <div className="rec__title-and-nav">
        <div className="rec__mini-title">
          {miniHeader}
        </div>
        <div className="rec__buttons">
          <button
            className="rec__arrow rec__arrow--left"
            onClick={goToPrevious}
            aria-label="Previous slide"
            disabled={currentIndex === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            className="rec__arrow rec__arrow--right"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      <br/>
      <div className="rec__container-wrapper"> {/*this is to hide overflowing strip*/}
        <div
          className="rec__container"
          style={{ transform: `translateX(calc(${cardSize() * -currentIndex}px - (${currentIndex} * 16px)))` }}
        >
          {items.map((item, index) => (
            <div
              key={`${item.itemId}+recommended+${index}`}
              className={`rec__card ${index === currentIndex ? 'rec__card--active' : ''}`}

            >
              <Link
                to={`/phones/${item.itemId}`}
                onClick={() => window.scrollTo(0, 0)}
                className='rec__link'
              >
                <img
                  src={`../../../public/${item.image}`}
                  alt="here should be an image"
                  className='fav__item-image'
                />
                <div className="rec__item-name">
                  {item.name}
                </div>
              </Link>
              <div className="rec__item-price">
                {`$${item.price}  `}
                {title === 'hot_prices' && (
                  <div className="rec__full-price">
                    ${item.fullPrice}
                  </div>
                )}
              </div>
              <div className="rec__specs">
                <div className="rec__specs-spec">
                  Screen<div className="rec__specs-value">{item.screen}</div>
                </div>
                <div className="rec__specs-spec">
                  Capacity<div className="rec__specs-value">{item.capacity.replace('GB', ' GB')}</div>
                </div>
                <div className="rec__specs-spec">
                  RAM<div className="rec__specs-value">{item.ram.replace('GB', ' GB')}</div>
                </div>
              </div>
              <div className="rec__item-buttons">
                <button className={`rec__item-to-cart ${isInCart(item?.id) ? 'in-cart' : ''}`}
                  onClick={() => isInCart(item?.id)
                    ? dispatch(removeFromCart(item?.id))
                    : dispatch(addToCart(item))
                  }>{`${isInCart(item?.id) ? 'In cart' : 'Add to cart'}`}</button>
                <button className={`rec__item-to-fav ${isInFavorites(item?.id) ? 'in-favorites' : ''}`}
                  onClick={() => isInFavorites(item?.id)
                    ? dispatch(removeFromFavorites(item?.id))
                    : dispatch(addToFavorites(item))
                  }>{isInFavorites(item?.id)
                    ? filledHeart
                    : emptyHeart
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
