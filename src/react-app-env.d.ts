// / <reference types="react-scripts" />

type Link = {
  name: string;
  url: string;
  exact?: boolean;
};

interface PhoneCatalog {
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

interface PhoneDetail {
  [key: string]: string;
  [key: string]: {
    [key: string]: string;
  };
  [key: string]: string[];
  [key: string]: {
    [key: string]: string | boolean;
  };
  [key: string]: {
    [key: string]: string[] | string;
  };
}
