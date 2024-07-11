import { ProductSlider } from '../../components/productSlider';
import styles from './ProductPage.module.scss';
import { BackButton } from '../../components/backButton';
import { useParams } from 'react-router-dom';
import { ProductInfo } from '../../types/ProductInfo';
import { ImagesSlider } from './сomponents/ImagesSlider';
import { VariableChars } from './сomponents/VariableChars';
import { AccentButton } from '../../components/accentButton';
import { SecondaryButton } from '../../components/secondaryButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { fetchProducts } from '../../features/products';
import { ProductCategory } from '../../types/ProductCategory';

type ProductType = 'products' | 'phones' | 'tablets' | 'accessories';

type Props = {
  type: ProductType;
};

export const ProductPage: React.FC<Props> = ({ type }) => {
  const dispatch = useAppDispatch();
  const { phones, tablets, accessories } = useAppSelector(
    state => state.products,
  );
  const { productId } = useParams<{ productId: string }>();

  let product: ProductInfo | undefined;
  let productsSlider: ProductInfo[] = [];

  useEffect(() => {
    switch (type) {
      case 'phones':
        dispatch(fetchProducts(ProductCategory.PHONES) as any);
        break;
      case 'tablets':
        dispatch(fetchProducts(ProductCategory.TABLETS) as any);
        break;
      case 'accessories':
        dispatch(fetchProducts(ProductCategory.ACCESSORIES) as any);
        break;
      default:
        break;
    }
  }, [dispatch, type]);

  if (type === 'phones') {
    product = phones.find(phone => phone.id === productId);
    productsSlider = phones;
  } else if (type === 'tablets') {
    product = tablets.find(tablet => tablet.id === productId);
    productsSlider = tablets;
  } else if (type === 'accessories') {
    product = accessories.find(accessor => accessor.id === productId);
    productsSlider = accessories;
  }

  return (
    <>
      <section className={styles.productpage}>
        <div className={styles.productpage__content}>
          <div className={styles.productpage__title_wrapper}>
            <BackButton />
            <h2 className={styles.productpage__title}>{product?.name}</h2>
          </div>

          <div className={styles.productpage__topLeft}>
            <ImagesSlider photos={product?.images} />
          </div>

          <div className={styles.productpage__topMiddle}>
            <VariableChars product={product} />

            <div className={styles.productpage__main}>
              <div className={styles.productpage__prices}>
                <h3 className={styles.productpage__price}>
                  ${product?.priceDiscount}
                </h3>
                <h3 className={styles.productpage__price_regular}>
                  ${product?.priceRegular}
                </h3>
              </div>

              <div className={styles.productpage__buttons}>
                {product && (
                  <AccentButton text="Add to cart" product={product} />
                )}
                {product && <SecondaryButton product={product} />}
              </div>
            </div>

            <div className={styles.productpage__informartion}>
              <div className={styles.productpage__info}>
                <p className={styles.productpage__techChar}>Screen</p>
                <h5 className={styles.productpage__techValue}>
                  {product?.screen}
                </h5>
              </div>

              <div className={styles.productpage__info}>
                <p className={styles.productpage__techChar}>Capacity</p>
                <h5 className={styles.productpage__techValue}>
                  {product?.capacity}
                </h5>
              </div>

              <div className={styles.productpage__info}>
                <p className={styles.productpage__techChar}>Processor</p>
                <h5 className={styles.productpage__techValue}>
                  {product?.processor}
                </h5>
              </div>

              <div className={styles.productpage__info}>
                <p className={styles.productpage__techChar}>RAM</p>
                <h5 className={styles.productpage__techValue}>
                  {product?.ram}
                </h5>
              </div>
            </div>
          </div>

          <div className={styles.productpage__bottom_left}>
            <h3 className={styles.productpage__titlemain}>About</h3>

            <div className={styles.productpage__divider}></div>

            {product?.description.map(description => (
              <div
                className={styles.productpage__descriptions}
                key={description.title}
              >
                <h4 className={styles.productpage__titledesc}>
                  {description.title}
                </h4>
                {description.text.map(text => (
                  <p className={styles.productpage__desc} key={text}>
                    {text}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.productpage__bottom_right}>
            <h3 className={styles.productpage__titlemain}>Tech specs</h3>

            <div className={styles.productpage__divider}></div>

            <div className={styles.productpage__techspecs}>
              <div className={styles.productpage__techspec}>
                <p className={styles.productpage__techname}>Screen</p>
                <p className={styles.productpage__techinfo}>
                  {product?.screen}
                </p>
              </div>

              <div className={styles.productpage__techspec}>
                <p className={styles.productpage__techname}>Processor</p>
                <p className={styles.productpage__techinfo}>
                  {product?.processor}
                </p>
              </div>

              <div className={styles.productpage__techspec}>
                <p className={styles.productpage__techname}>Resolution</p>
                <p className={styles.productpage__techinfo}>
                  {product?.resolution}
                </p>
              </div>

              <div className={styles.productpage__techspec}>
                <p className={styles.productpage__techname}>RAM</p>
                <p className={styles.productpage__techinfo}>{product?.ram}</p>
              </div>

              <div className={styles.productpage__techspec}>
                <p className={styles.productpage__techname}>Camera</p>
                <p className={styles.productpage__techinfo}>
                  {product?.camera}
                </p>
              </div>

              <div className={styles.productpage__techspec}>
                <p className={styles.productpage__techname}>Zoom</p>
                <p className={styles.productpage__techinfo}>{product?.zoom}</p>
              </div>

              <div className={styles.productpage__techspec}>
                <p className={styles.productpage__techname}>Cell</p>
                <p className={styles.productpage__techinfo}>{product?.cell}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.productpage__productslider}>
          <ProductSlider type="Brand new models" products={productsSlider} />
        </div>
      </section>
    </>
  );
};
