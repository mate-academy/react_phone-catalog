import './ProductDetailsPage.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails, getProducts } from '../../api/products';
import { Loader } from '../../components/Loader';
import { PhoneDetails } from '../../types/PhoneDetails';
import { ButtonHeart } from '../../components/ButtonHeart';
import { BackButton } from '../../components/BackButton';
import { ProductSlider } from '../../components/ProductSlider';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Product } from '../../types/Product';
import { AddToCartButton } from '../../components/AddToCartButton';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<PhoneDetails | null>(null);
  const [generalInfo, setGeneralInfo] = useState<Product>();
  const [selectedImg, setSelectedImg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const productDetails = await getProductDetails(productId || '');

        setProduct(productDetails);
        setSelectedImg(productDetails.images[0]);

        const products = await getProducts();

        const productInfo = products
          .find(currentProd => currentProd.itemId === productDetails.id);

        setGeneralInfo(productInfo);
      } catch {
        setError('Product details were not found...');
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <div className="details-page">
      {isLoading && (
        <Loader />
      )}

      <div className="detail-page__product">
        <Breadcrumbs
          productName={product?.name || '???'}
        />
        <BackButton />

        {!product || !generalInfo || error ? (
          <div className="details-page__error">
            <h1 className="details-page__error-title">{error}</h1>
            <p className="details-page__error-description">
              Something went wrong...
            </p>
          </div>
        ) : (
          <>
            <section
              className="details-page__section product-detail__section--small"
            >
              <h1
                className="details-page__main-title"
              >
                {product.name}
              </h1>
            </section>

            <section
              className="details-page__section"
            >
              <div className="details-page__grid">
                <div className="details-page__small-photos">
                  {product.images.map((image: string) => (
                    <div
                      key={image}
                      className={classNames(
                        'details-page__small-photo-container',
                        {
                          'details-page__small-photo-container--selected':
                            selectedImg === image,
                        },
                      )}
                      onClick={() => setSelectedImg(image)}
                      aria-hidden
                    >
                      <img
                        alt="product"
                        className="details-page__small-img"
                        src={image}
                      />
                    </div>
                  ))}
                </div>

                <div className="details-page__big-photo-container">
                  <img
                    alt="product"
                    className="details-page__big-img"
                    src={selectedImg}
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
                    <AddToCartButton
                      product={generalInfo}
                    />

                    <ButtonHeart
                      product={generalInfo}
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
            </section>

            <section
              className="details-page__section"
              data-cy="productDescription"
            >
              <div className="details-page__grid">
                <div className="details-page__about">
                  <h2
                    className="
                    details-page__second-title
                    details-page__second-title--about
                    "
                  >
                    About
                  </h2>

                  <ul
                    className="details-page__about-description"
                  >
                    {product.description.map(info => (
                      <li
                        key={info.title}
                        className="details-page__about-description-item"
                      >
                        <h3
                          className="details-page__about-description-title"
                        >
                          {info.title}
                        </h3>

                        <p className="details-page__about-description-text">
                          {info.text}
                        </p>
                      </li>
                    ))}

                  </ul>
                </div>
                <div className="details-page__tech">
                  <h2
                    className="
                    details-page__second-title
                    details-page__second-title--tech
                    "
                  >
                    Tech specs
                  </h2>

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

                    <li className="details-page__detail-item">
                      <h3 className="details-page__detail-item-title">
                        Built in memory
                      </h3>
                      <p className="details-page__detail-item-text">
                        {product.capacity}
                      </p>
                    </li>

                    <li className="details-page__detail-item">
                      <h3 className="details-page__detail-item-title">
                        Camera
                      </h3>
                      <p className="details-page__detail-item-text">
                        {product.camera}
                      </p>
                    </li>

                    <li className="details-page__detail-item">
                      <h3 className="details-page__detail-item-title">
                        Zoom
                      </h3>
                      <p className="details-page__detail-item-text">
                        {product.zoom}
                      </p>
                    </li>

                    <li className="details-page__detail-item">
                      <h3 className="details-page__detail-item-title">
                        Cell
                      </h3>
                      <p className="details-page__detail-item-text">
                        {product.cell}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section
              className="details-page__section"
            >
              <ProductSlider
                title="You may also like"
              />
            </section>
          </>
        )}
      </div>
    </div>

  );
};
