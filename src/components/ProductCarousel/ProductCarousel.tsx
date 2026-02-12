import { useMemo, useRef } from 'react';
import Slider from 'react-slick';
import { useProductContext } from '../../context/ProductContext';
import Loader from '../Loader';
import ProductCard from '../ProductCard';
import './ProductCarousel.scss';

type ProductCarouselProps = {
  title: string;
  showDiscount?: boolean;
  isNewModels?: boolean;
  isHotPrices?: boolean;
  isRandom?: boolean;
};

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  showDiscount = false,
  isNewModels = false,
  isHotPrices = false,
  isRandom = false,
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const { products, loading } = useProductContext();

  const settings = useMemo(
    () => ({
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2.1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1.5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 464,
          settings: {
            slidesToShow: 1.05,
            slidesToScroll: 1,
          },
        },
      ],
    }),
    [],
  );

  const brandNewIphones = useMemo(() => {
    return products.filter(
      product => product.name.toLowerCase().includes('iphone') && product.year === 2022,
    );
  }, [products]);

  const hotPriceIphones = useMemo(() => {
    return products.filter(
      product =>
        product.name.toLowerCase().includes('iphone') &&
        product.price &&
        product.fullPrice &&
        (product.fullPrice - product.price) / product.fullPrice > 0.1,
    );
  }, [products]);

  const randomProducts = useMemo(() => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 20);
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (isRandom) {
      return randomProducts;
    } else if (isNewModels) {
      return brandNewIphones;
    } else if (isHotPrices) {
      return hotPriceIphones;
    }
    return products;
  }, [products, isNewModels, isHotPrices, isRandom, randomProducts]);

  return (
    <div className="product-carousel">
      <div className="product-carousel__header">
        <h1>{title}</h1>
        <div className="carousel-buttons">
          <button onClick={() => sliderRef.current?.slickPrev()}>
            {' '}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.4714 3.52864C10.211 3.26829 9.7889 3.26829 9.52855 3.52864L5.52855 7.52864C5.26821 7.78899 5.26821 8.2111 5.52855 8.47145L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00004L10.4714 4.47145C10.7317 4.2111 10.7317 3.78899 10.4714 3.52864Z"
                fill="#4A4D58"
              />
            </svg>
          </button>
          <button onClick={() => sliderRef.current?.slickNext()}>
            {' '}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.52864 3.52864C5.78899 3.26829 6.2111 3.26829 6.47145 3.52864L10.4714 7.52864C10.7318 7.78899 10.7318 8.2111 10.4714 8.47145L6.47145 12.4714C6.2111 12.7318 5.78899 12.7318 5.52864 12.4714C5.26829 12.2111 5.26829 11.789 5.52864 11.5286L9.05723 8.00004L5.52864 4.47145C5.26829 4.2111 5.26829 3.78899 5.52864 3.52864Z"
                fill="#F1F2F9"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="product-carousel-cards">
        {loading ? (
          <Loader />
        ) : (
          <Slider ref={sliderRef} {...settings}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} hideDiscount={!showDiscount} />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
