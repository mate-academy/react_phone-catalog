import { Navigate, useParams } from 'react-router-dom';
import { Crumb } from '../../components/Crumb';
import s from './ProductDetailsPage.module.scss';
import { TechSpecs } from '../../components/TechSpecs';
import { About } from '../../components/About';
import { AddButton } from '../../components/ui/Buttons/AddButton';
import { LikeButton } from '../../components/ui/Buttons/LikeButton/LikeButton';
import { ProductsSlider } from '../../components/ProductSlider';
import { useEffect, useState } from 'react';
import { Media } from '../../components/Media';
import { BackButton } from '../../components/ui/Buttons/BackButton';
import { Options } from '../../components/Options';
import { useProductItem } from '../../service/useProductItem';
import { Error } from '../../components/Error';
import { useProductContext } from '../../context/ShopContext/ProductContext';
import { Loader } from '../../components/Loader';

const getSuggestedProducts = async (count: number) => {
  const response = await fetch('/api/products.json');
  const products = await response.json();
  const shuffled = products.sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
};

const VALID_CATEGORY = ['phones', 'tablets', 'accessories'];

export const ProductDetailsPage = () => {
  const { productId, category } = useParams();
  const { item, isLoading, error, fetchData } = useProductItem(
    productId,
    category,
  );
  const { products } = useProductContext();
  const product = products.find(good => good.itemId === productId);
  const [mainPhoto, setMainPhoto] = useState(item?.images[0] || '');
  const [suggestedProducts, setSuggestedProduct] = useState([]);

  useEffect(() => {
    if (item) {
      setMainPhoto(item.images[0]);
      getSuggestedProducts(7).then(setSuggestedProduct);
    }
  }, [item]);

  if (!category || !VALID_CATEGORY.includes(category)) {
    return <Navigate to="/error404" />;
  }

  if (error) {
    return <Error errorMEssage="Something went wrong" action={fetchData} />;
  }

  return isLoading ? (
    <Loader />
  ) : !item || !product ? (
    <Error errorMEssage="can not find the item" />
  ) : (
    <div className={s.productDetailsPage}>
      <Crumb />

      <div className={s.productDetailsPage__back}>
        <BackButton />
      </div>

      <h1 className={s.productDetailsPage__title}>{item.name}</h1>

      <div className={s.productDetailsPage__media}>
        <Media images={item.images} setMainPhoto={setMainPhoto} />
      </div>

      <div className={s['productDetailsPage__main-photo']}>
        <img
          className={s.productDetailsPage__img}
          src={`/${mainPhoto}`}
          alt="mainphoto"
        />
      </div>

      <div className={s.productDetailsPage__info}>
        <div className={s.productDetailsPage__options}>
          <Options
            title={'Available colors'}
            options={item.colorsAvailable}
            optionType="color"
            item={item}
          />

          <Options
            title={'Select capacity'}
            options={item.capacityAvailable}
            optionType="capacity"
            item={item}
          />
        </div>

        <div className={s['productDetailsPage__price-block']}>
          <span className={s['productDetailsPage__price-discount']}>
            {item.priceDiscount}$
          </span>
          <span className={s['productDetailsPage__price-full']}>
            {item.priceRegular}$
          </span>
        </div>

        <div className={s.productDetailsPage__action}>
          <AddButton size="medium" product={product} />

          <LikeButton size="medium" product={product} />
        </div>

        <TechSpecs
          specs={['screen', 'resolution', 'processor', 'ram']}
          product={item}
        />
      </div>

      <div className={s.productDetailsPage__desc}>
        <div className={s.productDetailsPage__about}>
          <h3 className={s.productDetailsPage__subtitle}>About</h3>
          <div className={s['productDetailsPage__desc-line']}></div>
          <div className={s['productDetailsPage__about-desc']}>
            <About product={item} />
          </div>
        </div>

        <div className={s['productDetailsPage__tech-info']}>
          <h3 className={s.productDetailsPage__subtitle}>Tech specs</h3>
          <div className={s['productDetailsPage__desc-line']}></div>
          <div className={s['productDetailsPage__tech-desc']}>
            <TechSpecs
              specs={[
                'screen',
                'resolution',
                'processor',
                'ram',
                'camera',
                'zoom',
              ]}
              product={item}
            />
          </div>
        </div>
      </div>

      <div className={s.productDetailsPage__suggestions}>
        <ProductsSlider
          title={'You may also like'}
          products={suggestedProducts}
        />
      </div>
    </div>
  );
};
