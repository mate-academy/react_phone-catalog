// import { useEffect, useState } from 'react';
// import { Products } from '../types/Products';

// export const useProducts = (errorCallback: () => void) => {
//   const [products, setProducts] = useState<Products[]>([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const categories = ['phones', 'tablets', 'accessories'];
//         const promises = categories.map(async category => {
//           const response = await fetch(
//             `/react_phone-catalog/api/${category}.json`,
//           );

//           return response.json();
//         });

//         const data = await Promise.all(promises);

//         await new Promise(resolve => setTimeout(resolve, 300));

//         setProducts(data.flat());
//       } catch {
//         errorCallback();
//       }
//     };

//     fetchProducts();
//   }, []);

//   return { products };
// };
