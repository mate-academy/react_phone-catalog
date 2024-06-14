import { useContext, useMemo, useState } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { CartItem } from './components/CartItem/CartItem';
import { ProductGeneral } from '../../types/ProductGeneral';
import { BreadcrumbBack } from '../../components/Breadcrumb/Breadcrumb';
import styles from './Cart.module.scss';
import { ErrorText } from '../../constants/errorText';
import { Error } from '../../components/Error';
import { ModalDialog } from './components/ModalDialog';

type ItemWithCount = { item: ProductGeneral; count: number };

export const Cart = () => {
  const {
    addedItems: addedItemsIds,
    setAddedItems,
    products,
  } = useContext(ProductContext);
  const addedItems = useMemo(() => {
    return products
      .filter(product => addedItemsIds.includes(product.itemId))
      .map(item => {
        return { item, count: 1 };
      });
  }, [products, addedItemsIds]);
  const [showModal, setShowModal] = useState(false);

  const [itemsWithCount, setItemWithCount] =
    useState<ItemWithCount[]>(addedItems);

  const sum = useMemo(() => {
    return itemsWithCount.reduce((prev, { item, count }) => {
      const price = item.price * count;

      return prev + price;
    }, 0);
  }, [itemsWithCount]);

  function handleDelete(id = '') {
    if (id === '') {
      setItemWithCount(prevItems =>
        prevItems.filter(({ item }) => item.itemId === id),
      );

      setAddedItems(prevItems => {
        return prevItems.filter(currentItem => currentItem === id);
      });
    } else {
      setItemWithCount(prevItems =>
        prevItems.filter(({ item }) => item.itemId !== id),
      );

      setAddedItems(prevItems => {
        return prevItems.filter(currentItem => currentItem !== id);
      });
    }
  }

  const handlCountChange = (item: ProductGeneral, count: number) => {
    setItemWithCount(oldItems => {
      const newItems = [...oldItems].filter(
        oldItem => oldItem.item.id !== item.id,
      );

      return [...newItems, { item, count }];
    });
  };

  return (
    <section className={styles.container} style={{}}>
      <BreadcrumbBack />
      <p className={`text--page-title ${styles.title}`}>Cart</p>
      {addedItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <Error errorText={ErrorText.emptyCart} />
        </div>
      ) : (
        <div className={styles.gridContainer}>
          <div className={styles.items}>
            {addedItems.map(({ item }) => (
              <CartItem
                item={item}
                key={item.id}
                updateCount={(newCount: number) => {
                  handlCountChange(item, newCount);
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
              <p className="text--grey">{`Total for ${addedItems.length} items`}</p>
            </div>
            <button
              className={`button button--black button--big ${styles.buttonMain}`}
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
