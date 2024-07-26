import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductDetails } from '../../shared/types/ProductDetails';
import { getProductDetail } from '../../utils/httpClient';
import { ImageContent } from './ImageContent/ImageContent';
import './ProductDetailsPage.scss';
import { ActionPannel } from './ActionPannel/ActionPannel';
import { ProductContext } from '../../shared/Context/ProductContext';
import { Techspecs } from './Techspecs/Techspecs';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { getSuggestedProducts } from '../../shared/servises';
import { Product } from '../../shared/types/Product';
import { Loader } from '../../components/Loader/Loader';

export const ProductDetailsPage: React.FC = () => {
  const { pathname } = useLocation();
  const [productDetail, setProductDetail] = useState<ProductDetails | null>(
    null,
  );
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { products } = useContext(ProductContext);

  const paths = pathname.slice(1).split('/');
  const productId = paths[1];
  const category = paths[0];

  useEffect(() => {
    const randomProducts = getSuggestedProducts(products, productId);

    setSuggestedProducts(randomProducts);
  }, [products, productId]);

  useEffect(() => {
    setLoading(true);
    const loadTimeout = setTimeout(() => {
      getProductDetail(category)
        .then(data => data.find(item => item.id === productId) || null)
        .then(newProduct => setProductDetail(newProduct))
        .catch(() => {
          setError('Product was not found');
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(loadTimeout);
  }, [productId, category]);

  const productFromStorage = products.find(
    item => item.itemId === productDetail?.id,
  );
  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="detailsPage">
      <div className="detailsPage__block">
        <div className="detailsPage__navigation detailsPage__navigation-top">
          <Link to="/">
            <div className="icon icon--home"></div>
          </Link>
          <div className="icon icon--arrow-right"></div>
          <Link to={`/${category}`} className="detailsPage__navigation-link">
            <p className="detailsPage__navigation-title">{category}</p>
          </Link>
          <div className="icon icon--arrow-right"></div>
          <p className="detailsPage__navigation-product">
            {productDetail?.name}
          </p>
        </div>
        <div className="detailsPage__navigation">
          <Link to=".." className="detailsPage__navigation-link">
            <div className="icon icon--arrow-left"></div>
          </Link>
          <Link to=".." className="detailsPage__navigation-link">
            <p className="detailsPage__navigation-title">{'Back'}</p>
          </Link>
        </div>

        {error && (
          <>
            <p className="productsList__error">{error}</p>
            <button
              type="button"
              className="productsList__reload"
              onClick={reload}
            >
              Reload
            </button>
          </>
        )}

        <h2 className="detailsPage__name">
          {error ? '' : productDetail?.name}
        </h2>
        {loading && <Loader />}
        {!loading && productDetail && (
          <>
            <ImageContent
              images={productDetail.images}
              itemName={productDetail.name}
            />

            <ActionPannel product={productDetail} pathname={pathname} />

            <div className="detailsPage__id">
              <p>{`ID: ${productFromStorage?.id}`}</p>
            </div>
            <div className="detailsPage__description">
              <div className="detailsPage__description__block">
                <h3 className="detailsPage__description__block-title">About</h3>
                <div className="detailsPage__description__block-line" />

                {productDetail.description.map((item, index) => (
                  <div
                    key={index + item.title}
                    className="detailsPage__description__block"
                  >
                    <h3 className="detailsPage__description__block-title">
                      {item.title}
                    </h3>
                    <p className="detailsPage__description__block-text">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Techspecs itemDetails={productDetail} />
          </>
        )}
      </div>
      {!loading && (
        <ProductSlider title="You may also like" products={suggestedProducts} />
      )}
    </div>
  );
};
