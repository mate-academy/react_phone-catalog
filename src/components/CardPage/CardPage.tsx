import React from 'react';
import './CardPageStyle.scss';
import CardSlider from '../CardSlider/CardSlider';
import PicturesContloller from './PicturesController/PicturesContloller';
import { useLocation } from 'react-router-dom';
import AdressLine from '../ui/adressLine/AdressLine';
import ColorsChose from './ColorsChose/ColorsChose';
import CapacitySection from './CapacitySection/CapacitySection';

const CardPage = () => {
  const path = useLocation().pathname;
  const pathComponents = path.split('/');

  return (
    <div className="cardpage">
      <div className="cardpage__wrapper container">
        <AdressLine adress={pathComponents} />

        <button className="cardpage__back">
          <img
            src="icons/arrow-up-black.png"
            alt=""
            className="cardpage__back--img"
          />
          <div className="cardpage__back--text">Back</div>
        </button>
        <h2 className="cardpage__title">
          Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A){' '}
        </h2>
        <div className="cardpage__main">
          <PicturesContloller />
          <div className="cardpage__main--details details">
            <div className="details__wrapper">
              <div className="details__text">
                <div className="details__title">Available colors</div>
                <div className="details__sub-title">ID: 802390</div>
              </div>
              <div className="details__inner">
                <div className="details__colors">
                  <ColorsChose colors={['black', 'red', 'purple']} />
                </div>
                <hr className="details__first-line" />
                <div className="details__capacity">
                  <CapacitySection capacity={['56GB', '256Gb', '566Gb']} />
                </div>
                <hr className="details__second-line" />
                <div className="details__price">
                  <h2 className="details__price--redular">$299</h2>
                  <div className="details__price--discout"></div>
                </div>
                <div className="details__buttons">
                  <button className="details__buttons--add">Add to cart</button>
                  <button className="details__buttons--like">
                    <img src="icons/like.svg" alt="" />
                  </button>
                </div>
                <div className="details__information">
                  <div className="details__information--section">
                    <div className="details__information--title">Screen</div>
                    <div className="details__information--sub-title">
                      6.5” OLED
                    </div>
                  </div>
                  <div className="details__information--section">
                    <div className="details__information--title">
                      Resolution
                    </div>
                    <div className="details__information--sub-title">
                      2688x1242
                    </div>
                  </div>
                  <div className="details__information--section">
                    <div className="details__information--title">Processor</div>
                    <div className="details__information--sub-title">
                      Apple A12 Bionic
                    </div>
                  </div>
                  <div className="details__information--section">
                    <div className="details__information--title">RAM</div>
                    <div className="details__information--sub-title">3 GB</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cardpage__info">
          <div className="cardpage__section">
            <h3 className="cardpage__section--title"> About</h3>
            <hr className="cardpage__sections--line" />
          </div>
          <div className="cardpage__section">
            <h4 className="cardpage__section--title">And then there was Pro</h4>
            <div className="cardpage__section--sub-title">
              A transformative triple‑camera system that adds tons of capability
              without complexity. <br />
              An unprecedented leap in battery life. And a mind‑blowing chip
              that doubles down on machine learning and pushes the boundaries of
              what a smartphone can do. Welcome to the first iPhone powerful
              enough to be called Pro.
            </div>
          </div>
          <div className="cardpage__section">
            <h4 className="cardpage__section--title">And then there was Pro</h4>
            <div className="cardpage__section--sub-title">
              A transformative triple‑camera system that adds tons of capability
              without complexity. <br />
              An unprecedented leap in battery life. And a mind‑blowing chip
              that doubles down on machine learning and pushes the boundaries of
              what a smartphone can do. Welcome to the first iPhone powerful
              enough to be called Pro.
            </div>
          </div>
          <div className="cardpage__section">
            <h4 className="cardpage__section--title">And then there was Pro</h4>
            <div className="cardpage__section--sub-title">
              A transformative triple‑camera system that adds tons of capability
              without complexity. <br />
              An unprecedented leap in battery life. And a mind‑blowing chip
              that doubles down on machine learning and pushes the boundaries of
              what a smartphone can do. Welcome to the first iPhone powerful
              enough to be called Pro.
            </div>
          </div>
          <div className="cardpage__tech">
            <h3 className="cardpage__tech--title">Tech specs</h3>
            <hr className="cardpage__tech--line" />
            <div className="cardpage__tech--specs">
              <div className="cardpage__tech--section">
                <div className="cardpage__tech--section-title">Screen</div>
                <div className="cardpage__tech--section-sub-title">
                  6.5” OLED
                </div>
              </div>
              <div className="cardpage__tech--section">
                <div className="cardpage__tech--section-title">Screen</div>
                <div className="cardpage__tech--section-sub-title">
                  6.5” OLED
                </div>
              </div>
              <div className="cardpage__tech--section">
                <div className="cardpage__tech--section-title">Camera</div>
                <div className="cardpage__tech--section-sub-title">
                  12 Mp + 12 Mp + 12 Mp (Triple)
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cardpage_swiper">
          <CardSlider title="You may also like" />
        </div>
      </div>
    </div>
  );
};

export default CardPage;
