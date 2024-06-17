import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProduct } from '../../api/product';
import { productItem } from '../../utils/utils';
import styles from './ProductPage.module.scss';

import {
  Breadcrumb,
  BreadcrumbBack,
} from '../../components/Breadcrumb/Breadcrumb';
import { TechSpecs } from '../../components/TechSpecs';
import { Pictures } from './components/Pictures/Pictures';
import { Details } from './components/Details/Details';
import { ProductSlider } from '../../components/ProductSlider';
import { ProductContext } from '../../store/ProductContext';
import { ErrorText } from '../../constants/errorText';
import { Loader } from '../../components/Loader';
import { Error } from '../../components/Error';
import { ProductDescription } from './components/ProductDescription';
import { getRecomended } from '../../utils/getRecommended';

export const ProductPage = () => {
  const { pathname } = useLocation();
  const category = pathname.split('/')[1];
  const [error, setError] = useState<ErrorText | ''>('');
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState<Product>({
    id: '',
    category: '',
    namespaceId: '',
    name: '',
    capacityAvailable: [],
    capacity: '',
    priceRegular: 0,
    priceDiscount: 0,
    colorsAvailable: [],
    color: '',
    images: [],
    description: [],
    screen: '',
    resolution: '',
    processor: '',
    ram: '',
    camera: '',
    zoom: '',
    cell: [],
  });
  const [mainImg, setMainImg] = useState(product.images[0]);
  const { products } = useContext(ProductContext);
  const { productID } = useParams();

  const navigate = useNavigate();

  //#region getProduct
  useEffect(() => {
    setLoading(true);
    getProduct(category, productID)
      .then(productFromServer => {
        if (!productFromServer) {
          setError(ErrorText.noProduct);
        } else {
          setProduct(productFromServer);
          setMainImg(productFromServer.images[0]);
        }
      })
      .catch(() => {
        setError(ErrorText.default);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productID, category, navigate]);
  //#endregion

  const productTitle = productItem.getTitle(productID);
  const recomendedProducts = getRecomended(products, product, product.category);

  return (
    <section className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <Error errorText={error} />
          ) : (
            <div>
              <div className={styles.gridContainer}>
                {product && (
                  <>
                    <div className={styles.location}>
                      <Breadcrumb productName={productTitle} />
                      <BreadcrumbBack />
                    </div>

                    <h1 className={`${styles.title} text--section-title`}>
                      {productTitle}
                    </h1>

                    <div className={styles.pictures}>
                      <Pictures
                        images={product.images}
                        mainImg={mainImg}
                        onMainImgChange={(newImg: string) => {
                          setMainImg(newImg);
                        }}
                      />
                    </div>

                    <div className={styles.details}>
                      <div className={styles.details__id}>
                        <p className="text--grey">ID: 802390</p>
                      </div>
                      <div className={styles.details__container}>
                        <Details product={product} />
                      </div>
                    </div>
                    <article className={styles.info}>
                      <p
                        className={`${styles.sectionTitle} text--category-title  border--bottom`}
                      >
                        About
                      </p>
                      <ProductDescription description={product.description} />
                    </article>

                    <article className={styles.techSpecs}>
                      <p
                        className={`${styles.sectionTitle} text--category-title  border--bottom`}
                      >
                        Tech specs
                      </p>
                      <div className={styles.techSpecs}>
                        <TechSpecs
                          techSpecs={{
                            screen: product.screen,
                            resolution: product.resolution,
                            processor: product.processor,
                            RAM: product.ram,
                            capacity: product.capacity,
                            camera: product.camera,
                            zoom: product.zoom,
                            cell: product.cell,
                          }}
                          parentElement="productPage"
                        />
                      </div>
                    </article>
                  </>
                )}
              </div>
              <div className={styles.slider}>
                <ProductSlider
                  products={recomendedProducts}
                  sectionTitle={'Recommended products'}
                  displayFullPrize={true}
                />
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};
