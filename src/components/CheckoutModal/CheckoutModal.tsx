import React from 'react';
import { useTranslation } from 'react-i18next';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onClearCart: () => void;
  totalPrice: number;
  itemsCount: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onClearCart,
  totalPrice,
  itemsCount,
}) => {
  const { t } = useTranslation('checkoutmodal');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-[10001]">
      <div className="bg-card-background dark:bg-dark-card-background rounded-lg p-6 max-w-md w-full mx-4 border-2 border-elements dark:border-dark-elements shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center text-primary dark:text-dark-primary">
          {t('title')}
        </h2>

        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-primary dark:text-dark-primary mb-2">
            ${totalPrice}
          </div>
          <div className="text-sm text-secondary dark:text-dark-secondary">
            {t('totalLabel', { count: itemsCount })}
          </div>
        </div>

        <p className="text-secondary dark:text-dark-secondary mb-6 text-center">
          {t('message')}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full bg-green text-white py-3 px-6 rounded hover:opacity-90 transition-opacity"
          >
            {t('confirm')}
          </button>

          <button
            onClick={onClearCart}
            className="w-full bg-red text-white py-3 px-6 rounded hover:opacity-90 transition-opacity"
          >
            {t('clear')}
          </button>

          <button
            onClick={onClose}
            className="w-full bg-primary dark:bg-dark-button-purple text-white py-3 px-6 rounded hover:bg-secondary dark:hover:bg-dark-button-purple-hover transition-colors"
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};
