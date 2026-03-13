import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  getFavorites,
  removeFromFavorites,
} from '../store/favorites';
import type { FavoriteItem } from '../store/favorites';

import { loadProducts } from '../data/products';
import type { Product } from '../types/Product';

import { getProductPrice } from '../utils/price';
import { resolveImage } from '../utils/image';

type FavView = {
  item: FavoriteItem;
  product: Product;
  image: string;
  price: number;
};

export const Favorites = () => {
  const [items, setItems] = useState<FavView[]>([]);

  useEffect(() => {
    const update = async () => {
      const fav = getFavorites();
      const products = await loadProducts();

      const resolved = fav
        .map(item => {
          const product = products.find(p => p.id === item.id);
          if (!product) return null;

          const baseImg = product.images[0];
          const parts = baseImg.split('/');

          if (parts.length >= 3) {
            parts[parts.length - 2] = item.color;
          }

          return {
            item,
            product,
            image: resolveImage(parts.join('/')),
            price: getProductPrice(product, item.capacity),
          };
        })
        .filter(Boolean) as FavView[];

      setItems(resolved);
    };

    update();
    window.addEventListener('storage-update', update);
    return () => window.removeEventListener('storage-update', update);
  }, []);

  useEffect(() => {
    document.title = 'Favorites | Phone Catalog';
  }, []);

  return (
    <div className="favorites-page" style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className="favorites-page__header">
        <Link to="/catalog" className="hero-back">
          Back
        </Link>

        <h1 className="favorites-page__title">Favorites</h1>
      </div>

      {items.length === 0 && (
        <p className="favorites-empty">No favorites yet</p>
      )}

      <div
        className="favorites-list"
        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        {items.map(({ item, product, image, price }) => (
          <div
            key={`${item.id}-${item.color}-${item.capacity}`}
            className="favorite-item-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              rowGap: 16,
              gap: 25,
              padding: 20,
              borderRadius: 18,
              border: '1px solid #e6eef2',
              background: '#fff',
            }}
          >
            <Link
              to={`/product/${item.id}`}
              style={{ borderRadius: 12, flexShrink: 0, lineHeight: 0 }}
            >
              <img
                src={image}
                width={90}
                alt={`${product.name} ${item.capacity} ${item.color.replace('-', ' ')}`}
                style={{ borderRadius: 12 }}
              />
            </Link>

            <div style={{ flex: 1, minWidth: 220 }}>
              <Link
                to={`/product/${item.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h3 style={{ margin: 0 }}>
                  {product.name} {item.capacity}{' '}
                  {item.color.replace('-', ' ')}
                </h3>
              </Link>

              <p style={{ margin: '6px 0', color: '#8aa8b5' }}>
                {item.capacity} • {item.color.replace('-', ' ')}
              </p>

              <button
                onClick={() =>
                  removeFromFavorites(
                    item.id,
                    item.color,
                    item.capacity
                  )
                }
                style={{
                  marginTop: 8,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94aeb8',
                  letterSpacing: '1px',
                }}
              >
                Remove
              </button>
            </div>

            <div
              className="favorite-item-card__price"
              style={{
                fontSize: 20,
                fontWeight: 500,
                marginLeft: 'auto',
              }}
            >
              ${price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
