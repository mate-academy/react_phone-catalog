import { useParams } from 'react-router-dom';
import ProductMain from '../../components/ProductMain/ProductMain';
import './ProductPage.scss';
import { useEffect, useState } from 'react';
import { Accessory } from '../../types/Accessory';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { getAccessories, getPhones, getProduct, getTablets } from '../../api';

export type ProductDetails = Phone | Tablet | Accessory;
const ProductPage = () => {
  const { category, id } = useParams();
  const [someProduct, setSomeProduct] = useState<ProductDetails | null>(null);
  const [modelProducts, setModelProducts] = useState<ProductDetails[]>([]);

  useEffect(() => {
    if (!category || !id) {
      return;
    }

    const loadProduct = async () => {
      const product = await getProduct(
        category as 'phones' | 'tablets' | 'accessories',
        id,
      );

      setSomeProduct(product || null);
    };

    loadProduct();
  }, [category, id]);

  useEffect(() => {
    if (!someProduct || !category) {
      return;
    }

    const loadModelProducts = async () => {
      let allProducts: ProductDetails[] = [];

      switch (category) {
        case 'phones':
          allProducts = await getPhones();
          break;
        case 'tablets':
          allProducts = await getTablets();
          break;
        case 'accessories':
          allProducts = await getAccessories();
          break;
      }

      const product = allProducts.find(p => p.id === someProduct.id);

      if (!product) {
        setSomeProduct(null);

        return;
      }

      setSomeProduct(product);

      const sameModel = allProducts.filter(
        p => p.namespaceId === product.namespaceId,
      );

      setModelProducts(sameModel);
    };

    loadModelProducts();
  }, [someProduct, category]);

  return (
    <div className="product-page">
      {someProduct === null ? (
        <p>Loading...</p>
      ) : (
        <ProductMain models={modelProducts} someProduct={someProduct} />
      )}
    </div>
  );
};

export default ProductPage;
