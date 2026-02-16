/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getProductDetails } from '../../api/products';
import { Product } from '../../types/Product';
import { isCategory } from '../../types/categories';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouritesContext';

const ProductDetails: React.FC = () => {
  const { category: rawCategory, productId } = useParams();
  const location = useLocation();
  const category = isCategory(rawCategory) ? rawCategory : undefined;
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { addToFavourites, removeFromFavourites, isInFavourites } =
    useFavourites();
  // Use product from navigation state for instant render (hybrid approach)
  const initialProduct = (location.state as any)?.product as
    | Product
    | undefined;
  const [item, setItem] = useState<Product | null>(initialProduct ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we already have item from state, skip fetch (instant render)
    if (item || !productId || !category) {
      return;
    }

    let mounted = true;

    setLoading(true);
    setError(null);

    getProductDetails(productId, category)
      .then(res => {
        if (!mounted) {
          return;
        }

        if (!res) {
          setError('Product was not found');
        } else {
          setItem(res);
        }
      })
      .catch(e => {
        if (!mounted) {
          return;
        }

        setError(e?.message || 'Failed to load product');
      })
      .finally(() => {
        if (!mounted) {
          return;
        }

        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [productId, category, item]);

  if (loading) {
    return <p>Loading product…</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  const desc = (item as any).description;

  const renderDescription = (d: unknown) => {
    if (!d && d !== 0) {
      return null;
    }

    if (typeof d === 'string' || typeof d === 'number') {
      return <p>{d}</p>;
    }

    if (Array.isArray(d)) {
      return (
        <div>
          {d.map((part, i) => (
            <p key={i}>
              {typeof part === 'string'
                ? part
                : (part as any).text || JSON.stringify(part)}
            </p>
          ))}
        </div>
      );
    }

    if (typeof d === 'object') {
      const obj: any = d as any;

      if (obj.title || obj.text) {
        return (
          <div>
            {obj.title && <h3>{obj.title}</h3>}
            {obj.text && <p>{obj.text}</p>}
          </div>
        );
      }

      return <pre>{JSON.stringify(d, null, 2)}</pre>;
    }

    return <p>{String(d)}</p>;
  };

  return (
    <article className="product-details">
      <h1>{item.name}</h1>
      {item.images && item.images.length > 0 && (
        <img src={item.images[0]} alt={item.name} style={{ maxWidth: 400 }} />
      )}
      <p>
        Price:{' '}
        {(item as any).priceDiscount !== undefined &&
        (item as any).priceDiscount !== null ? (
          <>
            <strong>{(item as any).priceDiscount}</strong>{' '}
            {(item as any).priceRegular ? (
              <span style={{ textDecoration: 'line-through', marginLeft: 8 }}>
                {(item as any).priceRegular}
              </span>
            ) : null}
          </>
        ) : (
          <strong>
            {(item as any).priceRegular ?? (item as any).price ?? '—'}
          </strong>
        )}
      </p>
      <div>{renderDescription(desc)}</div>

      <div style={{ marginTop: 20, marginBottom: 20 }}>
        {isInCart(item.id) ? (
          <button type="button" onClick={() => removeFromCart(item.id)}>
            Remove from Cart
          </button>
        ) : (
          <button type="button" onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        )}{' '}
        {isInFavourites(item.id) ? (
          <button type="button" onClick={() => removeFromFavourites(item.id)}>
            Remove from Favourites
          </button>
        ) : (
          <button type="button" onClick={() => addToFavourites(item)}>
            Add to Favourites
          </button>
        )}
      </div>

      <Link to={`/products/${category ?? 'phones'}`}>Back to products</Link>
    </article>
  );
};

export default ProductDetails;
