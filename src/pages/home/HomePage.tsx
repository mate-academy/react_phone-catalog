/* eslint-disable */
import { useContext, useEffect, useRef, useState } from 'react';
import '../ProductPage/product.scss';
import './homePage.scss';
import { PaginationSlider } from '../../pagination/PaginationSlider';
import { StateContext } from '../../AppContext';
import { NavLink } from 'react-router-dom';
import { getHotPriceProducts, getBrandNewProducts } from '../../helpers/utils';

export const HomePage = () => {
  const [sliderImgSize, setSliderImgSize] = useState(0);
  const sliderRef = useRef<null | HTMLDivElement>(null);
  const scrollAmount = 1040;
  const [banners] = useState([
    [
      { image: '/img/icons/Banner.svg' },
      { image: '/img/icons/Banner2jpg.jpg' },
    ],
    [
      { image: '/img/icons/image16.png' },
      { image: '/img/icons/image16_2.png' },
    ],
  ]);
  const { state } = useContext(StateContext);
  const [slideTrigger, setSlideTrigger] = useState(false);
  console.log(banners);
  const w2 = document.getElementById('root')?.offsetWidth || {};
  useEffect(() => {
    if (w2 !== undefined) {
      console.log(Math.trunc(+w2), 'width');
    }

    if (sliderRef.current && +w2 <= 639) {
      setSliderImgSize(1);
    } else {
      setSliderImgSize(0);
    }

    let timer: any;
    if (sliderRef.current) {
      console.log(
        sliderRef.current.offsetWidth,
        'sliderRef.current.offsetWidth',
      );

      if (sliderRef.current?.scrollLeft === 0) {
        sliderRef.current.scrollLeft += scrollAmount;
        timer = setTimeout(() => setSlideTrigger(!slideTrigger), 5000);
      } else {
        sliderRef.current.scrollLeft -= scrollAmount;
        timer = setTimeout(() => setSlideTrigger(!slideTrigger), 5000);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [slideTrigger, sliderRef.current?.offsetWidth]);

  function goBack() {
    if (sliderRef.current) {
      const container = sliderRef.current;

      container.scrollLeft -= scrollAmount;
    }
  }

  function goForward() {
    if (sliderRef.current) {
      const container = sliderRef.current;

      container.scrollLeft += scrollAmount;
    }
  }

  return (
    <div>
      <div className="banner-block">
        <div
          className="banner-button banner-button--left banner-block"
          onClick={goBack}
          onKeyDown={goBack}
          role="button"
          tabIndex={0}
          style={{
            height: Math.trunc(
              sliderRef.current ? +sliderRef.current.offsetWidth / 2.6 : 0,
            ),
          }}
        >
          <img src="./img/icons/arrow3.svg" alt="img" />
        </div>

        <div className="images-container" ref={sliderRef}>
          {banners[sliderImgSize].map(banner => {
            return (
              <div>
                <div
                  className="image"
                  key={banner.image}
                  style={{
                    backgroundImage: `url(${banner.image})`,
                    backgroundSize: 'contain',
                    width: Math.trunc(
                      sliderRef.current ? +sliderRef.current.offsetWidth : 0,
                    ),
                    height: Math.trunc(
                      sliderRef.current
                        ? +w2 >= 640
                          ? +sliderRef.current.offsetWidth / 2.6
                          : +sliderRef.current.offsetWidth
                        : 0,
                    ),
                  }}
                />
              </div>
            );
          })}
        </div>

        <div
          id="buttonToClick"
          className="banner-button banner-button--right banner-block"
          onClick={goForward}
          onKeyDown={goForward}
          role="button"
          tabIndex={0}
          style={{
            height: Math.trunc(
              sliderRef.current ? +sliderRef.current.offsetWidth / 2.6 : 0,
            ),
          }}
        >
          <img src="./img/icons/arrowLeftBlack.svg" alt="img" />
        </div>
      </div>

      <PaginationSlider
        pageName="pageTop"
        headline="Hot prices"
        array={getHotPriceProducts(state.products)}
      />

      <h1 className="home-page-header-text">Shop by category</h1>
      <div className="chunk-container-category chunk-container-big category-box">
        <div>
          <div className="square left mb-24">
            <img
              className="category-img"
              src="./img/covers/image6.png"
              alt="img"
              style={{ float: 'right' }}
            />
          </div>

          <NavLink to="/phones" className="link">
            <div>
              <div className="big-title">Mobile phones</div>
              <div className="small-title">
                {state.products.filter(product => product.type === 'phone')
                  .length + ' models'}
              </div>
            </div>
          </NavLink>
        </div>
        <div>
          <div className="square left mb-24">
            <img
              className="category-img"
              src="./img/covers/image5.png"
              alt="img"
              style={{ float: 'right' }}
            />
          </div>
          <NavLink to="/tablets" className="link">
            <div>
              <div className="big-title">Tablets</div>
              <div className="small-title">
                {state.products.filter(product => product.type === 'tablet')
                  .length + ' models'}
              </div>
            </div>
          </NavLink>
        </div>

        <div>
          <div className="square left mb-24">
            <img
              className="category-img"
              src="./img/covers/image7.png"
              alt="img"
              style={{ float: 'right' }}
            />
          </div>
          <NavLink to="/accessories" className="link">
            <div>
              <div className="big-title">Accessories</div>
              <div className="small-title">
                {state.products.filter(product => product.type === 'accessoire')
                  .length + ' models'}
              </div>
            </div>
          </NavLink>
        </div>
      </div>

      <PaginationSlider
        pageName="pageDown"
        headline="Brand new models"
        array={getBrandNewProducts(state.products)}
      />
    </div>
  );
};
