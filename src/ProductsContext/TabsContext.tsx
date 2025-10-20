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
  details?: ProductDetails;
  colorHex?: string;
}

export interface ProductDetails {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  images: string[];
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  capacityAvailable?: string[];
  colorsAvailable?: string[];
  camera?: string;
  zoom?: string;
  cell?: string[];
}

type TabsContextType = {
  productsList: Product[];
  loading: boolean;
  error: boolean;
};

export const TabsContext = createContext<TabsContextType>({
  productsList: [],
  loading: false,
  error: false,
});

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const colorStyle: Record<string, string> = {
        silver: '#C0C0C0',
        'rose gold': '#FCDBC1',
        green: '#5F7170',
        'sky blue': '#87CEEB',
        'space gray': '#4C4C4C',
        spacegray: '#4C4C4C',
        spaceblack: '#1C1C1E',
        gold: '#FCDBC1',
        black: '#0F1121',
        yellow: '#FFD700',
        white: '#F0F0F0',
        purple: '#905BFF',
        red: '#EB5757',
        midnight: '#1E2732',
      };

      try {
        const responses = await Promise.all([
          fetch('/api/products.json'),
          fetch('/api/phones.json'),
          fetch('/api/tablets.json'),
          fetch('/api/accessories.json'),
        ]);

        const [products, phones, tablets, accessories] = await Promise.all(
          responses.map(r => r.json()),
        );

        const merged = products.map((product: Product) => {
          const details =
            phones.find((p: ProductDetails) => p.id === product.itemId) ||
            tablets.find((p: ProductDetails) => p.id === product.itemId) ||
            accessories.find((p: ProductDetails) => p.id === product.itemId);

          const detailsWithColorsHex = details
            ? {
                ...details,
                colorsAvailable: details.colorsAvailable?.map(
                  (c: string) => colorStyle[c],
                ),
              }
            : undefined;

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

    loadData();
  }, []);

  return (
    <TabsContext.Provider value={{ productsList, loading, error }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => useContext(TabsContext);
