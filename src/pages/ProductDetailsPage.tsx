import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getData } from '../helpers/HTTPClient';
import { Loader } from '../components/Loader';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { ProductDetails } from '../types/ProductDetails';
import { AddToButtons } from '../components/AddToButtons';
import { ProductsSlider } from '../components/ProductsSlider';
import { Product } from '../types/Product';
import { getProductsByCategory } from '../helpers/getProductsByCategory';
import './ProductDetailsPage.scss';
import { BackButton } from '../components/BackButton';

export const ProductDetailsPage = () => {
  const { itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState('');
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [mainImage, setMainImage] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const addToCartProduct = products.find(item => item.itemId === product?.id);

  useEffect(() => {
    getData<ProductDetails>(`/products/${itemId}.json`)
      .then((response) => {
        setProduct(response);
        setMainImage(response.images[0]);
      })
      .catch(() => setNotFound('Phone was not found'));

    getProductsByCategory()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [itemId]);

  function getSuggestedProducts(): Product[] {
    const index = Math.floor(Math.random() * (products.length - 10));

    return [...products].splice(index, 10);
  }

  return (
    <div className="product">
      {loading && (
        <Loader />
      )}

      {(product !== null && !loading) ? (
        <>
          <div className="product__bread-crumbs" data-cy="breadCrumbs">
            <BreadCrumbs />
          </div>

          <div className="product__back-link" data-cy="backButton">
            <BackButton />
          </div>

          <h1 className="product__title">{product.name}</h1>

          <div className="product__main">
            <div className="product__images">
              <div className="product__images-list">
                {product.images.map(image => (
                  <button
                    className={classNames(
                      'product__image-box',
                      { 'product__image-box--active': image === mainImage },
                    )}
                    type="button"
                    key={image}
                    onClick={() => setMainImage(image)}
                  >
                    <img
                      className="product__image"
                      src={image}
                      alt={product.name}
                    />
                  </button>
                ))}
              </div>

              <div>
                <img
                  className="product__image-main"
                  src={mainImage}
                  alt={product.name}
                />
              </div>
            </div>

            <div className="product__details">
              <div className="product__colors">
                <div className="product__details-title">
                  Available colors
                </div>

                <div className="product__details-items">
                  {product.colorsAvailable.map(color => (
                    <button
                      type="button"
                      className="product__colors-item"
                      aria-label="color"
                      key={color}
                    >
                      <div
                        className="product__color"
                        style={{ backgroundColor: color }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="product__capacity">
                <div className="product__details-title">
                  Select capacity
                </div>

                <div className="product__details-items">
                  {product.capacityAvailable.map(capacity => (
                    <button
                      type="button"
                      className={classNames(
                        'product__capacity-item',
                        {
                          'product__capacity-item--selected':
                            capacity === product.capacity,
                        },
                      )}
                      aria-label="capacity"
                      key={capacity}
                    >
                      {capacity}
                    </button>
                  ))}
                </div>
              </div>

              <div className="product__price">
                <span className="product__price-discount">
                  {`$${product.priceDiscount}`}
                </span>

                <span className="product__price-regular">
                  {`$${product.priceRegular}`}
                </span>
              </div>

              <div className="product__buttons">
                <AddToButtons
                  width={263}
                  height={48}
                  product={addToCartProduct}
                />
              </div>

              <div className="product__info-box">
                <div className="product__info">
                  <span className="product__details-text">
                    Screen
                  </span>

                  <span className="product__info-value">
                    {product.screen}
                  </span>
                </div>

                <div className="product__info">
                  <span className="product__details-text">
                    Resolution
                  </span>

                  <span className="product__info-value">
                    {product.resolution}
                  </span>
                </div>

                <div className="product__info">
                  <span className="product__details-text">
                    Processor
                  </span>

                  <span className="product__info-value">
                    {product.processor}
                  </span>
                </div>

                <div className="product__info">
                  <span className="product__details-text">
                    RAM
                  </span>

                  <span className="product__info-value">
                    {product.ram}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="product__description">
            <section className="product__about" data-cy="productDescription">
              <h2 className="product__description-title">
                About
              </h2>

              {product.description.map(paragraph => (
                <div key={paragraph.title} className="product__paragraph">
                  <h3 className="product__paragraph-title">
                    {paragraph.title}
                  </h3>

                  {paragraph.text.map(text => (
                    <p className="product__paragraph-text" key={text}>
                      {text}
                    </p>
                  ))}
                </div>
              ))}
            </section>

            <section className="product__specification">
              <h2 className="product__description-title">
                Tech specs
              </h2>

              <div className="product__specs-box">
                <div className="product__specs">
                  <span className="product__specs-text">
                    Screen
                  </span>

                  <span className="product__specs-value">
                    {product.screen}
                  </span>
                </div>

                <div className="product__specs">
                  <span className="product__specs-text">
                    Resolution
                  </span>

                  <span className="product__specs-value">
                    {product.resolution}
                  </span>
                </div>

                <div className="product__specs">
                  <span className="product__specs-text">
                    Processor
                  </span>

                  <span className="product__specs-value">
                    {product.processor}
                  </span>
                </div>

                <div className="product__specs">
                  <span className="product__specs-text">
                    RAM
                  </span>

                  <span className="product__specs-value">
                    {product.ram}
                  </span>
                </div>

                <div className="product__specs">
                  <span className="product__specs-text">
                    Built in memory
                  </span>

                  <span className="product__specs-value">
                    {product.capacity}
                  </span>
                </div>

                <div className="product__specs">
                  <span className="product__specs-text">
                    Camera
                  </span>

                  <span className="product__specs-value">
                    {product.camera}
                  </span>
                </div>

                <div className="product__specs">
                  <span className="product__specs-text">
                    Zoom
                  </span>

                  <span className="product__specs-value">
                    {product.zoom}
                  </span>
                </div>

                <div className="product__specs">
                  <span className="product__specs-text">
                    Cell
                  </span>

                  <span className="product__specs-value">
                    {product.cell.join(', ')}
                  </span>
                </div>
              </div>
            </section>
          </div>

          <div className="product__also-like">
            <ProductsSlider
              products={getSuggestedProducts()}
              title="You may also like"
            />
          </div>
        </>
      ) : (
        <div className="product__not-found">
          {notFound}
        </div>
      )}
    </div>
  );
};
