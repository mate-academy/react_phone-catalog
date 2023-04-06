// import { values } from "cypress/types/lodash";
import { useState, useEffect } from 'react';
import { Product } from '../Types/Product';
// import { ProductDetails } from '../Types/ProductDeteils';

export const useLocaleStorage = (key: string, initialValue: any):
[Product[], ((value: Product) => void)] => {
  /* eslint-disable @typescript-eslint/no-unused-expressions */

  // debugger
  // const [items, setItem] = useState<Product[]>([] || initialValue);

  // // useEffect(() => {
  // //   setItem(JSON.parse(localStorage.getItem(key) as string) || initialValue)
  // //   console.log(localStorage.getItem(key))
  // // }, [])

  // useEffect(() => {
  //   localStorage.setItem(key, JSON.stringify(items))
  // },[items])

  //   // if (!localStorage.getItem(key)) {
  //   //   localStorage.setItem(key, JSON.stringify([]));
  //   // }

  //   console.log(items)

  // const save = (value: Product) => {
  //   // items.some((p) => p.id === value.id)
  //   //   ? setItem((prev: Product[]) => [...prev.filter((p) => p.id !== value.id)])
  //     setItem((prev: Product[]) => [...prev, value]);

  //   // localStorage.setItem(key, JSON.stringify(items))
  // }

  /// /

  const [items, setItem] = useState(() => {
    if (localStorage.getItem(key) !== null) {
      return (JSON.parse(localStorage.getItem(key) || '[]'));
    }

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [items, key]);

  const save = (value: Product) => {
    items.some((p: Product) => p.id === value.id)
      ? setItem((prev: Product[]) => [...prev.filter((p) => p.id !== value.id)])
      : setItem((prev: Product[]) => [...prev, value]);

    // localStorage.setItem(key, JSON.stringify(items))
  };

  return [items, save];
};
