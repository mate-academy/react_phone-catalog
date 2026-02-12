import { useMemo } from 'react';
import { useCart } from '../../shared/context/CartContext';
import { useProductsIndex } from '../../shared/hooks/useProductsIndex';
import { CartItemRow } from '../../shared/components/CartItemRow';
import { ProductListItem } from '../../shared/api/types';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import st from '../CartPage/CartPage.module.scss';

export const CartPage = () => {
  const { items, increase, decrease, remove, clear } = useCart();
  const { byId, loading, error, reload } = useProductsIndex();

  const enriched = useMemo(() => {
    return items
      .map(ci => {
        const product = byId.get(ci.productId);

        return product ? { product, qty: ci.quantity } : null;
      })
      .filter(
        (x): x is { product: ProductListItem; qty: number } => x !== null,
      );
  }, [items, byId]);

  const totals = useMemo(() => {
    const qty = enriched.reduce((s, i) => s + i.qty, 0);
    const amount = enriched.reduce((s, i) => s + i.product.price * i.qty, 0);

    return { qty, amount };
  }, [enriched]);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading…</div>;
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        Something went wrong. <button onClick={reload}>Reload</button>
      </div>
    );
  }

  if (!enriched.length) {
    return (
      <div className={st.empty}>
        <div className={st.emptyInner}>
          <h1 className={st.emptyTitle}>Cart</h1>
          <p className={st.emptyText}>Your cart is empty</p>
        </div>
      </div>
    );
  }

  const onCheckout = () => {
    if (
      confirm('Checkout is not implemented yet. Do you want to clear the Cart?')
    ) {
      clear();
    }
  };

  return (
    <section className={st.cart}>
      <div className={st.breadcrumbs}>
        <Breadcrumbs trail={[]} variant="back" />
      </div>

      <h1 className={st.title}>Cart</h1>

      <div className={st.items}>
        {enriched.map(({ product, qty }) => (
          <CartItemRow
            key={product.itemId}
            product={product}
            qty={qty}
            onInc={() => increase(product.itemId)}
            onDec={() => decrease(product.itemId)}
            onRemove={() => remove(product.itemId)}
          />
        ))}
      </div>

      <div className={st.summary}>
        <div className={st.totalAmount}>
          ${totals.amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </div>

        <div className={st.totalCaption}>
          Total for {totals.qty} {totals.qty === 1 ? 'item' : 'items'}
        </div>

        <hr className={st.divider} />

        <button className={st.checkoutBtn} onClick={onCheckout}>
          Checkout
        </button>
      </div>
    </section>
  );
};
