/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Products } from '../../types/Products';
import { getProducts } from '../../api/api';
import { Product } from '../Products/Products';

enum Rectangles {
  first = 'first',
  second = 'second',
  third = 'third',
}

export const Main: React.FC = () => {
  const [, setActiveRec] = useState<Rectangles>(Rectangles.first);
  const [activePic, setActivePic] = useState<Rectangles>(Rectangles.first);
  const pics = [Rectangles.first, Rectangles.second, Rectangles.third];
  const [picIndex, setPicIndex] = useState(0);

  const [products, setProducts] = useState<Products[]>([]);
  const [, setLoading] = useState(true);
  const [, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getProducts()
      .then(setProducts)
      .catch(() => setErrorMessage(`Couldn't load any tablets`))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    {
      id: '/phones',
      img: '/public/img/category-phones.webp',
      title: 'Mobile phones',
      subTitle: '95 models',
      categoryClass: 'category-pink',
      categoryClassImg: 'category-pink-img',
    },
    {
      id: '/tablets',
      img: '/public/img/category-tablets.webp',
      title: 'Tablets',
      subTitle: '24 models',
      categoryClass: 'category-grey',
      categoryClassImg: 'category-grey-img',
    },
    {
      id: '/accessories',
      img: '/public/img/category-accessories.webp',
      title: 'Accessories',
      subTitle: '100 models',
      categoryClass: 'category-purple',
      categoryClassImg: 'category-purple-img',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const productsPerSlide = 4;

  const activeRect = pics[picIndex];

  const handlePicChange = useCallback(
    (direction: 'next' | 'prev') => {
      setPicIndex(prev =>
        direction === 'next'
          ? (prev + 1) % pics.length
          : (prev - 1 + pics.length) % pics.length,
      );

      setActiveRec(pics[picIndex]);
      setActivePic(pics[picIndex]);
    },
    [picIndex, pics],
  );

  const handleProductChange = useCallback(
    (direction: 'next' | 'prev') => {
      setActiveIndex(prev => {
        if (direction === 'next') {
          return prev + productsPerSlide < products.length
            ? prev + productsPerSlide
            : 0;
        }

        // prev logic: move back by productsPerSlide or wrap to last full page
        const next = prev - productsPerSlide;

        if (next >= 0) {
          return next;
        }

        // wrap to last page start index
        const remainder = products.length % productsPerSlide;

        return remainder === 0
          ? products.length - productsPerSlide
          : products.length - remainder;
      });
    },
    [products.length],
  );

  const currentProducts = products.slice(
    activeIndex,
    activeIndex + productsPerSlide,
  );

  const arrowLeft = new URL(
    '../../images/icons/Chevron (Arrow Left).svg',
    import.meta.url,
  ).href;

  const arrowRight = new URL(
    '../../images/icons/Chevron (Arrow Right).svg',
    import.meta.url,
  ).href;

  const welcomeImage = new URL('../../images/Banner.png', import.meta.url).href;
  const welcomeImage2 = new URL('../../images/Banner.png', import.meta.url)
    .href;
  const welcomeImage3 = new URL('../../images/Banner.png', import.meta.url)
    .href;

  useEffect(() => {
    const id = setInterval(() => setPicIndex(p => (p + 1) % pics.length), 5000);

    return () => clearInterval(id);
  }, [pics.length]);

  return (
    <main className="main">
      <div className="main__container">
        <div className="main__content">
          <section className="welcome__block">
            <div className="welcome__block-text">
              <p className="welcome__block-title">
                Welcome to Nice Gadgets store!
              </p>
            </div>

            <div className="welcome__block-sliders">
              <Link
                to=""
                className="welcome__block-slider-link"
                onClick={event => {
                  event.preventDefault();
                  handlePicChange('prev');
                }}
              >
                <button className="welcome__block-slider">
                  <img src={arrowLeft} className="icon-slider" alt="" />
                </button>
              </Link>
              <div className="welcome__block-img">
                {activePic === Rectangles.first && (
                  <img
                    className="welcome__block-image"
                    src={welcomeImage}
                    alt="Welcome Image"
                  />
                )}
                {activePic === Rectangles.second && (
                  <img
                    className="welcome__block-image"
                    src={welcomeImage2}
                    alt="Welcome Image"
                  />
                )}
                {activePic === Rectangles.third && (
                  <img
                    className="welcome__block-image"
                    src={welcomeImage3}
                    alt="Welcome Image"
                  />
                )}
              </div>
              <Link
                to=""
                className="welcome__block-slider-link"
                onClick={event => {
                  event.preventDefault();
                  handlePicChange('next');
                }}
              >
                <button className="welcome__block-slider">
                  <img src={arrowRight} className="icon-slider" alt="" />
                </button>
              </Link>
            </div>
            <div className="welcome__block-rectangles">
              {activeRect === Rectangles.first ? (
                // eslint-disable-next-line max-len
                <div className="welcome__block-rectangle welcome__block-rectangle-active">
                  <Link to=""></Link>
                </div>
              ) : (
                <div className="welcome__block-rectangle">
                  <Link to=""></Link>
                </div>
              )}
              {activeRect === Rectangles.second ? (
                // eslint-disable-next-line max-len
                <div className="welcome__block-rectangle welcome__block-rectangle-active">
                  <Link to=""></Link>
                </div>
              ) : (
                <div className="welcome__block-rectangle">
                  <Link to=""></Link>
                </div>
              )}
              {activeRect === Rectangles.third ? (
                // eslint-disable-next-line max-len
                <div className="welcome__block-rectangle welcome__block-rectangle-active">
                  <Link to=""></Link>
                </div>
              ) : (
                <div className="welcome__block-rectangle ">
                  <Link to=""></Link>
                </div>
              )}
            </div>
            <div />
          </section>
          <section className="new__models section">
            <div className="new__models-arr">
              <p className="section-title">Brand new models</p>
              <div className="new__models-arrows">
                <Link to="" className="new__models-arrow-left">
                  <button
                    className="new__models-arrow"
                    onClick={() => handleProductChange('prev')}
                  >
                    <img src={arrowLeft} alt="" className="icon-arrow" />
                  </button>
                </Link>
                <Link to="" className="new__models-arrow-right">
                  <button
                    className="new__models-arrow"
                    onClick={() => handleProductChange('next')}
                  >
                    <img src={arrowRight} alt="" className="icon-arrow" />
                  </button>
                </Link>
              </div>
            </div>
            <Product currentProducts={currentProducts} />
          </section>
          <section className="categories section">
            <div className="categories__container">
              <div className="section-title categories__title">
                Shop by category
              </div>
              <div className="categories__blocks">
                {categories.map(category => (
                  <div key={category.id} className="category">
                    <div
                      className={`category__image ${category.categoryClass}`}
                    >
                      <Link to={category.id}>
                        <img
                          src={category.img}
                          className={`category__img`}
                          alt="Mobile Phones"
                        />
                      </Link>
                    </div>
                    <p className="category__title">{category.title}</p>
                    <p className="category__sub-title">{category.subTitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="new__models section">
            <div className="new__models-arr">
              <p className="section-title">Hot prices</p>
              <div className="new__models-arrows">
                <Link to="" className="new__models-arrow-left">
                  <button
                    className="new__models-arrow"
                    onClick={() => handleProductChange('prev')}
                  >
                    <img src={arrowLeft} alt="" className="icon-arrow" />
                  </button>
                </Link>
                <Link to="" className="new__models-arrow-right">
                  <button
                    className="new__models-arrow"
                    onClick={() => handleProductChange('next')}
                  >
                    <img src={arrowRight} alt="" className="icon-arrow" />
                  </button>
                </Link>
              </div>
            </div>
            <Product currentProducts={currentProducts} />
          </section>
        </div>
      </div>
    </main>
  );
};
