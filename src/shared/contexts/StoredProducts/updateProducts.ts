import { StoredProduct } from '@shared/types/Product/Product.interfaces';

export interface UpdateProductsProps {
  products: StoredProduct[];
  productId: string;
  action?: 'add' | 'remove' | 'toggle';
}

export type DoneAction = 'added' | 'removed';

export const updateProducts = ({
  productId,
  products,
  action = 'add',
}: UpdateProductsProps) => {
  let newProducts: StoredProduct[] = [];
  let doneAction: DoneAction = 'added';

  switch (action) {
    case 'add': {
      let isExisted = false;

      newProducts = products.map(product => {
        if (product.productId === productId) {
          isExisted = true;

          return {
            productId,
            quantity: product.quantity + 1,
          };
        }

        return product;
      });

      if (!isExisted) {
        newProducts.push({ productId, quantity: 1 });
      }

      doneAction = 'added';
      break;
    }

    case 'remove': {
      newProducts = products.filter(product => productId === product.productId);
      doneAction = 'removed';

      break;
    }

    case 'toggle': {
      let isFiltered = false;

      newProducts = products.filter(product => {
        if (product.productId === productId) {
          isFiltered = true;
          doneAction = 'removed';

          return false;
        }

        return true;
      });

      if (!isFiltered) {
        newProducts.push({ productId, quantity: 1 });
        doneAction = 'added';
      }
    }
  }

  return { newProducts, doneAction };
};
