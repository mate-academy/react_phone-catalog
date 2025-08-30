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
import { useAppSelector } from '../../redux/store';
import { emptyHeart, filledHeart } from '../../../public/img/icons/svg_icons';

type Props = {
  title: string,
};

export const Recommended: React.FC<Props> = ({ title }) => {
  const [items, setItems] = useState(products);
  const [miniHeader, setMiniHeader] = useState(title);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isInCart, isInFavorites } = useProductState();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const windowWidth = useWindowWidth();
  const currentTheme = useAppSelector(
    (state: { theme: { current: string }; }) => state.theme.current);

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
      setMiniHeader(`${t('recommended.brand_new_models')}`);

      // Create a new sorted array without mutating the original
      const filteredItems = [...products]
        .sort((a, b) => b.year - a.year)
        .slice(0, 9);

      setItems(filteredItems);
    }

    if (title === 'hot_prices') {
      setMiniHeader(`${t('recommended.hot_prices')}`);

      // Create a new sorted array without mutating the original
      const filteredItems = [...products]
        .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price))
        .slice(0, 9);

      setItems(filteredItems);
    }

    if (title.includes('may_like')) {
      const itemRelation = title.slice(9); // reference product to finetune recomnedations for

      setMiniHeader(`${t('recommended.may_like')}`);

      const filteredItems = [];

      for (let i = 0; i < 10; i++) {
        const random = Math.floor(Math.random() * products.length);

        filteredItems.push(products[random]);
      }

      setItems(filteredItems);
    }
  }, [title, t, i18n.language]);


  return (
    <div className="rec__body">
      <div className="rec__title-and-nav">
        <div className={`rec__mini-title ${currentTheme}`}>
          {miniHeader}
        </div>
        <div className="rec__buttons">
          <button
            className={`rec__arrow rec__arrow--left ${currentTheme}`}
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
            className={`rec__arrow rec__arrow--right ${currentTheme}`}
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
              className={`rec__card ${currentTheme} ${index === currentIndex ? 'rec__card--active' : ''}`}

            >
              <Link
                to={`/${item.category}/${item.itemId}`}
                onClick={() => window.scrollTo(0, 0)}
                className='rec__link'
              >
                <img
                  src={`${item.image}`}
                  alt="here should be an image"
                  className='fav__item-image'
                />
                <div className={`rec__item-name ${currentTheme}`}>
                  {item.name}
                </div>
              </Link>
              <div className={`rec__item-price ${currentTheme}`}>
                {`$${item.price}  `}
                {title === 'hot_prices' && (
                  <div className="rec__full-price">
                    ${item.fullPrice}
                  </div>
                )}
              </div>
              <div className="rec__specs">
                <div className={`rec__specs-spec ${currentTheme}`}>
                  {`${t('specs.screen')}`}<div className={`rec__specs-value ${currentTheme}`}>{item.screen}</div>
                </div>
                <div className={`rec__specs-spec ${currentTheme}`}>
                  {`${t('specs.capacity')}`}<div className={`rec__specs-value ${currentTheme}`}>{item.capacity.replace('GB', ' GB')}</div>
                </div>
                <div className={`rec__specs-spec ${currentTheme}`}>
                  {`${t('specs.ram')}`}<div className={`rec__specs-value ${currentTheme}`}>{item.ram.replace('GB', ' GB')}</div>
                </div>
              </div>
              <div className="rec__item-buttons">
                <button className={`rec__item-to-cart ${currentTheme} ${isInCart(item?.id) ? 'in-cart' : ''}`}
                  onClick={() => isInCart(item?.id)
                    ? dispatch(removeFromCart(item?.id))
                    : dispatch(addToCart(item))
                  }>{`${isInCart(item?.id) ? `${t('btn.in_cart')}` : `${t('btn.add_to_cart')}`}`}</button>
                <button className={`rec__item-to-fav ${currentTheme} ${isInFavorites(item?.id) ? 'in-favorites' : ''}`}
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
