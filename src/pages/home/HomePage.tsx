/* eslint-disable */
import { useContext, useEffect, useRef, useState } from 'react';
import '../ProductPage/product.scss';
import './homePage.scss';
import { PaginationSlider } from '../../pagination/PaginationSlider';
import { StateContext } from '../../AppContext';
import { NavLink } from 'react-router-dom';
import {
  getHotPriceProducts,
  getBrandNewProducts,
} from '../../helpers/utils';

export const HomePage = () => {
  const [sliderImgSize, setSliderImgSize] = useState(0);
  const sliderRef = useRef<null | HTMLDivElement>(null);

  const [step, setStep] = useState(0);

  const banners = [
    [
      { image: './img/icons/Banner.svg' },
      { image: './img/icons/Banner2jpg.jpg' },
    ],
    [
      { image: './img/icons/image16.png' },
      { image: './img/icons/image16_2.png' },
    ],
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { state } = useContext(StateContext);
  const [slideTrigger, _setSlideTrigger] = useState(false);

  const screenWidth = document.getElementById('root')?.offsetWidth || {};
  useEffect(() => {

    if (sliderRef.current && +screenWidth <= 639) {
      setSliderImgSize(1);
    } else {
      setSliderImgSize(0);
    }

    const click = document.getElementById('buttonToClick');

    let timer: any;

    timer = setInterval(() => {
      click?.click();
    }, 5000)

    return () => {
      clearInterval(timer);
    };
  }, [slideTrigger, sliderRef.current?.offsetWidth]);
  
  function goBack() {
    console.log(step);
    
    if (step < 0) {
      setStep(prev => prev + 100);

    }
  }

  function goForward() {
    if (step <= -100) {
      console.log(sliderRef.current, 'image2');
      setStep(100);
    }
    setStep(prev => prev + -100);
  }
  console.log(getHotPriceProducts(state.products).length);
  
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
              <img
                className="image"
                key={banner.image}
                src={banner.image}
                style={{
                  width: Math.trunc(
                    sliderRef.current ? +sliderRef.current.offsetWidth : 0,
                  ),
                  height: Math.trunc(
                    sliderRef.current
                      ? +screenWidth >= 640
                        ? +sliderRef.current.offsetWidth / 2.6
                        : +sliderRef.current.offsetWidth
                      : 0,
                  ),
                  transform: `translateX(${step}%)`,
                }}
              />
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
