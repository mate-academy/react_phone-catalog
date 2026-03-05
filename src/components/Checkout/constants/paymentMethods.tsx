import type { PaymentMethodOption } from '../types/checkout';

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'stripe',
    label: 'Card',
    description: 'Visa, Mastercard, Apple Pay',
    icon: (
      <svg
        width="38"
        height="24"
        viewBox="0 0 38 24"
        fill="none"
      >
        <rect
          width="38"
          height="24"
          rx="4"
          fill="#635BFF"
        />
        <path
          d="M17.5 9.3c0-.8.7-1.1 1.7-1.1 1.5 0 3.5.5 4.8 1.2V6.2C22.7 5.5 21 5 19.2 5 16 5 14 6.6 14 9.5c0 4.5 6.2 3.8 6.2 5.7 0 .9-.8 1.2-1.9 1.2-1.6 0-3.7-.7-5.3-1.6v3.3c1.8.8 3.6 1.1 5.3 1.1 3.3 0 5.5-1.6 5.5-4.5-.1-4.8-6.3-4-6.3-5.4z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    id: 'liqpay',
    label: 'LiqPay',
    description: 'Приват24, monobank, картка',
    icon: (
      <svg
        width="38"
        height="24"
        viewBox="0 0 38 24"
        fill="none"
      >
        <rect
          width="38"
          height="24"
          rx="4"
          fill="#00AAFF"
        />
        <text
          x="6"
          y="16"
          fontFamily="Arial"
          fontWeight="bold"
          fontSize="10"
          fill="white"
        >
          LiqPay
        </text>
      </svg>
    ),
  },
];
