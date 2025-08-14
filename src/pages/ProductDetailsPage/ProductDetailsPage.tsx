import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Product } from '../../utils/Product';
import './ProductDetailsPage.scss';
import { ColorPicker } from '../../components/ColorPicker';
import { CapacityPicker } from '../../components/CapacityPicker';

type Props = {};

export const ProductDetailsPage: React.FC<Props> = () => {
  const getImageSrc = (src: string) => (src.startsWith('/') ? src : '/' + src);

  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const files = [
          '/api/phones.json',
          '/api/tablets.json',
          '/api/accessories.json',
          '/api/products.json',
        ];

        for (const file of files) {
          const res = await fetch(file);
          const data: Product[] = await res.json();
          const found = data.find(p => String(p.id) === productId);

          if (found) {
            setProduct(found);
            break;
          }
        }
      } catch (e) {}
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="details">
      <h1 className="details__title">{product?.name}</h1>
      <div className="details__main">
        <div className="details__images">
          {product?.images?.map(image => (
            <div className="details__image-wrapper" key={image}>
              <img
                className="details__image"
                src={getImageSrc(image)}
                alt="product image"
              />
            </div>
          ))}
        </div>
        {product?.images && product.images.length > 0 ? (
          <div className="details__main-image-wrapper">
            <img
              className="details__main-image"
              src={getImageSrc(product.images[0])}
              alt="product image"
            />
          </div>
        ) : (
          <div>No image available</div>
        )}
        <div className="details__short-characteristics">
          <div className="details__colors">
            <p className="details__small-title">Available colors</p>
            <ColorPicker
              colors={
                product?.colorsAvailable ??
                (product?.color ? [product.color] : [])
              }
            />
          </div>
          <div className="details__capacity">
            <p className="details__small-title">Select capacity</p>
            <CapacityPicker
              capacity={
                product?.capacityAvailable ??
                (product?.capacity ? [product.capacity] : [])
              }
            />
          </div>

          {product?.fullPrice ? (
            <p className="details__price">${product.fullPrice}</p>
          ) : (
            <div className="details__price-with-discount">
              <p className="details__price details__price--discount">
                ${product?.priceDiscount}
              </p>
              <p className="details__price details__price--regular">
                ${product?.priceRegular}
              </p>
            </div>
          )}

          <div className="details__button">
            <button className="details__button--add">Add to cart</button>
            <button className="details__button--favourite">
              <img
                src="/img/icons/icon-favourites.svg"
                alt="favourites icon"
                className="details__button-icon"
              />
            </button>
          </div>

          <div className="details__details">
            <div className="details__details-row">
              <div className="details__details-name">Screen</div>
              <div className="details__details-value">{product?.screen}</div>
            </div>
            <div className="details__details-row">
              <div className="details__details-name">Resolution</div>
              <div className="details__details-value">
                {product?.resolution}
              </div>
            </div>
            <div className="details__details-row">
              <div className="details__details-name">Processor</div>
              <div className="details__details-value">{product?.processor}</div>
            </div>
            <div className="details__details-row">
              <div className="details__details-name">RAM</div>
              <div className="details__details-value">{product?.ram}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
