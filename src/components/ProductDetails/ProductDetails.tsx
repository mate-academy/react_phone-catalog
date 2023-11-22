/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link, useParams } from 'react-router-dom';
import {
  useState, useMemo, useEffect, useContext, useCallback,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AddToCartBtn } from '../AddToCartBtn';
import { AddToFavorite } from '../AddToFavorite';
import { ProductDescription } from '../../types/ProductDescription';
import { Color } from '../Color/Color';
import { Pallette } from '../../types/Palette';
import { FeaturesInfo } from '../FeaturesInfo';
import { ProductsSlider } from '../ProductsSlider';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';
import { ProductsContext } from '../ProductsContext';

import './productDetails.scss';

type Props = {
  productDetails?: ProductDescription,
};

export const ProductDetails: React.FC<Props> = ({ productDetails }) => {
  const [currentImg, setCurrentImg] = useState('');
  const [activeColor, setActiveColor] = useState('');
  const [activeCapacity, setActiveCapacity] = useState('');
  const { productId } = useParams();

  function changeCapacity(itemId: string, capacityValue: string) {
    const itemIdArray = itemId.split('-');

    itemIdArray[itemIdArray.length - 2] = capacityValue.toLowerCase();

    return itemIdArray.join('-');
  }

  const products = useContext(ProductsContext);

  const product = products.find(item => item.phoneId === productId);

  const randomProducts = useMemo(() => {
    return getSuggestedProducts(products);
  }, [products]);

  useEffect(() => {
    if (productDetails?.images && productDetails.images.length > 0) {
      setCurrentImg(productDetails.images[0]);
    }

    if (productDetails?.color) {
      setActiveColor(productDetails.color);
    }

    if (productDetails?.capacity) {
      setActiveCapacity(productDetails.capacity);
    }
  }, [productDetails]);

  let productIdNew: string;
  let productIdValue: string;

  if (productId) {
    productIdNew = productId.slice(0, productId.lastIndexOf('-'));
  }

  if (productId) {
    productIdValue = productId;
  }

  const handleCurrentImage = useCallback((image: string) => {
    setCurrentImg(image);
  }, [setCurrentImg]);

  const handleColorChange = useCallback((color: string) => {
    setActiveColor(color);
  }, [setActiveColor]);

  return (
    <div className="product-details">
      <h1 className="title rainbow-text product-details__title">
        {productDetails?.name}
      </h1>

      <div className="product-details__main-properties">
        <div className="product-details__images">
          <div className="product-details__thumbnails">
            {productDetails?.images.map(image => (
              <div
                className="product-details__thumbnail"
                onClick={() => handleCurrentImage(image)}
                role="none"
                key={uuidv4()}
              >
                <img
                  className="product-details__thumbnail-img"
                  src={`new/${image}`}
                  alt={productDetails.name}
                />
              </div>
            ))}
          </div>

          <div className="product-details__original">
            <img
              className="product-details__original-img"
              src={`new/${currentImg}`}
              alt=""
            />
          </div>
        </div>

        <div className="product-details__characteristics">

          <div className="product-details__available-colors-text">
            Available colors
          </div>

          <div className="product-details__available-colors">
            {productDetails?.colorsAvailable.map(color => (
              <div
                key={uuidv4()}
                className="product-details__color"
                onClick={() => handleColorChange(color)}
              >
                <Link to={`../${productIdNew}-${color}`}>
                  <Color
                    color={Pallette[color]}
                    borderColor={color === activeColor
                      ? '#313237' : '#e2e6e9'}
                  />
                </Link>
              </div>
            ))}
          </div>

          <hr className="product-details__line" />

          <div className="product-details__capacity">
            <div className="product-details__capacity-text">
              Select capacity
            </div>

            <div className="product-details__capacity-values">
              {productDetails?.capacityAvailable.map(capacity => (
                <Link to={`../${changeCapacity(productIdValue, capacity)}`}>
                  <button
                    type="button"
                    className={capacity === activeCapacity
                      ? 'product-details__capacity-value--active'
                      : 'product-details__capacity-value'}
                    key={uuidv4()}
                    onClick={() => {
                      setActiveCapacity(capacity);
                    }}
                  >
                    {capacity}
                  </button>
                </Link>
              ))}
            </div>
          </div>

          <hr className="product-details__line" />

          <div className="product-details__prices">
            <div className="product-details__price">
              $
              {productDetails?.priceRegular}
            </div>
            <div className="product-details__prev-price">
              $
              {productDetails?.priceDiscount}
            </div>
          </div>

          <div className="product-details__buttons">
            {product && <AddToCartBtn wide product={product} />}
            {product && <AddToFavorite wide product={product} />}
          </div>

          <div className="product-details__info">
            <FeaturesInfo title="Screen" value={productDetails?.screen} />
            <FeaturesInfo
              title="Resolution"
              value={productDetails?.resolution}
            />
            <FeaturesInfo
              title="Processor"
              value={String(productDetails?.processor)}
            />
            <FeaturesInfo title="RAM" value={productDetails?.ram} />
          </div>
        </div>
      </div>

      <div className="product-details__additional-properties">
        <section
          className="product-details__about"
          data-cy="productDescription"
        >
          <h2 className="product-details__about-title">
            About
          </h2>

          <hr className="product-details__line" />

          {productDetails?.description.map((description) => (
            <div
              className="product-details__about-content"
              key={uuidv4()}
            >
              <h3 className="product-details__about-content-title">
                {description.title}
              </h3>
              <p className="product-details__about-content-text">
                {description.text}
              </p>
            </div>
          ))}
        </section>

        <section className="product-details__tech">
          <h2 className="product-details__tech-title">
            Tech specs
          </h2>

          <hr className="product-details__line" />

          <div className="product-details__tech-specs">
            <FeaturesInfo title="Screen" value={productDetails?.screen} wide />
            <FeaturesInfo
              title="Resolution"
              value={productDetails?.resolution}
              wide
            />
            <FeaturesInfo
              title="Processor"
              value={String(productDetails?.processor)}
              wide
            />
            <FeaturesInfo title="RAM" value={productDetails?.ram} wide />

            <FeaturesInfo title="Camera" value={productDetails?.camera} wide />
            <FeaturesInfo title="Zoom" value={productDetails?.zoom} wide />
            <FeaturesInfo
              title="Cell"
              value={productDetails?.cell.join(', ')}
              wide
            />
          </div>
        </section>

      </div>

      <section className="product-details__may-like">
        <h1 className="title product-details__may-like-title rainbow-text">
          You may also like
        </h1>
        <div className="product-details__may-like-slider">
          <ProductsSlider products={randomProducts} />
        </div>
      </section>
    </div>
  );
};
