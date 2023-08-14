/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

import { FavContext } from '../../providers/FavProvider/FavProvider';

import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { BackButton } from '../../components/BackButton/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { CartContext } from '../../providers/CartProvider/CartProvider';
import { AddToCartButton }
  from '../../components/AddToCartButton/AddToCartButton';
import { AddToFavButton } from '../../components/AddToFavButton/AddToFavButton';
import { Popup } from '../../components/Popup/Popup';
import { NoResults } from '../../components/NoResults/NoResults';

import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { getDiscount } from '../../helpers/getDiscount';
import { useDisableScrollOnPopup } from '../../helpers/useDisableScrollOnPopup';

import './ProductDetailsPage.scss';

type Props = {
  products: Product[];
};

export const ProductDetailsPage: React.FC<Props> = React.memo(
  ({ products }) => {
    const location = useLocation();
    const propsData: ProductDetails = location.state;

    const [currentImage, setCurrentImage] = useState(propsData?.images[0]);
    const [currentProduct, setCurrentProduct] = useState<Product>();
    const [showPopup, setShowPopup] = useState(false);

    const { productsInCart, setProductsInCart } = useContext(CartContext);
    const { favoriteProducts, setFavoriteProducts } = useContext(FavContext);

    const getCurrentProduct = () => {
      const prod = products.find((product) => product.id === propsData?.id);

      setCurrentProduct(prod);
    };

    useEffect(() => {
      if (propsData?.images[0] !== currentImage) {
        setCurrentImage(propsData?.images[0]);
      }
    }, [propsData?.images]);

    useEffect(() => {
      if (
        products && (!currentProduct || currentProduct?.id !== propsData?.id)
      ) {
        getCurrentProduct();
      }
    }, [currentProduct, products, propsData?.id]);

    const discountedPrice = currentProduct && getDiscount(
      currentProduct.price,
      currentProduct.discount,
    );

    const isItemInCart = productsInCart.some(
      (cartItem) => cartItem.id === propsData?.id,
    );

    const handleAddToCart = () => {
      if (isItemInCart) {
        const updatedCart = productsInCart.filter(
          (cartItem) => cartItem.id !== propsData?.id,
        );

        setProductsInCart(updatedCart);

        return;
      }

      if (currentProduct) {
        const newProd = {
          ...currentProduct,
          quantity: 1,
        };

        setProductsInCart([...productsInCart, newProd]);
      }
    };

    const isItemFav = favoriteProducts.some(
      (favProd) => favProd.id === propsData?.id,
    );

    const handleAddToFavorites = () => {
      if (isItemFav) {
        const updatedFavorites = favoriteProducts.filter(
          (favProd) => favProd.id !== propsData?.id,
        );

        setFavoriteProducts(updatedFavorites);

        return;
      }

      if (currentProduct) {
        setFavoriteProducts([...favoriteProducts, currentProduct]);
      }
    };

    const handleShowPopup = () => {
      setShowPopup((prev) => !prev);
    };

    useDisableScrollOnPopup(showPopup);

    const suggestedProducts = useMemo(() => {
      const shuffledProducts = [...products].sort(() => Math.random() - 0.5);

      return shuffledProducts.filter((prod) => prod.id !== currentProduct?.id);
    }, [products, currentProduct]);

    return (
      <div className="ProductDetailsPage">
        <div className="container">
          {currentProduct || location.state ? (
            <div className="ProductDetailsPage__content">
              <Breadcrumbs />

              <BackButton />

              <h1 className="ProductDetailsPage__title">{propsData?.name}</h1>

              <div className="ProductDetailsPage__main">
                <ul className="ProductDetailsPage__list">
                  {propsData?.images.map((image) => (
                    <li
                      key={image}
                      className="ProductDetailsPage__photo"
                      onClick={() => setCurrentImage(image)}
                    >
                      <img
                        className="ProductDetailsPage__photo-img"
                        src={image}
                        alt="product img"
                      />
                    </li>
                  ))}
                </ul>

                <div className="ProductDetailsPage__current">
                  <img
                    src={currentImage}
                    alt="main img"
                    className="ProductDetailsPage__current-img"
                  />
                </div>

                <div className="ProductDetailsPage__characteristics">
                  <div className="ProductDetailsPage__colors colors">
                    <div className="colors__text">Available colors</div>
                    <div className="colors__list">
                      <button
                        className="colors__link colors__link-active"
                        type="button"
                        onClick={handleShowPopup}
                      >
                        <div
                          className="colors__link-color colors__link-color--1"
                        />
                      </button>
                      <button
                        className="colors__link"
                        type="button"
                        onClick={handleShowPopup}
                      >
                        <div
                          className="colors__link-color colors__link-color--2"
                        />
                      </button>
                      <button
                        className="colors__link"
                        type="button"
                        onClick={handleShowPopup}
                      >
                        <div
                          className="colors__link-color colors__link-color--3"
                        />
                      </button>
                      <button
                        className="colors__link"
                        type="button"
                        onClick={handleShowPopup}
                      >
                        <div
                          className="colors__link-color colors__link-color--4"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="ProductDetailsPage__capacities capacities">
                    <div className="capacities__text">Select capacity</div>
                    <div className="capacities__list">
                      <button
                        type="button"
                        onClick={handleShowPopup}
                        className="capacities__link capacities__link-active"
                      >
                        64 GB
                      </button>
                      <button
                        type="button"
                        onClick={handleShowPopup}
                        className="capacities__link"
                      >
                        256 GB
                      </button>
                      <button
                        type="button"
                        onClick={handleShowPopup}
                        className="capacities__link"
                      >
                        512 GB
                      </button>
                    </div>
                  </div>
                  <div className="ProductDetailsPage__price price">
                    <div className="price__normal">{`$${discountedPrice}`}</div>

                    {currentProduct && currentProduct?.discount > 0 && (
                      <div className="price__without-discount">{`$${currentProduct.price}`}</div>
                    )}
                  </div>
                  <div className="ProductDetailsPage__buttons buttons">
                    <AddToCartButton
                      handleAddToCart={handleAddToCart}
                      id={propsData?.id}
                    />
                    <AddToFavButton
                      handleAddToFavorites={handleAddToFavorites}
                      isItemFav={isItemFav}
                    />
                  </div>
                  <div className="ProductDetailsPage__details details">
                    <div className="details__item">
                      <div className="details__name">Screen</div>
                      <div className="details__value">
                        {propsData?.display.screenSize}
                      </div>
                    </div>
                    <div className="details__item">
                      <div className="details__name">Resolution</div>
                      <div className="details__value">
                        {propsData?.display.screenResolution}
                      </div>
                    </div>
                    <div className="details__item">
                      <div className="details__name">Processor</div>
                      <div className="details__value">
                        {propsData?.hardware.cpu}
                      </div>
                    </div>
                    <div className="details__item">
                      <div className="details__name">RAM</div>
                      <div className="details__value">
                        {propsData?.storage.ram}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ProductDetailsPage__id">
                  <div className="ProductDetailsPage__id-name">ID:</div>
                  <div className="ProductDetailsPage__id-value">
                    {propsData?.id}
                  </div>
                </div>
              </div>

              <div className="ProductDetailsPage__info">
                <div
                  className="ProductDetailsPage__about about"
                  data-cy="productDescription"
                >
                  <h2 className="about__title">About</h2>

                  <div className="about__description">
                    {propsData?.description}
                  </div>
                </div>

                <div className="ProductDetailsPage__tech tech">
                  <h2 className="tech__title">Tech specs</h2>

                  <div className="tech__details details">
                    <div className="details__item details__item--tech">
                      <div className="details__name">Screen</div>
                      <div className="details__value">
                        {propsData?.display.screenSize}
                      </div>
                    </div>
                    <div className="details__item details__item--tech">
                      <div className="details__name">Resolution</div>
                      <div className="details__value">
                        {propsData?.display.screenResolution}
                      </div>
                    </div>
                    <div className="details__item details__item--tech">
                      <div className="details__name">Processor</div>
                      <div className="details__value">
                        {propsData?.hardware.cpu}
                      </div>
                    </div>
                    <div className="details__item details__item--tech">
                      <div className="details__name">RAM</div>
                      <div className="details__value">
                        {propsData?.storage.ram}
                      </div>
                    </div>
                    <div className="details__item details__item--tech">
                      <div className="details__name">Built in memory</div>
                      <div className="details__value">
                        {propsData?.storage.flash}
                      </div>
                    </div>
                    <div className="details__item details__item--tech">
                      <div className="details__name">Camera</div>
                      <div className="details__value">
                        {propsData?.camera.primary}
                      </div>
                    </div>
                    <div className="details__item details__item--tech">
                      <div className="details__name">Bluetooth</div>
                      <div className="details__value">
                        {propsData?.connectivity.bluetooth}
                      </div>
                    </div>
                    <div className="details__item details__item--tech">
                      <div className="details__name">Wifi</div>
                      <div className="details__value">
                        {propsData?.connectivity.wifi}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ProductsSlider
                title="You may also like"
                products={suggestedProducts}
                key={propsData?.id}
              />
            </div>
          ) : (
            <>
              <BackButton />
              <NoResults category="Product" />
            </>
          )}

          {showPopup && <Popup onClose={handleShowPopup} />}
        </div>
      </div>
    );
  },
);
