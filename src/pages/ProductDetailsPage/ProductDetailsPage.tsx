import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { ProductDescription } from '../../components/ProductDescription';
import { RecommendedItems } from '../../components/RecommendedItems';
import {
  getProducts,
  getPhones,
  getTablets,
  getAccessories,
} from '../../utils/getData';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Product } from '../../types/Product';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';

type DetailedProduct = Phone | Tablet | Accessory;
type AnyProduct = Product | DetailedProduct;

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState<AnyProduct | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState<AnyProduct[]>(
    [],
  );

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getProducts(),
      getPhones(),
      getTablets(),
      getAccessories(),
    ]).then(([products, phones, tablets, accessories]) => {
      const detailedProducts = [...phones, ...tablets, ...accessories];

      let foundProduct: AnyProduct | undefined = detailedProducts.find(
        (p: DetailedProduct) => p.id === productId,
      );

      if (!foundProduct) {
        foundProduct = products.find((p: Product) => p.itemId === productId);
      }

      setSelectedProduct(foundProduct || null);
      setRecommendedProducts([
        ...products,
        ...phones,
        ...tablets,
        ...accessories,
      ]);
      setIsLoading(false);
    });
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!selectedProduct) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '20px' }}>Product was not found</h1>
        <img
          src="/img/product-not-found.png"
          alt="Product not found"
          style={{ maxWidth: '400px', margin: '0 auto' }}
        />
      </div>
    );
  }

  const category = selectedProduct.category || 'products';
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const items = [
    { label: 'Home', href: '/' },
    { label: categoryLabel, href: `/${category}` },
    { label: selectedProduct.name },
  ];

  const filteredRecommended = recommendedProducts.filter(p => p.image);

  return (
    <div className="page-container">
      <Breadcrumbs items={items} />
      <ProductDescription
        selectedProduct={selectedProduct as DetailedProduct}
        productId={productId}
      />
      <RecommendedItems
        recommendedItems={getSuggestedProducts(
          filteredRecommended as Product[],
          selectedProduct.id?.toString() || '',
        )}
      />
    </div>
  );
};
