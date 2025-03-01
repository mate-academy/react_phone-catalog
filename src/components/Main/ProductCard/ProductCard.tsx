import './ProductCard.scss';
import { ProductCardProps } from '../../../types/TProductCard';
import { StyledButton, StyledCard } from './vars';
import { useLocation } from 'react-router-dom';

export const ProductCard: React.FC<ProductCardProps> = ({ products, showFullPrice }) => {
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

  const matchedPath = ['/phones', '/tablets', '/accessories'].includes(location.pathname)
    ? (location.pathname as Path)
    : undefined;

  const styles =
    matchedPath && stylesByPath[matchedPath] ? stylesByPath[matchedPath] : defaultStyles;

  const { widthBlock, widthButton, margin } = styles;

  return (
    <StyledCard width={widthBlock} margin={margin} className="products-card">
      <img src={products.image} alt={products.name} className="products-card__image" />
      <p className="products-card__name">
        <a href={`#/${products.category}/${products.itemId}`}>{products.name}</a>
      </p>
      <div className="products-card__prices">
        <h3 className="products-card__price">${products.price}</h3>
        {showFullPrice && <h3 className="products-card__fullprice">${products.fullPrice}</h3>}
      </div>
      <hr className="products-card__line" />
      <div className="products-card__specs">
        <h5 className="products-card__spec">
          Screen <span className="products-card__options">{products.screen}</span>
        </h5>
        <h5 className="products-card__spec">
          Capacity <span className="products-card__options">{products.capacity}</span>
        </h5>
        <h5 className="products-card__spec">
          RAM <span className="products-card__options">{products.ram}</span>
        </h5>
      </div>
      <div className="products-card__buttons">
        <StyledButton className="products-card__add-to-cart" width={widthButton}>
          Add to cart
        </StyledButton>
        <button className="products-card__wishlist">
          <img
            src="../../../img/icons/Favourites.png"
            alt="Favourites"
            className="products-card__favourites"
          />
        </button>
      </div>
    </StyledCard>
  );
};
