// / <reference types="react-scripts" />
interface Good {
  age: number;
  id: string;
  type: string;
  imageUrl: string;
  name: string;
  snippet: string;
  price: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
}

interface cartGood extends Good {
  count: number;
}

interface SliderImage {
  path: string;
  alt: string;
}

interface Link {
  title: string;
  path: string;
}

interface GoodDetails {
  id: string;
  name: string;
  images: Array<string>;
  description: string;
  [key?: string]: string | string[];
  [key?: string]: {
    [key: string]: string | string[] | boolean;
  };
  hardware: {
    cpu: any;
  };
  display: {
    screenResolution: string;
  };
  camera: {
    primary: string;
    zoom: string;
  };
  connectivity: {
    cell: string;
  };
}

interface SortType {
  type: string,
  sortBy: string,
  reverse: number
}
