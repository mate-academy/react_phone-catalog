import { api } from "@/api/api";
import { ReactNode, useCallback, useRef, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import { Product } from "@/shared/type";

export function ProductsProvider({ children }: {children: ReactNode}) {
 const [products, setProducts] = useState<Product[] | null>(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const requestRef = useRef<Promise<Product[]> | null>(null);

 const loadProducts = useCallback(async () => {
   if (products) {
     return products;
   }

   if (requestRef.current) {
     return requestRef.current;
   }

   setLoading(true);
   setError(null);

   requestRef.current = api
     .getProducts()
     .then((data) => {
       setProducts(data);
       return data;
     })
     .catch((error) => {
       setError('Failed to load products');
       requestRef.current = null;
       throw error;
     })
     .finally(() => {
       setLoading(false);
     });

   return requestRef.current;
 }, [products]);

 return (
   
   <ProductsContext.Provider
     value={{
       products: products,
       loading,
       error,
       loadProducts: loadProducts,
     }}
   >
     {children}
   </ProductsContext.Provider>
 );
}
