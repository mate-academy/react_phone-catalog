import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { ItemDetails } from '../../components/ItemDetails';
import { useContext, useEffect, useState } from 'react';
import { getSelectedProduct } from '../../utils/FetchClient';
import { Gadgets } from '../../types/Gadgets';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductContext } from '../../components/Contexts/ProductsContext';
import { NotFound } from '../../components/NotFound';

export const ProductDetailsPage = () => {
  const { category, itemId } = useParams();
  const { products } = useContext(ProductContext);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [item, setItem] = useState<Gadgets | null>(null);

  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);

  const getItemDetails = () => {
    if (!category) {
      return;
    }

    getSelectedProduct(category)
      .then(items => {
        setItem(items.find(el => el.id === itemId) || null);
      })
      .catch(() => setError(true))
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    getItemDetails();
  }, [products, category, itemId]);

  return (
    <div className={styles.itemPage}>
      {item && <Breadcrumbs page={item.category} productName={item.name} />}

      <div className={styles.itemBackButton}>
        <div className="backPageButtons">
          <div className="backBtn">
            <span className="icon arrow" />
          </div>

          <button className="body-text grayText" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>

      {loading && <Loader />}

      {!loading && item && <ItemDetails item={item} />}

      {!loading && (!item || error) && (
        <div className={styles.productNotFound}>
          <NotFound
            title={'Product was not found'}
            imgSrc={'product-not-found.png'}
          />
          <img />
        </div>
      )}

      <div className={styles.productsSlider}>
        <div className={styles.slider}>
          <ProductsSlider itemsType={'Suggested'} title={'You may also like'} />
        </div>
      </div>
    </div>
  );
};
