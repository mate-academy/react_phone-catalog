import type { Order, CustomerData } from '@/types/Order';
import type { CartItem } from '@/types/Book';
import type { Currency } from '@/types/Currency';

export interface CurrencyInfo {
  currency: Currency;
  rate: number;
}

export interface InvoicePDFProps {
  order: Order;
  currencyInfo: CurrencyInfo;
}

export interface DownloadInvoiceButtonProps {
  order: Order;
  className?: string;
}

export interface InvoiceHeaderProps {
  orderId: string;
}

export interface InvoiceMetaSectionProps {
  order: Order;
}

export interface InvoiceAddressesProps {
  customer: CustomerData;
}

export interface InvoiceItemsTableProps {
  items: CartItem[];
  currencyInfo: CurrencyInfo;
}

export interface InvoiceTotalsProps {
  subtotal: number;
  discount?: number;
  total: number;
  currencyInfo: CurrencyInfo;
}
