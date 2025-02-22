import React, { FC, useEffect } from 'react';
import './ItemCard.scss';
import { Breadcrumbs } from '../Breadcrumbs';
import { useParams } from 'react-router-dom';
import phones from '../../../public/api/phones.json';
import { BackButton } from '../ButtonBack';
import { ButtonAdd } from '../ButtonAdd';

import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import { ButtonFavs } from '../ButtonFavs';
import { ItemInfo } from '../ItemInfo';
import { ItemAbout } from '../ItemAbout';
import { ItemTech } from '../ItemTech';
import { ProductsSlider } from '../ProductsSlider';
// import { Product } from '../types/Product';
import productsFromServer from '../../../public/api/products.json';
import { getRandomProducts } from '../../utils/productHelper';

function getPhone(id?: string) {
  const list = phones.filter(product => product.id === id);
  const [product] = list;

  return product;
}

// function getSimilaryProducts(products: Product[], year: number) {
//   const productsList = products.filter(product => {
//     product.year === year
//   })
// }

export enum ProductType {
  PHONE = 'phone',
  TABLET = 'tablet',
  //...
}

export const ItemCard: FC<{ type: ProductType }> = () => {
  const { id } = useParams<{ id: string }>();
  const product = getPhone(id);

  const itemsTech = [
    {
      title: 'Screen',
      value: product.screen,
    },
    {
      title: 'Resolution',
      value: product.resolution,
    },
    {
      title: 'Proccesor',
      value: product.processor,
    },
    {
      title: 'RAM',
      value: product.ram,
    },
    {
      title: 'Built in memory',
      value: product.capacity,
    },
    {
      title: 'Camera',
      value: product.camera,
    },
    {
      title: 'Zoom',
      value: product.zoom,
    },
    {
      title: 'Cell',
      value: product.cell,
    },
  ];

  const imagesOfGallery: ReactImageGalleryItem[] = product.images.map(image => {
    return {
      original: image,
      thumbnail: image,
      thumbnailHeight: 80,
      thumbnailWidth: 80,
    };
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <div className="item">
        <div className="container">
          <div className="item__navigation">
            <Breadcrumbs />
            <BackButton />
          </div>
          <h2 className="item__title">{`${product.name}`}</h2>

          <div className="item__details">
            <ImageGallery
              items={imagesOfGallery}
              showPlayButton={false}
              showFullscreenButton={false}
              showNav={false}
              thumbnailPosition={'left'}
              useTranslate3D={false}
              infinite={false}
              slideDuration={0}
            />

            <div className="item__info">
              <ItemInfo
                availibleData={product.colorsAvailable}
                type={'color'}
              />
              <ItemInfo
                availibleData={product.capacityAvailable}
                type={'capacity'}
              />

              <div className="item__info-buy">
                <div className="item__info-buy__wrapper">
                  <p className="item__info-buy__price">{`$${product.priceRegular}`}</p>
                  <p className="item__info-buy__price-with-discount">
                    {`$${product.priceDiscount}`}
                  </p>
                </div>

                <div className="item__info-buy__holder">
                  <ButtonAdd />
                  <ButtonFavs />
                </div>
              </div>

              <ItemTech itemsTech={itemsTech.slice(0, 4)} />
            </div>

            <div className="item__info-id">
              <span className="item__info-id__value">ID: 802390</span>
            </div>
          </div>

          <div className="item__characteristics">
            <ItemAbout about={product.description} />
            <ItemTech itemsTech={itemsTech} headline={'Tech specs'} />
          </div>

          <div className="item__slider">
            <h2 className="item__title">You may also like</h2>
            <ProductsSlider
              products={getRandomProducts(productsFromServer)}
              fullPrice={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};
