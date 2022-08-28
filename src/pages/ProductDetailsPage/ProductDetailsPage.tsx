import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import './ProductDetailsPage.scss';
import { Product, ProductDetails } from '../../react-app-env';
import { NotFound } from '../../components/NotFound/NotFound';

import {
  getFavoritesSelector,
  getSelectedCartSelector,
} from '../../store/selectors';

import {
  delFavorites,
  delFromCart,
  setFavorites,
  setSelectedCart,
} from '../../store/actions';
import { MayLike } from '../../components/Main/MayLike/MayLike';
import { getDetails, getProducts } from '../../api/api';

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [
    currentProductDetails,
    setCurrentProductDetails,
  ] = useState<ProductDetails | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [isAddedProduct, setIsAddedProduct] = useState(false);
  const [urlImage, setUrlImage] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(result => {
        setAllProducts(result);
      })
      .catch((error) => {
        setErrorMsg(`${error}`);
      });
  }, []);

  useEffect(() => {
    getDetails(id)
      .then(result => {
        setCurrentProductDetails(result);
      })
      .catch((error) => {
        setErrorMsg(`${error}`);
      });
  }, [id]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentFavorite = useSelector(getFavoritesSelector);
  const currentSelectedCart = useSelector(getSelectedCartSelector);
  let currentPrice = 0;
  const currentProduct = allProducts.find(item => item.id === id);

  if (currentProduct) {
    currentPrice = currentProduct.price
    * (1 - currentProduct.discount / 100);
  }

  const handlerSelectedToCart = (obj: Product, index: string) => {
    if (currentSelectedCart.some(item => item.id === index)) {
      if (obj) {
        dispatch(delFromCart({
          id: obj.id,
          quantity: 1,
          product: obj,
        }));
      }
    }

    if (obj) {
      dispatch(setSelectedCart({
        id: obj.id,
        quantity: 1,
        product: obj,
      }));
    }
  };

  const handlerAddOrDelete = () => {
    if (currentProduct?.id) {
      if (currentFavorite.includes(currentProduct?.id)) {
        dispatch(delFavorites(currentProduct?.id));
      } else {
        dispatch(setFavorites(currentProduct?.id));
      }
    }
  };

  return (
    <div className="productdetailspage">
      <Header />
      <div className="productdetailspage__container">
        <div
          className="productdetailspage__boximghomearrow"
          data-cy="breadCrumbs"
        >
          <IconButton
            color="inherit"
            sx={{
              padding: '0',
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            <div className="productdetailspage__imghome" />
          </IconButton>

          <div className="productdetailspage__arrow" />
          <a href="/#/phones" className="productdetailspage__link">
            <div
              className="productdetailspage__namecategory"
            >
              Phones
            </div>
          </a>
          <div className="productdetailspage__arrow" />
          {errorMsg.length !== 0
          && <p className="productdetailspage__error">{errorMsg}</p>}
          {!currentProduct && <NotFound />}
          <div className="productdetailspage__namepage">
            {currentProduct?.name}
          </div>
        </div>

        <div className="productdetailspage__boxarrowback">
          <div className="productdetailspage__arrow--back" />
          <a
            href="/#/phones"
            className="productdetailspage__link"
            data-cy="backButton"
          >
            <div
              className="productdetailspage__namepage"
            >
              Back
            </div>
          </a>
        </div>
        <h1 className="productdetailspage__title">
          {currentProduct?.name}
        </h1>

        <div className="productdetailspage__boxleftright">
          <div className="productdetailspage__boxleft">
            <div className="productdetailspage__boximg">
              <div>
                <ul className="productdetailspage__list">
                  {currentProductDetails?.images.map(item => (
                    <IconButton
                      sx={{
                        padding: 0,
                        marginBottom: '16px',
                      }}
                      onClick={() => {
                        setUrlImage(item);
                      }}
                    >
                      <li className="productdetailspage__littleimg">
                        <img
                          src={item}
                          alt={currentProductDetails.name}
                          className="productdetailspage__imageoflist"
                        />
                      </li>
                    </IconButton>
                  ))}
                </ul>
              </div>
              <div className="productdetailspage__boxmainimg">
                <img
                  src={urlImage.length === 0
                    ? `${currentProductDetails?.images[0]}`
                    : `${urlImage}`}
                  alt={currentProductDetails?.name}
                  className="productdetailspage__mainimg"
                />
              </div>
            </div>

            <div
              className="productdetailspage__boxtext"
              data-cy="productDescription"
            >
              <h2
                className="productdetailspage__abouttitle"
                data-cy="productDescription"
              >
                About
              </h2>
              <div className="productdetailspage__divider" />
              <h3 className="productdetailspage__aboutsubtitle">
                Description
              </h3>
              <p className="productdetailspage__text">
                {currentProductDetails?.description}
              </p>
              <h3 className="productdetailspage__aboutsubtitle">
                Additional Features
              </h3>
              <p className="productdetailspage__text">
                {currentProductDetails?.additionalFeatures}
              </p>
            </div>
          </div>

          <div className="productdetailspage__boxright">
            <div className="productdetailspage__box-price-phone">
              <h2 className="productdetailspage__current-price">
                $
                {currentPrice}
              </h2>
              <h2 className={currentProduct?.discount === 0
                ? 'productdetailspage__prev-price--none'
                : 'productdetailspage__prev-price'}
              >
                $
                {currentProduct?.price}
              </h2>
            </div>

            <div className="productdetailspage__box-buttons">
              <button
                type="button"
                className={isAddedProduct
                  // eslint-disable-next-line max-len
                  ? 'productdetailspage__addtocart--pressed productdetailspage__text-addtocart--pressed'
                  : 'productdetailspage__addtocart'}
                onClick={() => {
                  setIsAddedProduct(!isAddedProduct);
                  if (currentProduct) {
                    handlerSelectedToCart(currentProduct, currentProduct.id);
                  }
                }}
              >
                {isAddedProduct ? 'Selected' : 'Add to cart'}
              </button>
              <IconButton
                size="small"
                sx={{ padding: 0 }}
                onClick={() => {
                  setIsSelected(!isSelected);
                  handlerAddOrDelete();
                }}
              >
                <div className="productdetailspage__rectangle">
                  <div className={(currentProduct?.id
                  && isSelected)
                    ? 'productdetailspage__favorites_selected'
                    : 'productdetailspage__favorites'}
                  />
                </div>
              </IconButton>
            </div>

            <div className="productdetailspage__box-info">
              <div className="productdetailspage__screen-name">
                <p className="productdetailspage__text-features">Screen</p>
                <p className="productdetailspage__value-features">
                  {currentProduct?.screen}
                </p>
              </div>

              <div className="productdetailspage__capacity-name">
                <p className="productdetailspage__text-features">Capacity</p>
                <p className="productdetailspage__value-features">
                  {currentProduct?.capacity}
                </p>
              </div>

              <div className="productdetailspage__ram-name">
                <p className="productdetailspage__text-features">RAM</p>
                <p className="productdetailspage__value-features">
                  {currentProduct?.ram}
                </p>
              </div>
            </div>
            <h2 className="productdetailspage__abouttitle">Tech specs</h2>
            <div className="
              productdetailspage__divider
              productdetailspage__divider--right"
            />
            <div className="productdetailspage__techspecs">
              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  OS
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.android.os}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  UI
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.android.ui}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  Availability
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.availability.map(item => (
                    <p>{item}</p>
                  ))}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  StandbyTime
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.battery.standbyTime}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  TalkTime
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.battery.talkTime}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  Battery
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.battery.type}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  Camera Features
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.camera.features.map(item => (
                    <p>{item}</p>
                  ))}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  Camera Primary
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.camera.primary}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  Bluetooth
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.connectivity.bluetooth}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  GPS
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.connectivity.gps ? 'true' : 'false'}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  Infrared
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.connectivity.infrared
                    ? 'true'
                    : 'false'}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  Wi-Fi
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.connectivity.wifi}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  Screen Resolution
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.display.screenResolution}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  Screen Size
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.display.screenSize}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  Touch Screen
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.display.touchScreen
                    ? 'true'
                    : 'false'}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  Accelerometer
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.hardware.accelerometer
                    ? 'true'
                    : 'false'}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  FM Radio
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.hardware.fmRadio
                    ? 'true'
                    : 'false'}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  Physical Keyboard
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.hardware.physicalKeyboard
                    ? 'true'
                    : 'false'}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  USB
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.hardware.usb}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  CPU
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.hardware.cpu}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  AudioJack
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.hardware.audioJack}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  Dimensions
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.sizeAndWeight.dimensions.map(item => (
                    <p>{item}</p>
                  ))}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  Weight
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.sizeAndWeight.weight}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  Flash Storage
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.storage.flash}
                </p>
              </div>

              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">
                  RAM Storage
                </p>
                <p className="productdetailspage__value-techspecs">
                  {currentProductDetails?.storage.ram}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      {!currentProductDetails && <NotFound />}
      <MayLike />
      <Footer />
    </div>
  );
};
