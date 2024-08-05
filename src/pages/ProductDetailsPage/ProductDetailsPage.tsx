import { Link, useNavigate, useParams } from 'react-router-dom';
import './ProductDetailsPage.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import { Product } from '../../types/Product';
import { useEffect, useState } from 'react';
import { getAccessories, getPhones, getTablets } from '../../services/products';
import classNames from 'classnames';
// eslint-disable-next-line max-len
import { SuggestedProducts } from '../../components/SliderProducts/SuggestedProducts';
import { COLOR_MAP } from '../../services/colors';
import { normalizeColor } from '../../utils/heplerFunctions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addFav, removeFav } from '../../features/favorites';
import { addCart } from '../../features/cart';
import { NotFoundProduct } from '../NotFoundProduct';
import { Loader } from '../../components/Loader';

export const ProductDetailsPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams<{ productId: string }>();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favProductIds = useAppSelector(state => state.favorites.products);
  const isAdded = favProductIds.includes(productId || '');
  const cartProductIds = useAppSelector(state => state.cart.products);
  const isActive = cartProductIds.some(item => item.id === productId);
  const [loading, setLoading] = useState(false);

  const addToCart = () => {
    if (productId && !isActive) {
      dispatch(addCart(productId));
    }
  };

  const addToFav = () => {
    if (productId) {
      if (isAdded) {
        dispatch(removeFav(productId));
      } else {
        dispatch(addFav(productId));
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      setLoading(true);
      try {
        const [phones, tablets, accessories] = await Promise.all([
          getPhones(),
          getTablets(),
          getAccessories(),
        ]);

        const allProducts = [...phones, ...tablets, ...accessories];
        const foundProduct = allProducts.find(
          item => item.id.toLowerCase() === productId?.toLowerCase(),
        );

        setProduct(foundProduct || null);
        if (
          foundProduct &&
          foundProduct.images &&
          !!foundProduct.images.length
        ) {
          setSelectedImage(foundProduct.images[0]);
        }

        if (
          foundProduct &&
          foundProduct.colorsAvailable &&
          !!foundProduct.colorsAvailable
        ) {
          setSelectedColor(foundProduct.color);
        }

        if (
          foundProduct &&
          foundProduct.capacityAvailable &&
          !!foundProduct.capacityAvailable
        ) {
          setSelectedCapacity(foundProduct.capacity);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [productId]);

  if (!product) {
    return <NotFoundProduct />;
  }

  const {
    name,
    category,
    images,
    namespaceId,
    colorsAvailable,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
    description,
    camera,
    zoom,
    cell,
  } = product;

  const handleColorChange = (color: string) => {
    if (product) {
      const normalizedColor = normalizeColor(color);
      const newProductId = `${namespaceId}-${capacity}-${normalizedColor}`;

      setSelectedColor(color);
      navigate(`/${category}/${newProductId}`);
    }
  };

  const handleCapChange = (cap: string) => {
    if (product) {
      const normalizedColor = normalizeColor(selectedColor);
      const newProductId = `${namespaceId}-${cap}-${normalizedColor}`;

      setSelectedCapacity(cap);
      navigate(`/${category}/${newProductId}`);
    }
  };

  return (
    <div className="container">
      <div className="product-details">
        <div className="product-details__active">
          <Link to="/" className="product-details__active--link">
            <svg className="icon icon-home">
              <use href="img/icons.svg#icon-home"></use>
            </svg>
          </Link>
          <div className="product-details__active--arrow">
            <svg className="icon icon-arrow-right">
              <use href="img/icons.svg#icon-arrow-right"></use>
            </svg>
          </div>
          <Link to={`/${category}`} className="product-details__active--cat">
            {category}
          </Link>
          <div className="product-details__active--arrow">
            <svg className="icon icon-arrow-right">
              <use href="img/icons.svg#icon-arrow-right"></use>
            </svg>
          </div>
          <Link
            to={`/${category}/${productId}`}
            className="product-details__active--name"
          >
            {name}
          </Link>
        </div>

        <Link to={`/${category}`} className="product-details__back">
          <div className="product-details__back--arrow">
            <svg className="icon icon-arrow-left-back">
              <use href="img/icons.svg#icon-arrow-left"></use>
            </svg>
          </div>
          <p className="product-details__back--text">Back</p>
        </Link>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="product-details__title">{name}</h2>
            <div className="product-details__swiper">
              <div className="product-details__swiper--big-pict swiper-pict">
                <img
                  src={selectedImage}
                  className="swiper-pict__large-image"
                  alt={name}
                />
              </div>
              <Swiper
                spaceBetween={0}
                slidesPerView={5}
                className="product-details__swiper--wrapper-box"
                wrapperClass="product-details__swiper--wrapper"
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                }}
              >
                {images.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="product-details__swiper--img"
                  >
                    <img
                      src={image}
                      onClick={() => setSelectedImage(image)}
                      alt={`Thumbnail ${index + 1}`}
                      className="thumbnail-picture"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="product-details__product-param">
              <div className="product-details__colors">
                <div className="product-details__colors--box colors-box">
                  <p className="colors-box__title">Available colors</p>
                  <p className="colors-box__id">ID: 802390</p>
                </div>
                <div className="product-details__colors--cont colors-cont">
                  {colorsAvailable.map((color: string, index: number) => {
                    const normalizedColor = normalizeColor(color);

                    return (
                      <div
                        key={index}
                        className={classNames('colors-cont__color', {
                          selected: selectedColor === normalizedColor,
                        })}
                        style={{
                          backgroundColor:
                            selectedColor === normalizedColor
                              ? COLOR_MAP[normalizedColor]
                              : '#3B3E4A',
                        }}
                        onClick={() => handleColorChange(color)}
                      >
                        <div
                          className="colors-cont__color--in"
                          style={{
                            backgroundColor: COLOR_MAP[normalizedColor],
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="product-details__capacity">
                <p className="product-details__capacity--title">
                  Select capacity
                </p>
                <div className="product-details__capacity--box capacity-box">
                  {capacityAvailable.map((cap: string, index: number) => (
                    <div
                      key={index}
                      className={classNames('capacity-box__mem', {
                        'cap-selected': selectedCapacity === cap,
                      })}
                      onClick={() => handleCapChange(cap)}
                    >
                      {cap}
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-details__price">
                <p className="product-details__price--disc">{`$${priceDiscount}`}</p>
                <p className="product-details__price--regular">{`$${priceRegular}`}</p>
              </div>
              <div className="product-details__buttons">
                <button
                  type="button"
                  className={classNames('product-details__buttons--add', {
                    'added-to-cart': isActive,
                  })}
                  onClick={addToCart}
                >
                  {!isActive ? 'Add to cart' : 'Added to cart'}
                </button>
                <button
                  className={classNames('product-details__buttons--heart', {
                    'added-to-fav': isAdded,
                  })}
                  onClick={addToFav}
                >
                  <svg
                    className={classNames('icon icon-heart', {
                      'icon-heart-red': isAdded,
                    })}
                  >
                    <use href="img/icons.svg#icon-favourites-filled"></use>
                  </svg>
                </button>
              </div>
              <ul className="product-details__tech">
                <li className="product-details__tech--item tech-item">
                  <p className="tech-item__name">Screen</p>
                  <p className="tech-item__param">{screen}</p>
                </li>
                <li className="product-details__tech--item tech-item">
                  <p className="tech-item__name">Resolution</p>
                  <p className="tech-item__param">{resolution}</p>
                </li>
                <li className="product-details__tech--item tech-item">
                  <p className="tech-item__name">Processor</p>
                  <p className="tech-item__param">{processor}</p>
                </li>
                <li className="product-details__tech--item tech-item">
                  <p className="tech-item__name">RAM</p>
                  <p className="tech-item__param">{ram}</p>
                </li>
              </ul>
            </div>
            <div className="product-details__description">
              <h3 className="product-details__description--title">About</h3>
              {description.map((section, index) => (
                <div
                  key={index}
                  className="product-details__description--sect descr-sect"
                >
                  <p className="descr-sect__subtitle">{section.title}</p>
                  {section.text.map((paragraph, pIndex) => (
                    <p className="descr-sect__text" key={pIndex}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <div className="product-details__tech-specs">
              <h3 className="product-details__tech-specs--title">Tech specs</h3>
              <ul className="product-details__tech-specs--list">
                <li className="tech-specs-item">
                  <p className="tech-specs-item__name">Screen</p>
                  <p className="tech-specs-item__param">{screen}</p>
                </li>
                <li className="tech-specs-item">
                  <p className="tech-specs-item__name">Resolution</p>
                  <p className="tech-specs-item__param">{resolution}</p>
                </li>
                <li className="tech-specs-item">
                  <p className="tech-specs-item__name">Processor</p>
                  <p className="tech-specs-item__param">{processor}</p>
                </li>
                <li className="tech-specs-item">
                  <p className="tech-specs-item__name">RAM</p>
                  <p className="tech-specs-item__param">{ram}</p>
                </li>
                <li className="tech-specs-item">
                  <p className="tech-specs-item__name">Camera</p>
                  <p className="tech-specs-item__param">{camera}</p>
                </li>
                <li className="tech-specs-item">
                  <p className="tech-specs-item__name">Zoom</p>
                  <p className="tech-specs-item__param">{zoom}</p>
                </li>
                <li className="tech-specs-item">
                  <p className="tech-specs-item__name">Cell</p>
                  <p className="tech-specs-item__param">{`${cell[0]}, ${cell[1]}, ${cell[2]}`}</p>
                </li>
              </ul>
            </div>
            <div className="product-details__recomm recommended">
              <SuggestedProducts />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
