import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';

type BreadcrumbItem = {
  name: string;
  isProduct?: boolean;
};

type BreadcrumbsContextType = {
  breadcrumbs: BreadcrumbItem[];
  setProductName: (productName: string | null) => void;
  setIsProductLoading: (isLoading: boolean) => void;
};

type Props = {
  children: React.ReactNode;
};

const BreadcrumbsContext = createContext<BreadcrumbsContextType | undefined>(
  undefined,
);

type ProductStatus = {
  isLoading: boolean;
  productName: string | null;
};

export const BreadcrumbsProvider: React.FC<Props> = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const location = useLocation();
  const { itemId } = useParams();
  const [productStatus, setProductStatus] = useState<ProductStatus>({
    isLoading: false,
    productName: null,
  });

  useEffect(() => {
    if (itemId && (productStatus.isLoading || !productStatus.productName)) {
      setBreadcrumbs([]);

      return;
    }

    const segments = location.pathname.split('/').filter(Boolean);

    const transformedSegments = segments
      .map(segment =>
        segment === itemId
          ? { name: productStatus.productName, isProduct: true }
          : { name: segment },
      )
      .filter((segment): segment is BreadcrumbItem => segment.name !== null);

    setBreadcrumbs(transformedSegments);
  }, [itemId, productStatus, location.pathname]);

  const setIsProductLoading = useCallback(
    (isLoading: boolean) =>
      setProductStatus(prevState => ({
        ...prevState,
        isLoading,
      })),
    [],
  );

  const setProductName = useCallback(
    (productName: string | null) =>
      setProductStatus(prevState => ({
        ...prevState,
        productName,
      })),
    [],
  );

  return (
    <BreadcrumbsContext.Provider
      value={{
        breadcrumbs,
        setProductName,
        setIsProductLoading,
      }}
    >
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbsContext);

  if (!context) {
    throw new Error('useBreadcrumbs must be used within a BreadcrumbsProvider');
  }

  return context;
};
