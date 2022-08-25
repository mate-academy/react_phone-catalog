import { useState } from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import './ProductDetailsPage.scss';
import { Product } from '../../react-app-env';
// import { NotFound } from '../../components/NotFound/NotFound';
import data from '../../api/products/dell-streak-7.json';
import {
  getFavoritesSelector,
  getSelectedCartSelector,
} from '../../store/selectors';
import products from '../../api/products.json';
import {
  delFavorites,
  delFromCart,
  setFavorites,
  setSelectedCart,
} from '../../store/actions';
import { MayLike } from '../../components/Main/MayLike/MayLike';

export const ProductDetailsPage = () => {
  const currentProduct: Product | undefined = products
    .find(el => el.id === 'motorola-xoom-with-wi-fi');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [urlImage, setUrlImage] = useState(data.images[0]);
  const currentFavorite = useSelector(getFavoritesSelector);
  const currentSelectedCart = useSelector(getSelectedCartSelector);
  let currentPrice = 0;

  if (currentProduct) {
    currentPrice = currentProduct.price
    * (1 - currentProduct.discount / 100);
  }

  const [isSelected, setIsSelected] = useState(false);
  const [isAddedProduct, setIsAddedProduct] = useState(false);

  const handlerSelectedToCart = (obj: Product, index: string) => {
    if (currentSelectedCart.some(item => item.id === index)) {
      if (obj) {
        dispatch(delFromCart(obj));
      }
    }

    if (obj) {
      dispatch(setSelectedCart(obj));
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
        <div className="productdetailspage__boximghomearrow">
          <IconButton
            color="inherit"
            sx={{
              padding: '0',
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            <div
              className="productdetailspage__imghome"
            />
          </IconButton>

          <div className="productdetailspage__arrow" />
          <a href="/phones" className="productdetailspage__link">
            <div
              className="productdetailspage__namecategory"
            >
              Phones
            </div>
          </a>
          <div className="productdetailspage__arrow" />
          <div className="productdetailspage__namepage">
            Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
          </div>
        </div>

        <div className="productdetailspage__boxarrowback">
          <div className="productdetailspage__arrow--back" />
          <a href="/phones" className="productdetailspage__link">
            <div
              className="productdetailspage__namepage"
            >
              Back
            </div>
          </a>
        </div>
        <h1 className="productdetailspage__title">
          Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
        </h1>

        <div className="productdetailspage__boxleftright">
          <div className="productdetailspage__boxleft">
            <div className="productdetailspage__boximg">
              <div>
                <ul className="productdetailspage__list">
                  {data.images.map(item => (
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
                          alt=""
                          className="productdetailspage__imageoflist"
                        />
                      </li>
                    </IconButton>
                  ))}

                </ul>
              </div>
              <div className="productdetailspage__boxmainimg">
                <img
                  src={urlImage}
                  alt=""
                  className="productdetailspage__mainimg"
                />
              </div>
            </div>

            <div
              className="productdetailspage__boxtext"
              data-cy="productDescription"
            >
              <h2 className="productdetailspage__abouttitle">About</h2>
              <div className="productdetailspage__divider" />
              <h3 className="productdetailspage__aboutsubtitle">
                And then there was Pro
              </h3>
              <p className="productdetailspage__text">
                A transformative triple‑camera system that adds tons of
                capability without complexity. An unprecedented leap in
                battery life. And a mind‑blowing chip that doubles
                down on machine learning and pushes the boundaries of what a
                smartphone can do. Welcome to the first iPhone powerful
                enough to be called Pro.
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
                <p className="productdetailspage__value-features">screen</p>
              </div>

              <div className="productdetailspage__capacity-name">
                <p className="productdetailspage__text-features">Capacity</p>
                <p className="productdetailspage__value-features">capacity</p>
              </div>

              <div className="productdetailspage__ram-name">
                <p className="productdetailspage__text-features">RAM</p>
                <p className="productdetailspage__value-features">ram</p>
              </div>
            </div>
            <h2 className="productdetailspage__abouttitle">Tech specs</h2>
            <div className="
              productdetailspage__divider
              productdetailspage__divider--right"
            />
            <div className="productdetailspage__techspecs">
              <div className="productdetailspage__techspecs-name">
                <p className="productdetailspage__text-techspecs">Screen</p>
                <p className="productdetailspage__value-techspecs">screen</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* {!onlyPhones.length && <NotFound />} */}
      <MayLike />
      <Footer />
    </div>
  );
};
