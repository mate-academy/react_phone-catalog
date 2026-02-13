import { useContext } from 'react';
import style from './productDetailCard.module.scss';
import cn from 'classnames';
import { ProductDetailContext } from '../../../../context/ProductDetailContext';
import { DetailGallery } from '../DetailGallery';
import { DetailFeatures } from '../DetailFeatures';
import { DetailInfo } from '../DetailInfo';
import { DetailTechlist } from '../DetailTechlist/DetailTechlist';

export const ProductDetailCard = () => {
  const { detailProduct } = useContext(ProductDetailContext);

  if (!detailProduct) {
    return;
  }

  const images = detailProduct?.images;

  return (
    <article className={cn(style['detail-card'])}>
      <div className={cn(style['detail-card__top'])}>
        {images && (
          <div className={cn(style['detail-card__gallery'])}>
            <DetailGallery images={images} />
          </div>
        )}
        <div className={cn(style['detail-card__features'])}>
          <DetailFeatures detailProdct={detailProduct} />
        </div>
      </div>
      <div className={cn(style['detail-card__info'])}>
        <DetailInfo description={detailProduct.description} />
      </div>
      <div className={cn(style['detail-card__tech-list'])}>
        <DetailTechlist detailProduct={detailProduct} />
      </div>
    </article>
  );
};
