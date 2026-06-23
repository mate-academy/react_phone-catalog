/* eslint-disable max-len */
import CartItemCard from '../../components/CartItemCard/CartItemCard';
import { useCart } from '../../store/CartContext';
import { useProducts } from '../../store/ProductsContext';
import { Button } from '@heroui/react';
import { CaretLeftIcon } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import type { Product } from '../../types/Product';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { getImage } from '../../store/getImage';

export default function CartPage() {
  const { cartItems, clearCart } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const productsInCart = useMemo<Product[]>(() => {
    const cratItemsIds = Object.keys(cartItems);

    return products.filter(product => cratItemsIds.includes(product.itemId));
  }, [products, cartItems]);

  const total = useMemo(() => {
    return productsInCart.reduce<number>((acc, product) => {
      const quantity = cartItems[product.itemId] || 0;

      return acc + product.price * quantity;
    }, 0);
  }, [productsInCart, cartItems]);

  const totalItems = useMemo(() => (Object.values(cartItems) as number[]).reduce((sum, qty) => sum + qty, 0), [cartItems]);

  return (
    <div className="flex flex-col px-6 xl:px-38">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="w-fit flex items-center gap-1 text-[#89939A] text-sm font-semibold hover:text-[#0F0F11] mb-2"
      >
        <CaretLeftIcon size={18} />
        Back
      </button>
      <h1 className="text-[32px] sm:text-[48px] font-bold mb-10">Cart</h1>
      {productsInCart.length === 0 ? (
        <div>
          <div className="max-w-90 mb-6">
            <img src={getImage('img/product-not-found.png')} alt="Product not found" className="w-full h-auto" />
          </div>
          <p className="text-gray-500 text-lg mt-4">Your cart is empty.</p>
        </div>
      ) : (
        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-4">
          <div className="flex-2/3 flex flex-col gap-5">
            {/* LEFT SIDE — CART ITEMS */}
            {productsInCart.map(item => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </div>

          {/* RIGHT SIDE — CHECKOUT */}
          <div
            className="p-6 lg:h-[206px] flex-1/3 flex flex-col items-center gap-6 
              shadow-sm border border-gray-100 rounded-xl bg-[#FAFBFC]"
          >
            <div>
              <p className="text-3xl font-bold">${total}</p>
              <p className="text-sm text-gray-500">Total for {totalItems} items</p>
            </div>

            <div className="w-full h-px bg-gray-200" />

            <Button color="primary" size="lg" radius="lg" className="w-full text-white" onPress={() => setIsCheckoutOpen(true)}>
              Checkout
            </Button>
          </div>
        </div>
      )}
      {isCheckoutOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
           bg-black/40 px-4"
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-[#0F0F11] mb-2">Checkout is not implemented yet</h2>
            <p className="text-[#89939A] mb-6">Do you want to clear the Cart?</p>
            <div className="flex gap-3 justify-end">
              <Button variant="bordered" radius="lg" className="border-gray-300" onPress={() => setIsCheckoutOpen(false)}>
                Cancel
              </Button>
              <Button
                color="primary"
                radius="lg"
                className="text-white"
                onPress={() => {
                  clearCart();
                  setIsCheckoutOpen(false);
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
