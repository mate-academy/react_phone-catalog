import './ProductList.scss';
import ProductCard from './ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';

type ProductListProps = {
  products: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  favorites: FavoriteProduct[];
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
};

const ProductList = ({
  products,
  setFavorites,
  favorites,
  baskets,
  setBaskets,
}: ProductListProps) => {
  return (
    <div className="product__list">
      {products.map(product => (
        <ProductCard
          key={product.itemId}
          product={product}
          setFavorites={setFavorites}
          favorites={favorites}
          baskets={baskets}
          setBaskets={setBaskets}
        />
      ))}
    </div>
  );
};

export default ProductList;
