import { FC, useState, useEffect } from 'react';
import {
  useLocation,
  useParams,
} from 'react-router-dom';
import { Product } from '../../types/Product';
import { DetailsProduct } from '../../types/DetailsProduct';
import { useAppContext } from '../../context/AppContext';
import { getSuggestedProducts } from '../../api/fetchData';
import { sortProducts } from '../../helpers/sortProducts';
import { SortType } from '../../types/SortType';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ButtonBack } from '../../components/ButtonBack';

import './phoneDetails.scss';
import { Slider } from '../../components/Slider';
import { ColorsList } from '../../components/ColorList';
import { CapacityList } from '../../components/CapacityList';
import { ButtonAddToCart } from '../../components/ButtonAddToCart';
import { ButtonLike } from '../../components/ButtonLike';
import { CharacteristicProduct } from '../../components/CharacteristicProduct';
import { ProductsSlider } from '../../components/ProductsSlider';

const findProductById = (itemId = '', products: Product[]) => {
  return products.find(product => product.itemId === itemId);
};

type Props = {
  goods: Product[]
};

export const PhonesDetails: FC<Props> = ({ goods }) => {
  const [product, setProduct] = useState<DetailsProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const itemProduct = findProductById(product?.id, goods);
  const isProduct = product && itemProduct;
  const { productId = '' } = useParams();
  const { favorites, inCart, isSelectedProduct } = useAppContext();
  let isSelectedFav = false;
  let isSelectedInCart = false;

  if (isProduct) {
    isSelectedFav = isSelectedProduct(itemProduct?.itemId || '', favorites);
    isSelectedInCart = isSelectedProduct(itemProduct?.itemId || '', inCart);
  }

  const { pathname } = useLocation();

  const loadProduct = async () => {
    try {
      setIsLoading(true);

      const productById = await getSuggestedProducts(productId);

      setProduct(productById);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const randomlySortedGoods = sortProducts(goods, SortType.Random);

  let ram;
  let cellText;
  let techSpecs = { keys: [''], values: [''] };
  let charProd = { keys: [''], values: [''] };

  if (product) {
    ram = `${Number.parseInt(product.ram, 10)} GB`;
    cellText = product.cell.map(ch => ` ${ch}`);

    charProd = {
      keys: ['screen', 'resolution', 'processor', 'RAM'],
      values: [
        `${product.screen}`,
        `${product.resolution}`,
        `${product.processor}`,
        `${ram}`,
      ],
    };

    techSpecs = {
      keys: [
        'screen',
        'resolution',
        'processor',
        'RAM',
        'built in memory',
        'camera',
        'zoom',
        'cell',
      ],
      values: [
        `${product.screen}`,
        `${product.resolution}`,
        `${product.processor}`,
        `${ram}`,
        `${product.capacity}`,
        `${product.camera}`,
        `${product.zoom}`,
        `${cellText}`,
      ],
    };
  }

  return (
    <>
      {isLoading && (
        <div className="product-details__loader">
          <Loader />
        </div>
      )}

      {!isLoading && isProduct && (
        <div className="product-details">
          <div className="product-details__container">
            <div className="product-details__breadcrumbs">
              <Breadcrumbs />
            </div>
            <div className="product-details__back">
              <ButtonBack />
            </div>
            <div className="product-details__title title">{product.name}</div>

            <div className="product-details__content">
              <div className="product-details__top">
                <div className="product-details__slider">
                  <Slider images={product.images} />
                </div>
                <div className="product-details__action">
                  <div className="product-details__select">
                    <p className="product-details__small-text">
                      Available colors
                    </p>
                    <div className="product-details__select-buttons">
                      <ColorsList product={product} pathname={pathname} />
                    </div>
                  </div>

                  <div className="product-details__select">
                    <p className="product-details__small-text">
                      Select capacity
                    </p>
                    <div className="product-details__select-buttons">
                      <CapacityList product={product} pathname={pathname} />
                    </div>
                  </div>
                  <div className="product-details__price-box">
                    <span className="product-details__discount">
                      {`$${product.priceDiscount}`}
                    </span>
                    <span className="product-details__regular">
                      {`$${product.priceRegular}`}
                    </span>
                  </div>
                  <div className="product-details__actions-button">
                    <div className="product-details__cart-button">
                      <ButtonAddToCart
                        product={itemProduct}
                        isSelected={isSelectedInCart}
                      />
                    </div>
                    <ButtonLike
                      product={itemProduct}
                      isSelected={isSelectedFav}
                    />
                  </div>

                  <div className="product-details__characteristic">
                    <CharacteristicProduct charProd={charProd} />
                  </div>
                </div>
              </div>

              <div className="product-details__botom">
                <div className="product-details__description">
                  <h2 className="product-details__subtitle">About</h2>

                  <div className="product-details__info">
                    {product.description.map(el => (
                      <div className="product-details__info-box" key={el.title}>
                        <h3 className="product-details__info-title">
                          {el.title}
                        </h3>
                        <p className="product-details__info-text">{el.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="product-details__tech-specs">
                  <h2 className="product-details__subtitle">Tech specs</h2>

                  <div className="product-details__characteristic">
                    <CharacteristicProduct charProd={techSpecs} />
                  </div>
                </div>
              </div>
            </div>
            <ProductsSlider
              products={randomlySortedGoods}
              title="You may also like"
            />
          </div>
        </div>
      )}
    </>
  );
};
