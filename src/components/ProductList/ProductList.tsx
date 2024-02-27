import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type ProductListProps = {
  products: Product[],
  isNormal?: boolean,
  setFavLength: React.Dispatch<number>,
  setCartLength: React.Dispatch<number>,
};

export const ProductList: React.FC<ProductListProps> = ({
  products,
  isNormal = false,
  setFavLength,
  setCartLength,
}) => {
  const [searchParams] = useSearchParams();
  const curPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '4';

  const sliceProducts = () => {
    return perPage === 'all'
      ? products
      : products.slice((+curPage * +perPage - +perPage), (+curPage * +perPage));
  };

  return (
    <div
      className="product-list"
      data-cy="productList"
    >
      {isNormal ? products.map((product: Product) => {
        return (
          <ProductCard
            key={product.name}
            product={product}
            useDiscount
            setFavLength={setFavLength}
            setCartLength={setCartLength}
          />
        );
      })
        : sliceProducts()
          .map((product: Product) => {
            return (
              <ProductCard
                key={product.name}
                product={product}
                useDiscount
                setFavLength={setFavLength}
                setCartLength={setCartLength}
              />
            );
          })}
    </div>
  );
};
