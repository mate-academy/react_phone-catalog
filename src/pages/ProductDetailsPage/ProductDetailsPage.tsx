import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { ProductDescription } from '../../components/ProductDescription/ProductDescription';
import { getProducts, getPhones, getTablets, getAccessories } from '../../utils/getData';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { RecommendedItems } from '../../components/RecommendedItems/RecommendedItems';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getProducts(),
      getPhones(),
      getTablets(),
      getAccessories(),
    ]).then(([products, phones, tablets, accessories]) => {
      // Спочатку шукаємо в phones, tablets, accessories (які мають повну інформацію)
      const detailedProducts = [
        ...phones,
        ...tablets,
        ...accessories,
      ];
      
      let foundProduct: any = detailedProducts.find(
        (p: any) => p.id === productId
      );
      
      // Якщо не знайшли в детальних товарах, шукаємо в загальних products
      if (!foundProduct) {
        foundProduct = products.find(
          (p: any) => p.itemId === productId
        );
      }
      
      setSelectedProduct(foundProduct);
      // Зберігаємо всі товари для рекомендацій
      setRecommendedProducts([...products, ...phones, ...tablets, ...accessories]);
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

  // Формуємо items для Breadcrumbs
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
      <ProductDescription selectedProduct={selectedProduct} productId={productId} />
      <RecommendedItems recommendedItems={
        getSuggestedProducts(filteredRecommended, selectedProduct.id)
      } />
    </div>
  );
}; 