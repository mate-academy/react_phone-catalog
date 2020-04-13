interface Phone {
  id: string;
  name: string;
  phoneId: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

interface Details {
  id: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

interface PhonesWithDetails extends Phone {
  details: Details;
}

interface State {
  phones: PhonesWithDetails[] | [];
  phoneDetails: Details | null;
  phoneError: string;
  sortBy: string;
}

interface Description {
  title: string;
  text: string[];
}
