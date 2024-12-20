import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './CartPage.module.scss';
import GoBack from '../shared/components/GoBack';
import EmptyCart from './components/EmptyCart';
import { useProducts } from '../shared/context/productsContext';
import CartItem from './components/CartItem';
import TotalSection from './components/TotalSection';
import ModuleDialog from './components/ModuleDialog';

type Bill = Record<string, number>;

const CardPage = () => {
  const { pathname } = useLocation();
  const currentPath = pathname[1].toUpperCase() + pathname.slice(2);
  const { cartProducts, setCartProducts } = useProducts();
  const [total, setTotal] = useState(0);
  const [isOpenModule, setIsOpenModule] = useState(false);

  const storedData = localStorage.getItem('totalBill');
  const existingData: Bill = storedData ? JSON.parse(storedData) : {};
  const [totalBill, setTotalBill] = useState<Bill>(existingData);

  const amount = Object.values(totalBill).reduce((acc, cr) => acc + cr, 0);

  useEffect(() => {
    const calculateTotal = cartProducts.reduce((acc, current) => {
      const totalCalculation =
        totalBill[current.id] * current.price || current.price;

      return acc + totalCalculation;
    }, 0);

    setTotal(calculateTotal);
  }, []);

  const clearCart = () => {
    setTotalBill({});
    setCartProducts([]);
    setIsOpenModule(false);
  };

  useEffect(() => {
    localStorage.setItem('totalBill', JSON.stringify(totalBill));
  }, [totalBill]);

  return (
    <div className={styles.page}>
      <GoBack />
      <h1 className={styles.page__title}>{currentPath}</h1>

      {cartProducts.length < 1 ? (
        <EmptyCart />
      ) : (
        <>
          {cartProducts.map(product => (
            <CartItem
              key={product.id}
              product={product}
              amount={totalBill[product.id]}
              setTotal={setTotal}
              setTotalBill={setTotalBill}
            />
          ))}

          <TotalSection
            total={total}
            amount={amount}
            setOpenModule={setIsOpenModule}
          />
          {isOpenModule && (
            <ModuleDialog
              setOpenModule={setIsOpenModule}
              clearCart={clearCart}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CardPage;
