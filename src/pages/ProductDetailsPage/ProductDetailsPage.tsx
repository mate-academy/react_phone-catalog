import './ProductDetailsPage.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../api/products';
import { Loader } from '../../components/Loader';
import { PhoneDetails } from '../../types/PhoneDetails';
import { ButtonHeart } from '../../components/ButtonHeart';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<PhoneDetails | null>(null);
  const [selectedImg, setSelectedImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getProductDetails(productId || '')
      .then((productDetail) => {
        setProduct(productDetail);
        setSelectedImg(productDetail.images[0]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <div className="details-page">
      {isLoading && (
        <Loader />
      )}

      {product && (
        <div className="detail-page__product">
          <div className="details-page__section product-detail__section--small">
            <h1>
              {product.name}
            </h1>
          </div>

          <div className="details-page__section">
            <div className="details-page__grid">
              <div className="details-page__small-photos">
                {product.images.map((image: string) => (
                  <div
                    key={image}
                    className="details-page__small-photo-container"
                    onClick={() => setSelectedImg(image)}
                    aria-hidden
                  >
                    <img
                      alt="product"
                      className="details-page__small-img"
                      src={`_new/${image}`}
                    />
                  </div>
                ))}
              </div>

              <div className="details-page__big-photo-container">
                <img
                  alt="product"
                  className="details-page__big-img"
                  src={selectedImg ? `_new/${selectedImg}` : `_new/${product.images[0]}`}
                />
              </div>

              <div className="details-page__phone-info">
                <div className="details-page__info-container">
                  <div className="details-page__info-text">
                    Available colors
                  </div>

                  <ul className="details-page__phone-colors">
                    <li className="details-page__phone-color" />
                    <li className="details-page__phone-color" />
                    <li className="details-page__phone-color" />
                  </ul>

                </div>
                <div className="details-page__info-container">
                  <div className="details-page__info-text">
                    Select capacity
                  </div>

                  <ul className="details-page__capacity-buttons">
                    <button
                      type="button"
                      className="details-page__capacity-button"
                    >
                      125gb
                    </button>
                  </ul>
                </div>

                <div className="details-page__prices">
                  <div
                    className="details-page__price details-page__price--sale"
                  >
                    {`$${product.priceDiscount}`}
                  </div>

                  <div
                    className="details-page__price details-page__price--full"
                  >
                    {`$${product.priceRegular}`}
                  </div>
                </div>

                <div className="details-page__buttons">
                  <button
                    className="details-page__button"
                    type="button"
                  >
                    Add to cart
                  </button>

                  <ButtonHeart
                    productId={product.id}
                  />
                </div>

                <ul className="details-page__detail-list">
                  <li className="details-page__detail-item">
                    <h3 className="details-page__detail-item-title">
                      Screen
                    </h3>
                    <p className="details-page__detail-item-text">
                      {product.screen}
                    </p>
                  </li>

                  <li className="details-page__detail-item">
                    <h3 className="details-page__detail-item-title">
                      Resolution
                    </h3>
                    <p className="details-page__detail-item-text">
                      {product.resolution}
                    </p>
                  </li>

                  <li className="details-page__detail-item">
                    <h3 className="details-page__detail-item-title">
                      Processor
                    </h3>
                    <p className="details-page__detail-item-text">
                      {product.processor}
                    </p>
                  </li>

                  <li className="details-page__detail-item">
                    <h3 className="details-page__detail-item-title">
                      RAM
                    </h3>
                    <p className="details-page__detail-item-text">
                      {product.ram}
                    </p>
                  </li>

                </ul>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>

  );
};
