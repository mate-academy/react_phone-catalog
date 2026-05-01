import { useContext, useMemo, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ProductDetails } from '../../types';
import styles from './ProductDetailsPage.module.scss';
import arrow from '../../images/Icons/Arrow-Left.png';
import heart from '../../images/Icons/Heart.svg';
import likedHeart from '../../images/Icons/HeartLike.svg';
import { PhonesContext } from '../../contexts/phones';
import { TabletsContext } from '../../contexts/tablets/TabletsStore';
import { AccessoriesContext } from '../../contexts/accessories';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import classNames from 'classnames';
import { ProductsSlider } from '../ProductsSlider';
import { PageNavBar } from '../PageNavBar';
import { Loader } from '../Loader';
import { Thumbs } from 'swiper/modules';
import { CartContext } from '../../contexts/cart';
import { useCart } from '../../hooks/useCart';
import { ProductsContext } from '../../contexts/products';
import 'swiper/css';
import { useFav } from '../../hooks/useFav';
import { FavContext } from '../../contexts/favorites';

type Props = {
  category: string;
  title: string;
};

export const ProductDetailsPage: React.FC<Props> = ({ category, title }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const { cartItems } = useContext(CartContext);
  const { favorites } = useContext(FavContext);
  const { products } = useContext(ProductsContext);

  const { addToCart, removeFromCart } = useCart();
  const { addToFav, removeFromFav } = useFav();

  const { itemId } = useParams();
  const navigate = useNavigate();

  const phonesState = useContext(PhonesContext);
  const tabletsState = useContext(TabletsContext);
  const accessoriesState = useContext(AccessoriesContext);

  const categoryState = useMemo(() => {
    switch (category) {
      case 'phones':
        return {
          products: phonesState.phones,
          loading: phonesState.loading,
          error: phonesState.error,
        };

      case 'tablets':
        return {
          products: tabletsState.tablets,
          loading: tabletsState.loading,
          error: tabletsState.error,
        };

      case 'accessories':
        return {
          products: accessoriesState.accessories,
          loading: accessoriesState.loading,
          error: accessoriesState.error,
        };

      default:
        return {
          products: [],
          loading: false,
          error: 'Unknown category',
        };
    }
  }, [category, phonesState, tabletsState, accessoriesState]);

  const detailedProducts = categoryState.products;
  const product: ProductDetails | null = useMemo(() => {
    return detailedProducts.find(item => item.id === itemId) || null;
  }, [itemId, detailedProducts]);

  const images = product?.images;
  const colors = product?.colorsAvailable;
  const capacities = product?.capacityAvailable;
  const descriptions = product?.description;

  const previewProduct = products.find(item => item.itemId === product?.id);

  const isAddedToCart = previewProduct
    ? cartItems.some(cartItem => cartItem.product.id === previewProduct.id)
    : false;

  const isAddedToFav = previewProduct
    ? favorites.some(favItem => favItem.id === previewProduct.id)
    : false;

  const getProductByColor = (color: string) => {
    return categoryState.products.find(
      item =>
        item.namespaceId === product?.namespaceId &&
        item.color === color &&
        item.capacity === product?.capacity,
    );
  };

  const getProductByCap = (cap: string) => {
    return categoryState.products.find(
      item =>
        item.namespaceId === product?.namespaceId &&
        item.capacity === cap &&
        item.color === product?.color,
    );
  };

  if (categoryState.loading) {
    return <Loader />;
  }

  if (categoryState.error) {
    return <p>{categoryState.error}</p>;
  }

  if (!product) {
    return <p>Product was not found</p>;
  }

  return (
    <div className={styles.productDetails}>
      <PageNavBar
        category={category}
        title={title}
        productName={product.name}
      />

      <div className={styles.productDetails__labels}>
        <button
          className={styles.productDetails__backBtn}
          onClick={() => navigate(-1)}
        >
          <img src={arrow} className={styles.productDetails__backBtnArrow} />
          Back
        </button>

        <h1 className={styles.productDetails__mainTitle}>{product.name}</h1>
      </div>

      <div className={styles.productDetails__content}>
        <div className={styles.productDetails__topPage}>
          <div className={styles.productDetails__imgsSlider}>
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              direction="horizontal"
              breakpoints={{
                640: {
                  direction: 'vertical',
                  slidesPerView: 5,
                  spaceBetween: 16,
                },
              }}
              slidesPerView={5}
              spaceBetween={8}
              watchSlidesProgress
              className={styles.productDetails__thumSwiper}
            >
              {images?.map(img => (
                <SwiperSlide
                  key={img}
                  className={styles.productDetails__thumSlide}
                >
                  <img src={img} />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              modules={[Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              className={styles.productDetails__mainSwiper}
              direction="horizontal"
            >
              {images?.map(img => (
                <SwiperSlide
                  key={img}
                  className={styles.productDetails__mainSlide}
                >
                  <img src={img} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={styles.productDetails__optionsBar}>
            <div className={styles.productDetails__options}>
              <p>Available colors</p>
              <div className={styles.productDetails__optionsList}>
                {colors?.map(color => {
                  const coloredProduct = getProductByColor(color);

                  if (!coloredProduct) {
                    return null;
                  }

                  return (
                    <NavLink
                      key={color}
                      to={`/${category}/${coloredProduct.id}`}
                      style={{ backgroundColor: `${color}` }}
                      className={classNames(styles.productDetails__colorLink, {
                        [styles.productDetails__colorLinkActive]:
                          color === product.color,
                      })}
                    ></NavLink>
                  );
                })}
              </div>
            </div>

            <div className={styles.productDetails__options}>
              <p>Select capacity</p>
              <div className={styles.productDetails__optionsList}>
                {capacities?.map(cap => {
                  const chosenProduct = getProductByCap(cap);

                  if (!chosenProduct) {
                    return null;
                  }

                  return (
                    <NavLink
                      key={cap}
                      to={`/${category}/${chosenProduct.id}`}
                      className={classNames(
                        styles.productDetails__capacityLink,
                        {
                          [styles.productDetails__capacityLinkActive]:
                            cap === product.capacity,
                        },
                      )}
                    >
                      {cap}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            <div className={styles.productDetails__mainBtnsAndPrice}>
              <div className={styles.productDetails__price}>
                <h2 className={styles.productDetails__newPrice}>
                  {'$'}
                  {product.priceDiscount}
                </h2>
                <h2 className={styles.productDetails__oldPrice}>
                  {'$'}
                  {product.priceRegular}
                </h2>
              </div>
              <div className={styles.productDetails__mainBtns}>
                <button
                  className={classNames(styles.productDetails__addBtn, {
                    [styles.productDetails__addBtnAdded]: isAddedToCart,
                  })}
                  onClick={() => {
                    if (!previewProduct) {
                      return;
                    }

                    if (!isAddedToCart) {
                      addToCart(previewProduct);
                    } else {
                      removeFromCart(previewProduct);
                    }
                  }}
                >
                  {isAddedToCart ? 'Added' : 'Add to cart'}
                </button>
                <button
                  className={classNames(styles.productDetails__favBtn, {
                    [styles.productDetails__favBtnAdded]: isAddedToFav,
                  })}
                  onClick={() => {
                    if (!previewProduct) {
                      return;
                    }

                    if (!isAddedToFav) {
                      addToFav(previewProduct);
                    } else {
                      removeFromFav(previewProduct);
                    }
                  }}
                >
                  <img src={!isAddedToFav ? heart : likedHeart} />
                </button>
              </div>

              <div className={styles.productDetails__basicSpecs}>
                <dl className={styles.productDetails__basicSpecsList}>
                  {[
                    ['Screen', product.screen],
                    ['Resolution', product.resolution],
                    ['Processor', product.processor],
                    ['RAM', product.ram],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className={styles.productDetails__specsRow}
                    >
                      <dt className={styles.productDetails__specsLabel}>
                        {label}
                      </dt>
                      <dd className={styles.productDetails__specsValue}>
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.productDetails__bottomPage}>
          <div className={styles.productDetails__about}>
            <h3 className={styles.productDetails__bottomPageTitle}>About</h3>
            {descriptions?.map(description => {
              return (
                <div
                  key={description.title}
                  className={styles.productDetails__descriptionContainer}
                >
                  <h4 className={styles.productDetails__descriptionTitle}>
                    {description.title}
                  </h4>
                  <p className={styles.productDetails__descriptionText}>
                    {description.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className={styles.productDetails__techSpecs}>
            <h3 className={styles.productDetails__bottomPageTitle}>
              Tech specs
            </h3>
            <div className={styles.productDetails__mainSpecs}>
              <dl className={styles.productDetails__mainSpecsList}>
                {[
                  ['Screen', product.screen],
                  ['Resolution', product.resolution],
                  ['Processor', product.processor],
                  ['RAM', product.ram],
                  ['Built in memory', product.capacity],
                  ['Camera', product.camera],
                  ['Zoom', product.zoom],
                  ['Cell', product.cell.join(', ')],
                ].map(([label, value]) => (
                  <div key={label} className={styles.productDetails__specsRow}>
                    <dt className={styles.productDetails__mainSpecsLabel}>
                      {label}
                    </dt>
                    <dd className={styles.productDetails__mainSpecsValue}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <ProductsSlider
        category={category}
        title={'You may also like'}
        sortBy={'recommended'}
      />
    </div>
  );
};
