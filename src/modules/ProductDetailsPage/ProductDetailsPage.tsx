/* eslint-disable react-hooks/rules-of-hooks */
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowRight from '../../assets/Chevron (Arrow Right).svg?react';
import ArrowLeft from '../../assets/Chevron (Arrow Left).svg?react';
import Home from '../../assets/Home.svg?react';
import type { Product, ProductFull } from '../../types/types';
import styles from './ProductDetailsPage.module.scss';
import { useEffect, useState } from 'react';
import { CartButton } from '../shared/CartButton';
import { FavouriteButton } from '../shared/FavouriteButton';
import { Carousel } from '../shared/Carousel';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProductsType, setCurrentProductsType] = useState<ProductFull[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductFull | null>(null);
  const [currentProductShort, setCurrentProductShort] = useState<Product>();
  const [currentColor, setCurrenColor] = useState<string | undefined>(undefined);
  const [currentCapacity, setCurrentCapacity] = useState<string | undefined>(undefined);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);

  const [currentImg, setCurrentImg] = useState(0);

  type ProductType = 'phones' | 'tablets' | 'accessories';
  const { pathname } = useLocation();
  const isProductType = (value: string): value is ProductType =>
    ['phones', 'tablets', 'accessories'].includes(value);
  const segment = pathname.split('/')[1];
  if (!segment || !isProductType(segment)) {
    return null;
  }
  const type: ProductType = segment;

  const getColorHex = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      black: '#000000',
      green: '#008000',
      purple: '#800080',
      red: '#FF0000',
      white: '#FFFFFF',
      yellow: '#FFD700',
      gold: '#FFD700',
      midnightgreen: '#004953',
      silver: '#C0C0C0',
      spacegray: '#717378',
      rosegold: '#B76E79',
      coral: '#FF7F50',
      midnight: '#000033',
      spaceblack: '#000000',
      pink: '#FFC0CB',
      blue: '#0000FF',
      sierrablue: '#9BB5CE',
      graphite: '#251607',
    };

    return colorMap[colorName.toLowerCase()] || '#CCCCCC';
  };

  const getSuggestedProducts = (
    products: Product[],
    currentProductId: string,
    count: number = 20,
  ): Product[] => {
    const otherProducts = products.filter(
      product => product.itemId !== currentProductId && product.category === type,
    );

    const shuffled = [...otherProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const [typeResponse, allResponse] = await Promise.all([
          fetch(`/api/${type}.json`),
          fetch('/api/products.json'),
        ]);

        if (!typeResponse.ok || !allResponse.ok) {
          throw new Error('Не вдалося завантажити дані');
        }

        const typeData = await typeResponse.json();
        const allData = await allResponse.json();

        setCurrentProductsType(typeData);
        setProducts(allData);

        const product = typeData.find((item: ProductFull) => item.id === id);

        if (!product) {
          setError('Товар не знайдено');
          setIsLoading(false);
          return;
        }

        setCurrentProduct(product);
        setCurrenColor(product.color);
        setCurrentCapacity(product.capacity);

        const productShort = allData.find((item: Product) => item.itemId === product.id);
        setCurrentProductShort(productShort);

        // Получаем рекомендованные товары
        const suggested = getSuggestedProducts(allData, product.id, 20);
        setSuggestedProducts(suggested);
      } catch (err) {
        console.error('There was a problem with the fetch operation:', err);
        setError('Щось пішло не так');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  useEffect(() => {
    const model = currentProductsType.find(item => {
      return id === item.id;
    });
    setCurrentProduct(model || null);
    setCurrenColor(model?.color);
    setCurrentCapacity(model?.capacity);

    const modelforLocalStorage = products.find(item => {
      return item.itemId === model?.id;
    });
    setCurrentProductShort(modelforLocalStorage);
  }, [currentProductsType, id]);

  useEffect(() => {
    const findProduct = currentProductsType.find(item => {
      return (
        item.namespaceId === currentProduct?.namespaceId &&
        item.color === currentColor &&
        item.capacity === currentCapacity
      );
    });

    if (findProduct && findProduct.id !== id) {
      navigate(`/${type}/${findProduct.id}`, { replace: true });
    }
  }, [currentColor, currentCapacity, currentProductsType, currentProduct, id, navigate, type]);

  if (isLoading) {
    return <div className={styles.loader}>Завантаження...</div>;
  }

  if (error === 'Товар не знайдено') {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={() => navigate(`/${type}`)}>Повернутись до категорії</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.detailspage__breadcrums}>
        <NavLink to="/">
          <Home />
        </NavLink>
        <ArrowRight />
        <NavLink to={`/${type}`}>{type.charAt(0).toUpperCase() + type.slice(1)}</NavLink>
        <ArrowRight />
        <div>{currentProduct?.name}</div>
      </div>
      <div
        onClick={() => {
          navigate(-1);
        }}
        className={styles.detailspage__back}
      >
        <ArrowLeft />
        Back
      </div>

      <div className={styles.detailspage__name}> {currentProduct?.name}</div>
      <div className={styles.detailspage__images}>
        {currentProduct?.images.map((item, index) => (
          <img
            src={`/${item}`}
            key={item}
            className={styles.detailspage__image}
            onClick={() => setCurrentImg(index)}
          />
        ))}
      </div>

      <img
        className={styles.detailspage__mainImage}
        src={`/${currentProduct?.images[currentImg]}`}
        alt=""
      />
      <div className={styles.detailspage__space}></div>

      <div className={styles.detailspage__shortIndormation}>
        <div className={styles.detailspage__colors}>
          Available colors
          <div className={styles.detailspage__avaliableColors}>
            {currentProduct?.colorsAvailable.map(item => {
              return (
                <div
                  className={`${styles.detailspage__color} ${item !== currentProduct?.color ? styles.detailspage__color__active : ''}`}
                  key={item}
                  style={{
                    backgroundColor: getColorHex(item),
                  }}
                  onClick={() => setCurrenColor(item)}
                ></div>
              );
            })}
          </div>
        </div>
        <div className={styles.detailspage__divider}></div>

        <div className={styles.detailspage__capacities}>
          Select capacity
          <div className={styles.detailspage__avaliableCapacity}>
            {currentProduct?.capacityAvailable.map(item => {
              return (
                <div
                  className={`${styles.detailspage__capacity} ${item === currentProduct?.capacity ? styles.detailspage__capacity__active : ''}`}
                  key={item}
                  onClick={() => setCurrentCapacity(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.detailspage__divider}></div>

        <div className={styles.detailspage__prices}>
          <div className={styles.detailspage__price}>${currentProduct?.priceDiscount}</div>
          <div className={styles.detailspage__fullPrice}>${currentProduct?.priceRegular}</div>
        </div>
        <div className={styles.detailspage__buttons}>
          {currentProductShort && (
            <>
              <CartButton product={currentProductShort} />
              <FavouriteButton product={currentProductShort} />
            </>
          )}
        </div>
        <div className={styles.detailspage__specs}>
          <div className={styles.detailspage__spec}>
            Screen <div className={styles.detailspage__char}>{currentProduct?.screen}</div>
          </div>
          <div className={styles.detailspage__spec}>
            Capacity <div className={styles.detailspage__char}>{currentProduct?.capacity}</div>
          </div>
          <div className={styles.detailspage__spec}>
            RAM <div className={styles.detailspage__char}>{currentProduct?.ram}</div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.detailspage__totalInformation}>
          About
          <div className={styles.detailspage__divider}></div>
          {currentProduct?.description.map(item => {
            return (
              <div key={item.title}>
                <div className={styles.detailspage__totalTitle}>{item.title}</div>
                <div className={styles.detailspage__totalText}>{item.text}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.detailspage__space}></div>
        <div className={styles.detailspage__techSpecs}>
          Tech specs
          <div className={styles.detailspage__divider}></div>
          <div className={styles.detailspage__techSpecsList}>
            <div className={styles.detailspage__spec}>
              Screen
              <div>{currentProduct?.screen}</div>
            </div>
            <div className={styles.detailspage__spec}>
              Resolution <div>{currentProduct?.resolution}</div>
            </div>
            <div className={styles.detailspage__spec}>
              Processor <div>{currentProduct?.processor}</div>
            </div>
            <div className={styles.detailspage__spec}>
              RAM <div>{currentProduct?.ram}</div>
            </div>
            {currentProduct?.capacity && (
              <div className={styles.detailspage__spec}>
                Built in memory <div>{currentProduct?.capacity}</div>
              </div>
            )}

            {currentProduct?.camera && (
              <div className={styles.detailspage__spec}>
                Camera <div>{currentProduct?.camera}</div>
              </div>
            )}

            {currentProduct?.zoom && (
              <div className={styles.detailspage__spec}>
                Zoom <div>{currentProduct?.zoom}</div>
              </div>
            )}
            <div className={styles.detailspage__spec}>
              Cell
              <div>
                {currentProduct?.cell.map(item => {
                  return item + ', ';
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {suggestedProducts.length > 0 && (
        <div className={styles.detailspage__suggestedProducts}>
          <Carousel pageTitle={'You may also like'} products={suggestedProducts} />
        </div>
      )}
    </div>
  );
};
