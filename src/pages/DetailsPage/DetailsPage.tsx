import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import classNames from 'classnames';
import { ProductById } from '../../services/productById';
import { Category } from '../../types/Category';
import { Path } from '../../Components/Path/Path';
import { Back } from '../../Components/Back/Back';
import { PhotoSlider } from '../../Components/PhotoSlider/PhotoSlider';
import { ProductColors } from '../../types/ProductColors';
import { ProductsContext } from '../../context/ProductContext';
import { AddToCart } from '../../Components/AddToCart/AddToCart';
import { AddToFavorite } from '../../Components/AddToFavorite/AddToFavorite';
import { ProductInfo } from '../../types/ProductInfo';
import { Carousel } from '../../Components/Carousel/Carousel';
import { useLoading } from '../../hooks/useLoading';
import { Loader } from '../../Components/Loader/Loader';

import './DetailsPage.scss';

export const DetailsPage = () => {
  const { pathname } = useLocation();
  const { allProducts } = useContext(ProductsContext);
  const isLoading = useLoading();
  const pathParts = pathname.split('/');
  const category = pathParts[1];
  const productId = pathParts[2];

  const product: ProductInfo | undefined = ProductById(
    category as Category,
    productId,
  );

  const feature = {
    Screen: product?.screen,
    Resolution: product?.resolution,
    Processor: product?.processor,
    RAM: product?.ram,
  };

  const techSpecs: Record<string, string | undefined> = {
    Screen: product?.screen,
    Resolution: product?.resolution,
    Processor: product?.processor,
    RAM: product?.ram,
    Capacity: product?.capacity,
    Cell: product?.cell.join(', '),
  };

  if (product?.camera) {
    techSpecs.Camera = product.camera;
  }

  if (product?.zoom) {
    techSpecs.Zoom = product.zoom;
  }

  const addProduct = allProducts.find(item => item.itemId === productId);

  const handleColorChange = (newColor: string) => {
    const idParts = productId.split('-');

    idParts[idParts.length - 1] = newColor;
    const newProductId = idParts.join('-');

    return `../${category}/${newProductId}`;
  };

  const handleMemoryChange = (newMemory: string) => {
    const idParts = productId.split('-');

    idParts[idParts.length - 2] = newMemory.toLowerCase();
    const newProductId = idParts.join('-');

    return `../${category}/${newProductId}`;
  };

  const getRandomProducts = (count: number) => {
    const shuffled = allProducts.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, count);
  };

  return (
    <div className="details-page">
      {product && (
        <div className="details-page__containar">
          <Path category={category} productId={product.name} />

          <Back />

          <h2 className="details-page__title">{product.name}</h2>

          {isLoading && <Loader />}

          {!isLoading && (
            <>
              <PhotoSlider images={product.images} />

              <div className="details-page__colors">
                <div className="details-page__title-and-id">
                  <p className="details-page__color-title">Available colors</p>

                  <p className="details-page__color-id">ID: 802390</p>
                </div>

                <div className="details-page__colors-box">
                  {product.colorsAvailable.map(color => (
                    <Link
                      className={classNames('details-page__color-circle', {
                        'details-page__color-circle--active':
                          color === product.color,
                      })}
                      key={color}
                      to={handleColorChange(color)}
                    >
                      <div
                        className="details-page__color"
                        style={{
                          backgroundColor:
                            ProductColors[color as keyof typeof ProductColors],
                        }}
                      />
                    </Link>
                  ))}
                </div>
                <div className="details-page__color-line" />
              </div>

              <div className="details-page__memory">
                <p className="details-page__memory-title">Select capacity</p>

                <div className="details-page__memory-box">
                  {product.capacityAvailable.map(item => (
                    <Link
                      to={handleMemoryChange(item)}
                      className={classNames('details-page__memory-item', {
                        'details-page__memory-item--active':
                          item === product.capacity,
                      })}
                      key={item}
                    >
                      {`${item}`}
                    </Link>
                  ))}
                </div>

                <div className="details-page__memory-line" />
              </div>

              <div className="details-page__price-box">
                <p className="details-page__price-box--price">
                  {`$${product.priceDiscount}`}
                </p>

                <p className="details-page__price-box--full-price">
                  {`$${product.priceRegular}`}
                </p>
              </div>

              {addProduct && (
                <div className="details-page__button-block">
                  <div className="details-page__button-cart">
                    <AddToCart product={addProduct} />
                  </div>

                  <div className="details-page__button-favorite">
                    <AddToFavorite product={addProduct} />
                  </div>
                </div>
              )}

              <div className="details-page__feature">
                {Object.entries(feature).map(([key, value]) => (
                  <div key={key} className="details-page__feature-item">
                    <p className="details-page__feature-title">{key}</p>
                    <p className="details-page__feature-value">{value}</p>
                  </div>
                ))}
              </div>

              <div className="details-page__about">
                <p className="details-page__about-name">About</p>

                <div className="details-page__about-line" />

                {product.description.map(describe => (
                  <div
                    className="details-page__about-item"
                    key={describe.title}
                  >
                    <p className="details-page__about-item--title">
                      {describe.title}
                    </p>
                    <p className="details-page__about-item--text">
                      {describe.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="details-page__tech-specs">
                <p className="details-page__tech-specs-title">Tech specs</p>

                <div className="details-page__tech-specs-line" />

                <div className="details-page__tech-specs-items">
                  {Object.entries(techSpecs).map(([key, value]) => (
                    <div key={key} className="details-page__feature-item">
                      <p className="details-page__feature-title">{key}</p>
                      <p className="details-page__feature-value">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {!isLoading && (
        <div className="details-page__carousel">
          <Carousel
            title="You may also like"
            products={getRandomProducts(20)}
          />
        </div>
      )}
    </div>
  );
};
