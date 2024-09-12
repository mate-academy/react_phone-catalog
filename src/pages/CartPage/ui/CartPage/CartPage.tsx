import { useCallback, useState } from 'react';
import { PagePartTop } from '../../../../features/PagePartTop';
import { Section } from '../../../../shared/ui/Section';
import { CartProductsList } from '../CartProductsList';
import { Checkout } from '../Checkout/Checkout';
import cls from './cartPage.module.scss';
import { NotFound } from '../../../../shared/ui/NotFound';

export default function CartPage() {
  const [isEmpty, setisEmpty] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isLoadingHandler = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const setIsEmptyHandler = useCallback((empty: boolean) => {
    setisEmpty(empty);
  }, []);

  const totalCountHandler = useCallback((count: number) => {
    setTotalCount(count);
  }, []);

  const totalAmountHandler = useCallback((amount: number) => {
    setTotalAmount(amount);
  }, []);

  const plusTotalAmount = useCallback((amount: number) => {
    setTotalAmount(prev => prev + amount);
    setTotalCount(prev => prev + 1);
  }, []);

  const minusTotalAmount = useCallback(
    (amount: number) => {
      if (totalAmount - amount <= 0) {
        setTotalAmount(0);
      } else {
        setTotalAmount(prev => prev - amount);
        setTotalCount(prev => prev - 1);
      }
    },
    [totalAmount],
  );

  const removeAllHandler = useCallback(() => {
    totalCountHandler(0); // Оновлення кількості товарів
    totalAmountHandler(0); // Оновлення загальної суми
    setIsEmptyHandler(true); // Встановлення стану порожньої корзини
  }, [setIsEmptyHandler, totalAmountHandler, totalCountHandler]);

  return (
    <>
      <Section firstSection lastSection={!isEmpty}>
        <PagePartTop tag="h2" title="Cart" />

        {isEmpty ? (
          <NotFound src="img/cart-is-empty.png" alt="Cart is empty" />
        ) : (
          <div className={cls.body}>
            <CartProductsList
              className={cls.list}
              plusAmount={plusTotalAmount}
              minusAmount={minusTotalAmount}
              totalCountHandler={totalCountHandler}
              totalAmountHandler={totalAmountHandler}
              setIsEmptyHandler={setIsEmptyHandler}
              isLoading={isLoading}
              isLoadingHandler={isLoadingHandler}
            />
            {!isLoading && (
              <Checkout
                className={cls.checkout}
                totalAmount={totalAmount}
                totalCount={totalCount}
                removeAllHandler={removeAllHandler}
              />
            )}
          </div>
        )}
      </Section>
    </>
  );
}
