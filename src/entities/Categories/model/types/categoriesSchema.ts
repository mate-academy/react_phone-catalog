export interface ICountProducts {
  phones: number;
  tablets: number;
  accessories: number;
}

export interface CategoriesSchema {
  countProducts: ICountProducts;
  countProductsLoading: boolean;
}
