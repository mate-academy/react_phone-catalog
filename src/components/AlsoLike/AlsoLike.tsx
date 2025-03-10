import { useContext, useMemo } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
import { ProductsSlider } from '../ProductsSlider';
import { ItemCardContext } from '../../contexts/ItemCardContext';

export const AlsoLike = () => {
  const { itemCardState } = useContext(ItemCardContext);
  const { product } = itemCardState;
  const { state } = useContext(ProductsContext);
  const { products } = state;

  const title = 'You may also like';

  const preparedProducts = useMemo(
    () => products.sort(() => Math.random() - 0.5).slice(0, 10),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [products, product?.namespaceId],
  );

  return (
    <div>
      {preparedProducts.length > 0 ? (
        <ProductsSlider
          products={preparedProducts}
          title={title}
          hotPrice={true}
        />
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};
