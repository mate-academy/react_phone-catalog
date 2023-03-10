import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSuggestedProducts } from '../api/fetchData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ButtonBack } from '../components/ButtonBack';
import { DetailsProduct } from '../types/DetailsProduct';
import { Slider } from '../components/Slider';

export const ProductDetails = () => {
  const [product, setProduct] = useState<DetailsProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isProduct = !!product;
  const { productId = '' } = useParams();

  const loadProduct = async () => {
    try {
      setIsLoading(true);

      const data = await getSuggestedProducts(productId);

      setProduct(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [productId]);

  return (
    <>
      {!isLoading && isProduct && (
        <div className="product-details">
          <div className="product-details__container">
            <div className="product-details__breadcrumbs">
              <Breadcrumbs />
            </div>
            <div className="product-details__back">
              <ButtonBack />
            </div>
            <div className="product-details__title">{product.name}</div>
            <div className="product-details__top">
              <div className="product-details__slider">
                <Slider images={product.images} />
              </div>
              <div className="product-details__action">
                <div className="product-details__colors">
                  <p className="product-details__small-text">
                    Available colors
                  </p>
                  {product.colorsAvailable.map((color) => (
                    <button type="button" key={color}>
                      {color}
                    </button>
                  ))}
                </div>

                <div className="product-details__capacity">
                  <p className="product-details__small-text">Select capacity</p>
                  {product.capacityAvailable.map((capacity) => (
                    <button type="button" key={capacity}>
                      {capacity}
                    </button>
                  ))}
                </div>
                <div className="product-details__price-box">
                  <span className="product-details__discount">{`$${product.priceDiscount}`}</span>
                  <span className="product-details__regular">{`$${product.priceRegular}`}</span>
                </div>
                <div className="product-details__actions">add cart like</div>

                <div className="product-details__characteristic">
                  <ul className="product-details__list-key">
                    <li className="product-details__key">screen</li>
                    <li className="product-details__key">resolution</li>
                    <li className="product-details__key">processor</li>
                    <li className="product-details__key">RAM</li>
                  </ul>
                  <ul className="product-details__list-value">
                    <li className="product-details__value">{product.screen}</li>
                    <li className="product-details__value">
                      {product.resolution}
                    </li>
                    <li className="product-details__value">
                      {product.processor}
                    </li>
                    <li className="product-details__value">{product.ram}</li>
                  </ul>
                </div>

                <div className="product-details__tech-specs">
                  <h2 className="product-details__subtitle">Tech specs</h2>

                  <ul className="product-details__list-key">
                    <li className="product-details__key">screen</li>
                    <li className="product-details__key">resolution</li>
                    <li className="product-details__key">processor</li>
                    <li className="product-details__key">RAM</li>
                    <li className="product-details__key">built in memory</li>
                    <li className="product-details__key">camera</li>
                    <li className="product-details__key">zoom</li>
                    <li className="product-details__key">ceil</li>
                  </ul>
                  <ul className="product-details__list-value">
                    <li className="product-details__value">{product.screen}</li>
                    <li className="product-details__value">
                      {product.resolution}
                    </li>
                    <li className="product-details__value">
                      {product.processor}
                    </li>
                    <li className="product-details__value">{product.ram}</li>
                    <li className="product-details__value">{product.camera}</li>
                    <li className="product-details__value">{product.zoom}</li>
                    <li className="product-details__value">
                      {product.cell.map((ch) => (
                        <span key={ch}>{ch}</span>
                      ))}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="product-details__about">
              <h2 className="product-details__subtitle">About</h2>

              <div className="product-details__bottom">
                <div className="product-details__description">
                  {product.description.map((el) => (
                    <div
                      className="product-details__description-box"
                      key={el.title}
                    >
                      <h3 className="product-details__dectiption-title">
                        {el.title}
                      </h3>
                      <p className="product-details__text">{el.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
