import style from './ItemCardPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import { Autoplay, Thumbs } from 'swiper/modules';
import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getData } from '../../services/httpClient';
import { ProductItem } from '../../types/ProductItem';
import { FavouritesContext } from '../../store/FavouritesProvider';
import { Product } from '../../types/Product';
import notFoundProduct from '../../assets/img/product-not-found.png';
import { Loader } from '../../components/Loader';
import { CartContext } from '../../store/CartProvider';
import { colorMap } from '../../utils/colorMap';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';

type ThumbsDirectionType = 'vertical' | 'horizontal';

export const ItemCardPage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loader, setLoader] = useState(true);
  const [currentProduct, setCurrentProduct] = useState<ProductItem>();
  const [productFromGeneralList, setProductFromGeneralList] =
    useState<Product>();

  const [thumbsDirection, setThumbsDirection] = useState<ThumbsDirectionType>(
    () => {
      if (window.innerWidth > 639) {
        return 'vertical';
      } else {
        return 'horizontal';
      }
    },
  );

  const { getActiveLike, handleLike } = useContext(FavouritesContext);
  const { getActiveButton, handleAddButton } = useContext(CartContext);

  const { productId } = useParams();

  const location = useLocation().pathname;
  const category = location.split('/').slice(1, 2).join();

  const navigate = useNavigate();

  const handleChangeColor = (color: string) => {
    const splitedPath = location.split('-');

    const length = currentProduct
      ? currentProduct.color.split(' ').join('-').split('-').length
      : 0;

    const pathWithoutColor = splitedPath.slice(0, -length);

    const newPath =
      pathWithoutColor.join('-') + '-' + color.split(' ').join('-');

    navigate(newPath, { replace: true });
  };

  const handleChangeCapacity = (capacity: string) => {
    const splitedPath = location.split('-');

    const length = currentProduct
      ? currentProduct.color.split(' ').join('-').split('-').length
      : 0;

    splitedPath[splitedPath.length - length - 1] = capacity.toLowerCase();

    const newPath = splitedPath.join('-');

    navigate(newPath, { replace: true });
  };

  useEffect(() => {
    getData<ProductItem[]>(`api/${category}.json`)
      .then(data => setCurrentProduct(data.find(item => item.id === productId)))
      .finally(() => setLoader(false));

    getData<Product[]>(`api/products.json`).then(data =>
      setProductFromGeneralList(data.find(item => item.itemId === productId)),
    );
  }, [productId, category]);

  useEffect(() => {
    const getWidth = () => {
      if (window.innerWidth > 639) {
        setThumbsDirection('vertical');
      } else {
        setThumbsDirection('horizontal');
      }
    };

    window.addEventListener('resize', getWidth);

    return () => window.removeEventListener('resize', getWidth);
  }, []);

  const images = currentProduct ? [...currentProduct?.images] : null;

  return (
    <div className={style.itemCard}>
      <div className={style.breadcrumbs}>
        <Breadcrumbs name={currentProduct?.name} />
      </div>

      <a className={style.backButton} onClick={() => navigate(`/${category}`)}>
        <div className={style.backButton__arrow} />
        <p className={style.backButton__text}>Back</p>
      </a>

      {loader && <Loader />}

      {!currentProduct && !loader && (
        <div className={style.notFoundProduct}>
          <h1 className={style.notFoundProduct__title}>Product wasn`t found</h1>
          <img
            src={notFoundProduct}
            alt="Empty Cart"
            className={style.notFoundProduct__img}
          />
        </div>
      )}
      {currentProduct && !loader && (
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
              spaceBetween={thumbsDirection === 'horizontal' ? 20 : 0}
              className={style.thumbs}
              direction={thumbsDirection}
              updateOnWindowResize={false}
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
                <ul className={style.colors__selection}>
                  {currentProduct.colorsAvailable.map(color => (
                    <li
                      className={
                        color.split(' ').join('-').split('-').join(' ') ===
                        currentProduct.color
                          .split(' ')
                          .join('-')
                          .split('-')
                          .join(' ')
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
                    </li>
                  ))}
                </ul>
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
                <button
                  className={cn(style.buttons__addToCart, {
                    [style['buttons__addToCart--active']]:
                      productFromGeneralList &&
                      getActiveButton(productFromGeneralList),
                  })}
                  onClick={() =>
                    productFromGeneralList &&
                    handleAddButton(productFromGeneralList)
                  }
                >
                  Add to cart
                </button>
                <div
                  className={style.buttons__like}
                  onClick={() =>
                    productFromGeneralList && handleLike(productFromGeneralList)
                  }
                >
                  <div
                    className={cn(style.buttons__like__icon, {
                      [style['buttons__like__icon--active']]:
                        productFromGeneralList &&
                        getActiveLike(productFromGeneralList),
                    })}
                  />
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
          <div className={style.productSlider}>
            <ProductSlider
              title={currentProduct ? 'You may also like' : 'Our bestsellers'}
              discount={true}
              random={true}
            />
          </div>
        </>
      )}
    </div>
  );
};
