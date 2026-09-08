import React, { useMemo } from 'react';
import style from './ProductPage.module.scss';
import { Nav } from '../ProductsPage/components/Nav';
import { Link, useParams } from 'react-router-dom';
import { DetailedProduct } from '../../types/DetailedProduct';
import cn from 'classnames';
import { ProductCards } from '../shared/ProductCards.tsx';
import prods from '../../../public/api/products.json';
import { Product } from '../../types/Product';
import { Gallery } from './components/Gallery';
import { Purchase } from './components/Purchase';
import { Specs } from './components/Specs';
import { NotFoundPage } from '../NotFoundPage';
import { CartProduct } from '../../types/CartProduct';

type Props = {
  products: DetailedProduct[];
};

export const ProductPage: React.FC<Props> = ({ products }) => {
  const { product } = useParams<{ product?: string }>();

  const foundProduct = useMemo(() => {
    if (!product) {
      return null;
    }

    return products.find(p => p.id === product);
  }, [product, products]);

  if (!foundProduct) {
    return <NotFoundPage type="product" />;
  }

  const favProduct = prods.find(p => p.itemId === product);

  if (!favProduct) {
    return;
  }

  const cartProduct: CartProduct = {
    ...favProduct,
    quantity: 1,
  };

  const analogProducts = products.filter(
    p => p.namespaceId === foundProduct.namespaceId && p.id !== foundProduct.id,
  );
  const alsoLike: Product[] = analogProducts
    .map(p => prods.find(prod => prod.name === p.name))
    .filter((p): p is Product => Boolean(p));

  return (
    <div className={style.product__outer}>
      <div className={style.product} key={foundProduct.id}>
        <div className="container">
          <div className={style.product__content}>
            <div className={style.product__top}>
              <Nav product={foundProduct} />
              <div className={style.product__header}>
                <Link to="../" className={style.product__back}>
                  back
                </Link>
                <h1 className={style.product__title}>{foundProduct.name}</h1>
              </div>
              <div className={style.product__main}>
                <Gallery product={foundProduct} />
                <Purchase
                  product={foundProduct}
                  analogProducts={analogProducts}
                  favProduct={favProduct}
                  cartProduct={cartProduct}
                />
              </div>
            </div>
            <div className={style.product__bottom}>
              <div className={cn(style.product__about, style.about)}>
                <h2 className={style.about__title}>About</h2>
                <div className={style.about__details}>
                  <div className={style.about__line}></div>
                  {foundProduct.description.map(desc => (
                    <div className={style.about__detail} key={desc.title}>
                      <h3 className={style.about__subtitle}>{desc.title}</h3>
                      <p className={style.about__desc}>{desc.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Specs product={foundProduct} />
            </div>
          </div>
        </div>
      </div>
      <ProductCards title="You may also like" products={alsoLike} />
    </div>
  );
};
