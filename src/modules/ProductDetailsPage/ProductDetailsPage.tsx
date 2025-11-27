import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Accessory, Phone, SLIDER_TYPE, Tablet } from '../../api/types';
import { DataContext } from '../../context/ContextProvider';
import scss from './ProductDetailsPage.module.scss';
import { Loader } from '../shared/components/Loader';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ButtonBack } from '../shared/components/ButtonBack';
import { ProductGallery } from './components/ProductGallery/ProductGallery';
import { ColorSelection } from './components/ColorSelection/ColorSelection';
import { COLOR_MAP } from './utility/colorMap';
import { CapacitySelection } from './components/CapacitySelection';
import { Line } from '../shared/components/Line/Line';
import { Price } from '../shared/components/Price';
import { ButtonCart } from '../shared/components/ButtonCart';
import { ButtonFav } from '../shared/components/ButtonFav';
import { TechSpecs } from './components/TechSpecs/TechSpecs';
import { About } from './components/About/About';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { ProductNotFound } from './components/ProductNotFound';

export const ProductDetailsPage = () => {
  const [item, setItem] = useState<Phone | Tablet | Accessory | undefined>(
    undefined,
  );
  const [isError, setIsError] = useState<boolean>(false);
  const { category, productId } = useParams();
  const { phones, tablets, accessories, products, isLoading } =
    useContext(DataContext);

  const navigate = useNavigate();
  const location = useLocation();

  const hasDiscount = location.state?.hasDiscount;

  const idForCart = useMemo(() => {
    const found = products.find(p => p.itemId === productId);

    return found ? found.id : 0;
  }, [products, productId]);

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

  const handleColorChange = (newColor: keyof typeof COLOR_MAP) => {
    if (!item) {
      return;
    }

    const productToNav = variants.find(
      p =>
        p.namespaceId === item.namespaceId &&
        p.capacity === item.capacity &&
        p.color === newColor,
    );

    if (productToNav) {
      navigate(`/${category}/${productToNav.id}`);
    }
  };

  const handleCapacityChange = (newCapacity: string) => {
    if (!item) {
      return;
    }

    const productToNav = variants.find(
      p =>
        p.namespaceId === item.namespaceId &&
        p.capacity === newCapacity &&
        p.color === item.color,
    );

    if (productToNav) {
      navigate(`/${category}/${productToNav.id}`);
    }
  };

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
      <h2>{item.name}</h2>
      <ProductGallery item={item} />
      <ColorSelection
        availableColors={item.colorsAvailable}
        currentColor={item.color}
        setColor={handleColorChange}
        id={idForCart}
      />
      <Line marginTop={2.4} marginBottom={2.4} />
      <CapacitySelection
        availableCapacities={item.capacityAvailable}
        currentCapacity={item.capacity}
        setCapacity={handleCapacityChange}
      />
      <Line marginTop={2.4} marginBottom={2.4} />
      <Price
        normal={item.priceRegular}
        discount={item.priceDiscount}
        hasDiscount={hasDiscount}
      />
      <div className={scss.productDetailsPage__buttonsWrapper}>
        <ButtonCart
          productId={idForCart}
          className={scss.productDetailsPage__cartButton}
          image={item.images[0]}
          name={item.name}
          price={item.priceDiscount}
        />
        <ButtonFav
          productId={idForCart}
          className={scss.productDetailsPage__favButton}
          hasDiscount={false}
        />
      </div>
      <TechSpecs item={item} tech={false} />
      <About item={item} />
      <h3 className={scss.productDetailsPage__h3}>Tech specs</h3>
      <Line marginTop={1.6} marginBottom={3.0} />
      <TechSpecs item={item} tech={true} />
      <ProductsSlider title={'You may also like'} type={SLIDER_TYPE.RAND} />
    </section>
  );
};
