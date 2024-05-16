import { useEffect, useState } from 'react';
import './ProductDetailsPage.scss';
import { getAllProducts } from '../../helpers/getAllProducts';
import { DetailedProduct } from '../../types/DetailedProduct';
import { Product } from '../../types/ProductCard';
import { ProductCategories } from '../../types/ProductCategories';
import { GetDetailedProducts } from '../../helpers/GetDetailedProducts';

export const ProductDetailsPage: React.FC = () => {
  const [foundProduct, setFoundProduct] = useState<Product | undefined>(
    undefined,
  );
  const [displayedProduct, setDisplayedProduct] =
    useState<DetailedProduct | null>(null);

  const PRODUCT_ID_FROM_URL = 'apple-iphone-7-32gb-black';

  useEffect(() => {
    getAllProducts().then((products: Product[]) =>
      setFoundProduct(
        products.find(
          (product: Product) => product.itemId === PRODUCT_ID_FROM_URL,
        ),
      ),
    );
  }, []);

  // Get product from the Api
  useEffect(() => {
    // Find the product in a certain category
    if (foundProduct) {
      GetDetailedProducts(foundProduct.category as ProductCategories).then(
        (productsFromApi: DetailedProduct[]) => {
          setDisplayedProduct(
            productsFromApi.find(
              (detailedProduct: DetailedProduct) =>
                detailedProduct.id === PRODUCT_ID_FROM_URL,
            ) ?? null,
          );
        },
      );
    }
  }, [foundProduct]);

  return (
    <>
      {displayedProduct && (
        <main className="product-details">
          ProductDetailsPage
          <section>
            <p>Top</p>
          </section>
          <section>
            product name: {displayedProduct.name}
            product priceRegular: {displayedProduct.priceRegular}
          </section>
        </main>
      )}
    </>
  );
};
