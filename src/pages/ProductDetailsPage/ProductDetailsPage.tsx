import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import Home from '../../images/Home.svg';
import Vec_light_right from '../../images/homePage/Vec_light_right.svg';
import Arrow_Left from '../../images/homePage/Arrow_Left.svg';
import Favorites from '../../images/homePage/Favorites.svg';
import redHeart from '../../images/homePage/redHeart.svg';
import { PRODUCTS_COLORS } from '../../utils/colors';
import './ProductDetailsPage.scss';
import { YouMayAlsoLike } from '../../components/Blocks/YouMayAlsoLike';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TabAccessPhone } from '../../types/tabAccessPhones';
import {
  selectedInfoProduct,
  setProductInfo,
} from '../../features/productInfoSlice';
import { useLocalStorage } from '../../LocaleStorage/LocaleStorage';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { actions as favActions } from '../../features/favSlice';
import { actions as cartActions, removeProduct } from '../../features/cartSlice';
import { Loader } from '../../components/Loader';

export const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectedInfoProduct);
  const { phones, tablets, accessories } = useAppSelector(
    state => state.products,
  );
  const { cartProducts } = useAppSelector(state => state.cartItems);
  const { favProducts } = useAppSelector(state => state.favourites);

  const { productId } = useParams();

  const [choosenProduct, setChoosenProduct] = useLocalStorage<
    TabAccessPhone | undefined
  >('product', undefined);
  const location = useLocation();
  const paths = location.pathname.split('/').filter(path => path);
  const x = location.pathname.split('-');

  const itemColor = x[x.length - 1];
  const itemCapacity = x[x.length - 2];

  const [currentImage, setCurrentImage] = useState<string>('');
  const [imageError, setImageError] = useState('');
  const [loader, setLoader] = useState(false)

  const allProducts: TabAccessPhone[] = phones.concat(tablets, accessories);

  useEffect(
    () => setChoosenProduct(allProducts.find(item => item.id === productId)),
    [productId, allProducts, setChoosenProduct],
  );

  useEffect(() => {
    setLoader(true)
    if (choosenProduct) {
      dispatch(setProductInfo(choosenProduct));
    }
    setLoader(false);
  }, [dispatch, choosenProduct]);

  if (!product) {
    return <NotFoundPage />;
  }

  const favClick = favProducts.find(item => item.id === choosenProduct?.id);
  const cartClick = cartProducts.find(item => item.product.id === choosenProduct?.id);

  const handleFavClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    prod: TabAccessPhone,
  ) => {
    event.preventDefault();

    if (!favClick) {
      dispatch(favActions.addProduct(prod));
    } else {
      dispatch(favActions.removeProduct(prod));
    }
  };

  const handleCartClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    prod: TabAccessPhone,
  ) => {
    event.preventDefault();

    if (!cartClick) {
      dispatch(cartActions.addProduct(prod));
    } else {
      dispatch(removeProduct(prod.id));
    }
  };

  const handleCurrentImg = (image: string) => {
    setCurrentImage(image);
  };

  const handleNextImg = () => {
    const index = product.images.indexOf(currentImage);

    if (!product?.images.length) {
      setImageError('No photo yet');
    } else if (!currentImage) {
      setCurrentImage(product.images[1]);
    } else if (index === product.images.length - 1) {
      setCurrentImage(product.images[0]);
    } else {
      setCurrentImage(product.images[index + 1]);
    }
  };

  const capacityModify = (item: string) => {
    return item.toLocaleLowerCase();
  };

  const itemToUpperCase = (item: string) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  };

  function goBack() {
    window.history.back();
  }

  return (
    <>
      <div className="details">
        <div className="details__center">
          <div className="details__container">
            <div className="details__breadcrumbs">
              <NavLink to="/" className="details__homeLink">
                <img src={Home} alt="home" className="details__homeImg" />
              </NavLink>
              <img
                src={Vec_light_right}
                alt="Vector_light_right"
                className="details__arrow-right"
              />
              <NavLink to={`/${paths[0]}`} className="details__pathsLink">
                <div className="details__paths">
                  {itemToUpperCase(paths[0])}
                </div>
              </NavLink>
              <img
                src={Vec_light_right}
                alt="Vector_light_right"
                className="details__arrow-right"
              />
              <div className="details__nameCurrent">{product.name}</div>
            </div>
            <div className="details__buttonBack">
              <button onClick={goBack} className="details__buttonBack__click">
                <img
                  src={Arrow_Left}
                  alt="back"
                  className="details__buttonBack__img"
                />
                <div className="details__buttonBack__name">Back</div>
              </button>
            </div>
          </div>
          {loader 
          ? <Loader/>
          : <div className="details__product grid grid--tablet">
            <h1
              className="details__product__name
              grid__item--tablet-1-9
              grid__item--desktop-1-19"
            >
              {product?.name}
            </h1>
            <div
              className="details__product__mainImg
            grid__item--tablet-2-5
            grid__item--desktop-3-12"
            >
              <img
                src={currentImage ? currentImage : product.images[0]}
                alt={product?.category}
                className="details__product__img"
                onClick={handleNextImg}
              />
            </div>
            <div
              className="details__product__selectImg
                grid__item--tablet-1-1
                grid__item--desktop-1-2"
            >
              {product.images
                ? product.images.map((image: string, index: number) => {
                    return (
                      <div key={index}>
                        <img
                          src={image}
                          alt={product?.category}
                          className="details__product__image"
                          onClick={() => handleCurrentImg(image)}
                        />
                      </div>
                    );
                  })
                : imageError}
            </div>
            <div
              className="details__product__options 
              grid__item--tablet-7-12
              grid__item--desktop-14-20"
            >
              <div className="details__product__colorsContainer">
                <div className="details__product__itemHead">
                  Avaliable colors
                </div>
                <ul className="details__product__colorsVariants">
                  {product?.colorsAvailable.map((color: string, index) => {
                    return (
                      <Link
                        to={`/${paths[0]}/${product.namespaceId}-${itemCapacity}-${color}`}
                        key={index}
                        style={{ backgroundColor: PRODUCTS_COLORS[color] }}
                        className="details__product__colorOption"
                      ></Link>
                    );
                  })}
                </ul>
                <div className="details__product__line"></div>
              </div>
              <div className="details__product__capacityContainer">
                <div className="details__product__itemHead">
                  Select capacity
                </div>
                <ul className="details__product__capacityVariants">
                  {product?.capacityAvailable.map((capacity: string, index) => {
                    return (
                      <Link
                        to={`/${paths[0]}/${product.namespaceId}-${capacityModify(capacity)}-${itemColor}`}
                        key={index}
                        className="details__product__capacityOption"
                      >
                        {capacity}
                      </Link>
                    );
                  })}
                </ul>
                <div className="details__product__line"></div>
              </div>
              <div className="details__product__priceContainer">
                <div className="details__product__priceBlock">
                  <div className="details__product__price">
                    ${product?.priceRegular}
                  </div>
                  <div className="details__product__priceDiscount">
                    ${product?.priceDiscount}
                  </div>
                </div>
                <div className="details__product__buttonContainer">
                  <button
                    className="details__product__buttonAdd"
                    style={
                      cartClick
                        ? { color: '#27AE60', backgroundColor: '#fff' }
                        : { color: '#fff', backgroundColor: '#313237' }
                    }
                    onClick={event => handleCartClick(event, product)}
                  >
                    {cartClick ? 'Added to cart' : 'Add to cart'}
                  </button>
                  <button
                    className="details__product__buttonFavorite"
                    style={
                      favClick
                        ? { border: '1px solid #E2E6E9' }
                        : { border: '1px solid #B4BDC3' }
                    }
                    onClick={event => handleFavClick(event, product)}
                  >
                    <img
                      src={favClick ? redHeart : Favorites}
                      alt="favorites"
                      className="details__product__buttonImg"
                    />
                  </button>
                </div>
                <div className="details__description">
                  <div className="details__description__name">
                    <div className="details__description__item">Screen</div>
                    <div className="details__description__model">
                      {product?.screen}
                    </div>
                  </div>
                  <div className="details__description__name">
                    <div className="details__description__item">Resolution</div>
                    <div className="details__description__model">
                      {product?.resolution}
                    </div>
                  </div>
                  <div className="details__description__name">
                    <div className="details__description__item">Processor</div>
                    <div className="details__description__model">
                      {product?.processor}
                    </div>
                  </div>
                  <div className="details__description__name">
                    <div className="details__description__item">RAM</div>
                    <div className="details__description__model">
                      {product?.ram}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
          <div className="details__section">
            <div
              className="details__section__descript
            details__section__descript--about"
            >
              <h2 className="details__section__head">About</h2>
              <div className="details__section__line"></div>
              {product?.description.map((p, index) => (
                <div className="details__section__aboutItem" key={index}>
                  <h3 className="details__section__aboutMain">{p.title}</h3>

                  <p className="details__section__paragraph">{p.text}</p>
                </div>
              ))}
            </div>
            <div className="details__section__descript">
              <div className="details__section__head">Tech specs</div>
              <div className="details__section__line"></div>
              <div className="details__section__item">
                <div className="details__section__name">Screen</div>
                <div className="details__section__model">{product?.screen}</div>
              </div>
              <div className="details__section__item">
                <div className="details__section__name">Resolution</div>
                <div className="details__section__model">
                  {product?.resolution}
                </div>
              </div>
              <div className="details__section__item">
                <div className="details__section__name">Processor</div>
                <div className="details__section__model">
                  {product?.processor}
                </div>
              </div>
              <div className="details__section__item">
                <div className="details__section__name">RAM</div>
                <div className="details__section__model">{product?.ram}</div>
              </div>
              <div className="details__section__item">
                <div className="details__section__name">Built in memory</div>
                <div className="details__section__model">
                  {product?.capacity}
                </div>
              </div>
              <div className="details__section__item">
                <div className="details__section__name">Camera</div>
                <div className="details__section__model">{product?.camera}</div>
              </div>
              <div className="details__section__item">
                <div className="details__section__name">Zoom</div>
                <div className="details__section__model">{product?.zoom}</div>
              </div>
              <div className="details__section__item">
                <div className="details__section__name">Cell</div>
                <div className="details__section__model">{product?.cell}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="details__like">
        <div className="details__like__container">
          <YouMayAlsoLike />
        </div>
      </div>
    </>
  );
};
