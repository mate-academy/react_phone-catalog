/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './DetailedPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import goods from '../../../public/api/products.json';
import { Theme } from '../../../public/api/types/theme';
import { ThemeContext } from '../../utils/themeContext';
import { ProductCart } from '../../components/ProductCart';
import { PathToPage } from './components/PathToPage/PathToPage';
import { Specifications } from './components/Specifications/Specifications';
import { DetailedInfo } from './components/DetailedInfo/DetailedInfo';
import { Loader } from '../../components/Loader';

export const DetailPage = () => {
  const [product, setProduct] = useState<any | null>(undefined);
  const { nameId } = useParams();
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [perView, setPerView] = useState(1);
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [detailedAll, setDetailedAll] = useState<any[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productResponse = await fetch('api/products.json');
        const phoneResponse = await fetch('api/phones.json');
        const tabletResponse = await fetch('api/tablets.json');
        const accessoriesResponse = await fetch('api/accessories.json');

        const allProductsJson = await productResponse.json();
        const phones = await phoneResponse.json();
        const tablets = await tabletResponse.json();
        const accessories = await accessoriesResponse.json();

        setAllProducts(allProductsJson);
        setDetailedAll([...phones, ...tablets, ...accessories]);

        const baseProduct = allProductsJson.find(
          (p: any) => p.itemId?.toLowerCase() === nameId?.toLowerCase(),
        );

        if (!baseProduct) {
          setProduct(null);

          return;
        }

        const detailedData = [...phones, ...tablets, ...accessories].find(
          (p: any) => p.id === baseProduct.itemId,
        );

        if (detailedData) {
          const merged = { ...baseProduct, ...detailedData };

          setProduct(merged);
          setSelected(merged.images?.[0] ?? null);
          setSelectedColor(merged.color ?? null);
          setSelectedCapacity(merged.capacity ?? null);
        } else {
          setProduct(baseProduct);
          setSelected(baseProduct.image ? `/${baseProduct.image}` : null);
          setSelectedColor(baseProduct.color ?? null);
        }
      } catch {
        setProduct(null);
      }
    };

    loadProduct();
  }, [nameId]);

  const computePerView = () => {
    const w = window.innerWidth;

    if (w >= 1200) {
      return 3;
    }

    if (w >= 640) {
      return 2;
    }

    return 1;
  };

  useEffect(() => {
    const onResize = () => setPerView(computePerView());

    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const maxIndex = Math.max(0, allProducts.length - perView);
  const step = perView;

  const prev = () => setCurrent(c => Math.max(0, c - step));
  const next = () => setCurrent(c => Math.min(maxIndex, c + step));

  useEffect(() => {
    setCurrent(c => Math.min(c, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const recalc = () => {
      if (!trackRef.current || !viewportRef.current) {
        return;
      }

      const cards = Array.from(
        trackRef.current.querySelectorAll('article'),
      ) as HTMLElement[];
      const card = cards[current];

      if (card) {
        setOffset(card.offsetLeft);
      }
    };

    recalc();
    window.addEventListener('resize', recalc);

    return () => window.removeEventListener('resize', recalc);
  }, [current, perView]);

  const onPickColor = (color: string) => {
    if (!product) {
      return;
    }

    const sameNamespaceDetailed = detailedAll.filter(
      (p: any) => p.namespaceId === product.namespaceId,
    );

    const targetDetailed = sameNamespaceDetailed.find(
      (p: any) =>
        p.color === color &&
        (!selectedCapacity || p.capacity === selectedCapacity),
    );

    if (!targetDetailed) {
      return;
    }

    const targetBase = allProducts.find(
      (p: any) => p.itemId === targetDetailed.id,
    );

    if (!targetBase) {
      return;
    }

    const cat = targetBase.category ?? product.namespaceId;

    navigate(`/${cat}/${targetBase.itemId}`);
  };

  const onPickCapacity = (capacity: string) => {
    if (!product) {
      return;
    }

    const sameNamespaceDetailed = detailedAll.filter(
      (p: any) => p.namespaceId === product.namespaceId,
    );

    const targetDetailed = sameNamespaceDetailed.find(
      (p: any) =>
        p.capacity === capacity &&
        (!selectedColor || p.color === selectedColor),
    );

    if (!targetDetailed) {
      return;
    }

    const targetBase = allProducts.find(
      (p: any) => p.itemId === targetDetailed.id,
    );

    if (!targetBase) {
      return;
    }

    const cat = targetBase.category ?? product.namespaceId;

    navigate(`/${cat}/${targetBase.itemId}`);
  };

  const lastIndex = goods.length - 1;

  if (product === undefined) {
    return <Loader />;
  }

  if (product === null) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <div
        className={[
          styles.detailPage,
          theme === Theme.LIGHT ? styles['detailPage--light'] : '',
        ].join(' ')}
      >
        <PathToPage product={product} theme={theme} />

        <Specifications
          product={product}
          selected={selected}
          onPickColor={onPickColor}
          selectedColor={selectedColor}
          onPickCapacity={onPickCapacity}
          selectedCapacity={selectedCapacity}
          setSelected={setSelected}
          theme={theme}
        />

        <DetailedInfo product={product} theme={theme} />

        <div className={styles.goods__header}>
          <p className={styles.goods__title}>You may also like</p>
          <div
            className={[
              styles.goods__buttons,
              theme === Theme.LIGHT ? styles['goods__buttons--light'] : '',
            ].join(' ')}
          >
            <button
              className={`${styles.goods__button} ${styles['goods__button--left']}`}
              onClick={prev}
              disabled={current === 0}
            >
              ❮
            </button>
            <button
              className={`${styles.goods__button} ${styles['goods__button--right']}`}
              onClick={next}
              disabled={current === lastIndex}
            >
              ❯
            </button>
          </div>
        </div>
        <div ref={viewportRef} className={styles.goods__viewport}>
          <div
            ref={trackRef}
            className={styles.goods__track}
            style={{ transform: `translateX(-${offset}px)` }}
          >
            <div className={styles.goods__products}>
              {goods.map(item => (
                <ProductCart key={item.id} product={item} priceMode="full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
