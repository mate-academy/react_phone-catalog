import { PhoneFromServer } from './Phone';

export interface Context {
  phonesInCart: PhoneFromServer[];
  setPhonesInCart: React.Dispatch<React.SetStateAction<PhoneFromServer[]>>;
  selectedPhonesInFavCount: number;
  selectedPhonesInCartCount: number;
  setSelectedPhonesInFavCount: React.Dispatch<React.SetStateAction<number>>;
  setSelectedPhonesInCartCount: React.Dispatch<React.SetStateAction<number>>;
  phonesInFav: PhoneFromServer[];
  setPhonesInFav: React.Dispatch<React.SetStateAction<PhoneFromServer[]>>;
}
