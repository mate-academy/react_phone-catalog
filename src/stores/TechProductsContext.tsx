import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TechProduct } from '../types/TechProduct';
import { getTechProducts } from '../api/api';
import { CartType } from '../types/CartInterface';
import { FavouriteType } from '../types/FavouriteInterface';
import { useLocaleStorage } from '../hooks/useLocaleStorage';
import { getSearchWith } from '../helpers/searchHelpers';
import { ProductCategory } from '../enums/EnumProductCategory';

type Context = {
  techProducts: TechProduct[],
  hotPriceProducts: TechProduct[],
  brandNewProducts: TechProduct[],
  productsAlsoLike: TechProduct[],
  phones: TechProduct[],
  tablets: TechProduct[],
  accessories: TechProduct[],
  loading: boolean,
  errorMessage: string,
  notProductsMessage: string,
  getHotPriceProducts: () => Promise<void>,
  getBrandNewProducts: () => Promise<void>,
  getSuggestedProducts: (
    productName: string,
    namespaceId: string,
    category: string,
  ) => Promise<void>,
  getPhones: () => Promise<void>,
  getTablets: () => Promise<void>,
  getAccessories: () => Promise<void>,
  loadTechProducts: () => {},
  cart: CartType[],
  setCart: (item: CartType[]) => void,
  addInCart: (item: CartType) => void,
  updateCountInCart: (item: CartType) => void,
  deleteFromCart: (itemId: string) => void,
  favouritesProducts: FavouriteType[],
  setFavouritesProducts: (item: FavouriteType[]) => void,
  likeFunc: (item: FavouriteType) => void,
  dislikeFunc: (itemId: string) => void,
  query: string,
  sort: string,
  perPage: string,
  page: string,
  // eslint-disable-next-line
  setSearchWith: (params: any) => void,
};

export const TechProductsContext = React.createContext<Context>({
  techProducts: [],
  hotPriceProducts: [],
  brandNewProducts: [],
  productsAlsoLike: [],
  phones: [],
  tablets: [],
  accessories: [],
  loading: false,
  errorMessage: '',
  notProductsMessage: '',
  getHotPriceProducts: async () => {},
  getBrandNewProducts: async () => {},
  getSuggestedProducts: async () => {},
  getPhones: async () => {},
  getTablets: async () => {},
  getAccessories: async () => {},
  loadTechProducts: async () => {},
  cart: [],
  setCart: () => {},
  addInCart: () => {},
  updateCountInCart: () => {},
  deleteFromCart: () => {},
  favouritesProducts: [],
  setFavouritesProducts: () => {},
  likeFunc: () => {},
  dislikeFunc: () => {},
  query: '',
  sort: '',
  perPage: '',
  page: '',
  setSearchWith: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TechProductsProvider: React.FC<Props> = ({ children }) => {
  const [techProducts, setTechProducts] = useState<TechProduct[]>([]);

  const [hotPriceProducts, setHotPriceProducts] = useState<TechProduct[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<TechProduct[]>([]);
  const [productsAlsoLike, setProductsAlsoLike] = useState<TechProduct[]>([]);
  const [phones, setPhones] = useState<TechProduct[]>([]);
  const [tablets, setTablets] = useState<TechProduct[]>([]);
  const [accessories, setAccessories] = useState<TechProduct[]>([]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [notProductsMessage, setNotProductsMessage] = useState('');
  const [cart, setCart] = useLocaleStorage<CartType[]>('cart', []);
  const [
    favouritesProducts,
    setFavouritesProducts,
  ] = useLocaleStorage<FavouriteType[]>('favouritesProducts', []);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '8';
  const page = searchParams.get('page') || '1';

  const getHotPriceProducts = () => {
    setErrorMessage('');

    setLoading(true);

    return getTechProducts()
      .then((products) => {
        const hotPricesProducts = products
          .sort(
            (price1, price2) => (price2.fullPrice - price2.price)
            - (price1.fullPrice - price1.price),
          ).slice(0, 8);

        if (hotPricesProducts.length === 0) {
          setNotProductsMessage('No products');
        }

        setHotPriceProducts(hotPricesProducts);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  };

  const getBrandNewProducts = () => {
    setErrorMessage('');

    setLoading(true);

    return getTechProducts()
      .then((products) => {
        const lastProductYear = products
          .sort((product1, product2) => product2.year - product1.year)
          .map((phone) => phone.year)[0];

        const newBrandsProducts = products
          .filter((product) => product.year === lastProductYear).slice(0, 8);

        if (newBrandsProducts.length === 0) {
          setNotProductsMessage('No products');
        }

        setBrandNewProducts(newBrandsProducts);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  };

  const getPhones = () => {
    setErrorMessage('');
    setNotProductsMessage('');
    setLoading(true);

    return getTechProducts()
      .then((products) => {
        const phonesList = products.filter((product) => {
          return product.category === ProductCategory.phones;
        });

        if (phonesList.length === 0) {
          setNotProductsMessage('Phones not found');
        } else {
          setPhones(phonesList);
        }
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  };

  const getTablets = () => {
    setErrorMessage('');
    setNotProductsMessage('');
    setLoading(true);

    return getTechProducts()
      .then((products) => {
        const tabletsList = products.filter((product) => {
          return product.category === ProductCategory.tablets;
        });

        if (tabletsList.length === 0) {
          setNotProductsMessage('Tablets not found');
        } else {
          setTablets(tabletsList);
        }
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  };

  const getAccessories = () => {
    setErrorMessage('');
    setNotProductsMessage('');
    setLoading(true);

    return getTechProducts()
      .then((products) => {
        const accessoriesList = products.filter((product) => {
          return product.category === ProductCategory.accessories;
        });

        if (accessoriesList.length === 0) {
          setNotProductsMessage('Accessories not found');
        }

        setAccessories(accessoriesList);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  };

  const getSuggestedProducts = (
    productName: string,
    namespaceId: string,
    category: string,
  ) => {
    setErrorMessage('');

    setLoading(true);

    return getTechProducts()
      .then((products) => {
        const phonesListYouMayLike = products.filter((Product) => {
          return Product.category === category
            && Product.itemId
              .includes(namespaceId.split('-').slice(0, 3).join('-'))
            && Product.name !== productName;
        }).slice(0, 8);

        if (phonesListYouMayLike.length === 0) {
          setNotProductsMessage('No products');
        }

        setProductsAlsoLike(phonesListYouMayLike);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  };

  const loadTechProducts = () => {
    setErrorMessage('');

    setLoading(true);

    return getTechProducts()
      .then(setTechProducts)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  };

  const addInCart = (item: CartType) => {
    setCart([...cart, item]);
  };

  const updateCountInCart = (Item: CartType) => {
    setCart(
      cart.map(
        // eslint-disable-next-line
        item => (item.itemId === Item.itemId)
          ? Item
          : item,
      ),
    );
  };

  const deleteFromCart = (id: string) => {
    setCart([...(cart.filter((item) => item.itemId !== id))]);
  };

  const likeFunc = (item: FavouriteType) => {
    setFavouritesProducts([...favouritesProducts, item]);
  };

  const dislikeFunc = (id: string) => {
    setFavouritesProducts([
      ...(favouritesProducts.filter((item) => item.itemId !== id)),
    ]);
  };

  // eslint-disable-next-line
  function setSearchWith(params: any) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const value = {
    techProducts,
    hotPriceProducts,
    brandNewProducts,
    productsAlsoLike,
    phones,
    tablets,
    accessories,
    loading,
    errorMessage,
    notProductsMessage,
    getHotPriceProducts,
    getBrandNewProducts,
    getSuggestedProducts,
    getPhones,
    getTablets,
    getAccessories,
    loadTechProducts,
    cart,
    setCart,
    addInCart,
    updateCountInCart,
    deleteFromCart,
    favouritesProducts,
    setFavouritesProducts,
    likeFunc,
    dislikeFunc,
    query,
    sort,
    perPage,
    page,
    setSearchWith,
  };

  return (
    <TechProductsContext.Provider value={value}>
      {children}
    </TechProductsContext.Provider>
  );
};
