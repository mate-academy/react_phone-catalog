import { CartItem } from '../components/CartItem';
import { CheckoutModal } from '../components/CheckoutModal';
import { useCart } from '../hooks/useCart';
import unicornWithBusket from '../images/unicorn/unicornWithBusket.png';
import { useState, useEffect } from 'react';
import { SortableItem } from '../components/Sortable/SortableItem';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTranslation } from 'react-i18next';

export const CartPage = () => {
  const { cartItems, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation('cartpage');

  const totalPrice = getTotalPrice();
  const itemsCount = getTotalItems();

  const [items, setItems] = useState<string[]>(
    cartItems.map(p => p.id.toString()),
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
  );
  useEffect(() => {
    setItems(cartItems.map(p => p.id.toString()));
  }, [cartItems]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.indexOf(active.id.toString());
    const newIndex = items.indexOf(over.id.toString());

    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = arrayMove(items, oldIndex, newIndex);
    setItems(newOrder);
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmOrder = () => {
    // Тут можна додати логіку для обробки замовлення
    alert(t('orderConfirmed'));
    clearCart();
    setIsModalOpen(false);
  };

  const handleClearCart = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">{t('title')}</h2>
        <div className="text-center py-12">
          <img
            src={unicornWithBusket}
            alt="unicorn"
            className="mx-auto mb-4 w-[400px] h-[300px]"
          />
          <p className="text-secondary text-lg">{t('emptyMessage')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">{t('title')}</h2>
      <div className="flex flex-col desktop:flex-row gap-4 desktop:gap-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-4 ">
              {items.map(id => {
                const product = cartItems.find(p => p.id.toString() === id);
                return product ? (
                  <SortableItem
                    key={product.id}
                    id={product.id.toString()}
                    value={<CartItem product={product} />}
                  />
                ) : null;
              })}
            </div>
          </SortableContext>
        </DndContext>
        <div className="w-full desktop:w-80">
          <div className="bg-card-background dark:bg-dark-card-background border border-card-border dark:border-dark-elements p-4 sm:p-6 sticky top-16 desktop:top-20">
            <div className="text-center mb-6">
              <div className="text-2xl sm:text-3xl font-bold text-primary dark:text-dark-primary mb-2">
                ${totalPrice}
              </div>
              <div className="text-sm text-secondary dark:text-dark-secondary">
                {t('totalLabel', { count: itemsCount })}
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-primary dark:bg-dark-button-purple text-white py-3 px-6 rounded hover:bg-secondary dark:hover:bg-dark-button-purple-hover transition-colors font-medium text-sm sm:text-base cursor-pointer"
            >
              {t('checkoutButton')}
            </button>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmOrder}
        onClearCart={handleClearCart}
        totalPrice={totalPrice}
        itemsCount={itemsCount}
      />
    </div>
  );
};
