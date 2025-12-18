import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { Navigation } from 'swiper/modules';
import './ProductsSlider.scss';
import { Product } from '@/types';
import { Link } from 'react-router-dom';
import { useCart } from '@/modules/CartFavContext/CartContext';
import 'swiper/css';
import { Button } from '@/components/ui/button/Button';

type SwRef = SwiperRef & {
  slidePrev: VoidFunction;
  slideNext: VoidFunction;
};

type Props = {
  products: Product[];
  title: string;
  showDiscount?: boolean;
};

type ProductCardProps = {
  item: Product;
  showDiscount: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({ item, showDiscount }) => {
  const {
    isFavorite,
    isInCart,
    addToFavorites,
    removeFromFavorites,
    addToCart,
  } = useCart();

  if (!item) return null;

  const fav = isFavorite(item.itemId || '');
  const inCart = isInCart(item.itemId || '');

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!item) return;

    addToCart(item.itemId);
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!item) return;

    if (fav) {
      removeFromFavorites(item.itemId || '');
    } else {
      addToFavorites(item.itemId);
    }
  };
  return (
    <div className="product-card">
      <Link
        to={`/${item.category}/${item.itemId}`}
        className="product-card__image-wrapper"
      >
        <img src={item.image} alt={item.name} className="product-card__image" />
      </Link>

      <h3 className="product-card__title">{item.name}</h3>

      <div className="product-card__prices">
        <span className="product-card__price">${item.price}</span>
        {showDiscount && (
          <span className="product-card__full-price">${item.fullPrice}</span>
        )}
      </div>

      <div className="product-card__specs">
        <div className="spec-row">
          <span className="spec-label">Screen</span>
          <span className="spec-value">{item.screen}</span>
        </div>
        <div className="spec-row">
          <span className="spec-label">Capacity</span>
          <span className="spec-value">{item.capacity}</span>
        </div>
        <div className="spec-row">
          <span className="spec-label">RAM</span>
          <span className="spec-value">{item.ram}</span>
        </div>
      </div>

      <div className="product-card__actions">
        <Button
          onClick={handleCartClick}
          fullWidth
          variant={inCart ? 'outline' : 'primary'}
        >
          {inCart ? 'Added to Cart' : 'Add to Cart'}
        </Button>
        <button
          className={cn('btn-fav', { 'btn-fav--added': fav })}
          onClick={handleFav}
        >
          {/* SVG для сердечка */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={'none'}
            stroke={'currentColor'}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

const NavButton: React.FC<{
  direction: 'prev' | 'next';
  onClick?: () => void;
  disabled?: boolean;
}> = ({ direction, onClick, disabled }) => {
  return (
    <button
      className={cn(
        'productsSlider__button',
        `productsSlider__button--${direction}`,
        { 'productsSlider__button--disabled': disabled },
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <img
        src={
          direction === 'prev' ? 'img/arrow-left.svg' : 'img/arrow-right.svg'
        }
        alt={direction === 'prev' ? 'Previous' : 'Next'}
      />
    </button>
  );
};
export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  showDiscount = true,
}) => {
  const swiperRef = useRef<SwRef>();
  const [activeIndex, setActiveIndex] = useState(0);
  const isDisabledPrev = activeIndex === 0;
  const [isDisabledNext, setIsDisabledNext] = useState(false);

  return (
    <div className="productsSlider">
      {/* <div className="productsSlider__buttons">
        <button
          className={cn(
            'productsSlider__button productsSlider__button-prev',
            {
              'productsSlider__button--disabled': isDisabledPrev,
            },
          )}
          id={'bannerPrev'}
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
          disabled={isDisabledPrev}
        >
          <img src="img/icons/SliderLeft.svg" />
        </button>
        <button
          className={cn(
            'productsSlider__button productsSlider__button-next',
            {
              'productsSlider__button--disabled': isDisabledNext,
            },
          )}
          id={'bannerNext'}
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
          disabled={isDisabledNext}
        >
          <img src="img/icons/SliderRight.svg" />
        </button>
      </div> */}
      <div className="productsSlider__header">
        <h2 className="productsSlider__title">{title}</h2>
        <div className="productsSlider__controls">
          <NavButton direction="prev" disabled={isDisabledPrev} />
          <NavButton direction="next" disabled={isDisabledNext} />
        </div>
      </div>
      <Swiper
        onSwiper={swiper => {
          swiperRef.current = swiper as unknown as SwRef;
        }}
        onSlideChange={swiper => {
          setActiveIndex(swiper.activeIndex);
          setIsDisabledNext(swiper.isEnd);
        }}
        className="productsSlider__swiper"
        spaceBetween={16}
        slidesPerView={4}
        modules={[Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
          },
          550: {
            slidesPerView: 2,
          },
          758: {
            slidesPerView: 3,
          },
          940: {
            slidesPerView: 3.5,
          },
          1199: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: '.productsSlider__button--next',
          prevEl: '.productsSlider__button--prev',
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard item={product} showDiscount={showDiscount} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
