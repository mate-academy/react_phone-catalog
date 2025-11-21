import { FC } from 'react';
import { GoBackLink } from '../shared/components/GoBackLink';
import { CartItemBlock } from './components/CartItem';
import s from './CartPage.module.scss';
import { CartItem } from '../../types/Cart';

const cartItems: CartItem[] = [
  {
    id: 1,
    quantity: 1,
    product: {
      id: 116,
      category: 'phones',
      itemId: 'apple-iphone-13-pro-max-1tb-gold',
      name: 'Apple iPhone 13 Pro Max 1TB Gold',
      fullPrice: 1740,
      price: 1520,
      screen: "6.1' OLED",
      capacity: '1TB',
      color: 'gold',
      ram: '6GB',
      year: 2022,
      image: 'img/phones/apple-iphone-13-pro-max/gold/00.webp',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 121,
      category: 'accessories',
      itemId: 'apple-watch-series-3-38mm-space-gray',
      name: 'Apple Watch Series 3 38mm Space Gray',
      fullPrice: 199,
      price: 169,
      screen: "1.3' OLED",
      capacity: '38mm',
      color: 'space gray',
      ram: '768MB',
      year: 2017,
      image: 'img/accessories/apple-watch-series-3/space-gray/00.webp',
    },
  },
  {
    id: 3,
    quantity: 3,
    product: {
      id: 118,
      category: 'phones',
      itemId: 'apple-iphone-13-pro-max-256gb-graphite',
      name: 'Apple iPhone 13 Pro Max 256GB Graphite',
      fullPrice: 1300,
      price: 1220,
      screen: "6.1' OLED",
      capacity: '256GB',
      color: 'graphite',
      ram: '6GB',
      year: 2022,
      image: 'img/phones/apple-iphone-13-pro-max/graphite/00.webp',
    },
  },
  {
    id: 4,
    quantity: 2,
    product: {
      id: 119,
      category: 'phones',
      itemId: 'apple-iphone-13-pro-max-512gb-graphite',
      name: 'Apple iPhone 13 Pro Max 512GB Graphite',
      fullPrice: 1600,
      price: 1530,
      screen: "6.1' OLED",
      capacity: '512GB',
      color: 'graphite',
      ram: '6GB',
      year: 2022,
      image: 'img/phones/apple-iphone-13-pro-max/graphite/00.webp',
    },
  },
];

export const CartPage: FC = () => {
  return (
    <main>
      <section className={`${s.container} ${s.cartPage}`}>
        <GoBackLink />
        <h1>Cart</h1>
        <div className={s.cartContent}>
          <div className={s.cartItems}>
            {cartItems.map(item => (
              <CartItemBlock key={item.id} item={item} />
            ))}
          </div>
          <div className={s.cartTotalBlock}>
            <div className={s.cartTotal}>
              <span className={s.cartPrice}>$2657</span>
              <span className={s.cartCount}>Total for 3 items</span>
            </div>
            <button type="button" className={s.cartButton}>
              Checkout
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
