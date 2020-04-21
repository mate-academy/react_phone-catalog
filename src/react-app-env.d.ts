/// <reference types="react-scripts" />
interface Phone {
  id: string;
  phoneId: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

interface InitialState {
  phones: Phone[];
}

interface RootState {
  isLoaded: boolean;
  isLoading: boolean;
  phones: Phone[];
}
