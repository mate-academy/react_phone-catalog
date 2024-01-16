/* eslint-disable react/self-closing-comp */
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { PathBlock } from '../../components/PathBlock';
import { Promo } from '../../components/Promo';
import { MainContext } from '../../context';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../services/getProducts';
import { scrollToTop } from '../../services/scrollToTop';

export const ProductDetailsPage = () => {
  const {
    products,
  } = useContext(MainContext);

  const [
    productDetails, setProductDetails,
  ] = useState<ProductDetails | null>(null);
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
    getProductDetailsFromServer();
    scrollToTop();
  }, [productId]);

  return (
    <div className="product-details__page">
      <PathBlock
        currentPage="Phones"
        item="Apple iPhone 11 Pro Max 64GB Gold"
      />
      <BackButton />
      <section className="product__section">
        <h1 className="products__title">
          {productDetails?.name}
        </h1>
        <div className="images__selector">
          <div className="selected__image"></div>
          <div className="images__list"></div>
        </div>
        <div className="colors__selector">
          <div className="selector__title">Available colors</div>
        </div>
        <div className="capacity__selector"></div>
        <div className="prices">
          <p className="new__price">{productDetails?.priceDiscount}</p>
          <p className="full__price">{productDetails?.priceRegular}</p>
        </div>
        <div className="product__actions"></div>
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
      </section>
      <section className="product__description">
        <div className="about">
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
        <div className="specification">
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
