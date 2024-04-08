/* eslint-disable no-param-reassign */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GoBackButton } from '../components/GoBackButton';
import { useLocalStorage, useOnClickOutside } from 'usehooks-ts';
import { getProductsById } from '../api/products';
import { Loader } from '../components/Loader';
import { CartItem } from '../components/CartItem';
import * as cartTypes from '../types/cart';
import { useEffect, useRef, useState } from 'react';
import { Product } from '../types/products';
import { Button } from '../components/Button';
import { CreateModal } from '../components/CreateModal';
import closeIcon from '../images/icons/close.svg';

type Modal = 'checkout';

export const CartPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [cart, setCart] = useLocalStorage<cartTypes.CartItem[]>('cart', []);
  const [modal, setModal] = useState<Modal | ''>('');
  const modalRef = useRef(null);
  const totalPrice: number = (
    (queryClient.getQueryData(['CartCards']) || []) as Product[]
  ).reduce(
    (a, b) =>
      a +
      b.price * (cart?.find(cartItem => cartItem.id === b.id)?.quantity || 1),
    0,
  );

  const { data = [], isLoading } = useQuery({
    queryKey: ['CartCards'],
    queryFn: () => getProductsById(cart?.map(item => item.id) || []),
  });

  const handleConfirmCheckout = () => {
    queryClient.setQueryData(['CartCards'], []);
    setCart([]);
    setModal('');
  };

  useOnClickOutside(modalRef, () => setModal(''));

  useEffect(() => {
    queryClient.setQueriesData(
      { queryKey: ['CartCards'] },
      data.filter(item => cart?.find(cartItem => cartItem.id === item.id)),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <main className="content-padding w-full pb-14 pt-10 md:pb-16 lg:pb-20">
      <>
        {modal === 'checkout' && (
          <CreateModal>
            <div
              className="flex flex-col items-center
              gap-3 rounded-md bg-white p-5"
              ref={modalRef}
            >
              <img
                className="absolute right-5 top-5 cursor-pointer"
                onClick={() => setModal('')}
                src={closeIcon}
                alt="Close"
              />
              <h3 className="px-4 text-center">
                Checkout is not implemented yet. Do you want to clear the Cart?
              </h3>
              <Button onClick={handleConfirmCheckout}>Confirm</Button>
            </div>
          </CreateModal>
        )}
      </>

      <GoBackButton>Back</GoBackButton>

      <h1 className="mt-6">Cart</h1>

      {isLoading ? (
        <Loader className="mt-8" />
      ) : data.length ? (
        <div className="mt-8 flex flex-col gap-8 md:mt-4 lg:flex-row lg:gap-4">
          <div className="flex flex-col gap-4">
            {data.map(item => (
              <CartItem key={item.id} card={item} />
            ))}
          </div>

          <div
            className="flex h-fit w-full flex-col gap-4 border
            border-elements p-6 lg:w-92 lg:gap-6"
          >
            <div className="flex flex-col items-center justify-center">
              <h2>${totalPrice}</h2>
              <p>{`Total for ${cart.reduce((a, b) => a + (b?.quantity || 1), 0)} items`}</p>
            </div>

            <hr className="border-elements" />

            <Button
              className="h-12 w-full"
              onClick={() => setModal('checkout')}
            >
              Checkout
            </Button>
          </div>
        </div>
      ) : (
        <h1 className="mt-8 flex justify-center md:mt-10">
          There are no items in the cart yet
        </h1>
      )}
    </main>
  );
};
