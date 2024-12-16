import './ProductCard.scss';
import { ProductCardProps } from '../../../types/TProductCard';
import { StyledButton, StyledCard } from './vars';
import { useLocation } from 'react-router-dom';

export const ProductCard: React.FC<ProductCardProps> = ({ product, showFullPrice }) => {
  const location = useLocation();

  type Path = '/phones' | '/tablets' | '/accessories';

  const stylesByPath: Record<Path, { widthBlock: string; widthButton: string; margin: string }> = {
    '/phones': { widthBlock: '287px', widthButton: '176px', margin: '40px 0px 0px 0px' },
    '/tablets': { widthBlock: '287px', widthButton: '176px', margin: '40px 0px 0px 0px' },
    '/accessories': { widthBlock: '287px', widthButton: '176px', margin: '40px 0px 0px 0px' },
  };

  const defaultStyles = {
    widthBlock: '212px',
    widthButton: '100px',
    margin: '0px 16px 0px 0px',
  };

  const matchedPath = location.pathname as Path | undefined;

  const styles =
    matchedPath && stylesByPath[matchedPath] ? stylesByPath[matchedPath] : defaultStyles;

  const { widthBlock, widthButton, margin } = styles;

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
            src="./img/icons/Favourites.png"
            alt="Favourites"
            className="product-card__favourites"
          />
        </button>
      </div>
    </StyledCard>
  );
};
