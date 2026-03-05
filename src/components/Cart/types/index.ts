import type { CartItem } from '@/types/Book';

export interface CartItemProps {
  book: CartItem;
}

export interface CartSummaryProps {
  totalPrice: number;
  totalQuantity: number;
  symbol: string;
  discountPercent?: number;
}

export interface CartCheckoutProps {
  total: number;
  totalItems: number;
  onCheckout: () => void;
}

export interface EmptyCartProps {
  title?: string;
  description?: string;
  buttonText?: string;
  isLoading?: boolean;
}
