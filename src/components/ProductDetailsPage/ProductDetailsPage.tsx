import React, { useContext, useEffect, useState } from 'react';
import './ProductDetailsPage.scss';
import { useLocation, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { getProductDetails, getProducts } from '../../api/api';
import { Item } from '../../types';
import ItemsWithCarusel from '../ItemsWithCarusel/ItemsWithCarusel';
import { DispatchContext, StateContext } from '../../StateProvider';

const ProductDetailsPage:React.FC = () => {
  const [detailPage, setDetailPage] = useState(null);
  const [alsoLike, setAlsoLike] = useState([]);
  const [product, setProduct] = useState<Item>();
  const [onError, setOnError] = useState(false);
  const [imgNumber, setImgNumber] = useState(0);

  const dispatch = useContext(DispatchContext);
  const { cartItems, favoriteItems } = useContext(StateContext);

  const addOrDeleteItemInCart = () => {
    dispatch({ type: 'addOrDeleteItemInCart', item: product });
  };

  const addOrDeleteItemInFavorite = () => {
    dispatch({ type: 'addOrDeleteItemInFavorite', item: product });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const navigate = useNavigate();
  const getLocation = useLocation();

  const goBack = () => navigate(-1);
  const handleImgPage = (ind: number) => {
    setImgNumber(ind);
  };

  const urlArray = getLocation.pathname.split('/');
  const page = urlArray[1];
  const id = urlArray[urlArray.indexOf(page) + 1];

  const handleGetItems = async () => {
    try {
      const response = await getProducts();

      if (response.status === 200) {
        const allPhones = response.data;

        const dataWithPhones = allPhones.find((item: Item) => item.id === id);
        const alsoLikeItems
          = allPhones.sort(() => 0.5 - Math.random());

        setAlsoLike(alsoLikeItems);
        setProduct(dataWithPhones);
      }
    } catch {
      throw new Error('error');
    }
  };

  useEffect(() => {
    handleGetItems();
  }, [id]);

  useEffect(() => {
    scrollToTop();
  }, [product]);

  const getDetailFromItem = async (productId: string) => {
    try {
      const response = await getProductDetails(productId);

      if (response.status === 200) {
        const { data } = response;

        setDetailPage(data);
        setOnError(false);
      }
    } catch {
      setOnError(true);
    }
  };

  useEffect(() => {
    getDetailFromItem(id);
  }, [id]);

  if (!detailPage || !product) {
    return (
      <p>detailPage is null</p>
    );
  }

  const checkInCart = cartItems.some((item: Item) => {
    return item.id === product.id;
  });

  const checkInFavorites = favoriteItems.some((item: Item) => {
    return item.id === product.id;
  });

  const {
    name,
    price,
    discount,
    screen,
    ram,
  } = product;
  const { images }: { images: string[] } = detailPage;

  const {
    display: { screenResolution },
  } : {
    display: { screenResolution: string }
  } = detailPage;

  const { description }: { description: string } = detailPage;
  const { storage: { flash } }: { storage: { flash: string } } = detailPage;
  const { hardware: { cpu } }: { hardware: { cpu: string } } = detailPage;
  const { camera: { primary } }: { camera: { primary: string } } = detailPage;
  const {
    connectivity: { fmRadio },
  } : {
    connectivity: { fmRadio: string }
  } = detailPage;

  const priceWithDiscount = price - ((price / 100) * discount);

  return (
    <div className="productDetailsPage container">
      <div className="productDetailsPage__btn-wrap">
        <NavLink to="/home">
          <div className="productDetailsPage__go-to-home" />
        </NavLink>

        <div className="productDetailsPage__arrow" />
        <NavLink to={`/${page}`}>
          <span className="productDetailsPage__btn-text">{page}</span>
        </NavLink>
        <div className="productDetailsPage__arrow" />
        <span className="productDetailsPage__btn-text">{id}</span>
      </div>

      <div
        role="link"
        tabIndex={0}
        className="productDetailsPage__go-back-link"
        onClick={goBack}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            goBack();
          }
        }}
      >
        <div className="productDetailsPage__go-back-img" />
        <span className="productDetailsPage__go-back-text">Back</span>
      </div>
      <h4 className="productDetailsPage__title">{name}</h4>

      <div className="productDetailsPage__top">
        <div className="productDetailsPage__imgs">
          <div className="productDetailsPage__imgs-small">
            {images.map(
              (item: string, ind: number) => (
                <div
                  className={classNames(
                    'productDetailsPage__img-wrap',
                    { 'productDetailsPage__img-wrap--act': imgNumber === ind },
                  )}
                  key={item}
                >
                  <input
                    type="image"
                    src={item}
                    alt="photo"
                    className="productDetailsPage__img-small"
                    onClick={() => handleImgPage(ind)}
                  />
                </div>
              ),
            )}
          </div>
          <input
            type="image"
            src={images[imgNumber]}
            alt="photo"
            className="productDetailsPage__img-big"
          />
        </div>

        <div className="productDetailsPage__info">
          <div className="productDetailsPage__allPrice">
            <span className="productDetailsPage__price">
              {`$${priceWithDiscount}`}
            </span>
            {discount > 0 && (
              <span className="productDetailsPage__discount">
                {`$${price}`}
              </span>
            )}
          </div>

          <div className="productDetailsPage__btns">
            <button
              type="button"
              className={classNames(
                'productDetailsPage__btn',
                { 'productDetailsPage__btn--act': checkInCart },
              )}
              onClick={addOrDeleteItemInCart}
            >
              Add to cart
            </button>

            <i
              role="button"
              aria-label="btn-like"
              tabIndex={0}
              className={classNames(
                'productDetailsPage__btn-like',
                { 'productDetailsPage__btn-like--act': checkInFavorites },
              )}
              onClick={addOrDeleteItemInFavorite}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  addOrDeleteItemInFavorite();
                }
              }}
            />
          </div>

          <div className="productDetailsPage__params">
            <div className="productDetailsPage__param">
              <span className="productDetailsPage__param-title">
                Screen
              </span>
              <span
                className="productDetailsPage__param-value"
              >
                {screen || '-'}
              </span>
            </div>

            <div className="productDetailsPage__param">
              <span className="productDetailsPage__param-title">
                Resolution
              </span>
              <span className="productDetailsPage__param-value">
                {screenResolution || '-'}
              </span>
            </div>

            <div className="productDetailsPage__param">
              <span className="productDetailsPage__param-title">
                RAM
              </span>
              <span className="productDetailsPage__param-value">
                {ram || '-'}
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="productDetailsPage__main">
        <div className="productDetailsPage__about">
          <h3 className="productDetailsPage__main-title">
            About
          </h3>
          <div className="productDetailsPage__line" />
          <p className="productDetailsPage__main-text">{description}</p>
        </div>
        <div className="productDetailsPage__tech-specs">
          <h3 className="productDetailsPage__main-title">
            Tech specs
          </h3>
          <div className="productDetailsPage__line" />
          <div className="productDetailsPage__tech-specs-items">
            <div className="productDetailsPage__tech-specs-item">
              <span
                className="productDetailsPage__tech-specs-title"
              >
                Screen
              </span>
              <span
                className="productDetailsPage__tech-specs-value"
              >
                {screen || '-'}
              </span>
            </div>

            <div className="productDetailsPage__tech-specs-item">
              <span
                className="productDetailsPage__tech-specs-title"
              >
                Resolution
              </span>
              <span
                className="productDetailsPage__tech-specs-value"
              >
                {screenResolution || '-'}
              </span>
            </div>

            <div className="productDetailsPage__tech-specs-item">
              <span
                className="productDetailsPage__tech-specs-title"
              >
                Processor
              </span>
              <span
                className="productDetailsPage__tech-specs-value"
              >
                {cpu || '-'}
              </span>
            </div>

            <div className="productDetailsPage__tech-specs-item">
              <span
                className="productDetailsPage__tech-specs-title"
              >
                RAM
              </span>
              <span
                className="productDetailsPage__tech-specs-value"
              >
                {ram || '-'}
              </span>
            </div>

            <div className="productDetailsPage__tech-specs-item">
              <span
                className="productDetailsPage__tech-specs-title"
              >
                Built in memory
              </span>
              <span
                className="productDetailsPage__tech-specs-value"
              >
                {flash || '-'}
              </span>
            </div>

            <div className="productDetailsPage__tech-specs-item">
              <span
                className="productDetailsPage__tech-specs-title"
              >
                Camera
              </span>
              <span
                className="productDetailsPage__tech-specs-value"
              >
                {primary || '-'}
              </span>
            </div>

            <div className="productDetailsPage__tech-specs-item">
              <span
                className="productDetailsPage__tech-specs-title"
              >
                FM radio
              </span>
              <span
                className="productDetailsPage__tech-specs-value"
              >
                {fmRadio ? 'yes' : 'no'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ItemsWithCarusel items={alsoLike} title="You may also like" />

      {onError && (
        <p>eroor!!!</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;
