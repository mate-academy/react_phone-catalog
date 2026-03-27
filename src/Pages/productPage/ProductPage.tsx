import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductMain from '../../components/ProductMain/ProductMain';
import './ProductPage.scss';
import { useEffect, useState } from 'react';
import { Accessory } from '../../types/Accessory';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { getProduct } from '../../api';

export type ProductDetails = Phone | Tablet | Accessory;
const ProductPage = () => {
  const { category, id } = useParams();
  const [someProduct, setSomeProduct] = useState<ProductDetails | null>(null);

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

  return (
    <div className="product-page">
      <Header />

      {someProduct === null ? (
        <p>Loading...</p>
      ) : (
        <ProductMain someProduct={someProduct} />
      )}
      <Footer />
    </div>
  );
};

export default ProductPage;
