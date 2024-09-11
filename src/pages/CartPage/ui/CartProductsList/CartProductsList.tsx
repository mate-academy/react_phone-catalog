/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { CartProductCard, Product } from '../../../../entities/Product';
import { getCartProducts } from '../../model/services/getCartProducts';
import cls from './cartProductsList.module.scss';
import {
  ICartItemsLocalStorage,
  useLocalStorage,
} from '../../../../shared/lib/hooks/useLocalStorage';
import { LOCAL_STORAGE_CART_PRODUCTS } from '../../../../entities/Product/model/types/product';
import classNames from 'classnames';
import { Loader } from '../../../../shared/ui/Loader';

interface Props {
  className?: string;
  plusAmount?: (amount: number) => void;
  minusAmount?: (amount: number) => void;
  totalCountHandler: (count: number) => void;
  totalAmountHandler: (count: number) => void;
  setIsEmptyHandler: (empty: boolean) => void;
  isLoading: boolean;
  isLoadingHandler: (loading: boolean) => void;
}

export const CartProductsList = memo(
  ({
    className,
    minusAmount,
    plusAmount,
    totalCountHandler,
    totalAmountHandler,
    setIsEmptyHandler,
    isLoading,
    isLoadingHandler,
  }: Props) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cartLocalStorage, setCartLocalStorage] = useLocalStorage<
      ICartItemsLocalStorage[]
    >(LOCAL_STORAGE_CART_PRODUCTS, []);

    const costCalcucation = (
      items: Product[],
      localStorageItems: ICartItemsLocalStorage[],
    ) =>
      items.reduce((acc, item) => {
        const count =
          localStorageItems.find(
            localStorageItem => localStorageItem.itemId === item.itemId,
          )?.count || 1;

        return (acc += item.price * count);
      }, 0);

    const coutCalcucation = (localStorageItems: ICartItemsLocalStorage[]) =>
      localStorageItems.reduce((count, item) => (count += item.count), 0);

    const removeCart = useCallback(
      (itemId: string) => {
        const filterItems = (item: Product | ICartItemsLocalStorage) =>
          item.itemId !== itemId;
        const currentCartLocalStorage = [...cartLocalStorage].filter(
          filterItems,
        );
        const newItems = products.filter(filterItems);

        setCartLocalStorage(currentCartLocalStorage);
        setProducts(prev => prev.filter(filterItems));
        totalCountHandler(coutCalcucation(currentCartLocalStorage));
        totalAmountHandler(costCalcucation(newItems, currentCartLocalStorage));

        if (currentCartLocalStorage.length === 0) {
          setIsEmptyHandler(true);
        }
      },
      [
        cartLocalStorage,
        products,
        setCartLocalStorage,
        setIsEmptyHandler,
        totalAmountHandler,
        totalCountHandler,
      ],
    );

    const plusAmountHanler = useCallback(
      (amount: number, itemId: string) => {
        const currentCartLocalStorageIndex = cartLocalStorage.findIndex(
          item => item.itemId === itemId,
        );

        if (cartLocalStorage[currentCartLocalStorageIndex]) {
          cartLocalStorage[currentCartLocalStorageIndex].count++;
          setCartLocalStorage([...cartLocalStorage]);
          plusAmount?.(amount);
        }
      },
      [cartLocalStorage, plusAmount, setCartLocalStorage],
    );

    const minusAmountHanler = useCallback(
      (amount: number, itemId: string) => {
        const currentCartLocalStorageIndex = cartLocalStorage.findIndex(
          item => item.itemId === itemId,
        );

        if (
          cartLocalStorage[currentCartLocalStorageIndex] &&
          cartLocalStorage[currentCartLocalStorageIndex].count - 1 !== 0
        ) {
          cartLocalStorage[currentCartLocalStorageIndex].count--;
          setCartLocalStorage([...cartLocalStorage]);

          minusAmount?.(amount);

          if (amount === 0) {
            setIsEmptyHandler(true);
          }
        }
      },
      [cartLocalStorage, minusAmount, setCartLocalStorage, setIsEmptyHandler],
    );

    const productsList = useMemo(
      () =>
        products.map(item => (
          <CartProductCard
            key={item.id}
            product={item}
            removeCart={removeCart}
            plusAmount={plusAmountHanler}
            minusAmount={minusAmountHanler}
          />
        )),
      [plusAmountHanler, minusAmountHanler, products, removeCart],
    );

    useEffect(() => {
      isLoadingHandler(true);
      getCartProducts()
        .then(items => {
          if (items.length === 0) {
            setIsEmptyHandler(true);
          } else {
            setProducts(items);
            setIsEmptyHandler(false);
            totalAmountHandler(costCalcucation(items, cartLocalStorage));
            totalCountHandler(coutCalcucation(cartLocalStorage));
          }
        })
        .finally(() => isLoadingHandler(false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      isLoadingHandler,
      setIsEmptyHandler,
      totalAmountHandler,
      totalCountHandler,
    ]);

    return (
      <div className={classNames(cls.list, className)}>
        {!isLoading ? productsList : <Loader />}
      </div>
    );
  },
);
