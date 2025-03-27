import React, { useEffect, useState } from 'react';
import style from './ProductDetailPage.module.scss';
import homeIcon from '../../shared/icons/home.svg';
import arrowRight from '../../shared/icons/chevron-arrow-right.svg';
import arrowLeft from '../../shared/icons/chevron-arrow-left.svg';

import productPhone from '../../../public/api/phones.json';
import productTablets from '../../../public/api/tablets.json';
import productAccessories from '../../../public/api/accessories.json';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductDetails } from '@/types/Products';
import { Slider } from './components/Swiper/Slider';
import { ProductOptions } from './components/ProductOptions/ProductOptions';
import { AboutProduct } from './components/AboutProduct/AboutProduct';
import { TechSpecs } from './components/TechSpecs/TechSpecs';
import { Loader } from '@/components/Loader/Loader';
import { ProductNotFound } from './components/ProductNotFound/ProductNotFound';

export const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const productSection = location.pathname.split('/')[1];
  const navigate = useNavigate();

  const [namespaceId, capacity, color] = (() => {
    const parts = productId.split('-');

    return [parts.slice(0, -2).join('-'), parts[parts.length - 2], parts[parts.length - 1]];
  })();

  console.log(`Capacity: ${capacity}`);
  console.log(`Namespace: ${namespaceId}`);
  console.log(`color: ${color}`);

  useEffect(() => {
    let filteredProduct: ProductDetails[] = [];

    if (productSection === 'phones') {
      filteredProduct = productPhone.filter(
        phone =>
          phone.namespaceId === namespaceId &&
          phone.capacity.toLowerCase() === capacity.toLowerCase() &&
          phone.color === color.toLowerCase(),
      );
    } else if (productSection === 'tablets') {
      filteredProduct = productTablets.filter(
        tablets =>
          tablets.namespaceId === namespaceId &&
          tablets.capacity.toLocaleLowerCase() === capacity.toLowerCase() &&
          tablets.color == color.toLowerCase(),
      );
    } else if (productSection === 'accessories') {
      filteredProduct = productAccessories.filter(
        accessories =>
          accessories.namespaceId === namespaceId &&
          accessories.capacity.toLowerCase() === capacity.toLowerCase() &&
          accessories.color === color.toLowerCase(),
      );
    }

    setProduct(filteredProduct);
  }, [productSection, productId, capacity, color, namespaceId]);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <>
      {(product.length === 0) && <ProductNotFound />}

      {loading ? (
          <Loader />
      ) : (
        <div className={style.detailPage}>
          {product.map(phone => (
            <div className={style.wrapper} key={phone.id}>
              <div className={style.navigation}>
                <img src={homeIcon} alt="home icon" className={style.icon} />
                <img src={arrowRight} alt="arrow right" className={style.icon} />
                <p className={style.pageTitle}>
                  {productSection.charAt(0).toUpperCase() + productSection.slice(1).toLowerCase()}
                </p>
                <img src={arrowRight} alt="arrow right" className={style.icon} />
                <p className={style.sectionPhoneTitle}>{phone.name}</p>
              </div>

              <button className={style.backButton} onClick={() => navigate(-1)}>
                <img src={arrowLeft} alt="arrow icon left" className={style.icon} />
                <p className={style.back}>Back</p>
              </button>

              <h1 className={style.productTitle}>{phone.name}</h1>

              <div className={style.container}>
                <div className={style.product}>
                  <Slider product={product} />

                  <ProductOptions
                    phone={phone}
                    capacity={capacity}
                    color={color}
                    productSection={productSection}
                  />
                </div>

                <div className={style.onDesctopPosition}>
                  <AboutProduct phone={phone} />

                  <TechSpecs phone={phone} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
