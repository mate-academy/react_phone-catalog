import { useEffect, useState } from 'react';
import { HistoryBackButton } from '../components/HistoryBackButton';
import { CartItem } from '../components/CartItem';
import { Product } from '../types/Product';

export const CartPage = () => {
  const catalog: Product[] = JSON.parse(
    localStorage.getItem('fullList') || '',
  );

  const selectedList: Product[] = JSON.parse(
    localStorage.getItem('cartList') || '',
  );

  const getUniqueItems = (initialArray: Product[]) => {
    return initialArray.filter((
      value, index, array,
    ) => array.findIndex(value2 => (value2.id === value.id)) === index);
  };

  const [
    listOfProducts,
    setListOfProducts,
  ] = useState<Product[]>([...selectedList]);

  const [
    visibleProducts,
    setVisibleProducts,
  ] = useState<Product[]>(getUniqueItems(selectedList));

  const sumOfCosts = () => listOfProducts
    .map(product => product.price)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const [total, setTotal] = useState<number>(sumOfCosts);

  useEffect(() => {
    setTotal(sumOfCosts);
  }, [listOfProducts]);

  const handleListChange = (id: string, action: string) => {
    let newList: Product[] = [...listOfProducts];

    switch (action) {
      case 'add': {
        const newItem = catalog.find(item => item.id === id);
        const sameItemId = listOfProducts.findIndex(
          item => item.id === id,
        );

        if (newItem) {
          newList.splice(sameItemId, 0, newItem);
        }

        break;
      }

      case 'remove': {
        newList = listOfProducts.filter(item => item.id !== id);
        break;
      }

      case 'reduce': {
        const extraItemId = listOfProducts.findIndex(
          item => item.id === id,
        );

        newList.splice(extraItemId, 1);
        break;
      }

      default:
        break;
    }

    setListOfProducts(newList);
    setVisibleProducts(getUniqueItems(newList));

    localStorage.removeItem('cartList');
    localStorage.setItem('cartList', JSON.stringify(newList));
  };

  return (
    <main className="page">
      <section className="cart">
        <div>
          <HistoryBackButton />
          <h1 className="cart__title">Cart</h1>
          <div className="cart__items">
            {visibleProducts.length ? visibleProducts.map(product => {
              const amount = listOfProducts
                .filter(p => p.id === product.id).length;

              return (
                <CartItem
                  product={product}
                  amount={amount}
                  handleListChange={handleListChange}
                  key={product.id}
                />
              );
            }) : (
              <div className="cart__empty cart__element">
                The cart is empty
              </div>
            )}
          </div>
        </div>

        {visibleProducts.length ? (
          <div className="cart__total">
            <div className="cart__element cart__total__info">
              <h1>{`$${total}`}</h1>
              <p className="text__body cart__total__info__text">
                {`Total for ${listOfProducts.length} ${listOfProducts.length > 1 ? 'items' : 'item'}`}
              </p>
              <div className="cart__total__info__divider">
                <div />
                <div className="cart__total__info__divider__line" />
                <div />
              </div>
              <button
                type="button"
                className="button cart__total__info__button"
              >
                Checkout
              </button>
            </div>
          </div>
        ) : ''}
      </section>
      <section />
    </main>
  );
};
