import { StoredProduct } from '@shared/types/Product/Product.interfaces';

export interface UpdateProductsProps {
  products: StoredProduct[];
  productId: string;
  action?: 'add' | 'remove' | 'toggle' | 'addValue';
  value?: number;
}

export type DoneAction = 'added' | 'removed';

export const updateProducts = ({
  productId,
  products,
  action = 'add',
  value = 0,
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

    case 'addValue': {
      newProducts = products
        .map(product => {
          if (product.productId === productId) {
            if (!value) {
              return;
            }

            return { ...product, quantity: value };
          }

          return product;
        })
        .filter(product => !!product);

      break;
    }

    case 'remove': {
      newProducts = products.filter(product => productId !== product.productId);
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
