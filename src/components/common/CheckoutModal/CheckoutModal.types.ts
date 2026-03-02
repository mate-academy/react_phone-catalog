import type { City, Warehouse } from '@/utils/novaPostaClient';

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type Step = 1 | 2 | 3;
export type DeliveryMethod = 'home' | 'novapost';
export type PaymentMethod = 'card' | 'paypal' | 'cod';

export interface CheckoutCartItem {
  itemUniqueId: string;
  id: string;
  name: string;
  price: number;
  priceDiscount?: number;
  image?: string | null;
  quantity: number;
}

export interface StepDetailsProps {
  styles: Record<string, string>;
  fullName: string;
  phone: string;
  isStep1Valid: boolean;
  onFullNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onContinue: () => void;
}

export interface StepDeliveryProps {
  styles: Record<string, string>;
  arrowDownIcon: string;
  deliveryOpen: boolean;
  deliveryMethod: DeliveryMethod;
  address: string;
  cityQuery: string;
  loadingCities: boolean;
  citiesOpen: boolean;
  filteredCities: City[];
  selectedCity: City | null;
  loadingWarehouses: boolean;
  warehousesOpen: boolean;
  warehouses: Warehouse[];
  selectedWarehouse: Warehouse | null;
  isStep2Valid: boolean;
  onToggleDelivery: () => void;
  onSelectHome: () => void;
  onSelectNovaPoshta: () => void;
  onAddressChange: (value: string) => void;
  onCityFocus: () => void;
  onCityBlur: () => void;
  onCityQueryChange: (value: string) => void;
  onSelectCity: (city: City) => void;
  onToggleWarehouses: () => void;
  onSelectWarehouse: (warehouse: Warehouse) => void;
  onContinue: () => void;
  onBack: () => void;
  normalizeWarehouseText: (text: string) => string;
}

export interface StepPaymentProps {
  styles: Record<string, string>;
  arrowDownIcon: string;
  paymentOpen: boolean;
  paymentMethod: PaymentMethod;
  loading: boolean;
  isStep3Valid: boolean;
  onTogglePayment: () => void;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export interface SuccessScreenProps {
  styles: Record<string, string>;
  successOrderId: string | null;
  onViewOrders: () => void;
  onClose: () => void;
}

export interface OrderSummaryProps {
  styles: Record<string, string>;
  cartItems: CheckoutCartItem[];
  totalItems: number;
  totalPrice: number;
}
