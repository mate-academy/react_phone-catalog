import './Header.scss';
import Carousel from './Carousel';
import { useState } from 'react';

const Header = () => {
  const [carouselItem, setCarouselItem] = useState('item-1');

  return (
    <header className="header">
      <div className="container column">
        <h1 className="header__title">Welcome to Nice Gadgets store!</h1>
        <Carousel
          carouselItem={carouselItem}
          setCarouselItem={setCarouselItem}
        />
      </div>
      <div className="container">
        {/* header dots */}
        <div className="header__dots">
          <div
            className={
              carouselItem === 'item-1'
                ? 'header__dot header__dot--active'
                : 'header__dot'
            }
            onClick={() => {
              setCarouselItem('item-1');
            }}
          ></div>
          <div
            className={
              carouselItem === 'item-2'
                ? 'header__dot header__dot--active'
                : 'header__dot'
            }
            onClick={() => {
              setCarouselItem('item-2');
            }}
          ></div>
          <div
            className={
              carouselItem === 'item-3'
                ? 'header__dot header__dot--active'
                : 'header__dot'
            }
            onClick={() => {
              setCarouselItem('item-3');
            }}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
