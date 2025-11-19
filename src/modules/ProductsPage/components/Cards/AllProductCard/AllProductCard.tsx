import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../../hooks/useFavorites';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

type AllProductCardProps = {
  product: {
    itemId: string;
    name: string;
    priceDiscount: number;
    priceRegular: number;
    image?: string;
  };
};

const AllProductsCard: React.FC<AllProductCardProps> = ({ product }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(product.itemId);

  return (
    <div className="productCard">
      <button
        className={`favoriteButton ${isFavorite ? 'active' : ''}`}
        onClick={() => toggleFavorite(product.itemId)}
      >
        ♥
      </button>

      <Link to={`/product/${product.itemId}`} className="productLink">
        {product.image && <img src={product.image} alt={product.name} className="productImage" />}
        <div className="productInfo">
          <p className="productName">{product.name}</p>
          <p className="productPrice">Preço com desconto: 
            ${product.priceDiscount}{' '}
            <span className="productPriceRegular">Preço regular: ${product.priceRegular}</span>
          </p>
        </div>
      </Link>
    </div>
    
  );
};

export default AllProductsCard;
