/* eslint-disable @typescript-eslint/indent */
import { createContext, useContext } from 'react';
import cardData from './api/phones.json';
import tabletsData from './api/tablets.json';
import accessoriesData from './api/accessories.json';
import productData from './api/products.json';
import { useLocalStorage } from './localStorage';
import { Access, Phone, Product } from './modules/pages/types/types';

export type BucketItem = {
  count: number;
  item: Phone | Access;
};

export const PhoneContext = createContext(cardData);
export const TabletsContext = createContext(tabletsData);
export const AccessoriesContext = createContext(accessoriesData);
export const ProductsContext = createContext<{
  productData: Product[];
  bucketItems: BucketItem[];
  favItems: (Phone | Access)[];
  handleFavItems: (value: Phone | Access) => void;
  addToBucket: (value: BucketItem) => void;
  addCountOfProduct: (value: BucketItem) => void;
  minusCountOfProduct: (value: BucketItem) => void;
  deleteBucketItem: (value: BucketItem) => void;
  clearTheBucket: () => void;
}>({
  productData,
  bucketItems: [],
  favItems: [],
  handleFavItems: () => {},
  addToBucket: () => {},
  addCountOfProduct: () => {},
  minusCountOfProduct: () => {},
  deleteBucketItem: () => {},
  clearTheBucket: () => {},
});

export const useProductsContext = () => useContext(ProductsContext);

type Props = {
  children: React.ReactNode;
};

export const PageProvider: React.FC<Props> = ({ children }) => {
  const [bucketItems, setBucketItems] = useLocalStorage<BucketItem[]>(
    'bucket',
    [],
  );

  const [favItems, setFavItems] = useLocalStorage<(Phone | Access)[]>(
    'Fav',
    [],
  );

  const addToBucket = (product: BucketItem) => {
    if (
      !bucketItems.find(bucketItem => bucketItem.item.id === product.item.id)
    ) {
      setBucketItems([...bucketItems, { item: product.item, count: 1 }]);
    }
  };

  const handleFavItems = (product: Phone | Access) => {
    if (favItems.find(favItem => favItem.id === product.id)) {
      setFavItems(favItems.filter(favItem => favItem.id !== product.id));
    } else if (!favItems.find(favItem => favItem.id === product.id)) {
      setFavItems([...favItems, product]);
    }
  };

  const addCountOfProduct = (product: BucketItem) => {
    setBucketItems(
      bucketItems.map(item => {
        if (item.item.id === product.item.id) {
          return { ...item, count: item.count + 1 };
        }

        return item;
      }),
    );
  };

  const deleteBucketItem = (product: BucketItem) => {
    setBucketItems(
      bucketItems.filter(item => item.item.id !== product.item.id),
    );
  };

  const minusCountOfProduct = (product: BucketItem) => {
    setBucketItems(
      bucketItems.map(item => {
        if (item.item.id === product.item.id && product.count > 1) {
          return { ...item, count: item.count - 1 };
        }

        return item;
      }),
    );
  };

  const clearTheBucket = () => {
    setBucketItems([]);
  };

  const phones = cardData;
  const tablets = tabletsData;
  const accessories = accessoriesData;
  const products = {
    productData,
    bucketItems,
    favItems,
    handleFavItems,
    addToBucket,
    addCountOfProduct,
    minusCountOfProduct,
    deleteBucketItem,
    clearTheBucket,
  };

  return (
    <ProductsContext.Provider value={products}>
      <AccessoriesContext.Provider value={accessories}>
        <TabletsContext.Provider value={tablets}>
          <PhoneContext.Provider value={phones}>
            {children}
          </PhoneContext.Provider>
        </TabletsContext.Provider>
      </AccessoriesContext.Provider>
    </ProductsContext.Provider>
  );
};
