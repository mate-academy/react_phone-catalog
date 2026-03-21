import { useParams } from 'react-router-dom';
import style from './ProductDetailsPage.module.scss';
import { useProductDetails } from '../../hook/useProductDetails';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Icon } from '../../components/ui/Icon/Icon';
import { Gallery } from './Galery';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const {
    selectedProsuct,
    product,
    // eslint-disable-next-line
    suggested,
    // eslint-disable-next-line
    setProductImage,
    // eslint-disable-next-line
    productImage,
    isLoading,
  } = useProductDetails(productId);

  return (
    <div className={style.productDetails}>
      <Breadcrumbs
        category={selectedProsuct?.category}
        productName={selectedProsuct?.name}
      />

      <button className={style.productDetails__buttonBack}>
        <Icon className={style.productDetails__iconBack} nameIcon="left" />
        <span className={style.productDetails__back}>Back</span>
      </button>

      {!isLoading && product && (
        <>
          <h2 className={style.productDetails__title}>
            {selectedProsuct?.name}
          </h2>

          <div className={style.productDetais__galery}>
            <Gallery images={product?.images} />
          </div>
        </>
      )}
    </div>
  );
};
