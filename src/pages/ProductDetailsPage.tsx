import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import cn from 'classnames';
import { Product, ProductDetails } from '../types/Product';
import { URL_PRODUCTS, URL_PRODUCT_DETAILS } from '../helpers/Url';
import { useFetching } from '../helpers/UseFetchig';
import Loader from '../components/Loader/Loader';
import { getFinalPrice } from '../helpers/getFinalPrice';
import { NavbarContext } from '../context/NavbarContext';

export const ProductDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const [productDetails, setProductDetails] = useState<ProductDetails>();
  const defaultProduct: Product = {
    age: 0,
    id: '',
    type: '',
    imageUrl: '',
    name: '',
    snippet: '',
    price: 0,
    discount: 0,
    screen: '',
    capacity: '',
    ram: '',
  };
  const [device, setDevice] = useState<Product>(defaultProduct);
  const {
    type,
    price,
    discount,
    id,
  } = device;
  const colors = ['gold', 'green', 'black', 'white'];
  const [selectedButton, setSelectedButton] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState(0);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [hasBeenAdded, setHasBeenAdded]
  = useState(false);
  const [hasBeenLiked, setHasBeenLiked]
  = useState(false);

  const modifiedImagesUrl = useMemo(() => {
    return productDetails?.images
      .map((image) => image.replace('phones', 'products'));
  }, [productDetails?.id]);
  const [bigImage, setBigImage] = useState('');

  const { handleAddFn, handleLikeFn } = useContext(NavbarContext);

  const getProductDetails = async () => {
    const response = await fetch(`${URL_PRODUCT_DETAILS}${productId}.json`);
    const data = await response.json();

    setProductDetails(data);
    setBigImage(data.images[0].replace('phones', 'products'));
  };

  const getDevices = async () => {
    const response = await fetch(URL_PRODUCTS);
    const data = await response.json();
    const foundedDevice = data.find((dev: Product) => dev.id === productId);

    setDevice(foundedDevice);
  };

  useEffect(() => {
    setHasBeenLiked(localStorage.getItem('liked') === id.toString());
  }, [localStorage.getItem('liked'), id]);

  useEffect(() => {
    setHasBeenAdded(localStorage.getItem('added') === id.toString());
  }, [localStorage.getItem('added'), id]);

  const [
    fetchProductDetails,
    isLoadingProductDetails,
    isErrorProductDetails,
  ] = useFetching(getProductDetails);

  useEffect(() => {
    fetchProductDetails();
    getDevices();
  }, [productId]);

  return (
    <div className="container container--details">
      {isLoadingProductDetails && !isErrorProductDetails && <Loader />}
      {!isLoadingProductDetails && !isErrorProductDetails && (
        <div className="product-details">
          <div className="devices__way-wrapper">
            <Link
              to={{
                pathname: '/',
                search: searchParams.toString(),
              }}
              className="devices__way devices__way-home"
            />
            <div className="devices__way devices__way-middle" />
            <Link
              to={{
                pathname: `/${type}s`,
                search: searchParams.toString(),
              }}
              className="devices__way-devices"
            >
              {`${type}s`}
            </Link>
            <div className="devices__way devices__way-middle" />
            <div className="devices__way-devices">{productDetails?.name}</div>
          </div>
          <button
            data-cy="backButton"
            onClick={() => navigate(-1)}
            type="button"
            className="button__back"
          >
            <span className="arrow-left" />
            Back
          </button>

          <h1 className="product-details__title">{productDetails?.name}</h1>
          <div className="product-details__images-wrapper">
            <div className="product-details__images-wrapper-small">
              {modifiedImagesUrl && modifiedImagesUrl.map(image => (
                <div
                  key={image}
                  role="button"
                  tabIndex={0}
                  className={cn('product-details__image-small-wrapper',
                    { 'selected-image': image === bigImage })}
                  onClick={() => setBigImage(image)}
                  onKeyPress={() => setBigImage(image)}
                >
                  <img
                    className="product-details__image-small"
                    src={image}
                    alt="phone"
                  />
                </div>
              ))}
            </div>
            <img
              className="product-details__image-big"
              src={bigImage}
              alt=""
            />
            <div className="product-details__info-wrapper">
              <div className="product-details__info-colors-wrapper">
                <p
                  className="product-details__info-colors-title"
                >
                  Available colors
                </p>
                <div className="product-details__info-colors">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedButton(color)}
                      className={cn('product-details__colors-button', {
                        'selected-button': selectedButton === color,
                      })}
                      type="button"
                      aria-label="color"
                    >
                      <span className={`product-details__colors-button-color
                        product-details__colors-button-color--${color}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="horizontal-line" />

              <div className="product-details__info-capacity">
                <p className="product-details__info-colors-title">
                  Select capacity
                </p>
                <div className="product-details__info-capacity-wrapper">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedCapacity(64)}
                    onKeyPress={() => setSelectedCapacity(64)}
                    className={cn('product-details__info-cap', {
                      'selected-capacity': selectedCapacity === 64,
                    })}
                  >
                    64 gb
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedCapacity(256)}
                    onKeyPress={() => setSelectedCapacity(256)}
                    className={cn('product-details__info-cap', {
                      'selected-capacity': selectedCapacity === 256,
                    })}
                  >
                    256 gb
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedCapacity(512)}
                    onKeyPress={() => setSelectedCapacity(512)}
                    className={cn('product-details__info-cap', {
                      'selected-capacity': selectedCapacity === 512,
                    })}
                  >
                    512 gb
                  </div>
                </div>
              </div>

              <div className="horizontal-line" />

              <div className="product-details__price">
                <div className="product-details__price-wrapper">
                  {getFinalPrice(price, discount) === price ? (
                    <span className="product-details__price-discount">{`$${price}`}</span>
                  ) : (
                    <>
                      <span className="product-details__price-discount">
                        {`$${getFinalPrice(price, discount)}`}
                      </span>
                      <span className="product-details__price-amount">{`$${price}`}</span>
                    </>
                  )}
                </div>

                <div className="product-details__price-buttons">
                  {!hasBeenAdded ? (
                    <button
                      className="product-details__button-cart"
                      type="button"
                      onClick={(e) => handleAddFn(e, device)}
                    >
                      Add to cart
                    </button>
                  ) : (
                    <button
                      className="product-details__button-cart
                      product-details__button-cart--selected"
                      type="button"
                      onClick={(e) => handleAddFn(e, device)}
                    >
                      Selected
                    </button>
                  )}
                  <button
                    aria-label="like"
                    className={cn('product-details__button-like', {
                      'product-details__button-like--white': !hasBeenLiked,
                      'product-details__button-like--red': hasBeenLiked,
                    })}
                    type="button"
                    onClick={(e) => handleLikeFn(e, device)}
                  />
                </div>
              </div>

              <div className="product-details__details">
                <ul className="product-details__details-list">
                  <li className="product-details__details-li
                    product-details__details-li--light"
                  >
                    Screen
                  </li>
                  <li className="product-details__details-li
                    product-details__details-li--light"
                  >
                    Resolution
                  </li>
                  <li className="product-details__details-li
                    product-details__details-li--light"
                  >
                    Processor
                  </li>
                  <li className="product-details__details-li
                    product-details__details-li--light"
                  >
                    RAM
                  </li>
                </ul>

                <ul className="product-details__details-list">
                  <li className="product-details__details-li
                    product-details__details-li--dark"
                  >
                    {productDetails?.display.screenSize}
                  </li>
                  <li className="product-details__details-li
                    product-details__details-li--dark"
                  >
                    {productDetails?.display.screenResolution}
                  </li>
                  <li className="product-details__details-li
                    product-details__details-li--dark"
                  >
                    Processor
                  </li>
                  <li className="product-details__details-li
                    product-details__details-li--dark"
                  >
                    RAM
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
