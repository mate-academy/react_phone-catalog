import styles from './ItemsPanel.module.scss';
import { favoritesData } from '../../data/favoritesData';
import { useEffect, useState } from 'react';
import { setRawCart } from '../utils/storageCart';

const getAllLocalStorage = () => {
  try {
    const stored = localStorage.getItem('addCart_v1');

    if (!stored) {
      return [];
    }

    return JSON.parse(stored);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao ler localStorage:', error);

    return [];
  }
};

export const ItemsPanel = () => {
  const [items, setItems] = useState(() => {
    const storedItems = getAllLocalStorage();

    return storedItems.length > 0
      ? storedItems.map(item => ({ ...item, quantity: item.quantity || 1 }))
      : favoritesData.map(item => ({ ...item, quantity: 1 }));
  });
  const [sumItens, setSumItens] = useState(0);
  const [totalItens, setTotalItens] = useState(0);

  const aumentarQuantidade = index => {
    setItems(prev => {
      const newItems = [...prev];

      newItems[index].quantity += 1;
      setRawCart('addCart_v1', JSON.stringify(newItems));

      return newItems;
    });
  };

  const diminuirQuantidade = index => {
    setItems(prev => {
      const newItems = [...prev];

      if (newItems[index].quantity > 1) {
        newItems[index].quantity -= 1;
        setRawCart('addCart_v1', JSON.stringify(newItems));
      }

      return newItems;
    });
  };

  const retirarItem = index => {
    setItems(prev => {
      const newItems = prev.filter((_, i) => i !== index);

      setRawCart('addCart_v1', JSON.stringify(newItems));

      return newItems;
    });
  };

  useEffect(() => {
    const total = items.reduce((acc, item) => {
      const raw = String(item.priceDiscount ?? '');
      const numericString = raw.replace(/[^0-9,.-]/g, '').replace(',', '.');
      const price = parseFloat(numericString) || 0;

      return acc + price * item.quantity;
    }, 0);

    setSumItens(total);
    setTotalItens(items.reduce((acc, item) => acc + item.quantity, 0));
  }, [items]);

  useEffect(() => {
    const updateCart = () => {
      const storedItems = getAllLocalStorage();

      setItems(
        storedItems.map(item => ({ ...item, quantity: item.quantity || 1 })),
      );
    };

    window.addEventListener('cartUpdated', updateCart);

    updateCart();

    return () => {
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  return (
    <div className={styles.itemsPanel}>
      <div className={styles.containerItems1199}>
        {items.map((product, index) => (
          <div key={product.id} className={styles.itemsPanel__item}>
            <div className={styles.itemsPanel__info}>
              <img
                src="src/Icons/excluirCinza.svg"
                alt="Excluir Item"
                className={styles.itemsPanel__remove}
                onClick={() => retirarItem(index)}
              />

              <img
                src={product.images?.[0] || 'src/Icons/defaultImage.svg'}
                alt="Imagem Item"
                className={styles.itemsPanel__image}
              />

              <h2 className={styles.itemsPanel__title}>{product.name}</h2>
            </div>

            <div className={styles.itemsPanelItemFooter}>
              <div className={styles.containerPriceButton}>
                <div>
                  <div
                    className={styles.itemsPanelQuantityButton}
                    onClick={() => diminuirQuantidade(index)}
                  >
                    -
                  </div>
                  <div className={styles.change}>
                    <h2 className={styles.changeItens}>{product.quantity}</h2>
                  </div>
                  <div
                    className={styles.itemsPanelQuantityButton}
                    onClick={() => aumentarQuantidade(index)}
                  >
                    +
                  </div>
                </div>
              </div>

              <h2 className={styles.itemsPanelItemPrice}>
                ${product.priceDiscount}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.itemsPanelSummary}>
        <h1
          className={styles.itemsPanelSummaryTotal}
        >{`$${sumItens.toFixed(2)}`}</h1>
        <h6
          className={styles.itemsPanelSummaryCount}
        >{`Total for ${totalItens} items`}</h6>

        <div className={styles.itemsPanelSummaryLine}></div>

        <div className={styles.itemsPanelSummaryCheckout}>
          <h2>Checkout</h2>
        </div>
      </div>
    </div>
  );
};
