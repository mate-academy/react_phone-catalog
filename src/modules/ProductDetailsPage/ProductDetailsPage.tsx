import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { useLoading } from '../../context/LoadingContext';
import styles from './ProductDetailsPage.module.scss';
import { ProductDetailed } from '../../types/ProductDetailed';
import { BackButton } from '../../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import { getPhones } from '../../utils/services/phones';
import { getTablets } from '../../utils/services/tablets';
import { getAccessories } from '../../utils/services/accessories';
import { FavouriteButton } from '../../components/FavouriteButton';
import { AddToCartButton } from '../../components/AddToCartButton';
import { BrandModelsSlider } from '../../components/BrandModelsSlider';
import { shuffleProducts } from '../../utils/shuffleProduct';

const colorOptions: { [key: string]: string } = {
  spacegray: '#4C4C4C',
  midnightgreen: '#5F7170',
  midnight: '#232A31',
  gold: '#FCDBC1',
  silver: '#FCDBC1',
  graphite: '#54524F',
  sierrablue: '#A7C1D9',
  red: '#EB5757',
  green: '#27AE60',
  spaceblack: '#403E3D',
  rosegold: '#FFD3E0',
};

export const ProductDetailsPage = () => {
  const { isLoading, setIsLoading } = useLoading();
  const [product, setProduct] = useState<ProductDetailed | null>(null);
  const [productsInCategory, setProductsInCategory] = useState<
    ProductDetailed[]
  >([]);
  const [suggestedProducts, setSuggestedProducts] = useState<ProductDetailed[]>(
    [],
  );

  // const location = useLocation();
  // const [category, productId] = location.pathname.split('/').slice(1);

  const { categoryName = '', productId = '' } = useParams();

  const [mainImage, setMainImage] = useState('');
  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);

      try {
        let products: ProductDetailed[] = [];

        switch (categoryName) {
          case 'phones':
            products = await getPhones();
            break;
          case 'tablets':
            products = await getTablets();
            break;
          case 'accessories':
            products = await getAccessories();
            break;
        }

        setProductsInCategory(products);

        const current = products.find(p => p.id === productId) || null;

        setProduct(current);

        if (current) {
          setColor(current.color);
          setCapacity(current.capacity);
          setMainImage(current.images[0]);
        }
      } catch (err) {
        throw new Error();
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [productId, categoryName, setIsLoading]);

  const getSuggestedProducts = (list: ProductDetailed[], excludeId: string) => {
    const suggest = list.filter(p => p.id !== excludeId);

    return shuffleProducts(suggest).slice(0, 10);
  };

  useEffect(() => {
    if (!productsInCategory || !productId) {
      return;
    }

    const suggested = getSuggestedProducts(productsInCategory, productId);

    setSuggestedProducts(suggested);
  }, [productsInCategory, productId]);

  const getNewProductId = (
    namespaceId: string,
    colorVal: string,
    capacityVal: string,
  ) => {
    const formattedColor = colorVal.replace(/\s+/g, '-').toLowerCase();

    return `${namespaceId}-${capacityVal.toLowerCase()}-${formattedColor}`;
  };

  const updateProduct = (newColor: string, newCapacity: string) => {
    if (!product) {
      return;
    }

    const newProductId = getNewProductId(
      product?.namespaceId,
      newColor,
      newCapacity,
    );

    const newProduct = productsInCategory.find(p => p.id === newProductId);

    if (newProduct) {
      setProduct(newProduct);
      setColor(newProduct.color);
      setCapacity(newProduct.capacity);

      navigate(`/${categoryName}/${newProductId}`, { replace: true });
    }
  };

  const handleColorChange = (selectedColor: string) => {
    updateProduct(selectedColor, capacity);
  };

  const handleCapacityChange = (selectedCapacity: string) => {
    updateProduct(color, selectedCapacity);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  return (
    <div className={styles.productDetailsPage}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs />
      </div>

      <div className={styles.backButtonContainer}>
        <BackButton />
      </div>

      <h1 className={styles.productTitle}>{product.name}</h1>

      <div className={styles.main}>
        <div className={styles.imagesContainer}>
          <div className={styles.imagesContainer__mainImage}>
            <img src={`/${mainImage}`} alt={product.name} />
          </div>
          <div className={styles.imagesContainer__imagesRow}>
            {product.images.map((img, i) => (
              <img
                key={i}
                src={`${img}`}
                alt={product.name}
                onClick={() => setMainImage(img)}
                className={`${styles.imagesContainer__smallImage} ${mainImage === img ? styles['imagesContainer__smallImage--active'] : ''}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.colorsContainer}>
            <div className={styles.colorsContainer__top}>
              <p className={styles.colorsContainer__text}>Available colors</p>
              <p className={styles.colorsContainer__idText}>ID: 802390</p>
            </div>

            <div className={styles.colorsContainer__options}>
              {product.colorsAvailable.map(c => (
                <div
                  key={c}
                  onClick={() => handleColorChange(c)}
                  className={`${styles.colorsContainer__colorBox} ${c === color ? styles['colorsContainer__colorBox--active'] : ''}`}
                >
                  <div
                    className={styles.colorsContainer__colorBoxInside}
                    style={{
                      backgroundColor: colorOptions[c.toLowerCase()] || c,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.line}></div>

          <div className={styles.capacityContainer}>
            <p className={styles.capacityContainer__text}>Select capacity</p>

            <div className={styles.capacityContainer__capacity}>
              {product.capacityAvailable.map(cap => (
                <button
                  key={cap}
                  onClick={() => handleCapacityChange(cap)}
                  className={`${styles.capacityContainer__capacityBox} ${cap === capacity ? styles['capacityContainer__capacityBox--active'] : ''}`}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.lineBeforePrice}></div>

          <div className={styles.pricesContainer}>
            <p className={styles.pricesContainer__priceDiscount}>
              ${product.priceDiscount}
            </p>
            <p className={styles.pricesContainer__priceRegular}>
              ${product.priceRegular}
            </p>
          </div>

          <div className={styles.buttonsContainer}>
            <AddToCartButton product={product} />
            <FavouriteButton product={product} />
          </div>

          <div className={styles.specsContainer}>
            <div className={styles.specsContainer__item}>
              <p className={styles.specsContainer__name}>Screen</p>
              <p className={styles.specsContainer__value}>{product.screen}</p>
            </div>
            <div className={styles.specsContainer__item}>
              <p className={styles.specsContainer__name}>Resolution</p>
              <p className={styles.specsContainer__value}>
                {product.resolution}
              </p>
            </div>
            <div className={styles.specsContainer__item}>
              <p className={styles.specsContainer__name}>Processor</p>
              <p className={styles.specsContainer__value}>
                {product.processor}
              </p>
            </div>
            <div className={styles.specsContainer__item}>
              <p className={styles.specsContainer__name}>RAM</p>
              <p className={styles.specsContainer__value}>{product.ram}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.about}>
          <h3 className={styles.about__title}>About</h3>

          <div className={styles.lineBeforePrice}></div>

          <div className={styles.about__items}>
            {product.description.map(info => (
              <div key={info.title} className={styles.about__item}>
                <h3 className={styles.about__name}>{info.title}</h3>

                {info.text.map((paragraph, index) => (
                  <p key={index} className={styles.about__text}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.techSpecs}>
          <h3 className={styles.techSpecs__title}>Tech specs</h3>

          <div className={styles.techSpecs__container}>
            <div className={styles.techSpecs__item}>
              <p className={styles.techSpecs__name}>Screen</p>
              <p className={styles.techSpecs__value}>{product.screen}</p>
            </div>
            <div className={styles.techSpecs__item}>
              <p className={styles.techSpecs__name}>Resolution</p>
              <p className={styles.techSpecs__value}>{product.resolution}</p>
            </div>
            <div className={styles.techSpecs__item}>
              <p className={styles.techSpecs__name}>Processor</p>
              <p className={styles.techSpecs__value}>{product.processor}</p>
            </div>
            <div className={styles.techSpecs__item}>
              <p className={styles.techSpecs__name}>RAM</p>
              <p className={styles.techSpecs__value}>{product.ram}</p>
            </div>
            <div className={styles.techSpecs__item}>
              <p className={styles.techSpecs__name}>Built in memory</p>
              <p className={styles.techSpecs__value}>{product.capacity}</p>
            </div>
            <div className={styles.techSpecs__item}>
              <p className={styles.techSpecs__name}>Camera</p>
              <p className={styles.techSpecs__value}>{product.camera}</p>
            </div>
            <div className={styles.techSpecs__item}>
              <p className={styles.techSpecs__name}>Zoom</p>
              <p className={styles.techSpecs__value}>{product.zoom}</p>
            </div>
            <div className={styles.techSpecs__item}>
              <p className={styles.techSpecs__name}>Cell</p>
              <p className={styles.techSpecs__value}>
                {product.cell.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.suggestedProducts}>
        <BrandModelsSlider
          title="You may also like"
          products={suggestedProducts}
        />
      </div>
    </div>
  );
};
