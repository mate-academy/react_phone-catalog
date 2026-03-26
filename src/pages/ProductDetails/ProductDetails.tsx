import React, { useEffect, useState } from 'react';
import styles from './ProductDetails.module.scss';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPhones, getTablets, getAccessories } from '../../api/client';
// eslint-disable-next-line max-len
import { ProductDetails as PhoneTabletDetails } from '../../types/ProductDetails';
import { AccessoryDetails } from '../../types/AccessoryDetails';

import { Loader } from '../../components/Loader';
import { ProductGallery } from '../../components/ProductGallery/ProductGallery';
import { ProductInfo } from '../../components/ProductInfo';
import { AboutProduct } from '../../components/AboutProduct';
import { Techspecs } from '../../components/AboutProduct/Techspecs/Techspecs';
import { AlsoLike } from '../../components/AlsoLike';
import { BtnBack } from '../../components/BtnBack';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useFavorite } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/Product';

type AnyDetails = PhoneTabletDetails | AccessoryDetails;

const CATEGORY_LABELS: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const normalize = (str: string) => str.toLowerCase().replace(/[\s-]/g, '');

async function fetchDetails(
  category: string,
  productId: string,
): Promise<AnyDetails | null> {
  let items: AnyDetails[] = [];

  if (category === 'phones' || category === 'tablets') {
    items = await (category === 'phones' ? getPhones() : getTablets());
  } else if (category === 'accessories') {
    items = await getAccessories();
  }

  return items.find(p => normalize(p.id) === normalize(productId)) ?? null;
}

export const ProductDetails: React.FC = () => {
  const { category = '', productId = '' } = useParams<{
    category: string;
    productId: string;
  }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<AnyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  const { toggleFavorite, isInFavorites } = useFavorite();
  const { addToCart, isInCart, removeFromCart } = useCart();

  const normalizeColor = (color: string) =>
    color.toLowerCase().replace(/\s+/g, '-');

  const handleColorChange = (color: string) => {
    const normalizedColor = normalizeColor(color);

    const currentColorSlug = normalizeColor(selectedColor);

    if (!productId.endsWith(currentColorSlug)) {
      return;
    }

    const base = productId.slice(0, -currentColorSlug.length);

    const newId = `${base}${normalizedColor}`;

    navigate(`/${category}/${newId}`);
  };

  const handleCapacityChange = (capacity: string) => {
    const parts = productId.split('-');

    parts[parts.length - 2] = capacity.toLowerCase();
    const newId = parts.join('-');

    navigate(`/${category}/${newId}`);
  };

  useEffect(() => {
    if (product) {
      setSelectedColor(product.color ?? '');
      setSelectedCapacity(product.capacity ?? '');
    }
  }, [product]);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setProduct(null);

    fetchDetails(category, productId)
      .then(found => {
        if (!found) {
          setNotFound(true);

          return;
        }

        setProduct(found);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [category, productId]);

  const navProduct = { name: product?.name ?? productId, category };

  if (loading) {
    return (
      <div className={styles.product}>
        <Loader />
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className={styles.product}>
        <Breadcrumbs product={{ name: '', category }} />
        <div className={styles.product__notFound}>
          <img
            src="img/product-not-found.png"
            alt=""
            className={styles.product__notFoundImg}
          />
          <h2 className={styles.product__notFoundTitle}>
            Product was not found
          </h2>
          <p className={styles.product__notFoundSub}>
            The item you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link to={`/${category}`} className={styles.product__notFoundLink}>
            Back to {CATEGORY_LABELS[category] ?? 'catalogue'}
          </Link>
        </div>
      </div>
    );
  }

  const productForCart: Product | null = product
    ? {
        id: 0, // якщо є числовий id
        category: category as Product['category'],
        itemId: product.id,
        name: product.name,
        fullPrice: product.priceRegular,
        price: product.priceDiscount,
        screen: product.screen,
        capacity: product.capacity,
        color: product.color,
        ram: product.ram,
        year: 2022,
        image: product.images?.[0] ?? '',
      }
    : null;

  return (
    <div className={styles.product}>
      <div className={styles.product__top}>
        <Breadcrumbs product={navProduct} />
        <BtnBack />
      </div>
      <h1 className={styles.product__title}>{product.name}</h1>

      <div className={styles.product__main}>
        <ProductGallery images={product.images} productName={product.name} />
        <ProductInfo
          product={product}
          selectedColor={selectedColor}
          selectedCapacity={selectedCapacity}
          onColorChange={handleColorChange}
          onCapacityChange={handleCapacityChange}
          onAddToCart={() => {
            if (!productForCart) {
              return;
            }

            if (isInCart(productForCart.itemId)) {
              removeFromCart(productForCart.itemId);
            } else {
              addToCart(productForCart);
            }
          }}
          onFavorite={() => productForCart && toggleFavorite(productForCart)}
          isFavorite={
            productForCart ? isInFavorites(productForCart.itemId) : false
          }
          isInCart={productForCart ? isInCart(productForCart.itemId) : false}
        />
      </div>
      <div className={styles.product__sections}>
        <div className={styles.product__section}>
          <div className={styles.product__section__about}>
            <AboutProduct product={product} />
          </div>
          <div className={styles.product__section__techSpecs}>
            <Techspecs product={product} />
          </div>
        </div>
        <div className={styles.product__alsoLike}>
          <AlsoLike />
        </div>
      </div>
    </div>
  );
};
