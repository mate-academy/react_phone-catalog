/* eslint-disable @typescript-eslint/indent */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  capacity: string;
  fullPrice: number;
  price: number;
  color: string;
  image: string;
  screen: string;
  ram: string;
  year: number;
  favourit?: boolean;
  details?: ProductsDetails;
  colorHex?: string;
}

export interface ProductsDetails {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  sameModels?: ProductsDetails[];
}

export const colorStyle: Record<string, string> = {
  silver: '#C0C0C0',
  'rose gold': '#FCDBC1',
  green: '#5F7170',
  'sky blue': '#87CEEB',
  'space gray': '#4C4C4C',
  spacegray: '#4C4C4C',
  spaceblack: '#1C1C1E',
  yellow: '#FFE135',
  'space-black': '#1C1C1E',
  gold: '#FFD700',
  black: '#0F1121',
  white: '#F0F0F0',
  purple: '#905BFF',
  red: '#EB5757',
  midnight: '#1E2732',
  blue: '#1F3A93',
  starlight: '#F6F2EA',
  pink: '#FFC0CB',
  sierrablue: '#A3C6E0',
  midnightgreen: '#004953',
  coral: '#FF7F50',
  graphite: '#383838',
};

type TabsContextType = {
  productsList: Product[];
  phonesList: ProductsDetails[];
  tabletsList: ProductsDetails[];
  accessoriesList: ProductsDetails[];
  loading: boolean;
  error: boolean;
  reloadData: () => void;
};

export const TabsContext = createContext<TabsContextType>({
  productsList: [],
  phonesList: [],
  tabletsList: [],
  accessoriesList: [],
  loading: true,
  error: false,
  reloadData: () => {},
});

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(false);

    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const responses = await Promise.all([
        fetch('./api/products.json'),
        fetch('./api/phones.json'),
        fetch('./api/tablets.json'),
        fetch('./api/accessories.json'),
      ]);

      const [products, phones, tablets, accessories] = await Promise.all(
        responses.map(r => r.json()),
      );

      const merged = products.map((product: Product) => {
        const details =
          phones.find((p: ProductsDetails) => p.id === product.itemId) ||
          tablets.find((p: ProductsDetails) => p.id === product.itemId) ||
          accessories.find((p: ProductsDetails) => p.id === product.itemId);

        if (!details) {
          return {
            ...product,
            colorHex: colorStyle[product.color] ?? '#000000',
          };
        }

        const { namespaceId } = details;

        const sameModels =
          product.category === 'phones'
            ? phones.filter(
                (p: ProductsDetails) => p.namespaceId === namespaceId,
              )
            : product.category === 'tablets'
              ? tablets.filter(
                  (p: ProductsDetails) => p.namespaceId === namespaceId,
                )
              : accessories.filter(
                  (p: ProductsDetails) => p.namespaceId === namespaceId,
                );

        const detailsWithColorsHex = {
          ...details,
          colorsAvailable: details.colorsAvailable?.map(
            (c: string) => colorStyle[c],
          ),
          sameModels,
        };

        return {
          ...product,
          details: detailsWithColorsHex,
          colorHex: colorStyle[product.color] ?? '#000000',
        };
      });

      setProductsList(merged);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const reloadData = () => {
    loadData();
  };

  return (
    <TabsContext.Provider value={{ productsList, loading, error, reloadData }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => useContext(TabsContext);
