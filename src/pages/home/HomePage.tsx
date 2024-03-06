// eslint-disable
/* eslint-disable */
import { useContext, useRef, useState } from 'react';
import '../ProductPage/product.scss';
import './homePage.scss';
import { PaginationSlider } from '../../pagination/PaginationSlider';
import { StateContext } from '../../AppContext';
import { NavLink } from 'react-router-dom';
import { getHotPriceProducts, getBrandNewProducts } from '../../helpers/utils';

export const HomePage = () => {
  const sliderRef = useRef<null | HTMLDivElement>(null);
  const scrollAmount = 1040;
  const [banners] = useState([
    { image: './img/icons/Banner.svg' },
    { image: './img/icons/Banner2jpg.jpg' },
  ]);
  const { state } = useContext(StateContext);

  return (
    <div className="">
      <div className="banner-block">

        <div
          className="banner-button banner-block"
          onClick={() => {
            if (sliderRef.current) {
              const container = sliderRef.current;

              container.scrollLeft -= scrollAmount;
            }
          }}
          onKeyDown={() => {
            if (sliderRef.current) {
              const container = sliderRef.current;

              container.scrollLeft -= scrollAmount;
            }
          }}
          role="button"
          tabIndex={0}
        >
          <img src="./img/icons/arrow3.svg" alt="img" />
        </div>

        <div className="images-container" ref={sliderRef}>
          {banners.map(banner => {
            return (

              <img
                className='image'
                src={banner.image}
                key={banner.image}
              />

            )
          })}
        </div>

        <div
          className="banner-button banner-block"
          onClick={() => {
            if (sliderRef.current) {
              const container = sliderRef.current;
              container.scrollLeft += scrollAmount;
            }
          }}
          onKeyDown={() => {
            if (sliderRef.current) {
              const container = sliderRef.current;
              container.scrollLeft += scrollAmount;
            }
          }}
          role="button"
          tabIndex={0}
        >
          <img src="./img/icons/arrowLeftBlack.svg" alt="img" />
        </div>

      </div>

      <PaginationSlider pageName='pageTop' headline='Hot prices' array={getHotPriceProducts(state.products)}/>

      <h1 className="home-page-header-text">Shop by category</h1>
      <div className="chunk-container chunk-container-big">
        <div>
          <div className="square left mb-24">
            <img src="./img/covers/image6.png" alt="img" style={{ float: "right" }} />
          </div>

          <NavLink to="/phones" className="link">
            <div>
              <div className="big-title">
                Mobile phones</div>
              <div className="small-title">{state.products.filter(product => product.type === 'phone').length + ' models'}</div>
            </div>
          </NavLink>

        </div>
        <div>
          <div className="square left mb-24">
            <img src="./img/covers/image5.png" alt="img" style={{ float: "right" }} />
          </div>
          <NavLink to="/tablets" className="link">
          <div>
            <div className="big-title">Tablets</div>
            <div className="small-title">{state.products.filter(product => product.type === 'tablet').length + ' models'}</div>
          </div>
          </NavLink>
        </div>

        <div>
          <div className="square left mb-24">
            <img src="./img/covers/image7.png" alt="img" style={{ float: "right" }} />
          </div>
          <NavLink to="/accessories" className="link">
          <div>
            <div className="big-title">Accessories</div>
            <div className="small-title">{state.products.filter(product => product.type === 'accessoire').length + ' models'}</div>
          </div>
          </NavLink>
        </div>
      </div>

      <PaginationSlider pageName='pageDown' headline='Brand new models' array={getBrandNewProducts(state.products)}/>

    </div>
  );
};
