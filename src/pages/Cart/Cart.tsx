import { useContext, useMemo, useState } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { CartItem } from './components/CartItem/CartItem';
import { BreadcrumbBack } from '../../components/Breadcrumb/Breadcrumb';
import styles from './Cart.module.scss';
import { ErrorText } from '../../constants/errorText';
import { Error } from '../../components/Error';
import { ModalDialog } from './components/ModalDialog';
import { getCountOf, getButtonMainClass } from '../../utils/utils';
import { ProductGeneral } from '../../types/ProductGeneral';

export const Cart = () => {
  const {
    addedItems: addedItemsFromServer,
    setAddedItems,
    products,
    darkTheme,
  } = useContext(ProductContext);
  const addedItems = useMemo(
    () =>
      addedItemsFromServer
        .map(({ item, count }) => {
          const newItem = products.find(
            product => product.itemId == item,
          ) as ProductGeneral;

          return { item: newItem, count };
        })
        .sort((el1, el2) => el1.item.itemId.localeCompare(el2.item.itemId)),
    [products, addedItemsFromServer],
  );
  const [showModal, setShowModal] = useState(false);

  const sum = useMemo(
    () => getCountOf.sumInCart(addedItems),
    [addedItemsFromServer],
  );

  const itemsCount = useMemo(() => {
    return getCountOf.itemsInCart(addedItemsFromServer);
  }, [addedItemsFromServer]);

  function handleDelete(id = '') {
    if (id === '') {
      setAddedItems(prevItems => {
        return prevItems.filter(({ item }) => item === id);
      });
    } else {
      setAddedItems(prevItems => {
        return prevItems.filter(({ item }) => item !== id);
      });
    }
  }

  const handlCountChange = (currentItem: string, newCount: number) => {
    setAddedItems(oldItems => {
      const newItems = [...oldItems].filter(({ item }) => item != currentItem);

      return [...newItems, { item: currentItem, count: newCount }];
    });
  };

  return (
    <section className={styles.container}>
      <BreadcrumbBack />
      <p className={`text--page-title ${styles.title}`}>Cart</p>
      {addedItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <Error errorText={ErrorText.emptyCart} />
        </div>
      ) : (
        <div className={styles.gridContainer}>
          <div className={styles.items}>
            {addedItems.map(({ item, count }) => (
              <CartItem
                item={item}
                numberOfItems={count}
                key={item.id}
                updateCount={(newCount: number) => {
                  handlCountChange(item.itemId, newCount);
                }}
                handleDelete={handleDelete}
              />
            ))}
          </div>
          {showModal && (
            <ModalDialog
              onDelete={handleDelete}
              displayModal={(v: boolean) => {
                setShowModal(v);
              }}
            />
          )}
          <div className={`${styles.cost} border`}>
            <div className={`${styles.cost__container} border--bottom`}>
              <div className="text--page-title">{`$ ${sum}`}</div>
              <p className="text--grey">{`Total for ${itemsCount} items`}</p>
            </div>
            <button
              className={`${getButtonMainClass(darkTheme)} button--big ${styles.buttonMain}`}
              onClick={() => {
                setShowModal(true);
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
