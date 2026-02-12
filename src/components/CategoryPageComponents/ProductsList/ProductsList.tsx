import { useContext } from 'react';
import { Card } from '../../../components/Card';
import { Product } from '../../../types/ProductsType';
import { FavouritesContext } from '../../../contexts/FavouritesContexr';

type Props = {
  products: Product[];
  paginatedProducts: Product[][];
  currentPage: number;
  setProducts: (el: Product[]) => void;
};

export const ProductsList: React.FC<Props> = ({
  products,
  paginatedProducts,
  currentPage,
  setProducts,
}) => {
  const { setFavourites } = useContext(FavouritesContext);

  const handleDeleteProduct = (itemId: string | undefined) => {
    if (!itemId) {
      return;
    }

    const updatedProducts = products.filter(
      prevItem => prevItem.itemId !== itemId,
    );

    setFavourites(prevCart =>
      prevCart.filter(cartItemId => cartItemId !== itemId),
    );

    setProducts(updatedProducts);
  };

  return products.length > 0 ? (
    <div className="products-list__products">
      {paginatedProducts[currentPage]?.map(product => (
        <Card
          key={product.id}
          product={product}
          className="products-list__product"
          handleDeleteProduct={handleDeleteProduct}
        />
      ))}
    </div>
  ) : (
    <div className="products-list__no-products">{`There are no  yet`}</div>
  );
};
