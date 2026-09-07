import styles from './CartItem.module.scss';
import { FiX } from 'react-icons/fi';
import { IconButton } from 'components/IconButton';
import { AmountSetup } from '../AmountSetup';
import { useContext, useState } from 'react';
import { CartProduct } from 'types/CartIProduct';
import { ProductsContext } from 'store/ProductsContext';

type CartItemProps = {
  product: CartProduct;
};

export const CartItem = ({ product }: CartItemProps) => {
  const { cartProducts, setCartProducts, setCartItemsAmount } =
    useContext(ProductsContext);

  const [totalItemCost, setTotalItemCost] = useState(product.price);

  const handleRemoveItem = () => {
    const foundProduct = cartProducts.find(
      item => item.itemId === product.itemId,
    );

    if (foundProduct) {
      const newList = cartProducts.filter(
        item => item.itemId !== product.itemId,
      );

      setCartProducts([...newList]);
      setCartItemsAmount(newList.length);
    }
  };

  return (
    <div className={styles.container}>
      <IconButton
        icon={<FiX size={16} color={'#B4BDC3'} />}
        onClick={handleRemoveItem}
      />
      <div className={styles.container__product}>
        <img src={product.image} alt="Product photo" />
        <span className={styles.container__product__name}>{product.name}</span>
      </div>
      <div className={styles.container__product__display}>
        <AmountSetup product={product} setTotalItemCost={setTotalItemCost} />
        <span className={styles.container__product__display__price}>
          {`$${totalItemCost}`}
        </span>
      </div>
    </div>
  );
};
