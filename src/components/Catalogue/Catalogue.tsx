import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ProductCard } from '../ProductCard';
import './Catalogue.scss';
import { selectCart } from '../../store/selectors/cartSlice';
import { selectFavorites } from '../../store/selectors/favoritesSlice';
import { CatalogueProps } from './types';

export const Catalogue
  = memo<CatalogueProps>(({ items }) => {
    const { cart } = useSelector(selectCart);
    const { favorites } = useSelector(selectFavorites);

    return (
      <div className="catalogue">
        {items.map((item) => {
          const isCart = cart?.some(product => product.product.id === item.id);
          const isFav = favorites?.some(product => product.id === item.id);

          return (
            <ProductCard
              item={item}
              key={item.phoneId}
              isInCart={isCart}
              isInFav={isFav}
            />
          );
        })}
      </div>
    );
  });
