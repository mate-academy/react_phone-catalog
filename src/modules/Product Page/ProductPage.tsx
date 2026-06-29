import React from 'react';
import { useState, useEffect } from 'react';
import Prod from './ProductPage.module.scss';
import { BreadCrumbs } from '../Shared/Breadcrumbs';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { NotFoundPage } from '../NotFoundPage';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Images } from './components/images';
import { RightSide } from './components/RightSide';
import { ProductCards } from '../Shared/Product cards';

type Props = {
  products: ProductDetails[];
  newestPhones2022?: Product[];
  loading: boolean;
  prod: Product[];
};
export const ProductPage: React.FC<Props> = ({
  products,
  newestPhones2022,
  loading,
  prod,
}) => {
  const { slug } = useParams<{ slug?: string }>();
  const [isLoading, setIsLoading] = useState(true);

  const isNewest2022 = newestPhones2022?.some(p => p.itemId === slug);
  const foundProduct = products.find(p => p.id === slug);
  const analogProducts = products.filter(
    p =>
      p.namespaceId === foundProduct?.namespaceId && p.id !== foundProduct?.id,
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={Prod.product}>
        <div className={Prod.product__content}>
          <div className={Prod.product__top}>
            {foundProduct && <BreadCrumbs product={foundProduct} />}
          </div>
          <Loader />
        </div>
      </div>
    );
  }

  if (!foundProduct) {
    return <NotFoundPage />;
  }

  return (
    <div className={Prod.product}>
      <div className="container">
        <div className={Prod.product__content}>
          <div className={Prod.product__top}>
            <BreadCrumbs product={foundProduct} />
            <Link to="../" className={Prod.product__back}>
              Back
            </Link>
          </div>
          <div className={Prod.product__main}>
            <h1 className={Prod.product__title}>{foundProduct.name}</h1>
            <Images product={foundProduct} />
            <RightSide
              product={foundProduct}
              analogProducts={analogProducts}
              isNewest2022={isNewest2022}
              prod={prod}
            />
          </div>
          <div className={Prod.product__bottom}>
            <div className={Prod.product__about}>
              <h2 className={Prod.product__about__title}>About</h2>
              <div className={Prod.product__about__content}>
                <div className={Prod.product__about__line}></div>
                {foundProduct.description.map(desc => (
                  <article
                    className={Prod.product__about__article}
                    key={desc.title}
                  >
                    <h3 className={Prod.product__about__subtitle}>
                      {desc.title}
                    </h3>
                    <p className={Prod.product__about__desc}>{desc.text}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className={Prod.product__specs}>
              <h2 className={Prod.product__about__title}>Tech specs</h2>
              <div className={Prod.specs__line}></div>
              <div className={Prod.specs__content}>
                <article className={Prod.specs__article}>
                  <p className={Prod.specs__subtitle}>Screen</p>
                  <p className={Prod.specs__desc}>{foundProduct.screen}</p>
                </article>
                <article className={Prod.specs__article}>
                  <p className={Prod.specs__subtitle}>Resolution</p>
                  <p className={Prod.specs__desc}>{foundProduct.resolution}</p>
                </article>
                <article className={Prod.specs__article}>
                  <p className={Prod.specs__subtitle}>Processor</p>
                  <p className={Prod.specs__desc}>{foundProduct.processor}</p>
                </article>
                <article className={Prod.specs__article}>
                  <p className={Prod.specs__subtitle}>RAM</p>
                  <p className={Prod.specs__desc}>{foundProduct.ram}</p>
                </article>
                <article className={Prod.specs__article}>
                  <p className={Prod.specs__subtitle}>Built in memory</p>
                  <p className={Prod.specs__desc}>{foundProduct.capacity}</p>
                </article>
                {foundProduct.camera && (
                  <article className={Prod.specs__article}>
                    <p className={Prod.specs__subtitle}>Camera</p>
                    <p className={Prod.specs__desc}>{foundProduct.camera}</p>
                  </article>
                )}
                {foundProduct.zoom && (
                  <article className={Prod.specs__article}>
                    <p className={Prod.specs__subtitle}>Zoom</p>
                    <p className={Prod.specs__desc}>{foundProduct.zoom}</p>
                  </article>
                )}
                <article className={Prod.specs__article}>
                  <p className={Prod.specs__subtitle}>Cell</p>
                  <p className={Prod.specs__desc}>
                    {foundProduct.cell.join(', ')}
                  </p>
                </article>
              </div>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <ProductCards
              title="You may also like"
              products={prod.sort((a, b) => b.year - a.year)}
              filterMode="all"
            />
          )}
        </div>
      </div>
    </div>
  );
};
