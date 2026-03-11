export interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'cancelled';
  items: OrderItem[];
  total: number;
}

export interface ProductFromDB {
  image: string;
}
