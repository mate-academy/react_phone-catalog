import { useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductWithDetails } from '../../types/ProductWithDetails';
import { ProductCategories } from '../../types/ProductCategories';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Product } from '../../types/Product';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Back } from '../../components/Back';
import { useSwipeable } from 'react-swipeable';
import { getPhones } from '../../api/phones';
import { getTablets } from '../../api/tablets';
import { getAccessories } from '../../api/accessories';
import { getProducts } from '../../api/products';
import { ProductButtons } from '../../components/ProductButtons';
import './ProductDetailsPage.scss';
import { Message } from '../../components/Message';

const NOT_APPLICABLE = 'Not applicable';
const SUGGESTED_ITEMS_LENGTH = 20;

export const ProductDetailsPage = () => {
  const [productWithDetails, setProductWithDetails] =
    useState<ProductWithDetails | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [productsHaveError, setProductsHaveError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [productNotFound, setProductNotFound] = useState(false);
  const { productId } = useParams() ?? '';
  const location = useLocation();
  const category = location.pathname.split('/')[1];
  const lastPhotoId =
    productWithDetails !== null ? productWithDetails.images.length - 1 : 0;

  const loadProduct = async () => {
    try {
      let productsFromServer: ProductWithDetails[] = [];

      switch (category) {
        case ProductCategories.PHONES:
          productsFromServer = await getPhones();
          break;

        case ProductCategories.TABLETS:
          productsFromServer = await getTablets();
          break;

        case ProductCategories.ACCESSORIES:
          productsFromServer = await getAccessories();
          break;
      }

      const productFromServer = productsFromServer.find(
        prod => prod.id === productId,
      );

      if (productFromServer) {
        setProductWithDetails(productFromServer);
      }
    } catch (error) {
      setProductNotFound(true);
      throw error;
    }
  };

  const getSuggestedAndProduct = async () => {
    setProductsHaveError(false);

    try {
      const productsFromServer = await getProducts();

      if (productsFromServer) {
        const matchedProduct = productsFromServer.find(
          productFromServer => productFromServer.itemId === productId,
        );

        if (matchedProduct) {
          setProduct(matchedProduct);
        }

        const randomIndexes: number[] = [];
        const randomProducts: Product[] = [];

        while (randomIndexes.length < SUGGESTED_ITEMS_LENGTH) {
          const newRandomIndex = Math.floor(
            Math.random() * productsFromServer.length,
          );

          if (
            !randomIndexes.includes(newRandomIndex) &&
            productsFromServer[newRandomIndex].itemId !== productId
          ) {
            randomIndexes.push(newRandomIndex);
          }
        }

        randomIndexes.forEach(randomIndex => {
          randomProducts.push(productsFromServer[randomIndex]);
        });

        setSuggestedProducts(randomProducts);
      }
    } catch (error) {
      setProductsHaveError(true);
      throw error;
    }
  };

  useEffect(() => {
    setProductWithDetails(null);
    setSuggestedProducts([]);
    loadProduct();
    getSuggestedAndProduct();
  }, [productId]);

  const switchToNextPhoto = () => {
    setSelectedPhoto(prevSelected =>
      prevSelected + 1 <= lastPhotoId ? prevSelected + 1 : 0,
    );
  };

  const switchToPrevPhoto = () => {
    setSelectedPhoto(prevSelected =>
      prevSelected - 1 >= 0 ? prevSelected - 1 : lastPhotoId,
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => switchToNextPhoto(),
    onSwipedRight: () => switchToPrevPhoto(),
  });

  return (
    <main className="container product-details">
      <div className="product-details__breadcrumbs">
        <Breadcrumbs />
      </div>

      <div className="product-details__back">
        <Back />
      </div>

      {productNotFound ? (
        <Message text="Product not found!" />
      ) : productWithDetails !== null ? (
        <>
          <h1 className="product-details__main-title">
            {productWithDetails.name}
          </h1>
          <div className="product-details__content">
            <section className="product-details__product">
              <div className="product-details__images" {...swipeHandlers}>
                <img
                  className="product-details__selected-image"
                  alt={productWithDetails.name}
                  src={productWithDetails.images[selectedPhoto]}
                ></img>

                <div className="product-details__all-images">
                  {productWithDetails.images.map((image, index) => (
                    <img
                      className={classNames('product-details__image', {
                        active: selectedPhoto === index,
                      })}
                      alt={productWithDetails.name}
                      src={image}
                      key={image.slice(-5) + index}
                      onClick={() => setSelectedPhoto(index)}
                    ></img>
                  ))}
                </div>
              </div>

              <div className="product-details__info-block">
                <div className="product-details__colors">
                  <div className="product-details__info-text-block">
                    <p className="product-details__info-text">
                      Available colors
                    </p>
                    <p className="product-details__id">{`ID: 802390`}</p>
                  </div>

                  <ul className="product-details__picker-list">
                    {productWithDetails.colorsAvailable.map(color => (
                      <li
                        className="product-details__color-list-item"
                        key={color}
                      >
                        <button
                          className={`
                        product-details__color-button
                        product-details__color-button--color--${color}
                        ${color === productWithDetails.color && 'active'}
                      `}
                        ></button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="product-details__divider"></div>

                <div className="product-details__capacity">
                  <div className="product-details__info-text-block">
                    <p className="product-details__info-text">
                      Select capacity
                    </p>
                  </div>

                  <ul className="product-details__picker-list">
                    {productWithDetails.capacityAvailable.map(capacity => (
                      <li
                        className="product-details__capacity-list-item"
                        key={capacity}
                      >
                        <button
                          className={`
                        product-details__capacity-button
                        ${capacity === productWithDetails.capacity && 'active'}
                      `}
                        >
                          {capacity}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="product-details__divider"></div>

                <div className="product-details__call-to-action">
                  <div className="product-details__prices">
                    <p className="product-details__current-price">
                      ${productWithDetails.priceDiscount}
                    </p>

                    <p className="product-details__previous-price">
                      ${productWithDetails.priceRegular}
                    </p>
                  </div>

                  {product && <ProductButtons product={product} size="high" />}
                </div>
                <div className="product-details__specs">
                  <div className="product-details__spec">
                    <div className="product-details__spec-name">Screen</div>

                    <div className="product-details__spec-value">
                      {productWithDetails.screen}
                    </div>
                  </div>

                  <div className="product-details__spec">
                    <div className="product-details__spec-name">Resolution</div>

                    <div className="product-details__spec-value">
                      {productWithDetails.resolution}
                    </div>
                  </div>

                  <div className="product-details__spec">
                    <div className="product-details__spec-name">Processor</div>

                    <div className="product-details__spec-value">
                      {productWithDetails.processor}
                    </div>
                  </div>

                  <div className="product-details__spec">
                    <div className="product-details__spec-name">RAM</div>

                    <div className="product-details__spec-value">
                      {productWithDetails.ram}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="product-details__text-sections-wrapper">
              <section className="product-details__about">
                <div className="product-details__section-title-wrapper">
                  <h2 className="product-details__section-title">About</h2>
                  <div className="product-details__divider"></div>
                </div>
                {productWithDetails.description.map((detail, i) => (
                  <article
                    className="product-details__article"
                    key={detail.title.slice(5) + i}
                  >
                    <h3 className="product-details__subtitle">
                      {detail.title}
                    </h3>
                    {detail.text.map((paragraph, index) => (
                      <p
                        className="product-details__paragraph"
                        key={paragraph.slice(5) + index}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </article>
                ))}
              </section>
              <section
                className="
              product-details__specs-section
            "
              >
                <div className="product-details__details-title-wrapper">
                  <h2 className="product-details__section-title">Tech specs</h2>
                  <div className="product-details__divider"></div>
                </div>
                <div className="product-details__spec">
                  <div className="product-details__spec-name">Screen</div>
                  <div className="product-details__spec-value">
                    {productWithDetails.screen}
                  </div>
                </div>
                <div className="product-details__spec">
                  <div className="product-details__spec-name">Resolution</div>
                  <div className="product-details__spec-value">
                    {productWithDetails.resolution}
                  </div>
                </div>
                <div className="product-details__spec">
                  <div className="product-details__spec-name">Processor</div>
                  <div className="product-details__spec-value">
                    {productWithDetails.processor}
                  </div>
                </div>
                <div className="product-details__spec">
                  <div className="product-details__spec-name">RAM</div>
                  <div className="product-details__spec-value">
                    {productWithDetails.ram}
                  </div>
                </div>
                <div className="product-details__spec">
                  <div className="product-details__spec-name">
                    Built in memory
                  </div>
                  <div className="product-details__spec-value">
                    {productWithDetails.capacity}
                  </div>
                </div>
                <div className="product-details__spec">
                  <div className="product-details__spec-name">Camera</div>
                  <div className="product-details__spec-value">
                    {productWithDetails.camera}
                  </div>
                </div>
                <div className="product-details__spec">
                  <div className="product-details__spec-name">Zoom</div>
                  <div className="product-details__spec-value">
                    {productWithDetails.zoom}
                  </div>
                </div>
                {productWithDetails.cell[0] !== NOT_APPLICABLE && (
                  <div className="product-details__spec">
                    <div className="product-details__spec-name">Cell</div>
                    <div className="product-details__spec-value">
                      {productWithDetails.cell.join(' ')}
                    </div>
                  </div>
                )}
              </section>
            </div>

            <ProductsSlider
              products={suggestedProducts}
              title="You may also like"
              hasError={productsHaveError}
            />
          </div>
        </>
      ) : (
        <>
          <div
            className="
              product-details__main-title
              product-details__main-title--placeholder
            "
          ></div>
          <div className="product-details__content">
            <section className="product-details__product">
              <div className="product-details__images">
                <div
                  className="
                  product-details__selected-image
                  product-details__selected-image--placeholder
                "
                >
                  <div className="product-details__loader"></div>
                </div>

                <div className="product-details__all-images">
                  <div
                    className="
                      product-details__image
                      product-details__image--placeholder
                    "
                  ></div>

                  <div
                    className="
                      product-details__image
                      product-details__image--placeholder
                    "
                  ></div>

                  <div
                    className="
                      product-details__image
                      product-details__image--placeholder
                    "
                  ></div>
                </div>
              </div>

              <div className="product-details__info-block">
                <div className="product-details__colors">
                  <div className="product-details__info-text-block">
                    <p
                      className="
                        product-details__info-text
                        product-details__info-text--placeholder
                      "
                    ></p>
                  </div>

                  <ul className="product-details__picker-list">
                    <li className="product-details__color-list-item">
                      <div
                        className={`
                        product-details__color-button
                        product-details__color-button--placeholder
                      `}
                      ></div>
                    </li>

                    <li className="product-details__color-list-item">
                      <div
                        className={`
                        product-details__color-button
                        product-details__color-button--placeholder
                      `}
                      ></div>
                    </li>

                    <li className="product-details__color-list-item">
                      <div
                        className={`
                        product-details__color-button
                        product-details__color-button--placeholder
                      `}
                      ></div>
                    </li>
                  </ul>
                </div>

                <div className="product-details__divider"></div>

                <div className="product-details__capacity">
                  <div className="product-details__info-text-block">
                    <p
                      className="
                        product-details__info-text
                        product-details__info-text--placeholder
                      "
                    ></p>
                  </div>

                  <ul className="product-details__picker-list">
                    <li className="product-details__capacity-list-item">
                      <div
                        className={`
                        product-details__capacity-button
                        product-details__capacity-button--placeholder
                      `}
                      ></div>
                    </li>

                    <li className="product-details__capacity-list-item">
                      <div
                        className={`
                        product-details__capacity-button
                        product-details__capacity-button--placeholder
                      `}
                      ></div>
                    </li>

                    <li className="product-details__capacity-list-item">
                      <div
                        className={`
                        product-details__capacity-button
                        product-details__capacity-button--placeholder
                      `}
                      ></div>
                    </li>
                  </ul>
                </div>

                <div className="product-details__divider"></div>

                <div className="product-details__call-to-action">
                  <div className="product-details__prices">
                    <p
                      className="
                        product-details__current-price
                        product-details__current-price--placeholder
                      "
                    ></p>
                  </div>

                  <div className="product-details__buttons">
                    <button
                      className="
                product-details__button
                product-details__button--placeholder
              "
                    ></button>

                    <button
                      className="
                product-details__button
                product-details__button--placeholder
              "
                    ></button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </main>
  );
};
