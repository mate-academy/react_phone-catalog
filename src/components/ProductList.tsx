import { NavLink, useSearchParams } from 'react-router-dom';
import Pluralize from 'pluralize';
import { Product } from '../types/Product';
import { ProductCart } from './ProductCard';
import { CartItem } from '../types/CartItem';

type Props = {
  products: Product[];
  setCartItems: (item: CartItem[]) => void;
  cartItems: CartItem[];
  favourites: Product[];
  setFavourites: (products: Product[]) => void;
};
export const ProductList: React.FC<Props> = ({
  products,
  setCartItems,
  cartItems,
  favourites,
  setFavourites,
}) => {
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || '4';
  const currentPage = searchParams.get('page') || '1';
  const itemsPerPage = perPage === 'all' ? products.length : perPage;
  const firstItemIndex = (+currentPage - 1) * +itemsPerPage;
  const lastItemIndex = Math.min(+currentPage * +itemsPerPage, products.length);

  return (
    <div className="product-list" data-cy="productList">
      {products.slice(firstItemIndex, lastItemIndex).map((product) => (
        <NavLink
          key={product.id}
          className="product-list__link"
          to={`/${Pluralize(product.type)}/${product.id}`}
        >

          <ProductCart
            product={product}
            setCartItems={setCartItems}
            cartItems={cartItems}
            favourites={favourites}
            setFavourites={setFavourites}
          />

        </NavLink>
      ))}
    </div>
  );
};
