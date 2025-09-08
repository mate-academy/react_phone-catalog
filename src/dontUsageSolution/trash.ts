  // const filteredProduct = useMemo(
  //   () => products.filter((item) => item.category === categoryName),
  //   [products, categoryName]
  // );

  // const sortedProducts = useMemo(() => {
  //   return [...filteredProduct].sort((prod1, prod2) => {
  //     switch (sort) {
  //       case "age":
  //         return prod2.year - prod1.year;
  //       case "title":
  //         return prod1.name.localeCompare(prod2.name);
  //       case "price":
  //         return prod1.price - prod2.price;
  //       default:
  //         return 0;
  //     }
  //   });
  // }, [filteredProduct, sort]);

  // const endItemsOffset = currentPage * itemsPerPage;
  // const startItemsOffset = endItemsOffset - itemsPerPage;
  // const paginatedProducts = useMemo(
  //   () => sortedProducts.slice(startItemsOffset, endItemsOffset),
  //   [sortedProducts, startItemsOffset, endItemsOffset]
  // );

    // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, [currentPage]);



// productSelector 
// export const selectBrandNew = createSelector([selectProducts], (products) =>
//   products.filter((p) => p.year >= 2022)
// );

import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectProducts = (state: RootState) => state.product.items;

export const selectVisibleProducts = createSelector(
  [
    selectProducts,
    (_: RootState, categoryName: string | undefined) => categoryName,
    (_: RootState, __: string | undefined, sort: string) => sort,
    (_: RootState, __: string | undefined, ___: string, page: number) => page,
    (
      _: RootState,
      __: string | undefined,
      ___: string,
      ____: number,
      perPage: number
    ) => perPage,
  ],
  (products, categoryName, sort, page, perPage) => {
    // 1. фильтрация
    let filtered = categoryName
      ? products.filter((p) => p.category === categoryName)
      : [];

    // 2. сортировка
    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case "age":
          return b.year - a.year;
        case "title":
          return a.name.localeCompare(b.name);
        case "price":
          return a.price - b.price;
        default:
          return 0;
      }
    });

    // 3. пагинация
    const start = (page - 1) * perPage;
    return sorted.slice(start, start + perPage);
  }
);

//use
const products = useSelector((state: RootState) =>
  selectVisibleProducts(state, categoryName, sort, page, perPage)
);


//for products cart title 
{/*.length > 30 ? product.name.slice(0, 28) + '...' : product.name*/}

//List
//renderItem: (product: T) => React.ReactNode; { products, renderItem } {products.map(renderItem)}
// renderItem={p => <ProductCard key={p.id} product={p} />}  renderItem={p => <ProductCard key={p.id} product={p} />}