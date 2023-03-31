import { FC, useState, useMemo } from 'react';
import { CardInfoInCart } from '../../Components/CardInfoInCart/CardInfoInCart';
import { HistoryBack } from '../../Components/History/HistoryBack';
import { NoResult } from '../../Components/NoResult/NoResult';
import { TotalPriceCart } from '../../Components/TotalPriceCart/TotalPriceCart';
import { Product } from '../../helpers/types/Product';

type Props = {
  selectedProducts: Product[],
  setSelectedProducts: (item: Product) => void,
};

export const StorePage: FC<Props> = ({
  selectedProducts,
  setSelectedProducts,
}) => {
  const [products, setProducts] = useState(() => {
    return [...selectedProducts].map(product => {
      return {
        amount: 1,
        item: product,
      };
    });
  });
  const totalPrice = useMemo(() => products.reduce((acc, curr) => {
    return acc + curr.item.price * curr.amount;
  }, 0), [products]);
  const totalProducts = useMemo(() => products.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0), [products]);

  const hendlerChangeAmountProducts = (id: string, offer: string) => {
    setProducts(prevState => ([...prevState].map(product => {
      if (id === product.item.id) {
        return {
          amount: offer === 'decr' ? product.amount + 1 : product.amount - 1,
          item: product.item,
        };
      }

      return product;
    })));
  };

  const hendlerRemoveProduct = (deleteProduct: Product) => {
    setSelectedProducts(deleteProduct);
    setProducts(prevState => [...prevState].filter(product => (
      product.item.id !== deleteProduct.id
    )));
  };

  if (!selectedProducts.length) {
    return <NoResult message="Cart is empty" />;
  }

  return (
    <div className="productPage productPage--cart">
      <HistoryBack />
      <h1 className="productPage__title">Cart</h1>
      <div className="productPage__contentCart">
        <div className="productPage__cartsList">
          {products.map(product => (
            <div
              className="cart"
              key={product.item.id}
            >
              <CardInfoInCart
                product={product}
                onChangeAmount={hendlerChangeAmountProducts}
                onRemove={hendlerRemoveProduct}
              />
            </div>
          ))}
        </div>
        <TotalPriceCart
          totalPrice={totalPrice}
          totalProducts={totalProducts}
        />
      </div>
    </div>
  );
};
