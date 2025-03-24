/* eslint-disable import/no-extraneous-dependencies */
import { useNavigate, useParams } from 'react-router-dom';
import { CurrentPage } from '../../components/CurrentPage';
import { useEffect, useMemo, useState } from 'react';
import { Item } from '../../types/Item';
import { getAllVariations, getItemById } from '../../httpClient';
import s from './ProductPage.module.scss';
import cl from 'classnames';
import { AddTo } from '../../components/AddTo';
import { useProducts } from '../../context/ProductsContext';
import { getUpperFirstChar } from '../../someMethods';
import { Loader } from '../../components/Loader';
import { Categories } from '../../types/Categories';
import { AnimatePresence, motion } from 'framer-motion';
import { COLORS } from '../../constants';
import { SliderPhones } from '../../components/SliderPhones';
import { getMayLikeProducts } from '../../services/products';
import { useSetError } from '../../context/ErrorContext';

export const ProductPage = () => {
  const { category, id } = useParams();

  const [product, setProduct] = useState<Item>();
  const [allVariations, setAllVariations] = useState<Item[]>([]);
  const products = useProducts();
  const [mainImg, setMainImg] = useState('');
  const [otherColor, setOtherColor] = useState('');
  const [otherCapacity, setOtherCapacity] = useState('');
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const mayLikeProducts = useMemo(
    () => getMayLikeProducts(products, category as Categories),
    [products],
  );

  const setError = useSetError();

  useEffect(() => {
    if (!id || !category) {
      return;
    }

    document.title = `Nice Gadgets | ${getUpperFirstChar(category as string)} | ${getUpperFirstChar(id as string)}}`;
    setIsLoading(true);

    getItemById(category as Categories, id)
      .then(item => {
        if (item) {
          setProduct(item);
          setOtherColor(item.color);
          setOtherCapacity(item.capacity);
          setMainImg(item.images[0]);
          getAllVariations(category as Categories, item.namespaceId).then(
            setAllVariations,
          );
        }
      })
      .catch(() => setError('Something went wrong :('))

      .finally(() => setIsLoading(false));
  }, []);

  const handleChangeProduct = (
    toChange: 'capacity' | 'color',
    value: string,
  ) => {
    const valueToChange = toChange === 'color' ? value.toLowerCase() : value;
    let newProduct;

    if (toChange === 'color') {
      setOtherColor(valueToChange);
      newProduct = allVariations.find(
        e => e[toChange] === valueToChange && e.capacity === otherCapacity,
      );
    } else {
      setOtherCapacity(valueToChange);
      newProduct = allVariations.find(
        e => e[toChange] === valueToChange && e.color === otherColor,
      );
    }

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

  const techSpecs = useMemo(
    () => [
      'screen',
      'resolution',
      'processor',
      'ram',
      'camera',
      'zoom',
      'cell',
    ],
    [],
  );
  const someSpecs = useMemo(() => techSpecs.slice(0, 4), [techSpecs]);

  const handleChangeImage = async (img: string) => {
    if (img === mainImg) {
      return;
    }

    setMainImg(img);
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="wrong-page">
        <h1>404 - Product Not Found</h1>
        <img
          src="/img/product-not-found.png"
          className="wrong-page__cat"
          alt="not-found"
        />
      </div>
    );
  }

  return (
    <div className={s.ProductPage}>
      <CurrentPage category={category} productName={product?.name} />

      <div className={s.ProductPage__content}>
        <div className={s.ProductPage__blockImages}>
          <div className={s.ProductPage__otherImages}>
            {product.images.map((img, i) => (
              <img
                className={cl(s.ProductPage__image, {
                  [s.ProductPage__imageActive]: mainImg === img,
                })}
                key={i}
                src={`/${img}`}
                alt=""
                onClick={() => handleChangeImage(img)}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.img
              key={mainImg}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={s.ProductPage__mainImg}
              src={`/${mainImg}`}
              alt=""
            />
          </AnimatePresence>
        </div>

        <div className={s.ProductPage__mainInfo}>
          <div className={s.ProductPage__selectBlock}>
            <p className={s.ProductPage__chooseName}>Available colors</p>

            <ul className={s.ProductPage__selectList}>
              {product.colorsAvailable.map(e => (
                <li
                  className={cl(s.ProductPage__color, {
                    [s.ProductPage__colorActive]: e === product.color,
                  })}
                  key={e}
                  style={{ backgroundColor: COLORS[e as keyof typeof COLORS] }}
                  onClick={() => handleChangeProduct('color', e)}
                ></li>
              ))}
            </ul>
          </div>
          <div className={s.ProductPage__selectBlock}>
            <p className={s.ProductPage__chooseName}>Select capacity</p>

            <ul className={s.ProductPage__selectList}>
              {product?.capacityAvailable.map((e, i) => (
                <li
                  className={cl(s.ProductPage__capacity, {
                    [s.ProductPage__capacityActive]: e === product.capacity,
                  })}
                  key={i}
                  onClick={() => handleChangeProduct('capacity', e)}
                >
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div className={s.ProductPage__price}>
            <h2 className={s.ProductPage__priceDiscount}>
              ${product.priceDiscount}
            </h2>
            <p className={s.ProductPage__priceRegular}>
              ${product.priceRegular}
            </p>
          </div>
          <div className={s.ProductPage__addTo}>
            {itemFromProduct && <AddTo product={itemFromProduct} />}
          </div>
          <ul className={s.ProductPage__someSpecs}>
            {someSpecs.map(e => (
              <li key={e} className={s.ProductPage__infoItem}>
                {getUpperFirstChar(e)}{' '}
                <span className={s.ProductPage__span}>{product[e]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.ProductPage__about}>
          <h3 className={s.ProductPage__subtitle}>About</h3>
          {product.description.map((e, i) => (
            <div key={i} className={s.ProductPage__otherInfo}>
              <h4>{e.title}</h4>
              <p className={s.ProductPage__description}>{e.text}</p>
            </div>
          ))}
        </div>
        <div className={s.ProductPage__techSpecs}>
          <h3 className={s.ProductPage__subtitle}>Tech Specs</h3>
          <ul className={s.ProductPage__someSpecs}>
            {techSpecs.map(e => {
              const value = product?.[e];

              if (!value) {
                return null;
              }

              return (
                <li
                  key={e}
                  className={cl(
                    s.ProductPage__infoItem,
                    s.ProductPage__infoItemBigger,
                  )}
                >
                  {getUpperFirstChar(e)}{' '}
                  <span className={s.ProductPage__span}>
                    {typeof value === 'string' ? value : value.join(', ')}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={s.ProductPage__slider}>
          <SliderPhones title="You may also like" products={mayLikeProducts} />
        </div>
      </div>
    </div>
  );
};
