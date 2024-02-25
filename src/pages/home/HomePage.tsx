// eslint-disable
/* eslint-disable */
import { useRef, useState } from 'react';
import '../ProductPage/product.scss';
import './homePage.scss';
import { PaginationSlider } from '../../pagination/PaginationSlider';

export const HomePage = () => {
  const sliderRef = useRef<null | HTMLDivElement>(null);
  const scrollAmount = 1040;
  const [banners] = useState([
    { image: './img/icons/Banner.svg' },
    { image: './img/icons/Banner2jpg.jpg' },
  ]);

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

      <PaginationSlider pageName='pageTop' />

      <div className="chunk-container chunk-container-big">

        <div>
          <div className="square left">
            <img src="./img/covers/image6.png" alt="img" style={{float: "right"}} />
          </div>
        </div>
        <div>
          <div className="square left">
            <img src="./img/covers/image5.png" alt="img" style={{float: "right"}} />
          </div>
        </div>
        <div>
          <div className="square left">
            <img src="./img/covers/image7.png" alt="img" style={{float: "right"}} />
          </div>
        </div>


      </div>

       <PaginationSlider pageName='pageDown' />

    </div>
  );
};
