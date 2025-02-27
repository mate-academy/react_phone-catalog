import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import {
  getProductById,
  getSuggestedProducts,
} from '../../services/productHelper';
import { useGlobalState } from '../../hooks/hooks';
import { getHexFromColorName } from '../../services/colorHelper';
import { ProductDetailed } from '../../types/ProductDetailed';
import { Product } from '../../types/Product';
import { ImagesSlider } from '../../components/ImagesSlider';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ToCartButton } from '../../components/ToCartButton';
import { ToFavButton } from '../../components/ToFavButton';
import { DetailsAbout } from '../../components/DetailsAbout';
import { DetailsTech } from '../../components/DetailsTech';
import { ProductsSlider } from '../../components/ProductsSlider';
import { BackNav } from '../../components/BackNav';
import { Loader } from '../../components/Loader';
import { ProductNotFound } from '../ProductNotFound';
import './ProductPage.scss';
import '../../styles/container.scss';

export const ProductPage = () => {
  const { products } = useGlobalState();
  const { productId, categoryName } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductDetailed | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (productId && categoryName) {
      setIsLoading(true);

      getProductById(categoryName, productId)
        .then(product => {
          if (product) {
            setSelectedProduct(product);
            setNotFound(false);
          } else {
            setNotFound(true);
          }
        })
        .finally(() => setIsLoading(false));

      getSuggestedProducts(categoryName).then(setSuggestedProducts);
    }
  }, [productId, categoryName]);

  const product = products.find(item => item.itemId === productId);

  type PathnameProps = {
    color: string;
    capacity: string;
  };

  const getPathname = ({ color: color, capacity: capacity }: PathnameProps) => {
    const normalizedColor = color.split(' ').join('-');
    const pathname = `${selectedProduct?.namespaceId}-${capacity.toLowerCase()}-${normalizedColor}`;

    return pathname;
  };

  if (isLoading) {
    return <Loader />;
  }

  if (notFound) {
    return <ProductNotFound />;
  }

  return (
    categoryName &&
    selectedProduct &&
    product && (
      <div className="details">
        <div className="container">
          <div className="details__content">
            <div className="details__nav">
              <Breadcrumb
                firstLevel={selectedProduct.name}
                secondLevel={categoryName}
              />
            </div>

            <div className="details__back">
              <BackNav />
            </div>

            <h2 className="details__title">{selectedProduct.name}</h2>
            <ImagesSlider images={selectedProduct.images} />
            <section className="details__info">
              <p className="details__text">Available colors</p>
              <div className="details__colors">
                {selectedProduct.colorsAvailable.map(color => (
                  <Link
                    to={`../${getPathname({ color: color, capacity: selectedProduct.capacity })}`}
                    className={classNames('details__color-link', {
                      'details__color-link--active':
                        selectedProduct.color === color,
                    })}
                    key={color}
                  >
                    <div
                      className="details__color"
                      style={{ backgroundColor: getHexFromColorName(color) }}
                    ></div>
                  </Link>
                ))}
              </div>
              <p className="details__id">ID: {product.id}</p>
              <p className="details__text">Select capacity</p>
              <div className="details__capacities">
                {selectedProduct.capacityAvailable.map(capacity => (
                  <Link
                    to={`../${getPathname({ color: selectedProduct.color, capacity: capacity })}`}
                    className={classNames('details__capacity', {
                      'details__capacity--active':
                        selectedProduct.capacity === capacity,
                    })}
                    key={capacity}
                  >
                    {capacity}
                  </Link>
                ))}
              </div>
              <div className="details__prices">
                <p className="details__price">
                  ${selectedProduct.priceDiscount}
                </p>
                <p className="details__full-price">
                  ${selectedProduct.priceRegular}
                </p>
              </div>
              <div className="details__buttons">
                <ToCartButton product={product} />
                <ToFavButton product={product} />
              </div>
              <ul className="details__specs">
                <li className="details__spec-item">
                  <p className="details__text">Screen</p>
                  <p className="details__spec">{selectedProduct.screen}</p>
                </li>
                <li className="details__spec-item">
                  <p className="details__text">Resolution</p>
                  <p className="details__spec">{selectedProduct.resolution}</p>
                </li>
                <li className="details__spec-item">
                  <p className="details__text">Processor</p>
                  <p className="details__spec">{selectedProduct.processor}</p>
                </li>
                <li className="details__spec-item">
                  <p className="details__text">RAM</p>
                  <p className="details__spec">{selectedProduct.ram}</p>
                </li>
              </ul>
            </section>

            <section className="details__about">
              <DetailsAbout description={selectedProduct.description} />
            </section>

            <section className="details__tech">
              <DetailsTech product={selectedProduct} />
            </section>

            <section className="details__slider">
              <ProductsSlider
                title="You may also like"
                productsForSlider={suggestedProducts}
                classMod="details"
              />
            </section>
          </div>
        </div>
      </div>
    )
  );
};
