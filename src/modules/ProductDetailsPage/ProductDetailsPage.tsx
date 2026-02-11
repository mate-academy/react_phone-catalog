import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../provider/GlobalProvider';
import cn from 'classnames';

import style from './ProductDetailsPage.module.scss';

import { getProduct } from '../../utils/fetchClient';
import { ProductDetails } from '../../types/ProductDetails';
import { Button } from '../shared/Button';
import { Price } from '../shared/Price';
import { AvailableCapacity } from './components/AvailableCapacity';
import { ProductsSlider } from '../../components/ProductsSlider';
import { AvailableColors } from './components/AvailableColors';
import { Specs } from '../../components/Specs';
import { OutlineBottom } from './components/OutlineBottom';
import { NotFound } from './components/NotFound';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { SkeletonInfo } from './SkeletonInfo';

import left from '../../../public/img/my-icon/back.svg';
import back from '../../../public/img/theme-dark/back.svg';
import { ThemeContext } from '../../provider/ThemeContextProvider';

export const ProductDetailsPage = ({ type }: { type: string }) => {
  const { productList } = useContext(StateContext);
  const { theme } = useContext(ThemeContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetails>();

  const [error, setError] = useState(false);
  const [skeleton, setSkeleton] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [productPhoto, setProductPhoto] = useState('');

  useEffect(() => {
    setNotFound(false);

    if (!productId) {
      setSkeleton(true);

      return;
    }

    getProduct(type, productId)
      .then(data => {
        if (!data) {
          setNotFound(true);

          return;
        }

        setProduct(data);
        setProductPhoto(data.images[0] || '');
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setSkeleton(false));
  }, [productId, type]);

  if (notFound) {
    return <NotFound />;
  }

  if (!product || skeleton) {
    return <SkeletonInfo />;
  }

  const handleVariable = (newColor?: string, newCapacity?: string) => {
    let colorItem = newColor;

    if (colorItem) {
      colorItem = colorItem.replace(' ', '-');
    }

    const capacity = (newCapacity || product.capacity)?.toLowerCase();
    const color = colorItem || product.color;

    navigate(`/${type}/${product.namespaceId}-${capacity}-${color}`);
  };

  const { screen, resolution, processor, ram, camera, zoom, cell, capacity } =
    product;

  const allSpecs = [
    { name: 'Screen', value: screen },
    { name: 'Resolution', value: resolution },
    { name: 'Processor', value: processor },
    { name: 'RAM', value: ram },
    { name: 'Built in memory', value: capacity },
    { name: 'Camera', value: camera },
    { name: 'Zoom', value: zoom },
    { name: 'Cell', value: cell.join(', ') },
  ];

  return (
    <div className={style.details}>
      <h1 hidden>Products details</h1>

      {error && <p> please try later</p>}

      <Breadcrumbs type={type} name={product.name} modifier="details" />

      <Link className={style.details__back} to={'../'}>
        <img
          className={style['details__back--Image']}
          src={theme === 'white' ? left : back}
        />
        <p className={style['details__back--text']}>Back</p>
      </Link>
      <h2 className={style.details__title}>{product.name}</h2>
      <div className={style.details__photo}>
        <img
          className={style['details__photo-image']}
          src={productPhoto}
          alt=""
        />
      </div>
      <div className={style.details__gallery}>
        {product.images.map(img => (
          <img
            className={cn(style['details__gallery-images'], {
              [style['details__gallery-images--active']]: productPhoto === img,
            })}
            src={img}
            alt=""
            key={img}
            onClick={() => setProductPhoto(img)}
          />
        ))}
      </div>
      <div className={style.details__main}>
        <AvailableColors product={product} handleVariable={handleVariable} />

        <AvailableCapacity product={product} handleVariable={handleVariable} />

        <div className={style.details__price}>
          <Price
            fullPrice={product.priceRegular}
            newPrice={product.priceDiscount}
            border={false}
          />
          <Button productId={product.id} />
        </div>

        <div className={style.details__specs}>
          {allSpecs.slice(0, 4).map(spec => (
            <Specs specs={spec} key={spec.name} />
          ))}
        </div>
      </div>

      <section className={style.details__about}>
        <h3 className={style['details__section-title']}>About</h3>
        <OutlineBottom modifier={'about'} />
        <div className={style.details__description}>
          {product.description.map(block => (
            <div
              className={style['details__description-section']}
              key={block.title}
            >
              <h4 className={style['details__description-title']}>
                {block.title}
              </h4>
              <p className={style['details__description-text']}>{block.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={style['details__tech-specs']}>
        <h3 className={style['details__section-title']}>Tech specs</h3>
        <OutlineBottom modifier={'about'} />
        <div
          className={`${style.details__specs} ${style['details__specs--tech']}`}
        >
          {allSpecs.map(spec => (
            <Specs specs={spec} key={spec.name} modifier="tech" />
          ))}
        </div>
      </section>
      <ProductsSlider
        title="You may also like"
        productList={productList}
        sort="random"
        modifier="product-cart"
      />
    </div>
  );
};
