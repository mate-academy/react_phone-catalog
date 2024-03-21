import { Product } from '../types/Product';

export type Item = {
  id: string;
  product: Product;
};

type Subsctiber = () => void;

export class Store<T extends Item> {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  items: T[] = [];

  subscribers: Subsctiber[] = [];

  subscribe(subscriber: Subsctiber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: Subsctiber) {
    this.subscribers = this.subscribers.filter(s => s !== subscriber);
  }

  notifySubcribers() {
    this.subscribers.forEach(subscriber => subscriber());
  }

  save() {
    localStorage.setItem(this.name, JSON.stringify(this.items));
  }

  load() {
    this.items = JSON.parse(localStorage.getItem(this.name) || '[]');
    this.notifySubcribers();
  }

  getTotalLength() {
    return this.items.length;
  }

  addItem(item: T) {
    this.items.push(item);

    this.save();
    this.notifySubcribers();
  }

  removeItem(id: string) {
    this.items = this.items.filter(item => item.id !== id);
    this.save();
    this.notifySubcribers();
  }
}
