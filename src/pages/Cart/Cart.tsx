import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';

export const Cart = () => {
  const { t } = useLanguage();
  const { state, dispatch } = useCart();

  const totalQuantity = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const shouldClear = window.confirm(t('checkoutMessage'));

    if (shouldClear) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  return (
    <section>
      <h1>{t('cart')}</h1>

      {state.items.length === 0 ? (
        <p>{t('cartEmpty')}</p>
      ) : (
        <>
          {state.items.map(item => (
            <article key={item.id}>
              <img
                src={`${import.meta.env.BASE_URL}${item.image}`}
                alt={item.name}
                width="150"
              />

              <h2>{item.name}</h2>

              <p>
                {t('price')}: ${item.price}
              </p>

              <div>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'DECREASE',
                      id: item.id,
                    })
                  }
                >
                  -
                </button>

                <span> {item.quantity} </span>

                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'INCREASE',
                      id: item.id,
                    })
                  }
                >
                  +
                </button>
              </div>

              <p>
                {t('total')}: ${item.price * item.quantity}
              </p>

              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: 'REMOVE_FROM_CART',
                    id: item.id,
                  })
                }
              >
                x
              </button>
            </article>
          ))}

          <hr />

          <p>
            {t('totalItems')} {totalQuantity}
          </p>

          <h2>
            {t('total')} ${total}
          </h2>

          <button type="button" onClick={handleCheckout}>
            {t('checkout')}
          </button>
        </>
      )}
    </section>
  );
};
