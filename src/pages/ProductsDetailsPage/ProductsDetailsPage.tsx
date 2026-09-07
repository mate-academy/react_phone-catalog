import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { Product } from '../../utils/Product';
import { ColorPicker } from '../../components/ColorPicker/ColorPicker';
import { CapacityPicker } from '../../components/CapacityPicker/CapacityPicker';
// eslint-disable-next-line max-len
import { CharacteristicsTable } from '../../components/CharactTable/CharactTable';
import { Buttons } from '../../components/Buttons/Buttons';
import { ProductList } from '../../components/ProductList/ProductList';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ButtonBack } from '../../components/ButtonBack/ButtonBack';

import style from './ProductsDetailsPage.module.scss';

const files = ['api/phones.json', 'api/tablets.json', 'api/accessories.json'];

const buildProductId = (
  namespaceId: string,
  capacity: string,
  color: string,
) => {
  return `${namespaceId}-${capacity.toLowerCase()}-${color.toLowerCase()}`;
};

export const ProductsDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        setLoading(true);
        let products: Product[] = [];

        for (const file of files) {
          const res = await fetch(file);
          const data: Product[] = await res.json();

          products = products.concat(data);
        }

        setAllProducts(products);

        const found = products.find(p => String(p.id) === productId);

        if (found) {
          setProduct(found);
          setSelectedColor(found.color);
          setSelectedCapacity(found.capacity);
        }

        const shuffled = [...products].sort(() => 0.5 - Math.random());

        setSuggestedProducts(shuffled.slice(0, 20));
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, [productId]);

  useEffect(() => {
    if (!product || !selectedColor || !selectedCapacity) {
      return;
    }

    const newId = buildProductId(
      product.namespaceId,
      selectedCapacity,
      selectedColor,
    );

    if (product.id !== newId) {
      navigate(`/${product.category}/${newId}`, { replace: true });

      const variant = allProducts.find(p => p.id === newId);

      if (variant) {
        setProduct(variant);
        setSelectedImage(0);
      }
    }
  }, [selectedColor, selectedCapacity, product, allProducts, navigate]);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <ClipLoader color="#905bff" size={60} />
        </div>
      ) : !product ? (
        <div className={style.details__title}>Product was not found</div>
      ) : (
        <div className={style.details}>
          <Breadcrumbs />

          <ButtonBack />

          <h1 className={style.details__title}>{product?.name}</h1>

          <div className={style.details__main}>
            <div className={style.details__images}>
              {product?.images?.map((image, index) => (
                <div
                  className={`${style['details__image-wrapper']} ${index === selectedImage ? style['details__image-wrapper--active'] : ''}`}
                  key={image}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    className={style.details__image}
                    src={image}
                    alt="product image"
                  />
                </div>
              ))}
            </div>
            {product?.images && product.images.length > 0 ? (
              <div className={style['details__main-image-wrapper']}>
                <img
                  className={style['details__main-image']}
                  src={product.images[selectedImage]}
                  alt="product image"
                />
              </div>
            ) : (
              <div>No image available</div>
            )}
            <div className={style['details__short-characteristics']}>
              <div className={style.details__colors}>
                <p className={style['details__small-title']}>
                  Available colors
                </p>
                <ColorPicker
                  activeColor={selectedColor}
                  colors={
                    product?.colorsAvailable ??
                    (product?.color ? [product.color] : [])
                  }
                  onColorChange={setSelectedColor}
                />
              </div>
              <div className={style.details__capacity}>
                <p className={style['details__small-title']}>Select capacity</p>
                <CapacityPicker
                  activeCapacity={selectedCapacity}
                  capacity={
                    product?.capacityAvailable ??
                    (product?.capacity ? [product.capacity] : [])
                  }
                  onCapacityChange={setSelectedCapacity}
                />
              </div>

              <div className={style['details__price-with-discount']}>
                <p
                  className={`${style.details__price} ${style['details__price--discount']}`}
                >
                  ${product?.priceDiscount}
                </p>
                <p
                  className={`${style.details__price} ${style['details__price--regular']}`}
                >
                  ${product?.priceRegular}
                </p>
              </div>

              <Buttons
                product={product}
                selectedColor={selectedColor}
                selectedCapacity={selectedCapacity}
              />

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
          <div className={style.details__description}>
            <div className={style['details__description__first-col']}>
              <h2 className={style.details__description__title}>About</h2>
              {product?.description?.map(item => (
                <div
                  key={item.title}
                  className={style['details__description--info']}
                >
                  <h3 className={style['details__description--title']}>
                    {item.title}
                  </h3>
                  <p className={style['details__description--text']}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <div className={style['details__description__second-col']}>
              <h2 className={style.details__description__title}>Tech specs</h2>
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
            <ProductList
              title="You may also like"
              products={suggestedProducts}
            />
          </div>
        </div>
      )}
    </>
  );
};
