import { useState, useEffect, SetStateAction } from 'react';
import { PhoneFromServer } from '../../../types/Phone';

type Props = {
  phone: PhoneFromServer;
  deletePhone: (phone: PhoneFromServer) => void;
  setPhones: React.Dispatch<SetStateAction<PhoneFromServer[]>>;
  setSelectedPhonesInCartCount: React.Dispatch<SetStateAction<number>>;
  phonesInCart: PhoneFromServer[];
};

export const GadgetInCartList: React.FC<Props> = ({
  phone,
  deletePhone,
  setPhones,
  setSelectedPhonesInCartCount,
  phonesInCart,
}) => {
  const [newPhone, setNewPhone] = useState({
    ...phone,
    count: phone.count || 1,
    price: phone.count
      ? phone.count * phone.priceDiscount
      : phone.priceDiscount,
  });

  useEffect(() => {
    setPhones(prevPhones =>
      prevPhones.map(p => (p.id === newPhone.id ? newPhone : p)),
    );
  }, [newPhone, setPhones]);

  useEffect(() => {
    setSelectedPhonesInCartCount(
      phonesInCart.reduce((acc, p) => acc + (p.count ?? 0), 0),
    );
  }, [setSelectedPhonesInCartCount, phonesInCart, newPhone]);

  const increasePhonesCount = () => {
    setNewPhone(prevPhone => ({
      ...prevPhone,
      count: prevPhone.count + 1,
      price: (prevPhone.count + 1) * prevPhone.priceDiscount,
    }));
    setSelectedPhonesInCartCount(x => x + 1);
  };

  const decreasePhonesCount = () => {
    setNewPhone(prevPhone => ({
      ...prevPhone,
      count: prevPhone.count > 0 ? prevPhone.count - 1 : 0,
      price:
        prevPhone.count > 1
          ? (prevPhone.count - 1) * prevPhone.priceDiscount
          : 0,
    }));

    if (newPhone.count > 0) {
      setSelectedPhonesInCartCount(x => x - 1);
    }
  };

  return (
    <li key={phone.id} className="cart__item cart-item">
      <button onClick={() => deletePhone(phone)} className="cart-item__cross" />
      <img
        src={`${phone.images[0]}`}
        alt={phone.id}
        className="cart-item__icon"
      />
      <p className="cart-item__title">{phone.name}</p>
      <div className="cart-item__count cart-count">
        <button onClick={decreasePhonesCount} className="cart-count__minus">
          -
        </button>
        <div className="cart-count__quantity">{newPhone.count || 0}</div>
        <button onClick={increasePhonesCount} className="cart-count__plus">
          +
        </button>
      </div>
      <div className="cart-item__price">${newPhone.price}</div>
    </li>
  );
};
