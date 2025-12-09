import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Accessory, Phone, SLIDER_TYPE, Tablet } from '../../api/types';
import { DataContext } from '../../context/ContextProvider';
import scss from './ProductDetailsPage.module.scss';
import { Loader } from '../shared/components/Loader';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ButtonBack } from '../shared/components/ButtonBack';
import { ProductGallery } from './components/ProductGallery/ProductGallery';
import { Line } from '../shared/components/Line';
import { TechSpecs } from './components/TechSpecs/TechSpecs';
import { About } from './components/About/About';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { ProductNotFound } from './components/ProductNotFound';
import { MainControls } from './components/MainControls';

export const ProductDetailsPage = () => {
  const [item, setItem] = useState<Phone | Tablet | Accessory | undefined>(
    undefined,
  );
  const [isError, setIsError] = useState<boolean>(false);
  const { category, productId } = useParams();
  const { phones, tablets, accessories, isLoading } = useContext(DataContext);

  const variants = useMemo(() => {
    let list: Phone[] | Tablet[] | Accessory[] = [];

    switch (category) {
      case 'phones':
        list = phones;
        break;
      case 'tablets':
        list = tablets;
        break;
      case 'accessories':
        list = accessories;
        break;
      default:
        return [];
    }

    return list;
  }, [category, phones, tablets, accessories]);

  useEffect(() => {
    if (variants.length > 0) {
      const detailProd = variants.find(prod => prod.id === productId);

      if (detailProd) {
        setItem(detailProd);
        setIsError(false);
      } else {
        setItem(undefined);
        setIsError(true);
      }
    }
  }, [productId, variants]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ProductNotFound />;
  }

  if (!item) {
    return <Loader />;
  }

  return (
    <section className={scss.productDetailsPage}>
      <Breadcrumbs category={item.category} productName={item.name} />
      <ButtonBack />
      <h2 className={scss.productDetailsPage__h2}>{item.name}</h2>
      <ProductGallery item={item} />
      <MainControls item={item} variants={variants} />
      <About item={item} />
      <h3 className={scss.productDetailsPage__h3}>Tech specs</h3>
      <Line marginTop={1.6} marginBottom={3.0} />
      <TechSpecs
        item={item}
        tech={true}
        className={scss.productDetailsPage__specsLean}
      />
      <ProductsSlider title={'You may also like'} type={SLIDER_TYPE.RAND} />
    </section>
  );
};
