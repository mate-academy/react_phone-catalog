// import React, { useContext, useState } from 'react';
// import { Product } from '../types/Product';
// import { Context } from './Context';

// export const ProductContext = React.createContext<Context>({
//   product: [],
//   loading: false,
//   loadingError: false,
// });

// type Props = {
//   children: React.ReactNode;
// };

// export const ProductsProvider: React.FC<Props> = ({ children }) => {

//   return (
//     <ProductContext.Provider value={value}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export function useProduct() {
//   const product = useContext(ProductContext);

//   return product;
// }
