// / <reference types=string />

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

interface ProductPaths {
  [key: string]: string;
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

type FavoriteBtnProps = {
  productId: string;
  styleSize?: string;
};

type ProductPriceProps = {
  price: number;
  discount: number;
  styleSize?: string;
};

type PrimaryBtnProps = {
  title: string;
  styleSize?: string;
};

type CarouselSlidesProps = {
  slides: CarouselSlide[];
  moveSize: number;
  duration: number;
};

type CarouselDotsProps = {
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
  sliderVisibleWidth: number;
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

interface Category {
  title: string;
  link: string;
}

type NavProps = {
  isNavOpen: boolean;
};

type CartProps = {
  isNavOpen: boolean;
};

type FavoritesProps = {
  isNavOpen: boolean;
};

type SandwichProps = {
  isNavOpen: boolean;
  handleNavOpen: () => void;
};

interface NavItem {
  title: string;
  link: string;
  exact: boolean;
}

type NavList = NavItem[];

interface NavItemProps {
  title: string;
  link: string;
  exact: boolean;
  onMount: (link: string, ref: any) => void;
}

interface Match {
  isExact: boolean;
  params: {
    productType: string;
    productId: string;
  };
  path: string;
  url: string;
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
  label: string;
  link: string;
  isLast: boolean;
};

type ShowcaseBlockProps = {
  title: string;
  selectedProduct?: Product;
};

type ProductGalleryProps = {
  images: string[];
  title: string;
};

type ProductTechSpecs = ProductDetails & {
  shortened?: boolean;
}

type GalleryThumbnailsProps = {
  images: string[];
  title: string;
  currentImageLink: string;
  handleClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};
