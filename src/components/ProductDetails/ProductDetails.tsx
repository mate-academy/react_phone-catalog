/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styles from './ProductDetails.module.scss';
import classNames from 'classnames';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { TitleAndButtonSlider } from '../TitleAndButtonSlider/TitleAndButtonSlider';
import { getAllProducts, getProducts } from '../../services/productsApi';
import { Products } from '../../types/Products';
import { TechDetails } from '../../utils/TechDetails';
import { ZoomImage } from '../ZoomImage/ZoomImage';
import { useCartProducts } from '../Cart/CartContext';
import { Loader } from '../Loader/Loader';
import { useTheme } from '../ThemeContext/ThemeContext';
import { useFavourites } from '../Favourites/FavouritesContext';
import { ProductCard } from '../../utils/lazyComponents';
import { colorMap } from '../../utils/Colors';

type Props = {
  productId?: string;
  disabledIds: number[];
  setDisabledIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const ProductDetails: React.FC<Props> = ({ disabledIds, setDisabledIds }) => {
  const location = useLocation();
  const categoryName = location.pathname.split('/')[1];
  const { productId: productIdFromUrl } = useParams();
  const [activeData, setActiveData] = useState<Product[]>([]);
  const product = activeData.find(product_ => product_.id === productIdFromUrl);
  const [activeProducts, setActiveProducts] = useState<Products[]>([]);
  const [image, setImage] = useState(product?.images[0]);
  const [activeColor, setActiveColor] = useState<string | undefined>(
    product?.colorsAvailable[0],
  );
  const [activeCapacity, setActiveCapacity] = useState<string | undefined>(
    product?.capacity,
  );
  const { cartProducts, addProductToCart, removeFromCart } = useCartProducts();
  const navigate = useNavigate();
  const { search } = useLocation();
  const productIdtext = activeProducts.find(
    product_ => product_.itemId === product?.id,
  );
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const { favourites, toggleFavourite } = useFavourites();
  const isFavourite = product && favourites.some(fav => fav.id === product.id);

  const isInCart = product && cartProducts.find(item => item.id === product.id);
  const handleAddToCart = (product_: Product) => {
    if (isInCart) {
      removeFromCart(product_);
    } else {
      addProductToCart(product_);
    }
  };

  const handleChangeColor = (color: string) => {
    const newProduct = activeData.find(
      item =>
        product?.namespaceId === item.namespaceId &&
        product.capacity === item.capacity &&
        item.color === color,
    );

    if (newProduct) {
      setActiveColor(color);
      setImage(newProduct.images[0]);
      navigate(`/${activeData[0].category}/${newProduct.id}`);
    }
  };

  const handleBackButton = () => {
    navigate({ pathname: '..', search });
  };

  const handleCapacityChange = (capacity: string, color?: string) => {
    const newProduct = activeData.find(
      product_ =>
        product_.capacity === capacity &&
        product?.namespaceId === product_.namespaceId &&
        product_.color === color,
    );

    if (newProduct) {
      setActiveCapacity(capacity);
      setActiveColor(color);
      setImage(newProduct.images[0]);
      navigate(`/${activeData[0].category}/${newProduct.id}`);
    }
  };

  const getTechValue = (key: keyof Product) => {
    const value = product?.[key];

    return Array.isArray(value) ? value.join(', ') : (value ?? 'N/A');
  };

  const handletoggleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product) {
      toggleFavourite(product);
    }
  };

  useEffect(() => {
    if (!product) {
      return;
    }

    const productActive = activeData.find(
      _phone => _phone.id === productIdFromUrl,
    );

    if (productActive) {
      setActiveColor(productActive.color);
      setImage(productActive?.images[0]);
      setActiveCapacity(productActive.capacity);
      window.scrollTo({ top: 0 });
    }
  }, [activeData, setActiveData, location, product, productIdFromUrl]);

  useEffect(() => {
    getProducts(`${categoryName}`)
      .then(data => {
        setActiveData(data);
      })
      .catch(e => {
        throw new Error(e);
      });
  }, [categoryName]);

  useEffect(() => {
    getAllProducts()
      .then(data => {
        setActiveProducts(data);
      })
      .catch(e => {
        throw new Error(e);
      });
  }, [categoryName]);

  if (!activeData) {
    return <Loader />;
  }

  return (
    <>
      {activeData.length > 0 && product && (
        <>
          <main className={`${styles.details_main_container}`}>
            <div className={`${styles.details_path_container}`}>
              <Link to={'/'} className={`${styles.details_link}`}>
                <img
                  src={
                    isLightTheme
                      ? './img/icons/home-icon.svg'
                      : './img/icons/home-icon-dark-theme.svg'
                  }
                  alt="home icon"
                  className={`${styles.details_header_icon}`}
                />
              </Link>
              <img
                src={
                  isLightTheme
                    ? './img/icons/main-disabled-arrow.svg'
                    : './img/icons/dark-theme-arrow-disabled.svg'
                }
                alt="right arrow"
                className={`${styles.details_header_icon}`}
              />
              <Link
                to={`../`}
                className={`${styles.details_link} ${styles.details_path} ${styles.dark_gray}`}
              >
                {product.category}
              </Link>
              <img
                src={
                  isLightTheme
                    ? './img/icons/main-disabled-arrow.svg'
                    : './img/icons/dark-theme-arrow-disabled.svg'
                }
                alt="right arrow"
                className={`${styles.details_header_icon}`}
              />
              <p className={`${styles.details_path}`}>{product?.name}</p>
            </div>

            <div
              className={`${styles.details_back_container}`}
              onClick={handleBackButton}
            >
              <img
                src={
                  isLightTheme
                    ? './img/icons/main-default-arrow.svg'
                    : './img/icons/dark-theme-arrow.svg'
                }
                alt="left arrow"
                className={`${styles.details_back_icon}`}
              />
              <p className={`${styles.details_back_text}`}>Back</p>
            </div>
            <h1 className={`${styles.details_header}`}>{product?.name}</h1>
            <article className={`${styles.details_main_info_container}`}>
              <ZoomImage src={image || product.images[0]} />

              <div className={`${styles.details_slider_image_container}`}>
                {product?.images.map((img, id) => {
                  return (
                    <div
                      className={classNames(
                        `${styles.details_slider_image_wrapper}`,
                        {
                          [styles.details_active_image]: img === image,
                        },
                      )}
                      key={id}
                      onClick={() => setImage(img)}
                    >
                      <img
                        src={img}
                        alt="phone image"
                        className={`${styles.details_slider_image}`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className={`${styles.details_controls_container}`}>
                <div className={`${styles.details_available_header_container}`}>
                  <p className={`${styles.details_available_header}`}>
                    Available colors
                  </p>
                  {productIdtext && (
                    <p
                      className={`${styles.details_available_id}`}
                    >{`ID: ${productIdtext.id}`}</p>
                  )}
                </div>
                <div className={`${styles.details_available_colors_container}`}>
                  {product?.colorsAvailable.map((color, id) => {
                    return (
                      <div
                        className={classNames(
                          `${styles.details_color_wrapper}`,
                          {
                            [styles.details_active_color]:
                              activeColor === color,
                          },
                        )}
                        style={{ backgroundColor: colorMap[color] || 'gray' }}
                        key={id}
                        onClick={() => handleChangeColor(color)}
                      ></div>
                    );
                  })}
                </div>

                <hr className={`${styles.details_line}`} />

                <div className={`${styles.details_capacity_container}`}>
                  <p className={`${styles.details_capacity_text}`}>
                    Select capacity
                  </p>
                  <div className={`${styles.details_capacity_amount_cont}`}>
                    {product?.capacityAvailable.map((capacity, id) => {
                      return (
                        <div
                          key={id}
                          className={classNames(
                            `${styles.details_capacity_amount_wrapper}`,
                            {
                              [styles.activeCapacity]:
                                activeCapacity === capacity,
                            },
                          )}
                          onClick={() =>
                            handleCapacityChange(capacity, activeColor)
                          }
                        >
                          <p className={`${styles.details_capacity_amount}`}>
                            {capacity}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <hr
                  className={`${styles.details_line} ${styles.margin_bot_32}`}
                />

                <div className={`${styles.price_wrapper}`}>
                  <h2
                    className={`${styles.price}`}
                  >{`$${product?.priceDiscount}`}</h2>
                  <h2
                    className={`${styles.oldPrice}`}
                  >{`$${product?.priceRegular}`}</h2>
                </div>

                <div className={classNames(`${styles.buttons_container}`)}>
                  <button
                    className={classNames(
                      `${styles.button} ${styles.button_add}`,
                      {
                        [styles.button_in_cart]: isInCart,
                      },
                    )}
                    onClick={() => handleAddToCart(product)}
                  >
                    {isInCart ? 'Selected' : 'Add to cart'}
                  </button>
                  <button
                    className={`${styles.button} ${styles.button_like}`}
                    onClick={handletoggleFavourite}
                  >
                    <img
                      src={
                        isFavourite
                          ? './img/icons/card-selected-like.svg'
                          : isLightTheme
                            ? './img/icons/card-default-like.svg'
                            : './img/icons/like-dark-theme.svg'
                      }
                      alt="like button"
                    />
                  </button>
                </div>

                <div
                  className={classNames(`${styles.phone_charact_container}`)}
                >
                  <div className={classNames(`${styles.phone_charact}`)}>
                    <p className={`${styles.phone_charact_parag}`}>Screen</p>
                    <p
                      className={`${styles.phone_charact_parag} ${styles.char_value}`}
                    >
                      {product?.screen}
                    </p>
                  </div>
                  <div className={classNames(`${styles.phone_charact}`)}>
                    <p className={`${styles.phone_charact_parag}`}>
                      Resolution
                    </p>
                    <p
                      className={`${styles.phone_charact_parag} ${styles.char_value}`}
                    >
                      {product?.resolution}
                    </p>
                  </div>
                  <div className={classNames(`${styles.phone_charact}`)}>
                    <p className={`${styles.phone_charact_parag}`}>Processor</p>
                    <p
                      className={`${styles.phone_charact_parag} ${styles.char_value}`}
                    >
                      {product?.processor}
                    </p>
                  </div>
                  <div className={classNames(`${styles.phone_charact}`)}>
                    <p className={`${styles.phone_charact_parag}`}>RAM</p>
                    <p
                      className={`${styles.phone_charact_parag} ${styles.char_value}`}
                    >
                      {product?.ram}
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <section className={`${styles.details_main_descr_container}`}>
              <section className={`${styles.details_descr_container}`}>
                <div className={`${styles.details_descr_wrapper}`}>
                  <h3 className={`${styles.details_descr_title}`}>About</h3>
                  <hr className={`${styles.details_line} ${styles.margin_0}`} />
                </div>
                {product?.description.map((descr, id) => {
                  return (
                    <div className={`${styles.details_descr_wrapper}`} key={id}>
                      <h2 className={`${styles.details_descr_title}`}>
                        {descr.title}
                      </h2>
                      <p className={`${styles.details_descr_text}`}>
                        {descr.text}
                      </p>
                    </div>
                  );
                })}
              </section>

              <section className={`${styles.details_tech_container}`}>
                <h3 className={`${styles.details_descr_title}`}>Tech specs</h3>
                <hr
                  className={`${styles.details_line} ${styles.margin_bot_16}`}
                />
                {Object.entries(TechDetails).map(([label, productKey], id) => {
                  return (
                    <div
                      className={classNames(
                        `${styles.phone_charact} ${styles.tech_charact}`,
                      )}
                      key={id}
                    >
                      <p
                        className={`${styles.phone_charact_parag} ${styles.tech_charact_parag}`}
                      >
                        {label}
                      </p>
                      <p
                        className={`${styles.phone_charact_parag}
                  ${styles.tech_charact_parag} ${styles.char_value}
                  ${styles.tech_char_value}`}
                      >
                        {getTechValue(productKey)}
                      </p>
                    </div>
                  );
                })}
              </section>
            </section>

            <TitleAndButtonSlider
              disabledIds={disabledIds}
              setDisabledIds={setDisabledIds}
              title={'You may also like'}
              startId={7}
              endId={8}
              containerId={'scroll_container_also_like'}
            />
            <section
              className={`${styles.details_scroll_container}`}
              id="scroll_container_also_like"
            >
              {activeData.map(productItem => (
                <ProductCard key={productItem.id} product={productItem} />
              ))}
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default ProductDetails;
