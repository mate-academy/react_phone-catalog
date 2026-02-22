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

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Link to="/catalog" className="hero-back">
        Back
      </Link>

      <h1 style={{ marginBottom: 30 }}>Favorites</h1>

      {items.length === 0 && <p>No favorites yet</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {items.map(({ item, product, image, price }) => (
          <div
            key={`${item.id}-${item.color}-${item.capacity}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 25,
              padding: 20,
              borderRadius: 18,
              border: '1px solid #e6eef2',
              background: '#fff',
            }}
          >
            <img src={image} width={90} style={{ borderRadius: 12 }} />

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>
                {product.name} {item.capacity}{' '}
                {item.color.replace('-', ' ')}
              </h3>

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

            <div style={{ fontSize: 20, fontWeight: 500 }}>
              ${price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};