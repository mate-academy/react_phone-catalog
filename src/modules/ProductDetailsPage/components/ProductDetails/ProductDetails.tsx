import { useRef, useState } from 'react';
import type { ProductFull } from '../../../../types/ProductFull';
import { About } from '../About';
import { MainControls } from '../MainControls';
import { Photo } from '../Photo';
import { PhotoPreviews } from '../PhotoPreviews';
import { TechSpecs } from '../TechSpecs';
import s from './ProductDetails.module.scss';
import { Swiper as SwiperType } from 'swiper';
import type { Product } from '../../../../types/Product';

type Props = {
  product: ProductFull;
  searchProduct: (
    namespaceId: string,
    color: string,
    capacity: string,
  ) => string | undefined;
  catalogProduct: Product | undefined;
};

export const ProductDetails = ({
  product,
  searchProduct,
  catalogProduct,
}: Props) => {
  const { name, images, description } = product;
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeImg, setActiveImg] = useState(images[0]);

  const handleThumbnailClick = (img: string, index: number) => {
    setActiveImg(img);
    swiperRef.current?.slideTo(index);
  };

  return (
    <div className={s.product}>
      <h2 className={s.product__title}>{name}</h2>
      <div className={s.product__photo}>
        <Photo
          images={images}
          swiperRef={swiperRef}
          activeImg={activeImg}
          onActiveImg={setActiveImg}
        />
      </div>
      <div className={s.product__photoPreviews}>
        <PhotoPreviews
          images={images}
          activeImg={activeImg}
          onActiveImg={handleThumbnailClick}
        />
      </div>
      <div className={s.product__mainControls}>
        <MainControls
          product={product}
          searchProduct={searchProduct}
          catalogProduct={catalogProduct}
        />
      </div>
      <div className={s.product__about}>
        <About description={description} />
      </div>
      <div className={s.product__techSpecs}>
        <TechSpecs product={product} />
      </div>
    </div>
  );
};
