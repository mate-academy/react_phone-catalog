import { useEffect, useState } from 'react';
import './ProductDetailsPage.scss';
import { getAllProducts } from '../../helpers/getAllProducts';
import { DetailedProduct } from '../../types/DetailedProduct';
import { Product } from '../../types/ProductCard';
import { ProductCategories } from '../../types/ProductCategories';
import { GetDetailedProducts } from '../../helpers/GetDetailedProducts';
import { Link, useParams } from 'react-router-dom';
import { ProductSlider } from '../HomePage/components/ProductSlider';
import classNames from 'classnames';

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
    }
  }, [foundProduct, productId]);

  if (!displayedProduct) {
    return <p>Product doesn&apos;t exist</p>;
  }

  const {
    category,
    id,
    // namespaceId,
    name,
    // capacityAvailable,
    // capacity,
    // priceRegular,
    // priceDiscount,
    // colorsAvailable,
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
                      className={classNames('images-list__image', {
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
                  <p className="colors__text small-text">Available colors</p>
                  <p className="colors__text small-text">ID: {id}</p>
                </div>
                <ul className="colors-list colors__colors-list">
                  <li className="colors-list__item">
                    <Link to="/">
                      <img src="" alt="" />
                    </Link>
                  </li>
                </ul>

                <hr className="options__divider" />
              </div>
              <div className="capacities options__capacity">
                <p className="colors__text small-text">Select capacity</p>

                <ul className="capacity-list">
                  <li className="capacity-list__item">
                    <Link className="capacity-list__capacity-link" to="/">
                      64 GB
                    </Link>
                  </li>
                </ul>

                <hr className="options__divider" />
              </div>
            </div>

            <div className="purchase product-content__purchase">
              <div className="prices">
                <h2 className="title--1"></h2>
              </div>

              <div className="buttons">
                <button className="buttons__cart">Add to cart</button>
                <button className="buttons__wishlist">
                  <img
                    src="./icons/heart-icon.svg"
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
