/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/self-closing-comp */
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { PathBlock } from '../../components/PathBlock';
import { Promo } from '../../components/Promo';
import { MainContext } from '../../context';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../services/getProducts';
import { scrollToTop } from '../../services/scrollToTop';
import './product-details-page.scss';

export const ProductDetailsPage = () => {
  const {
    setCurrentPage,
    products,
  } = useContext(MainContext);

  const [
    productDetails, setProductDetails,
  ] = useState<ProductDetails | null>(null);
  const [activeImg, setActiveImg] = useState('');
  const { productId } = useParams();

  const getProductDetailsFromServer = async () => {
    try {
      if (!productId) {
        return;
      }

      const details = await getProductDetails(productId);

      setProductDetails(details);
    } catch {
      // eslint-disable-next-line no-console
      console.warn('product details loading error!');
    }
  };

  useEffect(() => {
    setCurrentPage('ProductDetails');
  }, []);

  useEffect(() => {
    getProductDetailsFromServer();
    scrollToTop();
  }, [productId]);

  useEffect(() => {
    if (productDetails) {
      setActiveImg(productDetails?.images[0]);
    }
  }, [productDetails]);

  return (
    <div className="product-details__page">
      <PathBlock
        currentPage="Phones"
        item="Apple iPhone 11 Pro Max 64GB Gold"
      />
      <BackButton />
      <h1 className="product__title">
        {productDetails?.name}
      </h1>
      <section className="product__section grid">
        <div className="images__selector grid__item--fullScreen-1-12">
          <div className="images__list">
            {productDetails?.images.map((image) => (
              <div
                className="image__list-item"
                role="button"
                tabIndex={0}
                onMouseDown={() => setActiveImg(image)}
                key={image}
              >

                <img
                  src={image}
                  alt={productDetails?.name}
                />
              </div>
            ))}
          </div>
          <div className="selected__image">
            <img src={`./${activeImg}`} alt={productDetails?.name} className="product-details__selected-image" />
          </div>
        </div>
        <div className="product-detail__actions grid__item--fullScreen-14-20">
          <div className="colors__selector">
            <p className="detail-selector__title">Available colors</p>
            <ul className="colors__list">
              <li className="colors__item selected">
                <Link
                  to="/"
                  className="color__handler-link"
                />
              </li>
              <li className="colors__item">
                <Link
                  to="/"
                  className="color__handler-link"
                />
              </li>
              <li className="colors__item">
                <Link
                  to="/"
                  className="color__handler-link"
                />
              </li>
              <li className="colors__item">
                <Link
                  to="/"
                  className="color__handler-link"
                />
              </li>
            </ul>
          </div>
          <div className="capacity__selector">
            <p className="detail-selector__title">Select capacity</p>
            <ul className="capacity__list">
              <li className="capacity__item selected">
                <Link
                  to="/"
                  className="capacity__handler-link selected"
                >
                  64 GB
                </Link>
              </li>
              <li className="capacity__item">
                <Link
                  to="/"
                  className="capacity__handler-link"
                >
                  256 GB
                </Link>
              </li>
              <li className="capacity__item">
                <Link
                  to="/"
                  className="capacity__handler-link"
                >
                  512 GB
                </Link>
              </li>
            </ul>
          </div>
          <div className="prices">
            <p className="new-price">{`$${productDetails?.priceDiscount}`}</p>
            <p className="full-price">{`$${productDetails?.priceRegular}`}</p>
          </div>
          <div className="product__actions product-detail__buttons">
            <button
              type="button"
              className="add-to-card
                primary__button button
                details-cart__button"
            >
              Add to cart
            </button>
            <button
              type="button"
              className="
              add-to-favourite
              button
              icon
              details-favourite__button"
            />
          </div>
          <div className="product__details">
            <div className="detail">
              <p className="detail__title">Screen</p>
              <p className="detail__value">
                {productDetails?.screen}
              </p>
            </div>
            <div className="detail">
              <p className="detail__title">Resolution</p>
              <p className="detail__value">
                {productDetails?.resolution}
              </p>
            </div>
            <div className="detail">
              <p className="detail__title">Processor</p>
              <p className="detail__value">
                {productDetails?.processor}
              </p>
            </div>
            <div className="detail">
              <p className="detail__title">RAM</p>
              <p className="detail__value">
                {productDetails?.ram}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="product__description grid">
        <div className="about grid__item--fullScreen-1-12">
          <h2 className="about__title">About</h2>
          <div className="about__articles">
            <article className="about__article">
              <h3 className="article__title">
                {productDetails?.description[0].title}
              </h3>
              <div className="article__text">
                {productDetails?.description[0].text}
              </div>
            </article>
            <article className="about__article">
              <h3 className="article__title">
                {productDetails?.description[1].title}
              </h3>
              <div className="article__text">
                {productDetails?.description[1].text}
              </div>
            </article>
            <article className="about__article">
              <h3 className="article__title">
                {productDetails?.description[2].title}
              </h3>
              <div className="article__text">
                {productDetails?.description[2].text}
              </div>
            </article>
          </div>
        </div>
        <div className="specification grid__item--fullScreen-14-24">
          <h2 className="specification__title">Tech specs</h2>
          <div className="product__details">
            <div className="detail">
              <p className="detail__title">Screen</p>
              <p className="detail__value">
                {productDetails?.screen}
              </p>
            </div>
            <div className="detail">
              <p className="detail__title">Resolution</p>
              <p className="detail__value">
                {productDetails?.resolution}
              </p>
            </div>
            <div className="detail">
              <p className="detail__title">Processor</p>
              <p className="detail__value">
                {productDetails?.processor}
              </p>
            </div>
            <div className="detail">
              <p className="detail__title">RAM</p>
              <p className="detail__value">
                {productDetails?.ram}
              </p>
            </div>
            <div className="detail">
              <p className="detail__title">Built in memory</p>
              <p className="detail__value">
                {productDetails?.capacity}
              </p>
            </div>
            <div className="detail">
              <p className="detail__title">Camera</p>
              <p className="detail__value">
                {productDetails?.camera}
              </p>
            </div>
            <div className="detail">
              <p className="detail__title">Zoom</p>
              <p className="detail__value">
                {productDetails?.zoom}
              </p>
            </div>
            <div className="detail">
              <p className="detail__title">Cell</p>
              <p className="detail__value">
                {productDetails?.cell.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="alternative-products__list">
        <div className="product-list__wrapper product-list__wrapper--short">
          <Promo
            title="You may also like"
            products={products}
          />
        </div>
      </section>
    </div>
  );
};
