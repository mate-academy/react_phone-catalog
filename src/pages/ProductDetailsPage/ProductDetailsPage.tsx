import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { CartContext } from '../../context/AppContext';
import { ProductSlider } from '../HomePage/components/ProductSlider';
import { ColorOptions } from './ColorOptions';
import { CapacityOptions } from './CapacityOptions';
import { HomeLink } from '../shared/components/HomeLink/HomeLink';
import { ProductDescriptions } from './ProductDescriptions';
import { TechSpecs } from './TechSpecs';
import { FavoritesContext } from '../../context/FavoritesContext';
import { BackLink } from '../shared/components/BackLink';
import { Product } from '../../types/ProductCard';
import { DetailedProduct } from '../../types/DetailedProduct';
import { ProductCategories } from '../../types/ProductCategories';
import { GetDetailedProducts } from '../../helpers/GetDetailedProducts';
import { getAllProducts } from '../../helpers/getAllProducts';
import { DetailedProductKeys } from '../../types/DetailedProductKeys';
import './ProductDetailsPage.scss';
import '../../styles/main.scss';

export const ProductDetailsPage: React.FC = () => {
  const [foundProduct, setFoundProduct] = useState<Product | undefined>(
    undefined,
  );
  const [displayedProduct, setDisplayedProduct] =
    useState<DetailedProduct | null>(null);
  const [activeImage, setActiveImage] = useState<string>(
    displayedProduct?.images[0] ?? '',
  );
  const [isLoadingProduct, setIsLoadingProduct] = useState<boolean | null>(
    null,
  );

  // Context
  const { cartProducts, addToCart, removeFromCart } = useContext(CartContext);
  const { favoriteProducts, addToFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    if (!!displayedProduct) {
      setActiveImage(displayedProduct.images[0]);
    }
  }, [displayedProduct]);

  const { productId } = useParams();

  useEffect(() => {
    getAllProducts().then((products: Product[]) =>
      setFoundProduct(
        products.find((product: Product) => product.itemId === productId),
      ),
    );
  }, [productId]);

  // Get product from the Api
  useEffect(() => {
    setIsLoadingProduct(true);

    // Find the product in a certain category
    if (foundProduct) {
      GetDetailedProducts(foundProduct.category as ProductCategories).then(
        (productsFromApi: DetailedProduct[]) => {
          setDisplayedProduct(
            productsFromApi.find(
              (detailedProduct: DetailedProduct) =>
                detailedProduct.id === productId,
            ) ?? null,
          );
        },
      );
    }

    setIsLoadingProduct(false);
  }, [foundProduct, productId]);

  if (isLoadingProduct === false && !displayedProduct) {
    return (
      <p className="product-not-found body-text--14">
        Product doesn&apos;t exist{' '}
        <HomeLink className="product-not-found__home" />
      </p>
    );
  }

  if (!displayedProduct) {
    return;
  }

  const {
    category,
    name,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    images,
    description,
  } = displayedProduct;

  const productInfo = ['screen', 'resolution', 'processor', 'ram'];

  const isProductInCart = foundProduct
    ? foundProduct.id in cartProducts
    : false;

  const cartButtonText = isProductInCart ? 'In cart' : 'Add to cart';

  const favoriteIconPath = favoriteProducts.some(
    (prod: Product) => prod.id === foundProduct?.id,
  )
    ? './icons/heart-red.svg'
    : './icons/heart-black.svg';

  return (
    <>
      {!isLoadingProduct && displayedProduct && (
        <main className="product-details">
          <section className="product-content section">
            <div className="product-content__top">
              <nav className="breadcrumbs product-content__breadcrumbs">
                <div className="breadcrumbs__wrapper">
                  <HomeLink className="breadcrumbs__home" />

                  <img
                    className="breadcrumbs__next"
                    src="./icons/arrow-right-disabled.svg"
                    alt="right arrow image"
                  />
                  <Link to={`/${category}`} className="breadcrumbs__category">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Link>
                  <img
                    className="breadcrumbs__next"
                    src="./icons/arrow-right-disabled.svg"
                    alt="right arrow image"
                  />
                  <p className="breadcrumbs__product-name">{name}</p>
                </div>
                <div className="breadcrumbs__back-link">
                  <BackLink />
                </div>
              </nav>

              <h2 className="product-content__name title--2">{name}</h2>
            </div>

            <div className="product-images product-content__images">
              <img
                className="product-images__main-image"
                src={'./' + activeImage}
                alt="Product image"
              />

              <ul className="images-list product-images__images-list">
                {images.map((image: string) => (
                  <li key={image} className="images-list__element">
                    <img
                      className={cn('images-list__image', {
                        'images-list__image--active': image === activeImage,
                      })}
                      src={'./' + image}
                      alt="product image"
                      onClick={() => setActiveImage(image)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="options product-content__options">
              <div className="colors options__colors">
                <div className="colors__text-wrapper">
                  <p className="colors__available small-text">
                    Available colors
                  </p>
                  <p className="colors__id small-text">
                    ID: {foundProduct?.id}
                  </p>
                </div>
                <div className="colors__colors-list">
                  <ColorOptions
                    displayedProduct={displayedProduct}
                    colorsAvailable={colorsAvailable}
                  />
                </div>
              </div>

              <hr className="options__divider" />

              <div className="options__capacities">
                <CapacityOptions
                  displayedProduct={displayedProduct}
                  capacity={capacity}
                  capacityAvailable={capacityAvailable}
                />
              </div>

              <hr className="options__divider" />
            </div>

            <div className="purchase product-content__purchase">
              <div className="prices purchase__prices">
                <h2 className="prices__regular title--1">${priceDiscount}</h2>
                <p className="prices__discount">${priceRegular}</p>
              </div>

              <div className="add-buttons purchase__add-buttons">
                <button
                  className={cn('add-buttons__cart', 'default-button-text', {
                    'add-buttons__cart--added': isProductInCart,
                  })}
                  onClick={() => {
                    if (foundProduct) {
                      if (!isProductInCart) {
                        addToCart(foundProduct);
                      } else {
                        removeFromCart(foundProduct.id);
                      }
                    }
                  }}
                >
                  {cartButtonText}
                </button>
                <button
                  className="add-buttons__favorite default-button"
                  onClick={() => {
                    if (foundProduct) {
                      addToFavorites(foundProduct);
                    }
                  }}
                >
                  <img
                    src={favoriteIconPath}
                    alt="Add to wishlist heart icon"
                  />
                </button>
              </div>
            </div>

            <div className="main-info product-content__main-info">
              {productInfo.map((info: string) => (
                <div key={info} className="main-info__pair">
                  <p className="main-info__label small-text">{info}</p>
                  <p className="main-info__value">
                    {displayedProduct[info as DetailedProductKeys] as string}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <ProductDescriptions descriptions={description} />

          <TechSpecs product={displayedProduct} />

          <section className="product-details__products-slider">
            <ProductSlider title="You may also like" hasDiscount={true} />
          </section>
        </main>
      )}
    </>
  );
};
