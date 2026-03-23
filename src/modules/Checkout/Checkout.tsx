import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useCart } from '../../hooks/useCart';
import { useOrder } from '../../hooks/useOrder';
import { clearCart } from '../../store/cart/CartReducer';
import { PaymentMethods } from '../../store/constants';
import { clearOrder } from '../../store/OrderProvider/OrderReducer';
import { imageUrl } from '../../utils/imageUrl';
import styles from './Checkout.module.scss';

type RecipientData = {
  name: string;
  email: string;
  phone: string;
};

export const Checkout = () => {
  const navigate = useNavigate();
  const { order, isInitialized, setOrder } = useOrder();
  const { cart, setCart } = useCart();
  const [timeLeft, setTimeLeft] = useState(0);
  const [recipientData, setRecipientData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  const [paymentMethod, setPaymentMethod] = useState<string | null>('cash');
  const [cardData, setCardData] = useState({
    number: '',
    cvv: '',
    pin: '',
  });
  const [errorsCard, setErrorsCard] = useState<{
    number?: string;
    cvv?: string;
    pin?: string;
  }>({});

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
  };

  useEffect(() => {
    if (!order.expiresAt) {
      return;
    }

    const interval = setInterval(() => {
      const diff = order.expiresAt! - Date.now();

      setTimeLeft(Math.max(diff, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [order.expiresAt]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (!order.orderId) {
      navigate('/cart');

      return;
    }

    if (order.expiresAt && Date.now() > order.expiresAt) {
      navigate('/cart');
    }
  }, [isInitialized, order]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof RecipientData,
  ) => {
    const value = event.target.value;

    setRecipientData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateCard = () => {
    const newErrors: typeof errorsCard = {};

    if (!cardData.number.trim()) {
      newErrors.number = 'Card number is required';
    }

    if (!cardData.cvv.trim()) {
      newErrors.cvv = 'CVV number is required';
    }

    if (!cardData.pin.trim()) {
      newErrors.pin = 'pin number is required';
    }

    setErrorsCard(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!recipientData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!recipientData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(recipientData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!recipientData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{7,15}$/.test(recipientData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const sendOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (paymentMethod === 'card' && !validateCard()) {
      return;
    }

    if (!validate()) {
      return;
    }

    // eslint-disable-next-line no-console
    console.log({
      cart: cart,
      price: getTotalPrice(),
      user: recipientData,
      paymentMethod: paymentMethod,
      ...(paymentMethod === 'card' && { cardData }),
    });

    setOrder(clearOrder());
    localStorage.removeItem('orderId');
    localStorage.removeItem('expiresAt');
    setCart(clearCart());
    navigate('/confirm');
  };

  return (
    <div className={styles.container}>
      <Pagetoolbar
        title={`Your order #${order.orderId}`}
        subtitle={`Time remaining: ${formatTime(timeLeft)}`}
        back
      />
      <div className={styles.content}>
        <div className={styles.cart}>
          <h3 className={styles.title}>Your cart:</h3>
          <div className={styles.products}>
            {cart.map(item => {
              return (
                <div key={item.id} className={styles.product}>
                  <div className={styles.img}>
                    <img
                      src={imageUrl(item.product.image)}
                      alt=""
                      className={styles.img__photo}
                    />
                  </div>
                  <p className={styles.name}>{item.product.name}</p>
                  <p className={styles.amount}>Amount: {item.quantity}</p>
                  <p className={styles.price}>
                    Total price:{' '}
                    <strong>${item.product.price * item.quantity}</strong>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <form
          action=""
          onSubmit={event => sendOrder(event)}
          className={styles.form}
        >
          <div className={styles.form__group}>
            <h3 className={styles.title}>Recipient data:</h3>
            <Input
              value={recipientData.name}
              onChange={event => onChange(event, 'name')}
              type="text"
              placeholder="Your name"
              error={errors.name}
            />
            <Input
              value={recipientData.email}
              onChange={event => onChange(event, 'email')}
              type="email"
              placeholder="Your email"
              error={errors.email}
            />
            <Input
              value={recipientData.phone}
              onChange={event => onChange(event, 'phone')}
              type="text"
              placeholder="Your phone"
              error={errors.phone}
            />
          </div>
          <div className={styles.form__group}>
            <h3 className={styles.title}>
              Total value to pay: ${getTotalPrice()}
            </h3>
          </div>
          <div className={styles.form__group}>
            <h3 className={styles.title}>Payment method</h3>
            <Select
              hasDefaultValue
              onChange={value => setPaymentMethod(value)}
              value={paymentMethod}
              options={PaymentMethods}
              placeholder="Choose correct"
            />
            {paymentMethod === 'card' && (
              <div className={styles.form__group}>
                <Input
                  value={cardData.number}
                  onChange={event => {
                    const value = event.target.value;

                    setCardData(prev => ({
                      ...prev,
                      number: value,
                    }));

                    if (errorsCard.number) {
                      setErrorsCard(prev => ({
                        ...prev,
                        number: undefined,
                      }));
                    }
                  }}
                  type="number"
                  placeholder="Card number"
                  error={errorsCard.number}
                />
                <Input
                  value={cardData.cvv}
                  onChange={event => {
                    const value = event.target.value;

                    setCardData(prev => ({
                      ...prev,
                      cvv: value,
                    }));

                    if (errorsCard.cvv) {
                      setErrorsCard(prev => ({
                        ...prev,
                        cvv: undefined,
                      }));
                    }
                  }}
                  type="number"
                  placeholder="CVV"
                  error={errorsCard.cvv}
                />
                <Input
                  value={cardData.pin}
                  onChange={event => {
                    const value = event.target.value;

                    setCardData(prev => ({
                      ...prev,
                      pin: value,
                    }));

                    if (errorsCard.pin) {
                      setErrorsCard(prev => ({
                        ...prev,
                        pin: undefined,
                      }));
                    }
                  }}
                  type="password"
                  placeholder="Pin-code"
                  error={errorsCard.pin}
                />
              </div>
            )}
          </div>
          <Button type="submit">Make an order</Button>
        </form>
      </div>
    </div>
  );
};
