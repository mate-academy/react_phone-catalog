/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/self-closing-comp */
import {
  useContext, useEffect, useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { BackButton } from '../../components/BackButton';
import { PathBlock } from '../../components/PathBlock';
import { ProductsSlider } from '../../components/ProductsSlider';
import { MainContext } from '../../context';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../helpers/getProducts';
import { scrollToTop } from '../../helpers/scrollToTop';
import './product-details-page.scss';
import { ProductDetail } from '../../components/ProductDetail';

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
    getProductDetailsFromServer();
    scrollToTop();
  }, [productId]);

  useEffect(() => {
    setCurrentPage('ProductDetails');
    scrollToTop();
  }, []);

  useEffect(() => {
    if (productDetails) {
      setActiveImg(productDetails?.images[0]);
    }
  }, [productDetails]);

  const getColor = (color: string) => {
    switch (color) {
      case 'black':
        return '#000';
      case 'spacegray':
        return '#808080';
      case 'gold':
        return '#ffefd5';
      case 'midnightgreen':
        return '#008080';
      case 'silver':
        return '#c0c0c0';
      case 'yellow':
        return '#ffff00';
      case 'green':
        return '#66cdaa';
      case 'red':
        return '#ff0000';
      case 'white':
        return '#fff';
      case 'gray':
        return '#d3d3d3';
      case 'purple':
        return '#e6e6fa';
      case 'rosegold':
        return '#ffdab9';
      case 'coral':
        return '#f08080';
      default:
        return 0;
    }
  };

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
                className={
                  classNames(
                    'image__list-item', { selected: image === activeImg },
                  )
                }
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
            <img
              src={`./${activeImg}`}
              alt={productDetails?.name}
              className="product-details__selected-image"
            />
          </div>
        </div>
        <div className="product-detail__actions grid__item--fullScreen-14-20">
          <div className="colors__selector">
            <p className="detail-selector__title">Available colors</p>
            <ul className="colors__list">
              {productDetails?.colorsAvailable.map(color => (
                <li
                  className={
                    classNames(
                      'colors__item',
                      { selected: color === productDetails.color },
                    )
                  }
                  key={color}
                >
                  <Link
                    to={`/phones/${productDetails.namespaceId}-${productDetails.capacity.toLowerCase()}-${color}`}
                    className="color__handler-link"
                    style={{ background: `${getColor(color)}` }}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="capacity__selector">
            <p className="detail-selector__title">Select capacity</p>
            <ul className="capacity__list">
              {productDetails?.capacityAvailable.map(capacity => (
                <li className="capacity__item" key={capacity}>
                  <Link
                    to={`/phones/${productDetails.namespaceId}-${capacity.toLowerCase()}-${productDetails.color}`}
                    className={
                      classNames(
                        'capacity__handler-link',
                        { selected: capacity === productDetails.capacity },
                      )
                    }
                  >
                    {capacity.replace('GB', ' GB')}
                  </Link>
                </li>
              ))}
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
            <ProductDetail title="Screen" value={productDetails?.screen} />
            <ProductDetail
              title="Resolution"
              value={productDetails?.resolution}
            />
            <ProductDetail
              title="Processor"
              value={productDetails?.processor}
            />
            <ProductDetail
              title="RAM"
              value={productDetails?.ram}
            />
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
            <ProductDetail
              title="Screen"
              value={productDetails?.screen}
            />
            <ProductDetail
              title="Resolution"
              value={productDetails?.resolution}
            />
            <ProductDetail
              title="Processor"
              value={productDetails?.processor}
            />
            <ProductDetail
              title="RAM"
              value={productDetails?.ram}
            />
            <ProductDetail
              title="Built in memory"
              value={productDetails?.capacity}
            />
            <ProductDetail
              title="Camera"
              value={productDetails?.camera}
            />
            <ProductDetail
              title="Zoom"
              value={productDetails?.zoom}
            />
            <ProductDetail
              title="Cell"
              value={productDetails?.cell.join(', ')}
            />
          </div>
        </div>
      </section>
      <section className="alternative-products__list">
        <div className="product-list__wrapper product-list__wrapper--short">
          <ProductsSlider
            title="You may also like"
            products={products}
          />
        </div>
      </section>
    </div>
  );
};
