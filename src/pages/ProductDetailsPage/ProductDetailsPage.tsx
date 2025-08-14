import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Product } from '../../utils/Product';
import './ProductDetailsPage.scss';

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
      </div>
    </div>
  );
};
