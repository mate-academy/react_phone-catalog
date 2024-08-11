import style from './ItemCardPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductSlider } from '../../components/ProductSlider';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import { Autoplay, Thumbs } from 'swiper/modules';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getData } from '../../assets/services/httpClient';
import { ProductItem } from '../../types/ProductItem';

export const ItemCardPage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentProduct, setCurrentProduct] = useState<ProductItem>();

  const { productId } = useParams();

  const location = useLocation().pathname;
  const category = location.split('/').slice(1, 2).join();

  const navigate = useNavigate();

  const handleChangeColor = (color: string) => {
    const splitedPath = location.split('-');

    const length = currentProduct ? currentProduct.color.split(' ').length : 0;

    const pathWithoutColor = splitedPath.slice(0, -length);

    const newPath =
      pathWithoutColor.join('-') + '-' + color.split(' ').join('-');

    navigate(newPath);
  };

  const handleChangeCapacity = (capacity: string) => {
    const splitedPath = location.split('-');

    const length = currentProduct ? currentProduct.color.split(' ').length : 0;

    splitedPath[splitedPath.length - length - 1] = capacity.toLowerCase();

    const newPath = splitedPath.join('-');

    navigate(newPath);
  };

  useEffect(() => {
    getData<ProductItem[]>(`/api/${category}.json`).then(data =>
      setCurrentProduct(data.find(item => item.id === productId)),
    );
  }, [productId, category]);

  const images = currentProduct ? [...currentProduct?.images] : null;

  const colorMap: { [key: string]: string } = {
    silver: '#C0C0C0',
    spacegray: '#4A4A4A',
    gold: '#D4AF37',
    midnightgreen: '#004953',
    red: '#FF3B30',
    white: '#FFFFFF',
    black: '#000000',
    green: '#34C759',
    yellow: '#FFCC00',
    purple: '#AF52DE',
    blue: '#007AFF',
    pink: '#FF2D55',
    coral: '#FF6F61',
    midnight: '#1C1C1E',
    sierrablue: '#A3C8FF',
    graphite: '#383838',
    rosegold: '#B76E79',
    spaceblack: '#121212',
    'space gray': '#4A4A4A',
    'midnight green': '#004953',
    'sierra blue': '#A3C8FF',
    'rose gold': '#B76E79',
    'sky blue': '#87CEEB',
  };

  return (
    <div className={style.itemCard}>
      <div className={style.breadcrumbs}>
        <Breadcrumbs name={currentProduct?.name} />
      </div>

      <NavLink to={'..'} relative="path" className={style.backButton}>
        <div className={style.backButton__arrow} />
        <p className={style.backButton__text}>Back</p>
      </NavLink>
      {!currentProduct && (
        <h1 className={style.error}>Product was not found</h1>
      )}
      {currentProduct && (
        <>
          <h2 className={style.title}>{currentProduct.name}</h2>

          <div className={style.slider}>
            <Swiper
              modules={[Autoplay, Thumbs]}
              style={{ width: '100%' }}
              spaceBetween={100}
              centeredSlides={true}
              autoplay={{ delay: 5000 }}
              thumbs={{ swiper: thumbsSwiper }}
              onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
              className={style.mainImg}
            >
              {images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} className={style.slider__img} />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={swiper => setThumbsSwiper(swiper)}
              slidesPerView={images?.length}
              className={style.thumbs}
            >
              <div className={style.slider__thumbsContainer}>
                {images?.map((image, index) => (
                  <SwiperSlide key={index} className={style.slider__slide}>
                    <img
                      src={image}
                      className={cn(style.slider__thumbs, {
                        [style['slider__thumbs--active']]:
                          index === activeIndex,
                      })}
                    />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>

          <div className={style.main}>
            <div className={style.selections}>
              <div className={style.colors}>
                <div className={style.colors__text}>
                  <p className={style.colors__text__available}>
                    Available colors
                  </p>
                  <p className={style.colors__text__id}>ID: 802390</p>
                </div>
                <div className={style.colors__selection}>
                  {currentProduct.colorsAvailable.map(color => (
                    <div
                      className={
                        color === currentProduct.color
                          ? style['colors__selection__container--active']
                          : style.colors__selection__container
                      }
                      key={color}
                      onClick={() => handleChangeColor(color)}
                    >
                      <div
                        className={style.colors__selection__color}
                        style={{ backgroundColor: colorMap[color] }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={style.divider} />

              <div className={style.capacity}>
                <p className={style.capacity__text}>
                  {currentProduct.category === 'accessories'
                    ? 'Select Size'
                    : 'Select capacity'}
                </p>
                <div className={style.capacity__size}>
                  {currentProduct.capacityAvailable.map(item => (
                    <p
                      key={item}
                      className={cn(style.capacity__size__container, {
                        [style['capacity__size__container--active']]:
                          item === currentProduct.capacity,
                      })}
                      onClick={() => handleChangeCapacity(item)}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div className={style.divider} />
            </div>

            <div className={style.actions}>
              <div className={style.price}>
                <p className={style.price__discountPrice}>
                  ${currentProduct.priceDiscount}
                </p>
                <p className={style.price__fullPrice}>
                  ${currentProduct.priceRegular}
                </p>
              </div>

              <div className={style.buttons}>
                <div className={style.buttons__addToCart}>Add to cart</div>
                <div className={style.buttons__like}>
                  <div className={style.buttons__like__icon} />
                </div>
              </div>
            </div>

            <div className={style.specification}>
              {}
              <div className={style.specification__item}>
                <p className={style.specification__item__key}>Screen</p>
                <p className={style.specification__item__value}>
                  {currentProduct.screen}
                </p>
              </div>

              <div className={style.specification__item}>
                <p className={style.specification__item__key}>Resolution</p>
                <p className={style.specification__item__value}>
                  {currentProduct.resolution}
                </p>
              </div>

              <div className={style.specification__item}>
                <p className={style.specification__item__key}>Processor</p>
                <p className={style.specification__item__value}>
                  {currentProduct.processor}
                </p>
              </div>

              <div className={style.specification__item}>
                <p className={style.specification__item__key}>RAM</p>
                <p className={style.specification__item__value}>
                  {currentProduct.ram}
                </p>
              </div>
            </div>
          </div>

          <div className={style.about}>
            <h3 className={style.about__title}>About</h3>
            {currentProduct.description.map(item => (
              <div key={item.title} className={style.about__item}>
                <h4 className={style.about__item__title}>{item.title}</h4>
                <p className={style.about__item__description}>{item.text}</p>
              </div>
            ))}
          </div>

          <div className={style.techSpecs}>
            <h3 className={style.techSpecs__title}>Tech specs</h3>

            <div className={style.characteristics}>
              <div className={style.characteristics__item}>
                <div className={style.characteristics__item__key}>
                  Resolution
                </div>
                <div className={style.characteristics__item__value}>
                  {currentProduct.resolution}
                </div>
              </div>

              <div className={style.characteristics__item}>
                <div className={style.characteristics__item__key}>
                  Processor
                </div>
                <div className={style.characteristics__item__value}>
                  {currentProduct.processor}
                </div>
              </div>

              <div className={style.characteristics__item}>
                <div className={style.characteristics__item__key}>RAM</div>
                <div className={style.characteristics__item__value}>
                  {currentProduct.ram}
                </div>
              </div>

              <div className={style.characteristics__item}>
                <div className={style.characteristics__item__key}>
                  {currentProduct.category === 'accessories'
                    ? 'Size'
                    : 'Built in memory'}
                </div>
                <div className={style.characteristics__item__value}>
                  {currentProduct.capacity}
                </div>
              </div>

              {currentProduct.category !== 'accessories' && (
                <div className={style.characteristics__item}>
                  <div className={style.characteristics__item__key}>Camera</div>
                  <div className={style.characteristics__item__value}>
                    {currentProduct.camera}
                  </div>
                </div>
              )}

              <div className={style.characteristics__item}>
                <div className={style.characteristics__item__key}>Zoom</div>
                <div className={style.characteristics__item__value}>
                  Optical, 2x
                </div>
              </div>

              <div className={style.characteristics__item}>
                <div className={style.characteristics__item__key}>Cell</div>
                <div className={style.characteristics__item__value}>
                  {currentProduct.cell.map((item, index) =>
                    index !== currentProduct.cell.length - 1
                      ? item + ', '
                      : item,
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className={style.productSlider}>
        <ProductSlider
          title={currentProduct ? 'You may also like' : 'Our bestsellers'}
          discount={true}
        />
      </div>
    </div>
  );
};
