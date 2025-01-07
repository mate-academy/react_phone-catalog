import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../shared/components/Container';
import CloseIcon from '../../images/Close.svg';
import { CartProduct } from '../../types/CartProduct';
import s from './ShoppingBag.module.scss';
import { useProducts } from '../../shared/utils/ProductsContext';
import { ReactSVG } from 'react-svg';
import { ProductSum } from '../../shared/utils/ProductSum';

export const ShoppingBagPage = () => {
  const { shoppingBag, removeFromShoppingBag, setShoppingBag } = useProducts();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productSum = ProductSum(shoppingBag);

  const goBack = () => {
    navigate(-1);
  };

  const handleRemoveFromBag = (id: string) => {
    removeFromShoppingBag(id);
  };

  const handleIncrement = (id: string) => {
    const updatedShoppingBag = shoppingBag.map((item: CartProduct) =>
      item.id === id ? { ...item, count: item.count + 1 } : item,
    );

    setShoppingBag(updatedShoppingBag);
    localStorage.setItem('shoppingBag', JSON.stringify(updatedShoppingBag));
  };

  const handleDecrement = (id: string) => {
    const updatedShoppingBag = shoppingBag.map((item: CartProduct) =>
      item.id === id && item.count > 0
        ? { ...item, count: item.count - 1 }
        : item,
    );

    setShoppingBag(updatedShoppingBag);
    localStorage.setItem('shoppingBag', JSON.stringify(updatedShoppingBag));
  };

  const handleClearCart = () => {
    setShoppingBag([]);
    localStorage.removeItem('shoppingBag');
    setIsModalOpen(false);
  };

  return (
    <section className={s.ShoppingBagPage}>
      <Container>
        <div className={s.PageContent}>
          <div className={s.BackLink}>
            <div className={s.LeftArrow} />
            <button className={s.BackBtn} onClick={goBack}>
              Back
            </button>
          </div>

          <h1 className={s.PageTitle}>Cart</h1>

          <div className={s.CataloField}>
            <ul className={s.CartCatalog}>
              {shoppingBag.length > 0 ? (
                shoppingBag.map((item: CartProduct) => (
                  <li key={item.id} className={s.ShoppingBagItem}>
                    <div className={s.ItemFirstSection}>
                      <button
                        type="button"
                        className={s.RemoveBtn}
                        onClick={() => handleRemoveFromBag(item.id)}
                      >
                        <ReactSVG src={CloseIcon} />
                      </button>

                      <div className={s.ItemInfo}>
                        <img
                          className={s.ItemImage}
                          src={`${item.image}`}
                          alt={`${item.name}`}
                          width={65}
                          height={80}
                        />

                        <a
                          href={`#/${item.category}/${item.id}`}
                          className={s.ItemName}
                        >
                          {item.name}
                        </a>
                      </div>
                    </div>

                    <div className={s.ItemSecondSection}>
                      <div className={s.BtnsField}>
                        <button
                          type="button"
                          onClick={() => handleDecrement(item.id)}
                          disabled={item.count === 1}
                        >
                          -
                        </button>
                        <p>{item.count}</p>
                        <button
                          type="button"
                          onClick={() => handleIncrement(item.id)}
                        >
                          +
                        </button>
                      </div>

                      <p className={s.ItemPrice}>
                        &#36;{(item.priceRegular * item.count).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <p>There are no products yet.</p>
              )}
            </ul>

            <div className={s.CartPriceField}>
              <div className={s.CartPrice}>
                <p className={s.TotalPrice}>
                  &#36;
                  {shoppingBag.reduce(
                    (sum: number, item: CartProduct) =>
                      sum + item.priceRegular * item.count,
                    0,
                  )}
                </p>
                <p className={s.ItemsSum}>
                  {shoppingBag.length !== 0
                    ? productSum !== 1
                      ? `Total for ${productSum} items`
                      : 'Total for 1 item'
                    : 'No items'}
                </p>
              </div>

              <button
                className={s.CheckoutBtn}
                onClick={() => setIsModalOpen(true)}
                disabled={productSum === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className={s.Modal}>
            <div className={s.ModalContent}>
              <h2>Checkout is not implemented yet.</h2>
              <p>Do you want to clear the Cart?</p>
              <div className={s.ModalActions}>
                <button
                  className={`${s.Button} ${s.ClearBtn}`}
                  onClick={handleClearCart}
                >
                  Clear
                </button>
                <button
                  className={`${s.Button} ${s.CancelBtn}`}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
