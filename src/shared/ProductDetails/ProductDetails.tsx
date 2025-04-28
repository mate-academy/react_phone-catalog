import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetails.module.scss';
import { ProductService } from '../../services/product.service';
import { useEffect, useState } from 'react';
import { IProductDetails } from '../../interfaces/ProductDetails.interface';
import cn from 'classnames';
import ButtonAddToCart from '../Buttons/ButtonAddToCart';
import ButtonAddToFavorites from '../Buttons/ButtonAddToFavorites';
import Description from './components/Description';
import Recommendations from './components/Recommendations';
import { IProductCard } from '../../interfaces/ProductCard.interface';
import Breadcrumbs from '../Breadcrumbs';
import EmptyContent from '../EmptyContent';
import Loader from '../Loader';

const ProductDetails = () => {
  const { productId, category } = useParams();
  const navigate = useNavigate();
  const [productFull, setProductFull] =
    useState<IProductDetails | undefined>(undefined);
  const [product, setProduct] = useState<IProductCard | undefined>(undefined);
  const [isSelectedImg, setIsSelectedImg] =
    useState<string | undefined>(undefined);
  const [isSelectedColor, setIsSelectedColor] =
    useState<string | undefined>(undefined);
  const [isSelectedCapacity, setIsSelectedCapacity] =
    useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const handleClickColor = (color: string) => {
    const newProductId =
      `${productFull?.namespaceId}-${isSelectedCapacity?.toLowerCase()}-${color.replace(/\s+/g, '-')}`;

    navigate(`/${category}/${newProductId}`);
  };

  const handleClickCapacity = (capacity: string) => {
    const newProductId =
      `${productFull?.namespaceId}-${capacity.toLowerCase()}-${isSelectedColor?.replace(/\s+/g, '-')}`;

    navigate(`/${category}/${newProductId}`);
  };

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true);
      setError('');

      try {
        if (productId && category) {
          await new Promise(resolve => setTimeout(resolve, 300));

          const productFullData =
            await ProductService.getByProductIdDetails(productId, category);
          const productData = await ProductService.getByProductId(productId);

          setProductFull(productFullData);
          setProduct(productData);
          setIsSelectedImg(productFullData?.images[0]);
          setIsSelectedColor(productFullData?.color);
          setIsSelectedCapacity(productFullData?.capacity);
        }
      } catch(err) {
        setError('Product not found component');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId, category]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        !error && productFull ? (
          <>
            <Breadcrumbs
              categoryName={category}
              productName={productFull?.name}
            />

            <Link to={`/${category}`} className={styles.backLink}>
              <div className={styles.back}>
                <img
                  src="/images/icons/VectorLeft.png"
                  className={styles.back__img}
                />
                <h4>Back</h4>
              </div>
            </Link>

            <div className={styles.title}>{productFull?.name}</div>

            <div className={styles.main}>
              <div className={styles.images}>
                <div className={styles.images__small}>
                  {productFull?.images.map(image => (
                    <div key={image} className={cn(styles.images__smallBlock, {
                      [styles.images__smallBlock__selected]:
                        isSelectedImg === image,
                    })}>
                      <img src={`/${image}`} onClick={() => setIsSelectedImg(image)} />
                    </div>
                  ))}
                </div>
                <div className={styles.images__big}>
                  <img src={`/${isSelectedImg}`} />
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.details__colors}>
                  <h4>Available colors</h4>
                  <div className={styles.details__colorsBlock}>
                    {productFull.colorsAvailable.map(color => (
                      <div
                        key={color}
                        className={cn(styles.details__colorsPallet, {
                          [styles.details__colorsPallet__selected]:
                            isSelectedColor === color,
                        })}
                        style={{ background: color }}
                        onClick={() => handleClickColor(color)}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.details__capacity}>
                  <h4>Select capacity</h4>
                  <div className={styles.details__capacityBlock}>
                    {productFull.capacityAvailable.map(capacity => (
                      <div
                        key={capacity}
                        className={cn(styles.details__option, {
                          [styles.details__option__selected]:
                            isSelectedCapacity === capacity,
                        })}
                        onClick={() => handleClickCapacity(capacity)}
                      >{capacity}</div>
                    ))}
                  </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.details__price}>
                  <p className={styles.details__currentPrice}>{`$${productFull.priceDiscount}`}</p>
                  <p className={styles.details__fullPrice}>{`$${productFull.priceRegular}`}</p>
                </div>
                <div className={styles.details__buttons}>
                  <ButtonAddToCart product={product!}/>
                  <ButtonAddToFavorites product={product!}/>
                </div>
                <div className={styles.details__descriptions}>
                  <div>
                    <h3>Screen</h3>
                    <h4>{productFull.screen}</h4>
                  </div>
                  <div>
                    <h3>Resolution</h3>
                    <h4>{productFull.resolution}</h4>
                  </div>
                  <div>
                    <h3>Processor</h3>
                    <h4>{productFull.processor}</h4>
                  </div>
                  <div>
                    <h3>RAM</h3>
                    <h4>{productFull.ram}</h4>
                  </div>
                </div>
              </div>
            </div>

            <Description product={productFull}/>
            <Recommendations productCategory={productFull.category} />
          </>
        ) : (
          <EmptyContent
            img='/img/product-not-found.png'
            title='Product not found'
          />
        )
      )}
    </div>
  );
};

export default ProductDetails;
