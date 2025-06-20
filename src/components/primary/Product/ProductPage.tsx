import { ProductTop } from '../../secondary/ProductComponents/ProductTop/ProductTop';
import { ProductDetails } from '../../secondary/ProductComponents/ProductDetails';
import { ProductBottom } from '../../secondary/ProductComponents/ProducBottom';
import { AboutUs } from '../../secondary/ProductComponents/AboutUs/AboutUs';
import { useContext, useEffect, useState } from 'react';
import { Product } from '../../../types/Product';
import { useParams } from 'react-router-dom';
import { phonesContext } from '../HomePage';

export const ProductPage = () => {
  const { productId } = useParams();
  const phones = useContext(phonesContext);
  const [phone, setPhone] = useState<Product | null>(null);

  useEffect(() => {
    const foundPhone: Product | undefined = phones?.find(
      phone => phone.name === productId,
    );

    if (foundPhone) {
      setPhone(foundPhone);
    }
  }, [productId, phones]);

  return (
    <div className="product">
      <ProductTop phone={phone} />

      <ProductDetails phone={phone} />

      <AboutUs phone={phone} />

      <ProductBottom />
    </div>
  );
};
