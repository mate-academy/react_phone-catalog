import { useState } from 'react';
import cn from 'classnames';
import '../styles/HomePage.scss';
import { HomePageList } from './HomePageList';
import { Link } from 'react-router-dom';

const banners = [
  { id: 1, img: '/img/banner-phones.png', link: '/phones' },
  { id: 2, img: '/img/banner-tablets.png', link: '/tablets' },
  { id: 3, img: '/img/banner-accessories.png', link: '/accessories' },
];

export interface NewModel {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

interface Props {
  cart: NewModel[];
  addingObjCart: (product: NewModel) => void;
  array?: NewModel[];
  setsmth?: (product: NewModel) => void;
  FavouritesA?: NewModel[];
  addingObj?: (product: NewModel) => void;
}

export const HomePage: React.FC<Props> = ({
  cart,
  addingObjCart,
  array = [],
  setsmth,
  FavouritesA = [],
  addingObj,
}) => {
  const [photos, setPhotos] = useState<number>(0);

  const handlePrev = () => {
    setPhotos(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setPhotos(prev => (prev < banners.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="smth">
      <h1 className="Welcome__title">Welcome to Nice Gadgets store!</h1>
      <div className="main__thing">
        <button className="buttonn" onClick={handlePrev}></button>
        <div className="something__like">
          <div className="BannerSlider__window">
            <div
              className="BannerSlider__track"
              style={{ transform: `translateX(-${photos * 100}%)` }}
            >
              {banners.map(banner => (
                <div
                  key={banner.id}
                  className="Banner"
                  style={{ backgroundImage: `url(${banner.img})` }}
                >
                  <Link className="Banner__button" to={banner.link}>
                    ORDER NOW
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="dots">
            {banners.map((_, index) => (
              <button
                key={index}
                type="button"
                className={cn('dots__item', {
                  'is-active': photos === index,
                })}
                onClick={() => setPhotos(index)}
              />
            ))}
          </div>
        </div>
        <button className="buttonn--prev" onClick={handleNext}></button>
      </div>
      <HomePageList
        cart={cart}
        addingObjCart={addingObjCart}
        array={array}
        setsmth={setsmth}
        addingObj={addingObj}
        FavouritesA={FavouritesA}
      />
    </div>
  );
};
