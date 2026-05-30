import styles from './AmountSetup.module.scss';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { IconButton } from 'components/IconButton';
import { useContext, useState } from 'react';
import { ProductsContext } from 'store/ProductsContext';
import { CartProduct } from 'types/CartIProduct';

type AmountSetupProps = {
  product: CartProduct;
  setTotalItemCost: React.Dispatch<React.SetStateAction<number>>;
};

export const AmountSetup = ({
  product,
  setTotalItemCost,
}: AmountSetupProps) => {
  const {
    cartProducts,
    setCartProducts,
    setCartItemsAmount,
    setCartTotalPrice,
  } = useContext(ProductsContext);

  const [amount, setAmount] = useState(product.amount ?? 1);

  const handleAddItem = () => {
    const newAmount = amount + 1;

    setAmount(newAmount);
    setTotalItemCost(prev => prev + product.price);

    const updatedCart = cartProducts.map(item =>
      item.id === product.id ? { ...item, amount: newAmount } : item,
    );

    setCartProducts(updatedCart);

    const total = updatedCart.reduce(
      (acc, item) => acc + item.price * item.amount,
      0,
    );

    setCartTotalPrice(total);
  };

  const handleRemoveItem = () => {
    if (amount === 1) {
      const cartUpdated = cartProducts.filter(item => item.id !== product.id);

      setCartProducts(cartUpdated);
      setCartItemsAmount(cartUpdated.length);
    } else {
      const newAmount = amount - 1;

      const updatedCart = cartProducts.map(item =>
        item.id === product.id ? { ...item, amount: newAmount } : item,
      );

      setCartProducts(updatedCart);
      setAmount(newAmount);
      setTotalItemCost(prev => prev - product.price);
    }

    const total = cartProducts.reduce(
      (acc, item) => acc + item.price * item.amount,
      0,
    );

    setCartTotalPrice(total);
  };

  return (
    <div className={styles.container}>
      <IconButton
        icon={<FiMinus />}
        useBorder
        width={'32px'}
        height={'32px'}
        onClick={handleRemoveItem}
      />
      <span className={styles.container__amount}>{amount}</span>
      <IconButton
        icon={<FiPlus />}
        useBorder
        width={'32px'}
        height={'32px'}
        onClick={handleAddItem}
      />
    </div>
  );
};
