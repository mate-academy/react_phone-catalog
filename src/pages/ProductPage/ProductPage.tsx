/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import s from './ProductPage.module.scss';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Item } from '../../types/Item';
import { getAllVariations, getItemById } from '../../httpClient';
import { AddTo } from '../../components/AddTo';
import { Loader } from '../../components/Loader';
import { Categories } from '../../types/Categories';
import { SliderPhones } from '../../components/SliderPhones';
import { getMayLikeProducts } from '../../services/getProducts';
import { useAppSelector } from '../../hooks';
import { capitalize } from 'lodash';
import { NotFoundPage } from '../NotFoundPage';
import { ProductImages } from '../../components/ProductPageParts/ProductImages';
import { ProductSelectors } from '../../components/ProductPageParts/ProductSelectors';
import { ProductSpecs } from '../../components/ProductPageParts/ProductSpecs/ProductSpecs';
import { ProductPrice } from '../../components/ProductPageParts/ProductPrice';
import { ProductDescription } from '../../components/ProductPageParts/ProductDescription';
import { PageTop } from '../../components/PageTop';

const techSpecs = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'camera',
  'zoom',
  'cell',
] as const;

const someSpecs = techSpecs.slice(0, 4);

export const ProductPage = () => {
  const { category, id } = useParams();

  const { products } = useAppSelector(state => state.products);
  const [product, setProduct] = useState<Item | null>(null);
  const [allVariations, setAllVariations] = useState<Item[]>([]);
  const [mainImg, setMainImg] = useState('');
  const [otherColor, setOtherColor] = useState('');
  const [otherCapacity, setOtherCapacity] = useState('');
  const [loading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const mayLikeProducts = useMemo(
    () => getMayLikeProducts(products, category as Categories),
    [products, category],
  );

  useEffect(() => {
    if (
      !loading &&
      allVariations.length > 0 &&
      !allVariations.find(e => e.id === id)
    ) {
      setProduct(null);
      setAllVariations([]);

      return;
    }

    if (!id || !category) {
      return;
    }

    if (allVariations.length > 0) {
      return;
    }

    setIsLoading(true);

    const fetchData = async () => {
      setProduct(null);
      try {
        const item = await getItemById(category as Categories, id);

        if (!item) {
          return;
        }

        setProduct(item);
        setOtherColor(item.color);
        setOtherCapacity(item.capacity);
        setMainImg(item.images[0]);

        const variations = await getAllVariations(
          category as Categories,
          item.namespaceId,
        );

        setAllVariations(variations);
      } finally {
        setIsLoading(false);
      }
    };

    document.title = `Nice Gadgets | ${capitalize(category)} | ${capitalize(id)}`;
    fetchData();
  }, [id]);

  const handleChangeProduct = (
    toChange: 'capacity' | 'color',
    value: string,
  ) => {
    const isColor = toChange === 'color';
    const newValue = isColor ? value.toLowerCase() : value;

    if (isColor) {
      setOtherColor(newValue);
    } else {
      setOtherCapacity(newValue);
    }

    const newProduct = allVariations.find(e =>
      isColor
        ? e.color === newValue && e.capacity === otherCapacity
        : e.capacity === newValue && e.color === otherColor,
    );

    if (newProduct) {
      setProduct(newProduct);
      setMainImg(newProduct.images[0]);
      navigate(`/${category}/${newProduct.id}`);
    }
  };

  const itemFromProduct = useMemo(
    () => products.find(e => e.itemId === product?.id),
    [products, product?.id],
  );

  const handleChangeImage = async (img: string) => {
    if (img === mainImg) {
      return;
    }

    setMainImg(img);
  };

  if (loading) {
    return <Loader />;
  }

  if (!product && !loading) {
    return <NotFoundPage />;
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <PageTop category={category} productName={product?.name} />

      <div className={s.ProductPage}>
        <ProductImages
          mainImg={mainImg}
          images={product?.images ?? []}
          onChangeImage={handleChangeImage}
        />

        <div className={s.ProductPage__mainInfo}>
          <ProductSelectors product={product} onChange={handleChangeProduct} />
          <ProductPrice
            priceDiscount={product.priceDiscount}
            priceRegular={product.priceRegular}
          />
          <div className={s.ProductPage__addTo}>
            {itemFromProduct && <AddTo product={itemFromProduct} />}
          </div>
          <ProductSpecs specs={someSpecs} product={product} />
        </div>

        <ProductDescription description={product.description} />

        <div className={s.ProductPage__techSpecs}>
          <h3 className={s.ProductPage__subtitle}>Tech Specs</h3>
          <ProductSpecs specs={techSpecs} product={product} bigger />
        </div>

        <div className={s.ProductPage__slider}>
          <SliderPhones title="You may also like" products={mayLikeProducts} />
        </div>
      </div>
    </>
  );
};
