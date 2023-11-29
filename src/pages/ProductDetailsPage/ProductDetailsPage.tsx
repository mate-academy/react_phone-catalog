import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BackButton } from '../../components/BackButton/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { fetchProductDetails } from '../../features/productDetailsSlice';
import './ProductDetailsPage.scss';
import { Loader } from '../../components/Loader/Loader';
import { Product } from '../../types/Product';
import { fetchProducts } from '../../features/productsSlice';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { getSuggestedProducts } from '../../helpers/getSuggestions';
// eslint-disable-next-line max-len
import { addFavoriteProduct, removeFavoriteProduct } from '../../features/favoritesSlice';
import { addCartItem, removeCartItem } from '../../features/cartSlice';

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product | undefined>();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const { products, loading } = useAppSelector((state) => state.products);

  const { favorites } = useAppSelector(state => state.favorites);
  const { cart } = useAppSelector(state => state.cart);

  const { productDetails, loadingDetails } = useAppSelector(
    (state) => state.productDetails,
  );

  const { productId = '' } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, []);

  useEffect(() => {
    const foundProduct = products.find((item) => item.id === productId);

    setProduct(foundProduct);
  }, [products, productId]);

  const discountPrice = useMemo(() => {
    return product?.price
      ? product.price - (product.price * (product.discount || 0)) / 100
      : 0;
  }, [product]);

  useEffect(() => {
    if (products.length && product) {
      setSuggestedProducts(getSuggestedProducts(products, productId, 8));
    }
  }, [products, product]);

  const [currentImg, setCurrentImg] = useState<string | undefined>();
  const colors = [
    ['#FCDBC1', 'Beige'],
    ['#5F7170', 'Green'],
    ['#4C4C4C', 'Grey'],
    ['#F0F0F0', 'White'],
  ];
  const capacity = [64, 256, 512];
  const [currentColor, setCurrentColor] = useState<string | string[]>(
    colors[0][1],
  );
  const [currentCapacity, setCurrentCapacity] = useState(capacity[0]);

  useEffect(() => {
    setCurrentImg(productDetails?.images[0]);
  }, [productDetails?.images]);

  const isFavorite = useMemo(() => {
    const foundProduct = products.find((item) => item.id === productId);

    return favorites.some(item => item.id === foundProduct?.id);
  }, [favorites, products]);

  const isCart = useMemo(() => {
    const foundProduct = products.find((item) => item.id === productId);

    return cart.some(item => item.id === foundProduct?.id);
  }, [cart, products]);

  const addToFavorites = () => {
    if (!isFavorite) {
      dispatch(addFavoriteProduct(product as Product));
    } else {
      dispatch(removeFavoriteProduct(product as Product));
    }
  };

  const addToCart = () => {
    if (product) {
      const item = {
        id: product.id,
        title: product.name,
        imageUrl: product.imageUrl,
        price: product.price * ((100 - product.discount) / 100),
        color: currentColor as string,
        capacity: currentCapacity,
        quantity: 1,
      };

      if (!isCart) {
        dispatch(addCartItem(item));
      } else {
        dispatch(removeCartItem(item));
      }
    }
  };

  return (
    <main className="details-page">
      {loading || loadingDetails ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs />
          <BackButton />

          {productDetails && product && (
            <section className="details">
              <h1 className="details__title">{productDetails?.name}</h1>
              <div className="details__top">
                <div className="details__images-list">
                  <div className="details__images">
                    {productDetails?.images.map((imageUrl) => (
                      <div
                        role="button"
                        key={imageUrl}
                        className={classNames('details__image', {
                          active: imageUrl === currentImg,
                        })}
                        onClick={() => setCurrentImg(imageUrl)}
                        onKeyPress={() => {}}
                        tabIndex={-1}
                      >
                        <img
                          src={imageUrl}
                          alt="photoLittle"
                          className="details__img-little"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="details__img-current">
                    <img
                      src={currentImg}
                      alt="phone"
                      className="details__img-big"
                    />
                  </div>
                </div>
                <div className="details__info">
                  <div className="details__colors">
                    <h3 className="details__subTitle">Available colors</h3>
                    <div className="details__select__container">
                      {colors.map((color) => (
                        <button
                          key={color[0]}
                          className={classNames('details__colors__button', {
                            active: color[1] === currentColor,
                          })}
                          type="button"
                          onClick={() => setCurrentColor(color[1])}
                        >
                          <div
                            className="details__colors__backGround"
                            style={{ backgroundColor: color[0] }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="details__capacity">
                    <h3 className="details__subTitle">Select capacity</h3>
                    <div className="details__select__container">
                      {capacity.map((el) => (
                        <button
                          key={el}
                          type="button"
                          onClick={() => setCurrentCapacity(el)}
                          className={classNames('details__capacity__btn', {
                            'details__capacity__btn-active':
                              currentCapacity === el,
                          })}
                        >
                          {`${el} GB`}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="details__price-container">
                    {product?.discount ? (
                      <>
                        <div className="details__price">{`$${discountPrice}`}</div>
                        <div className="details__price details__price-crossed">{`$${product?.price}`}</div>
                      </>
                    ) : (
                      <div className="details__price">{`$${product?.price}`}</div>
                    )}
                  </div>

                  <div className="details__button">
                    <button
                      type="button"
                      className={classNames('details__button-add', {
                        'details__button-add--active': isCart,
                      })}
                      onClick={addToCart}
                    >
                      {isCart ? 'Added to cart' : 'Add to cart'}
                    </button>
                    <button
                      type="button"
                      className="details__button-favorite"
                      data-cy="addToFavorite"
                      onClick={addToFavorites}
                    >
                      <span
                        className={classNames('icon', {
                          'icon--favorites': !isFavorite,
                          'icon--favorites--red': isFavorite,
                        })}
                      />
                    </button>
                  </div>

                  <div className="details__spec">
                    <div className="details__spec__list">
                      <span className="details__spec__name">Screen</span>
                      <span className="details__spec__name">Resolution</span>
                      <span className="details__spec__name">Processor</span>
                      <span className="details__spec__name">RAM</span>
                    </div>
                    <div className="details__spec__list">
                      <span className="details__spec__value">
                        {productDetails?.display.screenSize}
                      </span>
                      <span className="details__spec__value">
                        {productDetails?.display.screenResolution}
                      </span>
                      <span className="details__spec__value">
                        {productDetails?.hardware.cpu}
                      </span>
                      <span className="details__spec__value">
                        {productDetails?.storage.ram}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="details__bottom">
                <div className="details__about">
                  <h3 className="details__heading">About</h3>
                  <div className="details__description">
                    {productDetails?.description}
                  </div>
                </div>

                <div className="details__techSpecs">
                  <h3 className="details__heading">Tech Specs</h3>
                  <div className="details__techSpecs__container">
                    <div className="details__spec__list">
                      <span className="details__spec__name">Screen</span>
                      <span className="details__spec__name">Resolution</span>
                      <span className="details__spec__name">Processor</span>
                      <span className="details__spec__name">RAM</span>
                      <span className="details__spec__name">Battery</span>
                      <span className="details__spec__name">Camera</span>
                      <span className="details__spec__name">Weight</span>
                    </div>
                    <div className="details__spec__list">
                      <span className="details__spec__value">
                        {productDetails?.display.screenSize}
                      </span>
                      <span className="details__spec__value">
                        {productDetails?.display.screenResolution}
                      </span>
                      <span className="details__spec__value">
                        {productDetails?.hardware.cpu}
                      </span>
                      <span className="details__spec__value">
                        {productDetails?.storage.ram}
                      </span>
                      <span className="details__spec__value">
                        {productDetails?.battery.type}
                      </span>
                      <span className="details__spec__value">
                        {productDetails?.camera.primary}
                      </span>
                      <span className="details__spec__value">
                        {productDetails?.sizeAndWeight.weight}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <ProductSlider
            products={suggestedProducts}
            title="You may also like"
          />
        </>
      )}
    </main>
  );
};
