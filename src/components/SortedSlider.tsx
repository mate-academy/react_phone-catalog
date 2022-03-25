import { useLocation } from 'react-router-dom';
import { Dropdowns } from './Dropdowns';
import { ProductCard, Phone } from './ProductCard';

type Props = {
  favorite: string[],
  cart: string[],
  list: Phone[],
  handleCart: (id: string) => void,
  handleFavorite: (id: string) => void,
};

export const SortedSlider: React.FC<Props> = ({
  favorite,
  cart,
  list,
  handleCart,
  handleFavorite,
}) => {
  const location = useLocation();

  return (
    <div className="sorted-slider">
      {location.pathname !== '/favorites' && (
        <Dropdowns />
      )}
      <div className="sorted-slider__continer">
        {list.map(item => (
          <div
            key={item.id}
            className="sorted-slider__card-container"
          >
            <ProductCard
              favorite={favorite}
              cart={cart}
              phone={item}
              handleCart={handleCart}
              handleFavorite={handleFavorite}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
