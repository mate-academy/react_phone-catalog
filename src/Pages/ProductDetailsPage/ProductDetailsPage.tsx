import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, getSuggestedProducts } from '../../helpers/products';
import { Loader } from '../../components/Loader/Loader';
import { Phone } from '../../types/Phone';
import './ProductDetailsPage.scss';
import { Product } from '../../types/ProductType';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';

type DescriptionSection = {
  title: string;
  text: string[];
};

export const PhoneDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<Phone | null>(null);
  const [loading, setLoading] = useState(false);
  const [
    mainPhoto, setMainPhoto,
  ] = useState<string | undefined>(undefined);

  const { productId } = useParams();

  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);

    getProduct(productId)
      .then((produc) => {
        if (produc) {
          setProduct(produc);
          setMainPhoto(produc.images[0]);
        } else {
          setProduct(null);
        }
      })
      .finally(() => setLoading(false));
  }, [productId]);

  const [suggestProducts, setSuggestProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    getSuggestedProducts()
      .then((data) => {
        setSuggestProducts(data);
      });
  }, []);

  const handleMainImageChange = (imageUrl: string) => {
    setMainPhoto(imageUrl);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 0 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (
      prevSlide === suggestProducts.length - 4 ? prevSlide : prevSlide + 1
    ));
  };

  return (
    <div className="container product-details">
      {loading && (<Loader />)}

      {!loading && productId && (
        <>
          <div className="breadcrumbs" data-cy="breadCrumbs">
            <Link to="/" className="breadcrumbs__image">
              <img
                className="breadcrumbs__icon"
                src="/icons/buttons-icons/Home.svg"
                alt="home"
              />
            </Link>

            <img
              src="/icons/buttons-icons/ChevronDisabled(Right).svg"
              alt="right"
            />
            <Link to="/phones" className="breadcrumbs__category">Phones</Link>
            <img
              src="/icons/buttons-icons/ChevronDisabled(Right).svg"
              alt="right"
            />
            <p className="breadcrumbs__text">{product?.name}</p>
          </div>

          <Link to=".." className="back">
            <img
              src="/icons/buttons-icons/ChevronDef(Left).svg"
              alt="right"
              className="back__img"
            />
            <p className="back__text">Back</p>
          </Link>

          <div className="product">
            <h1 className="product__name">{product?.name}</h1>
            <div className="product__container">
              <div className="product__images">
                <div className="product__images-small">
                  {product?.images.map((imageUrl) => (
                    <button
                      type="button"
                      key={imageUrl.slice(-6, -4)}
                      onClick={() => handleMainImageChange(imageUrl)}
                      className="product__image"
                    >
                      <img
                        src={`/_new/${imageUrl}`}
                        alt={product.name}
                        className="phone-photo"
                      />
                    </button>
                  ))}
                </div>
                <div className="product__main-photo">
                  <img
                    src={`/_new/${mainPhoto}`}
                    alt={product?.name}
                    className="product__main-img"
                  />
                </div>
              </div>
              <div className="product__details">
                <div className="product__colors" hidden>
                  <p>Available colors</p>
                </div>
                <div className="product__capacity" hidden>
                  <p>Select capacity</p>
                </div>
                <div className="card__text">
                  <div className="card__price card__price--details">
                    <span>
                      {`$${product?.priceDiscount}`}
                    </span>

                    <span className="card__old-price">{`$${product?.priceRegular}`}</span>
                  </div>
                  <div className="control control--details">
                    <button
                      type="button"
                      className="add-button add-button--details"
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      className="favourite-button favourite-button--details"
                    >
                      <img
                        src="../../icons/Favourites(HeartLike).svg"
                        alt="Like"
                        className="icon--favour"
                      />
                    </button>
                  </div>
                  <div className="card__content">
                    <div className="card__info">
                      <p className="card__desc">Screen</p>
                      <p className="card__value">
                        {product?.screen}
                      </p>
                    </div>
                    <div className="card__info">
                      <p className="card__desc">Resolution</p>
                      <p className="card__value">
                        {product?.resolution}
                      </p>
                    </div>
                    <div className="card__info">
                      <p className="card__desc">Processor</p>
                      <p className="card__value">
                        {product?.processor}
                      </p>
                    </div>
                    <div className="card__info">
                      <p className="card__desc">RAM</p>
                      <p className="card__value">
                        {product?.ram}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product__container">
              <div className="about" data-cy="productDescription">
                <p className="about__h">About</p>
                {(product?.description as DescriptionSection[])?.map((
                  section: DescriptionSection,
                ) => (
                  <React.Fragment key={section.title}>
                    <p className="about__title">{section.title}</p>
                    {section.text.map((paragraph) => (
                      <p key={paragraph} className="about__text">{paragraph}</p>
                    ))}
                  </React.Fragment>
                ))}
              </div>
              <div className="tech-specs">
                <p className="tech-specs__title">Tech specs</p>
                <div className="tech-specs__content">
                  <div className="tech-specs__info">
                    <p className="tech-specs__desc">Screen</p>
                    <p className="tech-specs__value">
                      {product?.screen}
                    </p>
                  </div>
                </div>
                <div className="tech-specs__content">
                  <div className="tech-specs__info">
                    <p className="tech-specs__desc">Screen</p>
                    <p className="tech-specs__value">
                      {product?.screen}
                    </p>
                  </div>
                </div>
                <div className="tech-specs__content">
                  <div className="tech-specs__info">
                    <p className="tech-specs__desc">Resolution</p>
                    <p className="tech-specs__value">
                      {product?.resolution}
                    </p>
                  </div>
                </div>
                <div className="tech-specs__content">
                  <div className="tech-specs__info">
                    <p className="tech-specs__desc">Processor</p>
                    <p className="tech-specs__value">
                      {product?.processor}
                    </p>
                  </div>
                </div>
                <div className="tech-specs__content">
                  <div className="tech-specs__info">
                    <p className="tech-specs__desc">RAM</p>
                    <p className="tech-specs__value">
                      {product?.ram}
                    </p>
                  </div>
                </div>
                <div className="tech-specs__content">
                  <div className="tech-specs__info">
                    <p className="tech-specs__desc">Built in memory</p>
                    <p className="tech-specs__value">
                      {product?.capacity}
                    </p>
                  </div>
                </div>
                <div className="tech-specs__content">
                  <div className="tech-specs__info">
                    <p className="tech-specs__desc">Camera</p>
                    <p className="tech-specs__value">
                      {product?.camera}
                    </p>
                  </div>
                </div>
                <div className="tech-specs__content">
                  <div className="tech-specs__info">
                    <p className="tech-specs__desc">Zoom</p>
                    <p className="tech-specs__value">
                      {product?.zoom}
                    </p>
                  </div>
                </div>
                <div className="tech-specs__content">
                  <div className="tech-specs__info">
                    <p className="tech-specs__desc">Cell</p>
                    <p className="tech-specs__value">
                      {product?.cell}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="bloc brand-new">
              <div className="slider-top">
                <h1 className="title">You may also like</h1>
                <div className="cuple-buttons">
                  <button
                    type="button"
                    className="arrow arrow--left"
                    onClick={handlePrevSlide}
                  >
                    {currentSlide === 0 ? (
                      <img
                        src="/icons/buttons-icons/ChevronDisabled(Left).svg"
                        alt="left"
                        className="icon icon__disabled"
                      />
                    ) : (
                      <img
                        src="/icons/buttons-icons/ChevronDef(Left).svg"
                        alt="left"
                        className="icon "
                      />
                    )}
                  </button>
                  <button
                    type="button"
                    className="arrow arrow--left"
                    onClick={handleNextSlide}
                  >
                    {currentSlide === suggestProducts.length - 4 ? (
                      <img
                        src="/icons/buttons-icons/ChevronDisabled(Right).svg"
                        alt="right"
                        className="icon icon__disabled"
                      />
                    ) : (
                      <img
                        src="/icons/buttons-icons/ChevronDef(Right).svg"
                        alt="left"
                        className="icon"
                      />
                    )}

                  </button>
                </div>
              </div>
              <ProductsSlider
                products={suggestProducts}
                currentSlide={currentSlide}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
