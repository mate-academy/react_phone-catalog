interface Product {
  [key: string]: number | string;
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

interface ProdactDetails {
  id: string;
  name?: string;
  images: Array<string>;
  description: string;
  [key?: string]: string | string[];
  hardware: {
    cpu: string;
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

interface Link {
  name: string;
  title?: string;
  url: string;
  type?: string;
  exact?: boolean;
  imgUrl?: string;
}

interface Option {
  value: string;
  title?: string;
}

interface Match {
  isExact: boolean;
  params: {
    productId: string;
  };
  path: string;
  url: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}
