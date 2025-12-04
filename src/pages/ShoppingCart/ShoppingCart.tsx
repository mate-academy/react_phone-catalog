import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ShoppingCart.module.css';
import { useCart } from './cartContext';

const ShoppingCart: React.FC = () => {
  const { items, removeItem, updateQty, totalQty, totalPrice, clearCart } =
    useCart();

  const handleCheckout = () => {
    const confirmed = confirm(
      'A finalização da compra ainda não foi implementada. Deseja limpar o carrinho?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <main className={styles.container} data-testid="cart-empty">
        <h1>Seu carrinho</h1>
        <p>Seu carrinho está vazio</p>
        <Link to="/" className={styles.continue}>
          Continuar comprando
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.container} data-testid="cart-page">
      <h1>Seu carrinho</h1>

      <ul className={styles.list}>
        {items.map(item => {
          // calcula subtotal por item
          const numericPrice = parseFloat(
            (item.product.price ?? '0').replace(/[^\d.-]/g, ''),
          );
          const subtotal = numericPrice * item.quantity;

          return (
            <li
              key={item.id}
              className={styles.item}
              data-testid={`cart-item-${item.id}`}
            >
              <img
                src={item.product.imageSrc ?? '/assets/img/placeholder.png'}
                alt={item.product.title}
                className={styles.thumb}
              />

              <div className={styles.info}>
                <div className={styles.title}>{item.product.title}</div>
                <div className={styles.price}>{item.product.price}</div>
                <div className={styles.subtotal}>
                  Subtotal: R$ {subtotal.toFixed(2).replace('.', ',')}
                </div>
              </div>

              <div className={styles.controls}>
                <button
                  aria-label={`Diminuir quantidade ${item.product.title}`}
                  onClick={() => updateQty(item.id, item.quantity - 1)}
                  className={styles.qtyBtn}
                  data-testid={`decrease-${item.id}`}
                  disabled={item.quantity === 1} // ✅ desabilita se qtd = 1
                >
                  -
                </button>

                <span className={styles.qty} data-testid={`qty-${item.id}`}>
                  {item.quantity}
                </span>

                <button
                  aria-label={`Aumentar quantidade ${item.product.title}`}
                  onClick={() => updateQty(item.id, item.quantity + 1)}
                  className={styles.qtyBtn}
                  data-testid={`increase-${item.id}`}
                >
                  +
                </button>
              </div>

              <button
                className={styles.remove}
                onClick={() => removeItem(item.id)}
                aria-label={`Remover ${item.product.title}`}
                data-testid={`remove-${item.id}`}
              >
                ×
              </button>
            </li>
          );
        })}
      </ul>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Quantidade</span>
          <strong data-testid="cart-total-qty">{totalQty}</strong>
        </div>

        <div className={styles.summaryRow}>
          <span>Total</span>
          <strong data-testid="cart-total-price">{totalPrice}</strong>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.checkout}
            onClick={handleCheckout}
            data-testid="checkout"
          >
            Finalizar compra
          </button>

          <button
            className={styles.clear}
            onClick={clearCart}
            data-testid="clear-cart"
          >
            Limpar carrinho
          </button>
        </div>
      </div>
    </main>
  );
};

export default ShoppingCart;
