// import { Product } from '../ProductCarousel';
// import Close from '../../assets/Icons/Close.svg';

// import styles from './CartItem.module.scss';
// type Props = {
//   product: Product;
//   amount: number;
//   handleUpdateAmount: (productId: string, newAmount: number) => void;
//   handleRemoveItem: (productId: string) => void;
// };

// export const CartItem = ({
//   product,
//   amount,
//   handleUpdateAmount,
//   handleRemoveItem,
// }: Props) => {
//   const actualPrice = (product.price || 0) * amount;

//   return (
//     <>
//       <div className={styles.cart_item}>
//         <button
//           className={styles.cart_item__close_btn}
//           onClick={() => {
//             if (product.itemId) {
//               handleRemoveItem(product.itemId);
//             }
//           }}
//         >
//           <img src={Close} alt="close_icon" />
//         </button>
//         <img
//           className={styles.cart_item__img}
//           src={product.images ? product.images[0] : product.image}
//           alt={product.name}
//         />
//         <p className={styles.cart_item__name}>{product.name}</p>
//         <div className={styles.cart_item__amount}>
//           <button
//             disabled={amount <= 1}
//             onClick={() => {
//               if (product.itemId) {
//                 handleUpdateAmount(product.itemId, amount - 1);
//               }
//             }}
//           >
//             -
//           </button>
//           <span>{amount}</span>
//           <button
//             onClick={() => {
//               if (product.itemId) {
//                 handleUpdateAmount(product.itemId, amount + 1);
//               }
//             }}
//           >
//             +
//           </button>
//         </div>
//         <p className={styles.cart_item__price}>${actualPrice}</p>
//       </div>
//     </>
//   );
// };

import { Product } from '../ProductCarousel';
import Close from '../../assets/Icons/Close.svg';
import { BASE_URL } from '../../services/baseUrl';
import styles from './CartItem.module.scss';

type Props = {
  product: Product;
  amount: number;
  handleUpdateAmount: (productId: string, newAmount: number) => void;
  handleRemoveItem: (productId: string) => void;
};

export const CartItem = ({
  product,
  amount,
  handleUpdateAmount,
  handleRemoveItem,
}: Props) => {
  const displayImage = product.images?.[0] || product.image;
  const unitPrice = product.priceDiscount || product.price || 0;
  const actualPrice = unitPrice * amount;

  return (
    <div className={styles.cart_item}>
      <button
        className={styles.cart_item__close_btn}
        onClick={() => {
          if (product.itemId) {
            handleRemoveItem(product.itemId);
          }
        }}
      >
        <img src={Close} alt="close_icon" />
      </button>

      <img
        className={styles.cart_item__img}
        src={`${BASE_URL}${displayImage}`}
        alt={product.name}
      />

      <p className={styles.cart_item__name}>{product.name}</p>

      <div className={styles.cart_item__amount}>
        <button
          disabled={amount <= 1}
          onClick={() => {
            if (product.itemId) {
              handleUpdateAmount(product.itemId, amount - 1);
            }
          }}
        >
          -
        </button>
        <span>{amount}</span>
        <button
          onClick={() => {
            if (product.itemId) {
              handleUpdateAmount(product.itemId, amount + 1);
            }
          }}
        >
          +
        </button>
      </div>

      <p className={styles.cart_item__price}>${actualPrice}</p>
    </div>
  );
};
