import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { ProductSlider } from '../HomePage/components/ProductSlider';
import { ColorOptions } from './ColorOptions';
import { CapacityOptions } from './CapacityOptions';
import { Product } from '../../types/ProductCard';
import { DetailedProduct } from '../../types/DetailedProduct';
import { ProductCategories } from '../../types/ProductCategories';
import { GetDetailedProducts } from '../../helpers/GetDetailedProducts';
import { getAllProducts } from '../../helpers/getAllProducts';
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

      // Get the colors
    }
  }, [foundProduct, productId]);

  if (!displayedProduct) {
    return <p>Product doesn&apos;t exist</p>;
  }

  const {
    category,
    // id,
    // namespaceId,
    name,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    // color,
    images,
    // description,
  } = displayedProduct;

  return (
    <>
      {displayedProduct && (
        <main className="product-details">
          <section className="product-details__top ">
            <nav className="breadcrumbs">
              <div className="breadcrumbs__wrapper">
                <img
                  className="breadcrumbs__home"
                  src="./icons/home.svg"
                  alt="home icon"
                />
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

              <button
                onClick={history.back}
                className="back-link breadcrumbs__back-link"
              >
                <div className="back-link__image-wrapper">
                  <img
                    className="back-link__image breadcrumbs__back-link"
                    src="./icons/arrow-left.svg"
                    alt="left arrow icon"
                  />
                </div>

                <p className="back-link__text">Back</p>
              </button>
            </nav>
          </section>

          <section className="product-content product-details__product-content">
            <h2 className="product-content__name title--2">{name}</h2>

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
                <button className="add-buttons__cart default-button-text">
                  Add to cart
                </button>
                <button className="add-buttons__wishlist default-button">
                  <img
                    src="./icons/heart-black.svg"
                    alt="Add to wishlist heart icon"
                  />
                </button>
              </div>
            </div>

            <div className="main-info product-content__main-info">
              <div className="main-info__pair">
                <p className="main-info__label">Screen</p>
                <p className="main-info__value">6.5” OLED</p>
              </div>
            </div>
          </section>
          <section className="product-descriptions">
            <h3>About</h3>

            <hr />

            <div className="product-descriptions__element">
              <h4 className="product-descriptions__title">
                And then there was Pro
              </h4>

              <p className="product-descriptions__info body-text-14">
                A transformative triple-camera system that adds tons of
                capability without complexity. An unprecedented leap in battery
                life. And a mind-blowing chip that doubles down on machine
                learning and pushes the boundaries of what a smartphone can do.
                Welcome to the first iPhone powerful enough to be called Pro.
              </p>
            </div>
          </section>

          <section className="text-specs">
            <h3 className="text-specs__title title--3"></h3>

            <hr />

            <div className="main-info text-specs__info`">
              <div className="main-info__pair">
                <p className="main-info__label">Screen</p>
                <p className="main-info__value">6.5” OLED</p>
              </div>
            </div>
          </section>
          <section className="product-details__products-slider">
            <ProductSlider hasRandomProducts={true} hasDiscount={true} />
          </section>
        </main>
      )}
    </>
  );
};