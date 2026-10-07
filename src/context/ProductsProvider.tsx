import React, { ReactNode, useState } from 'react';
import { Product } from '../types/Product';
import { ProductsContext } from './ProductsContext';
import { CartItem } from '../types/CartItem';
import { useEffect } from 'react';
import { getProducts } from '../api/products';

type ProductsProviderProps = {
  children: ReactNode;
};

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}) => {
  const [cartProducts, setCartProducts] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cartProducts');

    if (!savedCart) {
      return [];
    }

    return JSON.parse(savedCart) as CartItem[];
  });

  const [favouriteProducts, setFavouriteProducts] = useState<Product[]>(() => {
    const savedFavourite = localStorage.getItem('favouriteProducts');

    if (!savedFavourite) {
      return [];
    }

    return JSON.parse(savedFavourite) as Product[];
  });

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  function addToCart(product: Product) {
    setCartProducts(currentProducts => {
      const isCart = currentProducts.some(currentProduct => {
        return currentProduct.product.id === product.id;
      });

      if (isCart) {
        return currentProducts;
      } else {
        return [
          ...currentProducts,
          {
            id: product.id,
            product,
            quantity: 1,
          },
        ];
      }
    });
  }

  function removeFromCart(productId: number) {
    setCartProducts(currentProducts => {
      return currentProducts.filter(currentProduct => {
        return currentProduct.product.id !== productId;
      });
    });
  }

  function clearCart() {
    setCartProducts([]);
  }

  function toggleFavourite(product: Product) {
    setFavouriteProducts(currentProducts => {
      const isFavourite = currentProducts.some(currentProduct => {
        return currentProduct.id === product.id;
      });

      if (isFavourite) {
        return currentProducts.filter(currentProduct => {
          return currentProduct.id !== product.id;
        });
      } else {
        return [...currentProducts, product];
      }
    });
  }

  function changeQuantity(productId: number, change: 1 | -1) {
    setCartProducts(currentProducts => {
      return currentProducts.map(currentProduct => {
        if (
          currentProduct.product.id === productId &&
          currentProduct.quantity + change >= 1
        ) {
          return {
            ...currentProduct,
            quantity: currentProduct.quantity + change,
          };
        } else {
          return currentProduct;
        }
      });
    });
  }

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(response => setProducts(response))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const newCart = JSON.stringify(cartProducts);
    const newFavourite = JSON.stringify(favouriteProducts);

    localStorage.setItem('cartProducts', newCart);

    localStorage.setItem('favouriteProducts', newFavourite);
  }, [cartProducts, favouriteProducts]);

  return (
    <ProductsContext.Provider
      value={{
        cartProducts,
        favouriteProducts,
        toggleFavourite,
        addToCart,
        removeFromCart,
        clearCart,
        changeQuantity,
        products,
        isLoading,
        hasError,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
