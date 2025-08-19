import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Product } from '../../utils/Product';
import { ColorPicker } from '../../components/ColorPicker';
import { CapacityPicker } from '../../components/CapacityPicker';
import { CharacteristicsTable } from '../../components/CharactiristicsTable';
import { Buttons } from '../../components/Buttons';
import { ProductsList } from '../../components/ProductsList';
import { Breadcrumbs } from '../../components/Breadcrumbs';

import './ProductDetailsPage.scss';

type Props = {};

export const ProductDetailsPage: React.FC<Props> = () => {
  const getImageSrc = (src: string) => (src.startsWith('/') ? src : '/' + src);

  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const files = [
    '/api/phones.json',
    '/api/tablets.json',
    '/api/accessories.json',
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
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

    const getSuggestedProducts = async (count = 20) => {
      try {
        let allProducts: Product[] = [];

        for (const file of files) {
          const res = await fetch(file);
          const data: Product[] = await res.json();

          allProducts = allProducts.concat(data);
        }

        const shuffled = allProducts.sort(() => 0.5 - Math.random());

        setSuggestedProducts(shuffled.slice(0, count));
      } catch (e) {}
    };

    fetchProduct();
    getSuggestedProducts();
  }, [productId]);

  return (
    <>
      <div className="details">
        <Breadcrumbs />
        <h1 className="details__title">{product?.name}</h1>
        <div className="details__main">
          <div className="details__images">
            {product?.images?.map((image, index) => (
              <div
                className={`details__image-wrapper ${index === selectedImage && 'details__image-wrapper--active'}`}
                key={image}
                onClick={() => setSelectedImage(index)}
              >
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
                src={getImageSrc(product.images[selectedImage])}
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

            <div className="details__price-with-discount">
              <p className="details__price details__price--discount">
                ${product?.priceDiscount}
              </p>
              <p className="details__price details__price--regular">
                ${product?.priceRegular}
              </p>
            </div>

            <Buttons product={product} />

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
              ]}
            />
          </div>
        </div>
        <div>
          <ProductsList
            title="You may also like"
            products={suggestedProducts}
          />
        </div>
      </div>
    </>
  );
};
