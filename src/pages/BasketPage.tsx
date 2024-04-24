import { useNavigate } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useLocalStorage } from 'usehooks-ts';
import { Loader } from '../components/Loader';
import { BasketCard } from '../components/BasketCard';
import { ButtonCard } from '../components/ButtonCard';
import { getProductsById } from '../api/products';
import { BasketGoods, Product } from '../types/product';
import arrowIcon from '../images/icons/arrow-icon-disable.svg';
import basketEmpty from '../images/cart-is-empty.png';
import { useNotification } from '../hooks/useNotification';

export const BasketPage = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [basket, setBasket, removeBasket] = useLocalStorage<BasketGoods[]>(
    'basketGoods',
    [],
  );

  const sumOfQuantity = basket.reduce(
    (acc, item) => acc + (item?.quantity || 1),
    0,
  );
  const basketIds = basket.map(item => item.id).sort();

  const { isLoading: isBasketProducts, data: basketProducts } = useQuery({
    queryKey: ['basketProducts', ...basketIds],
    queryFn: () => getProductsById(basketIds),
    placeholderData: keepPreviousData,
  });

  const totalSumGoods =
    basketProducts?.length &&
    basket.reduce(
      (acc, item) =>
        acc +
        (item?.quantity || 1) *
          basketProducts[
            basketProducts?.findIndex(product => product.itemId === item.id) ||
              0
          ].price,
      0,
    );

  const handleChangeQuantity = (id: Product['itemId'], quantity: number) => {
    setBasket(c => {
      return c.map(item => (item.id === id ? { ...item, quantity } : item));
    });
  };

  const handleCheckout = () => {
    addNotification('clearAllBasket');
    removeBasket();
  };

  return (
    <main className="content pb-14 pt-6 md:pb-16 lg:pb-20">
      <section>
        <div className="mt-6 flex items-center gap-1 md:mt-10">
          <img
            src={arrowIcon}
            alt="Arrow Back"
            className="h-4 min-w-4 -rotate-90"
          />
          <button onClick={() => navigate(-1)}>
            <small className="font-bold text-secondary">Back</small>
          </button>
        </div>

        <h1 className="mt-6 md:mt-4">Cart</h1>

        {!basketProducts?.length && (
          <img
            src={basketEmpty}
            alt="Basket Empty"
            className="h-screen w-full object-contain"
          />
        )}

        <div className="mt-8 grid-cols-12 gap-4 lg:grid">
          {isBasketProducts ? (
            <Loader />
          ) : (
            <div className="flex flex-col gap-4 lg:col-span-8">
              {basketProducts?.map(product => {
                return (
                  <BasketCard
                    quantity={
                      (
                        basket.find(item => item.id === product.itemId) ||
                        basket[0]
                      )?.quantity || 1
                    }
                    onChange={handleChangeQuantity}
                    key={product.id}
                    product={product}
                  />
                );
              })}
            </div>
          )}

          {!!basketProducts?.length && (
            <div
              className="
                  sticky top-[20%] mt-8 flex h-fit flex-col items-center
                  border border-elements p-6 lg:col-[9_/_-1] lg:mt-0
                "
            >
              <h2 className="font-bold">{`$${totalSumGoods}`}</h2>
              <p className="text-secondary">{`Total for ${sumOfQuantity} items`}</p>

              <ButtonCard
                className="mt-8 h-12 w-full md:mt-[48px]"
                onClick={handleCheckout}
              >
                Checkout
              </ButtonCard>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
