import { GadgetInCartList } from './Phone/GadgetInCartList';
import './GadgetsInCartList.scss';
import { useState, useEffect, useContext, SetStateAction } from 'react';
import { FavCartPhonesContext } from '../../contexts/FavCartPhonesContext';
import { PhoneFromServer } from '../../types/Phone';

interface Props {
  phones: PhoneFromServer[];
  setPhones: React.Dispatch<SetStateAction<PhoneFromServer[]>>;
  setSelectedPhonesInCartCount: React.Dispatch<SetStateAction<number>>;
}

export const GadgetsInCartList: React.FC<Props> = ({
  phones,
  setPhones,
  setSelectedPhonesInCartCount,
}) => {
  const { phonesInCart } = useContext(FavCartPhonesContext);

  const [totalPrice, setTotalPrice] = useState(0);
  const [modelsCount, setModelsCount] = useState(0);

  useEffect(() => {
    const total = phones.reduce(
      (acc: number, phone: PhoneFromServer) => acc + (phone.price || 0),
      0,
    );

    setTotalPrice(total);
    setModelsCount(
      phones.reduce(
        (acc: number, phone: PhoneFromServer) => acc + (phone.count || 0),
        0,
      ),
    );
  }, [phones]);

  useEffect(() => {
    setSelectedPhonesInCartCount(
      phonesInCart.reduce((acc, phone) => acc + (phone.count || 0), 0),
    );
  }, [setSelectedPhonesInCartCount, phonesInCart, phones]);

  const deletePhoneFromCart = (phone: PhoneFromServer) => {
    setPhones(phones.filter((p: PhoneFromServer) => p.id !== phone.id));
  };

  return (
    <div className="cart">
      <ul className="cart__list">
        {phones.map((phone: PhoneFromServer) => (
          <GadgetInCartList
            key={phone.id}
            phone={phone}
            deletePhone={deletePhoneFromCart}
            setPhones={setPhones}
            setSelectedPhonesInCartCount={setSelectedPhonesInCartCount}
            phonesInCart={phonesInCart}
          />
        ))}
      </ul>
      <div className="cart__checkout checkout">
        <div className="checkout__total-price">${totalPrice}</div>
        <div className="checkout__text">
          Total for {modelsCount} {modelsCount === 1 ? 'item' : 'items'}
        </div>
        <hr />
        <div className="checkout__button">Checkout</div>
      </div>
    </div>
  );
};
