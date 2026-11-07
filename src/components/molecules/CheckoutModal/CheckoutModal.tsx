import type React from 'react';
import { useState } from 'react';
import { Typography } from '../../atoms/Typography/Typography';
import { ButtonSelect } from '../../atoms/Buttons/ButtonSelect';
import { Input } from '../../atoms/Input/Input';

type Props = {
  isOpen: boolean;
  totalSum: number;
  itemCount: number;
  onClose: () => void;
  onSubmit: (formData: {
    name: string;
    address: string;
    phone: string;
  }) => void;
};

export const CheckoutModal: React.FC<Props> = ({
  isOpen,
  totalSum,
  itemCount,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [finalOrder, setFinalOrder] = useState({ count: 0, total: 0 });

  if (!isOpen) return null;

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', address: '', phone: '' };

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
      isValid = false;
    }

    if (formData.address.trim().length < 5) {
      newErrors.address = 'Please enter a complete shipping address';
      isValid = false;
    }

    const phoneRegex = /^\+?[\d\s\-()]{9,20}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleOrderSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (validateForm()) {
      setFinalOrder({ count: itemCount, total: totalSum });
      onSubmit(formData);
      setIsSuccess(true);
    }
  };

  const onCloseModal = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white dark:bg-surface-1-dark border border-elements dark:border-surface-2-dark rounded-2xl p-6 shadow-2xl flex flex-col gap-6 transition-colors">
        {!isSuccess ?
          <>
            <div className="flex flex-col gap-1">
              <Typography
                level="h2"
                className="text-primary dark:text-white text-xl"
              >
                Complete Your Order
              </Typography>
              <Typography
                level="small"
                className="text-secondary"
              >
                Total items: {itemCount} | Total price:{' '}
                <span className="text-primary dark:text-white font-semibold">
                  ${totalSum}
                </span>
              </Typography>
            </div>

            <form
              onSubmit={handleOrderSubmit}
              className="flex flex-col gap-4"
            >
              <Input
                label="Full Name"
                type="text"
                placeholder="John Green"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                error={errors.name}
              />

              <Input
                label="Shipping Address"
                type="text"
                placeholder="123 Square, NY City"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                error={errors.address}
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+380 (95) 000-0000"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                error={errors.phone}
              />

              <div className="flex gap-3 justify-end mt-2">
                <ButtonSelect
                  handleClick={onClose}
                  isSelected={false}
                  content="Cancel"
                  className="px-4 py-2 border border-elements dark:border-secondary text-secondary hover:cursor-pointer dark:hover:bg-surface-2-dark transition-all hover-zoom-small"
                />
                <ButtonSelect
                  isSelected={false}
                  handleClick={() => handleOrderSubmit()}
                  content="Place Order"
                  className="px-4 py-2 bg-primary dark:bg-accent-dark text-white hover:cursor-pointer dark:text-white transition-all text-sm dark:hover:bg-accent-hover-dark hover-zoom-small"
                />
              </div>
            </form>
          </>
        : <div className="flex flex-col items-center justify-center text-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full bg-green/20 text-green flex items-center justify-center mb-2">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>

            <div className="flex flex-col gap-1.5">
              <Typography
                level="h2"
                className="text-primary dark:text-white text-2xl"
              >
                Order Confirmed!
              </Typography>
              <Typography
                level="body"
                className="text-secondary text-sm"
              >
                Thank you,{' '}
                <span className="font-semibold text-primary dark:text-white">
                  {formData.name}
                </span>
                . <br />
                Your order for {finalOrder.count} item(s) totaling{' '}
                <span className="font-semibold text-primary dark:text-white">
                  ${finalOrder.total}
                </span>{' '}
                has been placed.
              </Typography>
            </div>

            <ButtonSelect
              isSelected={true}
              handleClick={onCloseModal}
              content="Close"
              className="mt-4 px-8 py-2 bg-primary dark:bg-accent-dark text-white hover:cursor-pointer dark:text-white transition-all text-sm dark:hover:bg-accent-hover-dark hover-zoom-small"
            />
          </div>
        }
      </div>
    </div>
  );
};
