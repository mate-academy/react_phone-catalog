import './productCard.scss';
import { useNavigate } from 'react-router-dom';
import { FavoriteButton } from '../favoriteButton/favoriteButton';
import { ProductListItem } from '../../types/product';
import { CartButton } from '../cartButton';

export const ProductCard = ({
  product,
  isFullPrice,
}: {
  product: ProductListItem;
  isFullPrice: boolean;
}) => {
  const navigate = useNavigate();

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="productCard" key={product.id}>
      <div className="productCard__box">
        <img
          src={`../public/${product.image}`}
          alt={product.name}
          onClick={() => handleProductClick(product.itemId)}
          style={{ cursor: 'pointer' }}
          className="productCard__box--img"
        />
      </div>
      <div
        className="productCard__nameClick"
        onClick={() => handleProductClick(product.itemId)}
      >
        <h3 className="productCard__name">{product.name}</h3>
      </div>
      <div className="productCard__prices">
        <p className="productCard__prices--price">${product.price}</p>
        {isFullPrice ? (
          <p className="productCard__prices--full">${product.fullPrice}</p>
        ) : (
          ' '
        )}
      </div>
      <div className="productCard__line"></div>
      <div className="productCard__info">
        <p className="productCard__info--name">Screen</p>
        <p className="productCard__info--value">
          {truncate(product.screen, 14)}
        </p>
      </div>
      <div className="productCard__info">
        <p className="productCard__info--name">Capacity</p>
        <p className="productCard__info--value">{product.capacity}</p>
      </div>
      <div className="productCard__info">
        <p className="productCard__info--name">RAM</p>
        <p className="productCard__info--value">{product.ram}</p>
      </div>
      <div className="productCard__button">
        <CartButton itemId={product.itemId} />
        <FavoriteButton itemId={product.itemId} />
      </div>
    </div>
  );
};
