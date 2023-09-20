// import { ProductsSlider } from '../../components/ProductsSlider';
import { Slider } from '../../components/Slider';
import { SliderNew } from '../../components/SliderNew/SliderNew';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <>
      <div className="homepage">
        <div className="container">

          <section className="homepage__banner">
            <Slider />
          </section>

          <section className="hot-prices">
            <div className="hot-prices__header">
              <h1 className="title hot-prices__title">
                Hot prices
              </h1>

              <div className="hot-prices__buttons">
                <button
                  type="button"
                // className="slider__button-prev"
                // onClick={handleNextSlide}
                >
                  <img
                    className="hot-prices__arrow-left"
                    src="new/img/icons/arrow-left.svg"
                    alt="arrow-left"
                  />
                </button>

                <button
                  type="button"
                // className="slider__button-next"
                // onClick={handleNextSlide}
                >
                  <img
                    className="hot-prices__arrow-right"
                    src="new/img/icons/arrow-right.svg"
                    alt="arrow-right"
                  />
                </button>
              </div>
            </div>
            <SliderNew />

          </section>
          {/* <section className="shop-by-category">
            <h1 className="title shop-by-category__title">
              Shop by category
            </h1>
          </section>
          <section className="brand-new-models">
            <h1 className="title brand-new-models__title">
              Brand new models
            </h1>
          </section> */}
        </div>
      </div>
    </>
  );
};
