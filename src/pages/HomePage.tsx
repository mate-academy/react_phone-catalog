import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { TechProductsContext } from '../stores/TechProductsContext';
import { Carousel } from '../components/Carousel/Carousel';
import { clickInPrev, clickInNext } from '../helpers/carouselMoving';
import { useContainerDimensions } from '../helpers/widthCarousel';

export const HomePage = () => {
  const {
    hotPriceProducts,
    brandNewProducts,
    phones,
    tablets,
    accessories,
    loadTechProducts,
    getHotPriceProducts,
    getBrandNewProducts,
    getPhones,
    getTablets,
    getAccessories,
  } = useContext(TechProductsContext);

  useEffect(() => {
    loadTechProducts();
    getHotPriceProducts();
    getBrandNewProducts();
    getPhones();
    getTablets();
    getAccessories();
  }, []);

  const bannerImages = [
    'img/banner-phones.png',
    'img/banner-tablets.png',
    'img/banner-accessories.png',
  ];

  const [movingHeaderCarousel, setMovingHeaderCarousel] = useState(0);
  const [movingCarouselHotPrices, setMovingCarouselHotPrices] = useState(0);
  const [movingCarouselNewBrands, setMovingCarouselNewBrands] = useState(0);
  const [widthCarousel, setWidthCarousel] = useState(0);

  const endCarouselHotPrices = hotPriceProducts.length - widthCarousel / 290;
  const endCarouselBrandNew = brandNewProducts.length - widthCarousel / 290;
  const headCarouselImageWidth = useRef(null);
  const { width } = useContainerDimensions(headCarouselImageWidth);

  const prevImage = () => {
    if (movingHeaderCarousel - 1 > 0) {
      setMovingHeaderCarousel(Math.max(movingHeaderCarousel - 1, 0));
    } else {
      setMovingHeaderCarousel(0);
    }

    if (!movingHeaderCarousel) {
      setMovingHeaderCarousel(bannerImages.length - 1);
    }
  };

  const nextImage = () => {
    if (movingHeaderCarousel + 1 <= bannerImages.length - 1) {
      setMovingHeaderCarousel(Math.min(
        movingHeaderCarousel + 1, bannerImages.length - 1,
      ));
    } else {
      setMovingHeaderCarousel(bannerImages.length - 1);
    }

    if (movingHeaderCarousel === bannerImages.length - 1) {
      setMovingHeaderCarousel(0);
    }
  };

  return (
    <>
      <section className="App__header-carousel header-carousel">
        <div className="container">
          <div className="header-carousel__content">
            <div className="header-carousel__carousel-container">
              <button
                type="button"
                className="header-carousel__arrow
                  header-carousel__arrow--prev"
                onClick={prevImage}
              >
                <div className="icon icon--arrow-left" />
              </button>

              <div className="header-carousel__image-container">
                <div className="header-carousel__carousel">
                  <ul className="header-carousel__carousel-list">
                    {
                      bannerImages.map((image) => (
                        <li
                          key={image}
                          style={
                            {
                              transition: '500ms',
                              transform: `translateX(-${movingHeaderCarousel * width}px)`,
                            }
                          }
                        >
                          <img
                            ref={headCarouselImageWidth}
                            alt="Banner"
                            src={image}
                            className="header-carousel__image"
                          />
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>

              <button
                type="button"
                className="header-carousel__arrow
                  header-carousel__arrow--next"
                onClick={nextImage}
              >
                <div className="icon icon--arrow-right" />
              </button>
            </div>

            <div className="header-carousel__carousel-pages">
              {
                bannerImages.map((image, index) => {
                  return (
                    <button
                      aria-label="sliderButton"
                      type="button"
                      key={image}
                      className={
                        classNames(
                          'header-carousel__slider-button',
                          {
                            'header-carousel__slider-button--active':
                              movingHeaderCarousel === index,
                          },
                        )
                      }
                      onClick={() => setMovingHeaderCarousel(index)}
                    />
                  );
                })
              }
            </div>
          </div>
        </div>
      </section>

      <section className="App__section hot-prices">
        <div className="container">
          <div className="hot-prices__content">
            <div className="hot-prices__title-arrows-container">
              <h1 className="hot-prices__title">
                Hot Prices
              </h1>

              <div className="carousel-buttons">
                <button
                  type="button"
                  className={
                    !movingCarouselHotPrices
                    // eslint-disable-next-line
                      ? 'carousel-buttons__arrow-disabled carousel-buttons__arrow-disabled--left'
                      // eslint-disable-next-line
                      : 'carousel-buttons__arrow carousel-buttons__arrow--left'
                  }
                  onClick={() => clickInPrev(
                    movingCarouselHotPrices,
                    setMovingCarouselHotPrices,
                  )}
                >
                  <div
                    className={
                      !movingCarouselHotPrices
                        ? 'icon icon--arrow-left-disabled'
                        : 'icon icon--arrow-left'
                    }
                  />
                </button>

                <button
                  type="button"
                  className={
                    movingCarouselHotPrices === endCarouselHotPrices
                    // eslint-disable-next-line
                      ? 'carousel-buttons__arrow-disabled carousel-buttons__arrow-disabled--right'
                      // eslint-disable-next-line
                      : 'carousel-buttons__arrow carousel-buttons__arrow--right'
                  }
                  onClick={() => clickInNext(
                    movingCarouselHotPrices,
                    setMovingCarouselHotPrices,
                    hotPriceProducts.length,
                    widthCarousel / 290,
                  )}
                >
                  <div
                    className={
                      movingCarouselHotPrices === endCarouselHotPrices
                        ? 'icon icon--arrow-right-disabled'
                        : 'icon icon--arrow-right'
                    }
                  />
                </button>
              </div>
            </div>

            <Carousel
              phones={hotPriceProducts}
              movingCarousel={movingCarouselHotPrices}
              setWidthCarousel={setWidthCarousel}
            />
          </div>
        </div>
      </section>

      <section className="App__section categories">
        <div className="container">
          <div className="categories__content">
            <h1 className="categories__title">
              Shop by category
            </h1>

            <div className="grid-cover">
              <div
                className="categories__block-category
                  categories__block-category--phones"
              >
                <div
                  className="categories__category
                    categories__category--phones"
                >
                  <Link to="/phones">
                    <div
                      className="categories__image-container
                        categories__image-container--phones"
                    />
                  </Link>
                </div>

                <h2
                  className="categories__name"
                >
                  Mobile phones
                </h2>

                <h3
                  className="categories__count-models"
                >
                  {`${phones.length} models`}
                </h3>
              </div>

              <div
                className="categories__block-category
                  categories__block-category--tablets"
              >
                <div
                  className="categories__category
                    categories__category--tablets"
                >
                  <Link to="/tablets">
                    <div
                      className="categories__image-container
                        categories__image-container--tablets"
                    />
                  </Link>
                </div>

                <h2 className="categories__name">Tablets</h2>
                <h3 className="categories__count-models">{`${tablets.length} models`}</h3>
              </div>

              <div
                className="categories__block-category
                  categories__block-category--accessories"
              >
                <div
                  className="categories__category
                    categories__category--accessories"
                >
                  <Link to="/accessories">
                    <div
                      className="categories__image-container
                        categories__image-container--accessories"
                    />
                  </Link>
                </div>

                <h2 className="categories__name">Accessories</h2>
                <h3 className="categories__count-models">{`${accessories.length} models`}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="App__section brand-new-models">
        <div className="container">
          <div className="brand-new-models__content">
            <div className="brand-new-models__title-arrows-container">
              <h1 className="brand-new-models__title">
                Brand new models
              </h1>

              <div className="carousel-buttons">
                <button
                  type="button"
                  className={
                    !movingCarouselNewBrands
                    // eslint-disable-next-line
                      ? 'carousel-buttons__arrow-disabled carousel-buttons__arrow-disabled--left'
                      // eslint-disable-next-line
                      : 'carousel-buttons__arrow carousel-buttons__arrow--left'
                  }
                  onClick={() => clickInPrev(
                    movingCarouselNewBrands,
                    setMovingCarouselNewBrands,
                  )}
                >
                  <div
                    className={
                      !movingCarouselNewBrands
                        ? 'icon icon--arrow-left-disabled'
                        : 'icon icon--arrow-left'
                    }
                  />
                </button>

                <button
                  type="button"
                  className={
                    movingCarouselNewBrands === endCarouselBrandNew
                      // eslint-disable-next-line
                      ? 'carousel-buttons__arrow-disabled carousel-buttons__arrow-disabled--right'
                      // eslint-disable-next-line
                      : 'carousel-buttons__arrow carousel-buttons__arrow--right'
                  }
                  onClick={() => clickInNext(
                    movingCarouselNewBrands,
                    setMovingCarouselNewBrands,
                    brandNewProducts.length,
                    widthCarousel / 290,
                  )}
                >
                  <div
                    className={
                      movingCarouselNewBrands === endCarouselBrandNew
                        ? 'icon icon--arrow-right-disabled'
                        : 'icon icon--arrow-right'
                    }
                  />
                </button>
              </div>
            </div>

            <Carousel
              phones={brandNewProducts}
              movingCarousel={movingCarouselNewBrands}
              setWidthCarousel={setWidthCarousel}
            />
          </div>
        </div>
      </section>
    </>
  );
};
