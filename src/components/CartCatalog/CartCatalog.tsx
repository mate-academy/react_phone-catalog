// import { CartItem } from '../../services/cart';
// import { CartItem } from '../CartItem/CartItem';
// // import { Product } from '../ProductCarousel';

// import styles from './CartCatalog.module.scss';
// type Props = {
//   products: CartItem[];
//   handleUpdateAmount: (productId: string, newAmount: number) => void;
//   handleRemoveItem: (productId: string) => void;
// };

// export const CartCatalog = ({
//   products,
//   handleUpdateAmount,
//   handleRemoveItem,
// }: Props) => {
//   return (
//     <>
//       <div className={styles.catalog}>
//         {products.map(product => (
//           <CartItem
//             key={product.id}
//             product={product}
//             amount={product.amount || 1}
//             handleUpdateAmount={handleUpdateAmount}
//             handleRemoveItem={handleRemoveItem}
//           />
//         ))}
//       </div>
//     </>
//   );
// };

import { CartItem as CartItemType } from '../../services/cart';
import { CartItem } from '../CartItem/CartItem';
import styles from './CartCatalog.module.scss';

type Props = {
  products: CartItemType[];
  handleUpdateAmount: (productId: string, newAmount: number) => void;
  handleRemoveItem: (productId: string) => void;
};

export const CartCatalog = ({
  products,
  handleUpdateAmount,
  handleRemoveItem,
}: Props) => {
  return (
    <div className={styles.catalog}>
      {products.map(item => (
        <CartItem
          key={item.product.itemId}
          product={item.product}
          amount={item.quantity}
          handleUpdateAmount={handleUpdateAmount}
          handleRemoveItem={handleRemoveItem}
        />
      ))}
    </div>
  );
};
