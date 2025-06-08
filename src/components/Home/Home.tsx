import { useEffect } from 'react';

import { loadComponentStyles } from '../../redux/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SomeSwiperino from '../Swiper/Swiper';
import SliderDemo from '../CustomSlider/CustomSlider';
import './Home.scss';
import { SearchResults } from '../SearchResults/SearchResults';
import { Recommended } from '../Recommended/Recommended';
import products from '../../../public/api/products.json';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


export const Home: React.FC = () => {
  const { currentTheme } = useSelector((state: RootState) =>
    state.theme);
  const componentName = 'Home';
  const dispatch = useDispatch();
  const phonesQty = products.filter(el => el.category === 'phones').length;
  const tabletsQty = products.filter(el => el.category === 'tablets').length;
  const acsQty = products.filter(el => el.category === 'accessories').length;
  const { t } = useTranslation();

  return (
    <div className="home-main">
      <h1>Welcome to iSupply store!</h1>
      <SliderDemo />
      <Recommended title='brand_new_models' />
      <div className="home__shop-container">
        <div className="home__subtitle">Shop by category</div>
        <div className="home__shop-categories">
          <div className="home__shop_card">
            <Link
              to={'/phones'}
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="home__image-container home__phones-banner">
                <img src="../../../public/img/phones_banner.png"
                  alt="tablets shop banner" />
              </div>
            </Link>
            <div className="home__card-desc">
              <div className="home__card-desc-title">
                <Link
                  className='link'
                  to={'/phones'}
                  onClick={() => window.scrollTo(0, 0)}
                >
                Mobile phones{/*{t('navigation.phones')}*/}
                </Link>
              </div>
              <div className="home__card-desc-qty">
                <Link
                  className='link'
                  to={'/phones'}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {`${phonesQty} models`}
                </Link>
              </div>
            </div>
          </div>

          <div className="home__shop_card">
            <Link
              to={'/tablets'}
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="home__image-container home__tablets-banner">
                <img src="../../../public/img/category-tablets.png"
                  alt="tablets shop banner" />
              </div>
            </Link>
            <div className="home__card-desc">
              <div className="home__card-desc-title">
                <Link
                  className='link'
                  to={'/tablets'}
                  onClick={() => window.scrollTo(0, 0)}
                >
                Tablets{/*{t('navigation.tablets')}*/}
                </Link>
              </div>
              <div className="home__card-desc-qty">
                <Link
                  className='link'
                  to={'/tablets'}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {`${tabletsQty} models`}
                </Link>
              </div>
            </div>
          </div>

          <div className="home__shop_card">
            <Link
              to={'/accessories'}
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="home__image-container home__accessories_banner">
                <img src="../../../public/img/category-accessories.png"
                  alt="accessories shop banner" />
              </div>
            </Link>
            <div className="home__card-desc">
              <div className="home__card-desc-title">
                <Link
                  className='link'
                  to={'/accessories'}
                  onClick={() => window.scrollTo(0, 0)}
                >
                Accessories{/*{t('navigation.accessories')}*/}
                </Link>
              </div>
              <div className="home__card-desc-qty">
                <Link
                  className='link'
                  to={'/accessories'}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {`${acsQty} models`}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Recommended title='hot_prices' />
    </div>
  );
};
