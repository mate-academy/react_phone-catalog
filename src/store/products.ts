import { AnyAction } from 'redux';

const SET_PRODUCTS = 'SET_PRODUCTS';
// const SET_PHONES = 'SET_PHONES';
// const SET_TABLETS = 'SET_TABLETS';

export const setProducts = (products: Products[]) => ({ type: SET_PRODUCTS, products });
// export const setPhones = (productType: Products[]) => ({ type: SET_PHONES, productType });

type ProductsState = {
  products: Products[];
  // phones: Products[];
};

const defaultProducts: ProductsState = {
  products: [],
  // phones: [],
};

const reducer = (products = defaultProducts, action: AnyAction) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    // case SET_PHONES:
    //   return action.phones;
    // case SET_TABLETS:
    //   return action.products.filter((product: Products) => product.type === 'tablet');
    default:
      return products;
  }
};

export default reducer;
