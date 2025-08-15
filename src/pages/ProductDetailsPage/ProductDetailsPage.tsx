import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Product } from '../../utils/Product';
import './ProductDetailsPage.scss';
import { ColorPicker } from '../../components/ColorPicker';
import { CapacityPicker } from '../../components/CapacityPicker';
import { CharacteristicsTable } from '../../components/CharactiristicsTable';
import { Buttons } from '../../components/Buttons';

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

          <Buttons />

          <CharacteristicsTable
            characteristics={[
              { name: 'Screen', value: product?.screen },
              { name: 'Resolution', value: product?.resolution },
              { name: 'Processor', value: product?.processor },
              { name: 'RAM', value: product?.ram },
            ]}
          />
        </div>
      </div>
      <div className="details__description">
        <div className="details__description__first-col">
          <h2 className="details__description__title">About</h2>
          {product?.description?.map(item => (
            <div key={item.title} className="details__description--info">
              <h3 className="details__description--title">{item.title}</h3>
              <p className="details__description--text">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="details__description__second-col">
          <h2 className="details__description__title">Tech specs</h2>
          <CharacteristicsTable
            characteristics={[
              { name: 'Screen', value: product?.screen },
              { name: 'Resolution', value: product?.resolution },
              { name: 'Processor', value: product?.processor },
              { name: 'RAM', value: product?.ram },
              { name: 'Built in memory', value: product?.capacity },
              { name: 'Camera', value: product?.camera },
              { name: 'Zoom', value: product?.zoom },
              // { name: 'Cell', value: product?.cell },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
