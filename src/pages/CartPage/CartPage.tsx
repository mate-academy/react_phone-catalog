import { useContext } from 'react';
import { FavCartPhonesContext } from '../../contexts/FavCartPhonesContext';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { GadgetsInCartList } from '../../components/GadgetsInCartList';

export const CartPage = () => {
  const { phonesInCart, setPhonesInCart, setSelectedPhonesInCartCount } =
    useContext(FavCartPhonesContext);

  return (
    <main className="main">
      <div className="container">
        <BreadCrumbs pageName="Cart" />
        <GadgetsInCartList
          phones={phonesInCart}
          setPhones={setPhonesInCart}
          setSelectedPhonesInCartCount={setSelectedPhonesInCartCount}
        />
      </div>
    </main>
  );
};
