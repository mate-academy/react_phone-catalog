export type SearchParams = {
  [key: string]: string | null;
};

export type SortValue = {
  label: SortType;
  value: SortType;
};

export type PerPageValue = {
  label: PerPage;
  value: number;
};

export type DropDownValue = SortValue | PerPageValue;

export enum DropDown {
  Sort = 'Sort',
  PerPage = 'PerPage',
}

export type PaginationData = {
  pages: number[];
  currentPage: number;
  pagesCount: number;
  translate: number;
};

export type PaginationFunctions = {
  handlePageChange: (page: number) => string;
  handlePrevClick: () => void;
  handleNextClick: () => void;
};

export const enum SortType {
  None = 'None',
  Newest = 'Newest',
  Alphabetically = 'Alphabetically',
  Cheapest = 'Cheapest',
}

export enum PerPage {
  All = 'All',
  Low = '4',
  Medium = '8',
  High = '16',
}

export enum PageName {
  Home = 'Home',
  Phones = 'Phones',
  Tablets = 'Tablets',
  Accessories = 'Accessories',
  Favourites = 'Favourites',
  Cart = 'Cart',
}

export enum Category {
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
}

export enum PageTitle {
  NewModels = 'Brand new models',
  HotPrices = 'Hot prices',
  Like = 'You may also like',
  MobilePhones = 'Mobile Phones',
}

export enum TechSpecs {
  Screen = 'Screen',
  Resolution = 'Resolution',
  Processor = 'Processor',
  RAM = 'RAM',
  Built = 'Built in memory',
  Capacity = 'Capacity',
  Camera = 'Camera',
  Zoom = 'Zoom',
  Cell = 'Cell',
}

export enum Operation {
  Plus = '1',
  Minus = '-1',
}

export enum DirectionAdd {
  Favourites = 'favourites',
  Cart = 'cart',
}

export enum NotFound {
  Page = 'Page not found',
  Product = 'Product not found',
}

export enum ModaleButton {
  Confirm = 'Confirm',
  Cencel = 'Cancel',
}

export enum FixColor {
  Spacegray = '#535355',
  Midnightgreen = '#004953',
  Midnight = '#18186c',
  Starlight = '#e8d5d7',
  Rosegold = '#b16b75',
  Gold = '#fcdbc1',
  Yellow = '#ffe98c',
  Purple = '#d5d2dd',
  Skyblue = '#1fa2d4',
  Spaceblack = '#4e4e4e',
  Sierrablue = '#b9d3ef',
  Graphite = '#4d4d52',
}

export type SliderData = {
  itemWidth: number;
  translate: number;
  translateIndex: number;
  translateCount: number;
  pageWidth: number;
  sliderWidth: number;
};

export type Description = {
  title: string;
  text: string[];
};

export type ProductDetails = {
  id: string;
  category: Category;
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
  camera?: string;
  zoom?: string;
  cell: string[];
};

export type Product = {
  id: number;
  category: Category;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

export type CartProduct = {
  id: number;
  quantity: number;
  product: Product;
};

export type CatalogContextType = {
  allProducts: Product[];
  favourites: Product[];
  cart: CartProduct[];
  totalCartQuantity: number | null;
  totalCheckout: number | null;
  menuIsActive: boolean;
  checkoutIsClicked: boolean;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleLinkClick: (enableMenu: boolean) => void;
  addProductToFavoutites: (product: Product) => void;
  addProductToCart: (cartProduct: CartProduct, operation?: Operation) => void;
  setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  setCheckoutIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
};
