import React, { FC, useEffect, useState } from 'react';
import './ItemCard.scss';
import { Breadcrumbs } from '../Breadcrumbs';
import { useParams } from 'react-router-dom';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';

import { BackButton } from '../ButtonBack';
import { ButtonAdd } from '../ButtonAdd';

import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import { ButtonFavs } from '../ButtonFavs';
import { ItemInfo } from '../ItemInfo';
import { ItemAbout } from '../ItemAbout';
import { ItemTech } from '../ItemTech';
import { ProductsSlider } from '../ProductsSlider';
import productsFromServer from '../../../public/api/products.json';
import { getSuggestedProducts } from '../../utils/productHelper';
import { Product } from '../types/Product';

function getPhone(id?: string) {
  const list = phones.filter(product => product.id === id);
  const [product] = list;

  return product;
}

function getTablet(id?: string) {
  const list = tablets.filter(product => product.id === id);
  const [product] = list;

  return product;
}

function getAccessory(id?: string) {
  const list = accessories.filter(product => product.id === id);
  const [product] = list;

  return product;
}

export enum ProductType {
  PHONE = 'phone',
  TABLET = 'tablet',
  ACCESSORIES = 'accessories',
}

function getProduct(type: ProductType, id?: string) {
  switch (type) {
    case ProductType.PHONE:
      return getPhone(id);

    case ProductType.TABLET:
      return getTablet(id);

    case ProductType.ACCESSORIES:
      return getAccessory(id);
  }
}

type FilteredProducts = {
  namespaceId: string;
  capacity: string;
  color: string;
  id: string;
};

function getFilteredProducts(
  products: FilteredProducts[],
  namespaceId: string,
  capacity: string,
) {
  return products.filter(
    product =>
      product.namespaceId === namespaceId && product.capacity === capacity,
  );
}

function getFilteredProductsByCopacity(
  products: FilteredProducts[],
  namespaceId: string,
  color: string,
) {
  return products.filter(
    product => product.namespaceId === namespaceId && product.color === color,
  );
}

function parseAvailableItems(
  products: FilteredProducts[],
  category: Categories,
  isCapacity?: boolean,
) {
  return products.map(({ color, capacity, id }) => ({
    optionValue: isCapacity ? capacity : color,
    url: `../${category}/${id}`,
  }));
}

type Categories = 'phones' | 'tablets' | 'accessories';

function getAvailableProducts(
  category: Categories,
  namespaceId: string,
  capacity: string,
) {
  switch (category) {
    case 'phones':
      return getFilteredProducts(phones, namespaceId, capacity);
    case 'tablets':
      return getFilteredProducts(tablets, namespaceId, capacity);
    case 'accessories':
      return getFilteredProducts(accessories, namespaceId, capacity);
  }
}

function getAvailableProductsByCapacity(
  category: Categories,
  namespaceId: string,
  color: string,
) {
  switch (category) {
    case 'phones':
      return getFilteredProductsByCopacity(phones, namespaceId, color);
    case 'tablets':
      return getFilteredProductsByCopacity(tablets, namespaceId, color);
    case 'accessories':
      return getFilteredProductsByCopacity(accessories, namespaceId, color);
  }
}

function availableItems(
  category: Categories,
  namespaceId: string,
  capacity: string | undefined,
  color: string | undefined,
) {
  const items = capacity
    ? getAvailableProducts(category, namespaceId, capacity)
    : color
      ? getAvailableProductsByCapacity(category, namespaceId, color)
      : [];

  return parseAvailableItems(items, category, Boolean(color));
}

export const ItemCard: FC<{ type: ProductType }> = ({ type }) => {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(type, id);
  const p = (productsFromServer as Product[]).find(
    item => item.itemId === product.id,
  ) as Product;

  const availableColors = availableItems(
    product.category as Categories,
    product.namespaceId,
    product.capacity,
    undefined,
  );

  const availableCapacities = availableItems(
    product.category as Categories,
    product.namespaceId,
    undefined,
    product.color,
  );

  const [isMobile, setIsMobile] = useState(false);

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    product.camera && {
      title: 'Camera',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      value: product.camera,
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    product.zoom && {
      title: 'Zoom',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      value: product.zoom,
    },
    {
      title: 'Cell',
      value: product.cell,
    },
  ].filter(Boolean);

  const imagesOfGallery: ReactImageGalleryItem[] = product.images.map(image => {
    return {
      original: image,
      thumbnail: image,
      thumbnailHeight: 80,
      thumbnailWidth: 80,
    };
  });

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [product]);

  return (
    <>
      <div className="item">
        <div className="container container--with-paddings">
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
              thumbnailPosition={isMobile ? 'bottom' : 'left'}
              useTranslate3D={false}
              infinite={false}
              slideDuration={0}
            />

            <div className="item__info">
              <ItemInfo availibleData={availableColors} type={'color'} />
              <ItemInfo availibleData={availableCapacities} type={'capacity'} />

              <div className="item__info-buy">
                <div className="item__info-buy__wrapper">
                  <p className="item__info-buy__price">{`$${product.priceRegular}`}</p>
                  <p className="item__info-buy__price-with-discount">
                    {`$${product.priceDiscount}`}
                  </p>
                </div>

                <div className="item__info-buy__holder">
                  <ButtonAdd addedProduct={p} />
                  <ButtonFavs favourite={p} />
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
        </div>
        <div className="item__slider container container--mobile">
          <h2 className="item__title">You may also like</h2>
          <ProductsSlider
            products={getSuggestedProducts(productsFromServer)}
            fullPrice={true}
          />
        </div>
      </div>
    </>
  );
};
