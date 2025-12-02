import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../../../types/Product';
import { Loader } from '../../shared/Loader';
import { TopNav } from '../../shared/TopNav';
import { Btns } from '../../shared/Btns';
import { SliderBtns } from '../../shared/SliderBtns';
import { Categories } from '../../../types/Categories';
import styles from './ProductPage.module.scss';
import classNames from 'classnames';
import { getProductsByCategory } from '../../../server/products';
import { DescriptionBlock } from '../../../types/DescriptioBlock';
import { Slider } from '../../shared/Slider';

type Props = {
  category: Categories;
};

export const ProductPage: React.FC<Props> = ({ category }) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState<string>('');
  const [current, setCurrent] = useState(0);

  // LOADING
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductsByCategory(category);

        setProducts(data);

        const found = data.find(p => p.id === productId);

        if (found) {
          setProduct(found);
          setActiveImage(found.images[0]);
        }
      } catch {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [category, productId]);



  // CHANGECOLOR
  const handleColorChange = (color: string) => {
    if (!product) return;

    const sameModel = products.find(
      item =>
        item.namespaceId === product.namespaceId &&
        item.color === color &&
        item.capacity === product.capacity
    );

    if (sameModel) {
      navigate(`../../${category}/${sameModel.id}`);
    }
  };

  // CANGECAPACITY
  const handleCapacityChange = (capacity: string) => {
    if (!product) return;

    const sameModel = products.find(
      item =>
        item.namespaceId === product.namespaceId &&
        item.capacity === capacity &&
        item.color === product.color
    );

    if (sameModel) {
      navigate(`../../${category}/${sameModel.id}`);
    }
  };

  // SHOWDISCOUNT
  const hasDiscount = product && product.priceDiscount < product.priceRegular;


  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  return (
    <section className={styles.productPage}>
      <TopNav category={category} productName={product.name} />

      <h1 className={styles.productPage__title}>{product.name}</h1>

      <div className={styles.productPage__product}>
        <div className={styles.product}>

          {/* IMAGES */}
          <div className={styles.product__images}>
            <ul className={styles.product__additionalImages}>
              {product.images.map((image, i) => (
                <li
                  key={i}
                  className={classNames(styles.product__additionalImage, {
                    [styles['product__additionalImage--active']]:
                      image === activeImage,
                  })}
                >
                  <img
                    src={`./${image}`}
                    alt="preview"
                    onClick={() => setActiveImage(image)}
                  />
                </li>
              ))}
            </ul>

            <div className={styles.product__mainImage}>
              <img src={`./${activeImage}`} alt="Main product" />
            </div>
          </div>

          {/* SETTINGS */}
          <div className={styles.product__settings}>
            <div className={styles.product__container}>
              {/* COLORS */}
              <div className={styles.product__color}>
                <p className={styles.product__availableColors}>
                  Available colors
                </p>
                <ul className={styles.product__colorList}>
                  {product.colorsAvailable.map((c, i) => (
                    <li
                      key={i}
                      style={{ backgroundColor: c }}
                      className={classNames(styles.product__colorItem, {
                        [styles['product__colorItem--active']]:
                          c === product.color,
                      })}
                      onClick={() => handleColorChange(c)}
                    />
                  ))}
                </ul>
              </div>

              {/* CAPACITY */}
              <div className={styles.product__capacity}>
                <p className={styles.product__capacityName}>Select Capacity</p>
                <ul className={styles.product__capacityList}>
                  {product.capacityAvailable.map((c, i) => (
                    <button
                      key={i}
                      className={classNames(styles.product__capacityItem, {
                        [styles['product__capacityItem--active']]:
                          c === product.capacity,
                      })}
                      onClick={() => handleCapacityChange(c)}
                    >
                      {c}
                    </button>
                  ))}
                </ul>
              </div>

              {/* PRICES */}
              <div className={styles.product__prices}>
                {hasDiscount ? (
                  <p className={styles.product__price}>
                    ${product.priceDiscount}{' '}
                    <span className={styles.product__priceGray}>
                      ${product.priceRegular}
                    </span>
                  </p>
                ) : (
                  <p className={styles.product__price}>
                    ${product.priceRegular}
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className={styles.product__description}>
                <Btns product={product} />

                <div className={styles.product__properties}>
                  <div className={styles.product__property}>
                    <p className={styles.product__propertyName}>Screen</p>
                    <p className={styles.product__propertyValue}>
                      {product.screen}
                    </p>
                  </div>

                  <div className={styles.product__property}>
                    <p className={styles.product__propertyName}>Capacity</p>
                    <p className={styles.product__propertyValue}>
                      {product.capacity}
                    </p>
                  </div>

                  <div className={styles.product__property}>
                    <p className={styles.product__propertyName}>RAM</p>
                    <p className={styles.product__propertyValue}>
                      {product.ram}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className={styles.productPage__info}>
        <div>
          <h3 className={styles.productPage__infoTitle}>About</h3>
          <div className={styles.productPage__about}>
            {product.description.map((block: DescriptionBlock, i: number) => (
              <div key={i}>
                <h4 className={styles.productPage__subTitle}>
                  {block.title}
                </h4>
                {block.text.map((t: string, j: number) => (
                  <p key={j} className={styles.productPage__text}>
                    {t}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* TECH SPECS */}
        <div className={styles.productPage__techSpecs}>
          <h3 className={styles.productPage__techSpecsTitle}>Tech specs</h3>

          <div className={styles.productPage__properties}>
            <div className={styles.productPage__property}>
              <p className={styles.productPage__propertyName}>Screen</p>
              <p className={styles.productPage__propertyValue}>
                {product.screen}
              </p>
            </div>

            <div className={styles.productPage__property}>
              <p className={styles.productPage__propertyName}>Resolution</p>
              <p className={styles.productPage__propertyValue}>
                {product.resolution}
              </p>
            </div>

            <div className={styles.productPage__property}>
              <p className={styles.productPage__propertyName}>Processor</p>
              <p className={styles.productPage__propertyValue}>
                {product.processor}
              </p>
            </div>

            <div className={styles.productPage__property}>
              <p className={styles.productPage__propertyName}>RAM</p>
              <p className={styles.productPage__propertyValue}>
                {product.ram}
              </p>
            </div>

            <div className={styles.productPage__property}>
              <p className={styles.productPage__propertyName}>
                Built in memory
              </p>
              <p className={styles.productPage__propertyValue}>
                {product.capacity}
              </p>
            </div>

            <div className={styles.productPage__property}>
              <p className={styles.productPage__propertyName}>Camera</p>
              <p className={styles.productPage__propertyValue}>
                {product.camera}
              </p>
            </div>

            <div className={styles.productPage__property}>
              <p className={styles.productPage__propertyName}>Zoom</p>
              <p className={styles.productPage__propertyValue}>
                {product.zoom}
              </p>
            </div>

            <div className={styles.productPage__property}>
              <p className={styles.productPage__propertyName}>Cell</p>
              {product.cell.map((c, i) => (
                <p key={i} className={styles.productPage__propertyValue}>
                  {c}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* YOU MAY ALSO LIKE */}
      <div className={styles.productPage__recomendation}>
        <div className={styles.productPage__content}>
          <h2 className={styles.productPage__title}>You may also like</h2>
          <SliderBtns products={products} setCurrent={setCurrent} />
        </div>

        <Slider products={products} current={current} />
      </div>
    </section>
  );
};
