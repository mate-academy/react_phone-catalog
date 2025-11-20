import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';

type Product = {
  id: number;
  name: string;
  price: number;
  discount: number;
  image?: string;
};

type Props = { product: Product };

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="product-card">
      <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
      <h3>{product.name}</h3>
      <p>R$ {(product.price - product.discount).toFixed(2)}</p>
      <button onClick={() => toggleFavorite(product)}>
        <Heart size={22} color={isFavorite(product.id) ? 'red' : 'gray'} />
      </button>
    </div>
  );
};
