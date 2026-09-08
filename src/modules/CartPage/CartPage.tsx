import { useEffect, useState } from 'react';
import styles from './CartPage.module.scss';
import { useCart } from '../../contexts/CartContext';
import { BackButton } from '../../components/BackButton/BackButton';
import RemoveIcon from '../../assets/icons/Close.svg';
import MinusIcon from '../../assets/icons/Minus.svg';
import PlusIcon from '../../assets/icons/Plus.svg';
import { Loader } from '../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';

interface RawProduct {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price?: number;
  screen?: string;
  capacity?: string;
  color?: string;
  ram?: string;
  year?: number;
  image: string;
}

interface CartProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  shortSpecs: { left: string; right: string }[];
}

export const CartPage = () => {
  const { t } = useTranslation();
  const { cartItems, removeFromCart, increaseQty, decreaseQty, clearCart } =
    useCart();

  const [loading, setLoading] = useState(true);
  const [productsData, setProductsData] = useState<CartProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('api/products.json');

        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }

        const allProducts: RawProduct[] = await res.json();

        const cartProducts: CartProduct[] = cartItems
          .map(cartItem => {
            const product = allProducts.find(p => p.itemId === cartItem.id);

            if (!product) {
              return null;
            }

            return {
              id: product.itemId,
              title: product.name,
              image: product.image,
              price: product.price ?? product.fullPrice,
              quantity: cartItem.quantity,
              shortSpecs: [
                { left: 'Screen', right: product.screen ?? '-' },
                { left: 'Capacity', right: product.capacity ?? '-' },
                { left: 'RAM', right: product.ram ?? '-' },
              ],
            };
          })
          .filter(Boolean) as CartProduct[];

        setProductsData(cartProducts);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cartItems]);

  const parsePrice = (price: number | string) =>
    typeof price === 'number'
      ? price
      : Number(price.toString().replace('$', '')) || 0;

  const totalQuantity = productsData.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const totalPrice = productsData.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const confirmed = window.confirm(t('cart.checkoutConfirm'));

    if (confirmed) {
      clearCart();
    }
  };

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <BackButton className={styles.backButton} />
      <div className={styles.headerWrapper}>
        <h1 className={styles.title}>{t('cart.title')}</h1>
      </div>

      {productsData.length === 0 ? (
        <div className={styles.emptyCart}>
          <img
            src="img/cart-is-empty.png"
            alt={t('cart.empty')}
            className={styles.emptyCartImage}
          />
          <p>{t('cart.empty')}</p>
        </div>
      ) : (
        <div className={styles.grid}>
          <div className={styles.cartItems}>
            {productsData.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.topRow}>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <img src={RemoveIcon} alt={t('cart.remove')} />
                  </button>

                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.itemImage}
                  />
                  <span className={styles.itemTitle}>{item.title}</span>
                </div>

                <div className={styles.bottomRow}>
                  <div className={styles.counter}>
                    <button
                      onClick={() => decreaseQty(item.id)}
                      disabled={item.quantity === 1}
                    >
                      <img src={MinusIcon} alt={t('cart.decrease')} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>
                      <img src={PlusIcon} alt={t('cart.increase')} />
                    </button>
                  </div>

                  <span className={styles.itemPrice}>
                    ${parsePrice(item.price) * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <span className={styles.totalPrice}>${totalPrice}</span>
            <p className={styles.totalItems}>
              {t('cart.totalForItems', { count: totalQuantity })}
            </p>
            <hr className={styles.divider} />
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              {t('cart.checkout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
