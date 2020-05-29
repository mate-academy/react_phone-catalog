// / <reference types=string />

type RootState = ReturnType<typeof rootReducer>

interface Product {
  age: number;
  type: string;
  id: string;
  imageUrl: string;
  name: string;
  snippet: string;
  price: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
}

interface ProductProps {
  age: number;
  type: string;
  id: string;
  imageUrl: string;
  name: string;
  snippet: string;
  price: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
  productCardRef?: (node: any) => void;
}

interface ProductDetails {
  additionalFeatures: string;
  android: {
    os: string;
    ui: string;
  };
  availability: string[];
  battery: {
    standbyTime: string;
    talkTime: string;
    type: string;
  };
  camera: {
    features: string[];
    primary: string;
  };
  connectivity: {
    bluetooth: string;
    cell: string;
    gps: boolean;
    infrared: boolean;
    wifi: string;
  };
  description: string;
  display: {
    screenResolution: string;
    screenSize: string;
    touchScreen: boolean;
  };
  hardware: {
    accelerometer: boolean;
    audioJack: string;
    cpu: string;
    fmRadio: boolean;
    physicalKeyboard: boolean;
    usb: string;
  };
  id: string;
  images: string[];
  name: string;
  sizeAndWeight: {
    dimensions: string[];
    weight: string;
  };
  storage: {
    flash: string;
    ram: string;
  };
}

interface CarouselSlide {
  id: number;
  name: string;
  src: string;
}

type CarouselSlidesProps = {
  slides: CarouselSlide[];
  toMove: number;
  duration: number;
};

type CarouselRectanglesProps = {
  slides: CarouselSlide[];
  active: number;
  goToSlide: (i: number) => void;
};

type CarouselControlProps = {
  changeSlide: (value: string) => void;
  direction: string;
};

type SliderProps = {
  products: Product[];
  position: number;
  step: number;
  itemWidth: number;
  frameSize: number;
  animationDuration: number;
  productCardRef: (node: any) => void;
};

type SliderArrowProps = {
  handleSlide: (direction: string) => void;
  direction: string;
  position: number;
  maxPosition: number;
};

type HeadingProps = {
  title: string;
};

type SearchProps = {
  inputValue: string;
  searchProducts: React.ChangeEventHandler;
  searchReset: () => void;
};

interface Category {
  title: string;
  link: string;
}

interface NavItem {
  title: string;
  link: string;
  exact: boolean;
}

interface OptionType {
  option: string;
}

type DropdownProps = {
  list: OptionType[];
  heading: string;
};

type DropdownArrowProps = {
  isListOpen: boolean;
};

type PaginationProps = {
  total: number;
  perPage: number;
  page: number;
  changePage: (page: number) => void;
};

type ProductsAmountProps = {
  title: string;
};

type BreadcrumbProps = {
  to: string;
  label: string;
  isLast: boolean;
};

type ShowcaseBlockProps = {
  title: string;
}
