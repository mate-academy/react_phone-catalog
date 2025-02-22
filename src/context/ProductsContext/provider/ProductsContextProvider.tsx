/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ProductsContext } from '../ProductsContext';
import { ProductsContextType } from '../types/ProductsContextType';
import { CurrentProduct } from '../types/CurrentProduct';
import { MainContext } from '../../MainContext';
import { Product } from '../../../types/CategoriesTypes/Product';
import { NavLinks } from '../../../enums/NavLinks';
import { Gadget } from '../../../types/CategoriesTypes/Gadget';
import { CustomLocation } from '../../../types/CustomLocation';
// eslint-disable-next-line max-len
import { Categories } from '../../../modules/HomePage/components/Models/components/Main/components/Model/components/FirstPart/types/Categories';
import { SearchContext } from '../../SearchContext';
import { useLocation } from 'react-router-dom';
import { ProductsCache } from '../../../types/CategoriesTypes/ProductsCache';

interface Props {
  children: React.ReactNode;
}

export const ProductsContextProvider: React.FC<Props> = ({ children }) => {
  // #region context

  const { isDesktop, isTablet, setIsLoading } = useContext(MainContext);
  const { searchParams } = useContext(SearchContext);

  // #endregion
  // #region states

  const [currentProduct, setCurrentProduct] = useState<CurrentProduct | null>(
    null,
  );

  const [comebackLocations, setComebackLocations] = useState<CustomLocation[]>(
    [],
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [suggestedProductsCache, setSuggestedProductsCache] =
    useState<ProductsCache>({});
  const [phones, setPhones] = useState<Gadget[]>([]);
  const [tablets, setTablets] = useState<Gadget[]>([]);
  const [accessories, setAccessories] = useState<Gadget[]>([]);

  const [currentImage, setCurrentImage] = useState('');

  // #endregion
  // #region functions

  const getCardWidth = () => {
    const MOBILE_W = '212px';
    const TABLET_W = '237px';
    const DESKTOP_W = '248px';

    if (isDesktop) {
      return DESKTOP_W;
    }

    if (isTablet) {
      return TABLET_W;
    }

    return MOBILE_W;
  };

  const getTitle = useCallback((name: string, toIndex: number) => {
    const splitedName = name.split(' ');
    const modName = splitedName.slice(0, toIndex);

    if (splitedName.length > modName.length) {
      return modName.join(' ') + '...';
    }

    return name;
  }, []);

  const getSuggestedProducts = () => {
    const category = currentProduct?.category;
    const namespaceId = currentProduct?.namespaceId;

    if (namespaceId && suggestedProductsCache[namespaceId]) {
      return;
    }

    fetch('/public/api/products.json')
      .then(response => response.json())
      .then(response =>
        response.filter((product: Product) => {
          if (
            namespaceId &&
            product.category === category &&
            !product.itemId.startsWith(namespaceId)
          ) {
            return true;
          }

          return false;
        }),
      )
      .then(response => {
        const result = [...response];

        for (let i = result.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));

          [result[i], result[j]] = [result[j], result[i]];
        }

        return result;
      })
      .then(response => {
        const PRODUCTS = response.slice(0, 10);

        if (namespaceId) {
          setSuggestedProductsCache(keys => ({
            ...keys,
            [namespaceId]: PRODUCTS,
          }));
        }

        setSuggestedProducts(PRODUCTS);
      })
      .catch(() => {
        throw new Error("Please check the file's path");
      });
  };

  // #endregion
  // #region variables

  const { pathname } = useLocation();
  const pathArrLength = pathname.split('/').length;

  const IMAGE_PARAM = 'image';
  const searchImageParam = searchParams.get(IMAGE_PARAM);

  const categories: Categories = {
    phones,
    tablets,
    accessories,
  };

  // #endregion
  // #region useEffects

  useEffect(() => {
    const functions = [setProducts, setPhones, setTablets, setAccessories];
    const strings = ['products', ...Object.values(NavLinks).slice(1)];

    function fetchAll() {
      functions.forEach(async (setState, index) => {
        fetch(`/public/api/${strings[index]}.json`)
          .then(response => response.json())
          .then(response => setState(response))
          .catch(() => {
            throw new Error("Please check the file's path");
          });
      });
    }

    function toogleLoading() {
      setTimeout(() => setIsLoading(false), 1000);
    }

    fetchAll();
    toogleLoading();
  }, []);

  useEffect(() => {
    if (pathArrLength > 2 && currentProduct) {
      getSuggestedProducts();
    }
  }, [pathArrLength, currentProduct?.namespaceId]);

  useEffect(() => {
    if (!currentProduct) {
      if (comebackLocations.length > 0) {
        setComebackLocations([]);
      }

      if (Object.values(suggestedProductsCache).length > 0) {
        setSuggestedProductsCache({});
      }
    }
  }, [currentProduct]);

  // #endregion
  // #region value

  const productsContextValue: ProductsContextType = useMemo(
    () => ({
      products,
      phones,
      tablets,
      accessories,
      suggestedProducts,
      suggestedProductsCache,
      categories,
      currentProduct,
      comebackLocations,
      IMAGE_PARAM,
      searchImageParam,
      currentImage,
      getSuggestedProducts,
      setCurrentImage,
      setComebackLocations,
      setCurrentProduct,
      getCardWidth,
      getTitle,
    }),
    [
      products,
      phones,
      tablets,
      accessories,
      currentProduct,
      comebackLocations,
      searchImageParam,
      currentImage,
      suggestedProducts,
      suggestedProductsCache,
    ],
  );

  // #endregion

  return (
    <ProductsContext.Provider value={productsContextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
