import './ProductDetailsPage.scss';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Loader } from '../../../components/shared/Loader';
import { getData } from '../../../utils/getData';
import { ProductDetails } from '../../../types/ProductCategory';
import { Breadcrumbs } from '../../../components/shared/Breadcrumbs/Breadcrumbs';
import { getHexColor } from '../../../utils/colorMapper';
import { Specs } from '../../../components/shared/Specs';
import { CartFavoritesToggle } from '../../../components/shared/CartFavoritesToggle';
import { ProductsSlider } from '../../HomePage/components/ProductsSlider';
import { Product } from '../../../types/Product';

export const ProductDetailsPage: React.FC = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [recommendedProducts, setRecommendedPRoducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!productId || !category) {
      return;
    }

    setLoading(true);

    Promise.all([
      getData<ProductDetails[]>(`/${category}`),
      getData<Product[]>('/products'),
    ])
      .then(([allProductsInCategory, sameCategoryProducts]) => {
        const foundProduct = allProductsInCategory.find(
          item => item.id === productId,
        );

        if (foundProduct) {
          setProductDetails(foundProduct);
          setError('');
          if (foundProduct.images && foundProduct.images.length > 0) {
            setCurrentImage(foundProduct.images[0]);
          }
        } else {
          setError('Product not found in this category');
        }

        const sameCategoryProductsClear = sameCategoryProducts
          .filter(
            elem => elem.itemId !== productId && elem.category === category,
          )
          .slice(0, 10);
        setRecommendedPRoducts(sameCategoryProductsClear);

        const baseProduct = sameCategoryProducts.find(
          item => item.itemId === productId,
        );

        if (baseProduct) {
          setCurrentProduct(baseProduct);
        }
      })
      .catch(err => {
        setError(err.message || 'Error fetching details');
      })
      .finally(() => setLoading(false));
  }, [category, productId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [productId]);

  const handleColorChange = (targetColor: string) => {
    if (!productDetails || !category) {
      return;
    }

    const newProductId = productId?.replace(productDetails.color, targetColor);

    if (newProductId) {
      navigate(`/${category}/${newProductId}`);
    }
  };

  const handleCapacityChange = (targetCapacity: string) => {
    if (!productDetails || !category || !productId) {
      return;
    }

    const currentCapacityIdPart = productDetails.capacity.toLowerCase();
    const targetCapacityIdPart = targetCapacity.toLowerCase();

    const newProductId = productId.replace(
      currentCapacityIdPart,
      targetCapacityIdPart,
    );
    navigate(`/${category}/${newProductId}`);
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !productDetails) {
    return <p>Product not found</p>;
  }

  return (
    <section className="product-details">
      <div className="page__content">
        <div className="product-details__static">
          <Breadcrumbs
            categoryName={`${category}`}
            productName={productDetails.name}
          />

          <Link to={`/${category}`} className="product-details__static--back">
            <div className="product-details__static--arrow"></div>
            <p className="product-details__static--text">Back</p>
          </Link>
        </div>

        <h1 className="product-details__header">{productDetails.name}</h1>

        <div className="product-details__info">
          <div className="product-details__images">
            <div className="product-details__images--thumbs">
              {productDetails.images.map(image => (
                <img
                  key={image}
                  src={image}
                  onClick={() => setCurrentImage(image)}
                  alt="Thumbnail"
                  className={`product-details__preview-image ${
                    currentImage === image
                      ? 'product-details__preview-image--active'
                      : ''
                  }`}
                />
              ))}
            </div>

            <div className="product-details__main-image--container">
              <img
                key={currentImage}
                src={currentImage}
                className="product-details__main-image--image"
                alt={productDetails.name}
              />
            </div>
          </div>
          <div className="product-details__container--specs">
            <div className="product-details__colors">
              <div className="product-details__text-container">
                <p className="product-details__subtitle">Available colors</p>
                <p className="product-details__subtitle product-details__colors-id">
                  {productDetails.namespaceId}
                </p>
              </div>
              <div className="product-details__colors-list">
                {productDetails.colorsAvailable.map(color => {
                  const hex = getHexColor(color);
                  const isActiveColor = productDetails.color === color;

                  return (
                    <div
                      key={color}
                      className={`product-details__color-container ${
                        isActiveColor
                          ? 'product-details__color-container--active'
                          : ''
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleColorChange(color)}
                        style={{ backgroundColor: hex }}
                        className="product-details__color-btn"
                        title={color}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="product-details__capacity">
              <p className="product-details__subtitle">Select capacity</p>
              <div className="product-details__capacity--btns">
                {productDetails.capacityAvailable.map(capacity => {
                  const isActiveCapacity = productDetails.capacity === capacity;

                  return (
                    <label
                      key={capacity}
                      className={`product-details__capacity--button ${
                        isActiveCapacity
                          ? 'product-details__capacity--button--active'
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="capacity-picker"
                        checked={isActiveCapacity}
                        onChange={() => handleCapacityChange(capacity)}
                        className="product-details__radio-hidden"
                      />
                      {capacity}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="product-details__price">
              <p className="product-details__price--discount">
                ${productDetails.priceDiscount}
              </p>
              <p className="product-details__price--regular">
                ${productDetails.priceRegular}
              </p>
            </div>
            <div className="product-details__buy-favorite-buttons">
              {currentProduct && (
                <CartFavoritesToggle product={currentProduct} />
              )}
            </div>

            <div className="product-details__specs-small">
              <Specs
                specs={{
                  Screen: productDetails.screen,
                  Resolution: productDetails.resolution,
                  Capacity: productDetails.capacity,
                  RAM: productDetails.ram,
                }}
              />
            </div>
          </div>
        </div>
        <div className="product-details__description">
          <div className="product-details__description--about">
            <h2 className="product-details__h2">About</h2>

            <div className="product-details__description--container">
              {productDetails.description.map(section => {
                return (
                  <React.Fragment key={section.title}>
                    <h3 className="product-details__h3">{section.title}</h3>

                    {section.text.map((paragraph, index) => (
                      <p
                        key={index}
                        className="product-details__description--text"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="product-details__description--tech-specs">
            <h2 className="product-details__h2">Tech specs</h2>
            <Specs
              specs={{
                Screen: productDetails.screen,
                Resolution: productDetails.resolution,
                Capacity: productDetails.capacity,
                RAM: productDetails.ram,
                'Built in memory': productDetails.capacity,
                Camera: productDetails.camera || '',
                Zoom: productDetails.zoom || '',
                Cell: productDetails.cell || '',
              }}
            />
          </div>
        </div>
        <ProductsSlider
          header="You may also like"
          oldPrice={true}
          products={recommendedProducts}
        />
      </div>
    </section>
  );
};
