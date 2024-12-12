import './ProductCard.scss';
import { Product } from '../../../types/Product';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  showFullPrice?: boolean;
}

interface StyledCardProps {
  width: string;
  margin: string;
}

interface StyledButtonProps {
  width: string;
}

const StyledCard = styled.div<StyledCardProps>`
  max-width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
`;

const StyledButton = styled.div<StyledButtonProps>`
  width: ${({ width }) => width};
`;

export const ProductCard: React.FC<ProductCardProps> = ({ product, showFullPrice }) => {
  const location = useLocation();

  const widthBlock = location.pathname === '/phones' ? '287px' : '212px';
  const widthButton = location.pathname === '/phones' ? '176px' : '100px';
  const margin = location.pathname === '/phones' ? '40px 0px 0px 0px' : '0px 16px 0px 0px';

  return (
    <StyledCard width={widthBlock} margin={margin} className="product-card">
      <img src={product.image} alt={product.name} className="product-card__image" />
      <p className="product-card__name">{product.name}</p>
      <div className="product-card__prices">
        <h3 className="product-card__price">${product.price}</h3>
        {showFullPrice && <h3 className="product-card__fullprice">${product.fullPrice}</h3>}
      </div>
      <hr className="product-card__line" />
      <div className="product-card__specs">
        <h5 className="product-card__spec">
          Screen <span className="product-card__options">{product.screen}</span>
        </h5>
        <h5 className="product-card__spec">
          Capacity <span className="product-card__options">{product.capacity}</span>
        </h5>
        <h5 className="product-card__spec">
          RAM <span className="product-card__options">{product.ram}</span>
        </h5>
      </div>
      <div className="product-card__buttons">
        <StyledButton className="product-card__add-to-cart" width={widthButton}>
          Add to cart
        </StyledButton>
        <button className="product-card__wishlist">
          <img
            src="./img/icons/Favourites (Heart Like).png"
            alt="Favourites"
            className="product-card__favourites"
          />
        </button>
      </div>
    </StyledCard>
  );
};
