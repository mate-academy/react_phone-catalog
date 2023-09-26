import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../Helpers/Types/Product';
import { getProducts } from '../../Helpers/api';
import { ProductsSlider } from '../../Components/ProductsSlider/ProductsSlider';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import './HomePage.scss';

function getHotPriceProducts(hotProducts: Product[]): Product[] {
  const productsWithDiscounts
    = hotProducts.filter(product => product.discount > 0);

  productsWithDiscounts.sort((a, b) => {
    const absoluteDiscountA = a.price * (a.discount / 100);
    const absoluteDiscountB = b.price * (b.discount / 100);

    return absoluteDiscountB - absoluteDiscountA;
  });

  return productsWithDiscounts;
}

function getBrandNewProducts(allProducts: Product[]): Product[] {
  const brandNewProducts
    = allProducts.filter(product => product.discount === 0);

  brandNewProducts.sort((a, b) => b.price - a.price);

  return brandNewProducts;
}

const images = [
  'images/banner-phones.png',
  'images/banner-tablets.png',
  'images/banner-accessories.png',
];

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const hotPriceProducts = getHotPriceProducts(products);
  const [currentIndexHot, setCurrentIndexHot] = useState(0);
  const brandNewProducts = getBrandNewProducts(products);
  const [currentIndexBrandNew, setCurrentIndexBrandNew] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDotIndex, setCurrentDotIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  useEffect(() => {
    setCurrentDotIndex(currentIndex);
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <section className="home">
        <div className="home__banner">
          <button
            type="button"
            className="home__btn"
            onClick={prevSlide}
          >
            <img src="images/ArrowBlack.svg" alt="Scroll to the left" />
          </button>

          <div>
            <img
              className="home__banner-img"
              src={images[currentIndex]}
              alt={`Slide ${currentIndex}`}
            />
          </div>

          <button
            type="button"
            className="home__btn"
            onClick={nextSlide}
          >
            <img src="images/ArrowRight.svg" alt="Scroll to the right" />
          </button>
        </div>

        <div className="home__dots">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="24"
            viewBox="0 0 80 24"
            fill="none"
          >
            {images.map((_, index) => (
              <rect
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="home__dot"
                x={5 + 28 * index}
                y="10"
                width="14"
                height="4"
                fill={index === currentDotIndex ? '#313237' : '#e2e6e9'}
                role="button"
                onClick={() => goToSlide(index)}
              />
            ))}
          </svg>
        </div>
      </section>

      <section className="home">
        <div className="home__slider">
          <h1 className="home__title">
            Hot prices
          </h1>
          <ProductsSlider
            currentIndex={currentIndexHot}
            setCurrentIndex={setCurrentIndexHot}
            products={hotPriceProducts}
          />
        </div>

        <div className="home__products" data-cy="cardsContainer">
          <ProductCard
            products={
              hotPriceProducts.slice(currentIndexHot, currentIndexHot + 4)
            }
          />
        </div>
      </section>

      <section className="home">
        <div className="home__top">
          <h1 className="home__title">
            Shop by category
          </h1>
        </div>

        <div className="home__categories" data-cy="categoryLinksContainer">
          <div className="home__category">
            <div className="home__bcg home__bcg--pink">
              <img
                src="images/category-phones.png"
                alt="Mobile phones category"
                className="home__img"
              />
            </div>

            <Link className="home__link" to="/phones">
              <p>Mobile phones</p>
            </Link>

            <p className="home__quantity">
              {
                products.filter(product => product.type === 'phone').length
              }
              &nbsp;models
            </p>
          </div>

          <div className="home__category">
            <div className="home__bcg home__bcg--gray">
              <img
                src="images/category-tablets.png"
                alt="Tablets category"
                className="home__img home__img--gray"
              />
            </div>

            <Link className="home__link" to="/tablets">
              <p>Tablets</p>
            </Link>

            <p className="home__quantity">
              {
                products.filter(product => product.type === 'tablet').length
              }
              &nbsp;models
            </p>
          </div>

          <div className="home__category">
            <div className="home__bcg home__bcg--fuchsia">
              <img
                src="images/category-accessories.png"
                alt="Accessories category"
                className="home__img home__img--fuchsia"
              />
            </div>

            <Link className="home__link" to="/accessories">
              <p>Accessories</p>
            </Link>

            <p className="home__quantity">
              {
                products.filter(product => product.type === 'accessory').length
              }
              &nbsp;models
            </p>
          </div>
        </div>
      </section>

      <section className="home">
        <div className="home__slider">
          <h1 className="home__title">
            Brand new models
          </h1>
          <ProductsSlider
            currentIndex={currentIndexBrandNew}
            setCurrentIndex={setCurrentIndexBrandNew}
            products={brandNewProducts}
          />
        </div>

        <div className="home__products" data-cy="cardsContainer">
          <ProductCard
            products={
              brandNewProducts.slice(
                currentIndexBrandNew, currentIndexBrandNew + 4,
              )
            }
          />
        </div>
      </section>
    </>
  );
};
