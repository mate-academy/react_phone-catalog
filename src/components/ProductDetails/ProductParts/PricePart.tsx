import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../../../ProductsContext';

export const PricePart = () => {
  const { products } = useContext(ProductsContext);
  const { productId = '' } = useParams();

  const currentProduct = products.map(item => ({
    ...item,
    newPrice: (
      item.discount
        ? (item.price - ((item.discount * item.price) / 100))
          .toString()
        : null
    ),
  })).find(item => item.id === productId);

  return (
    <div className="mb-2">
      {currentProduct?.discount
        ? (
          <>
            <span className="py-2 has-text-weight-bold">
              {`$${currentProduct.newPrice}`}
            </span>
            <span>&nbsp;&nbsp;</span>
            <span className="has-text-grey-light py-2 productCard__old-price">{`$${currentProduct.price}`}</span>
          </>
        )
        : (
          <p className="py-2 has-text-weight-bold">
            {`$${currentProduct?.price}`}
          </p>
        )}
    </div>
  );
};
