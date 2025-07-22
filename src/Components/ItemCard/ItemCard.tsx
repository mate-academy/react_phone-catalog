import { useParams } from 'react-router-dom';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import productsFromServer from '../../../public/api/products.json';
import { FC, useEffect, useState } from 'react';
import { ItemSelector } from '../ItemSelector';
import { Product } from '../types/Product';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import { Breadcrumbs } from '../BreadCrumbs';
import { ButtonBack } from '../ButtonBack';
import './ItemCard.scss';
import { ButtonAddToCart } from '../ButtonAdd';
import { ButtonFavourite } from '../ButtonFav';
import { ItemTech } from '../ItemTech';
import { Description } from '../ItemDescription';
import { ProductsSlider } from '../ProductsSlider';
import { getSuggestedProducts } from '../../utils/productsHelper';

type Categories = 'phones' | 'tablets' | 'accessories';

type FilteredProduct = {
  namespaceId: string;
  capacity: string;
  color: string;
  id: string;
};

// Функції пошуку
export function getPhone(id?: string) {
  const list = phones.filter(p => p.id === id);
  const [product] = list;

  return product;
}

export function getTablet(id?: string) {
  const list = tablets.filter(p => p.id === id);
  const [product] = list;

  return product;
}

export function getAccessory(id?: string) {
  const list = accessories.filter(p => p.id === id);
  const [product] = list;

  return product;
}

export enum ProductType {
  PHONE = 'phone',
  TABLET = 'tablet',
  ACCESSORY = 'accessory',
}

// Універсальна
function getProduct(type: ProductType, id?: string) {
  switch (type) {
    case ProductType.PHONE:
      return getPhone(id);
    case ProductType.TABLET:
      return getTablet(id);
    case ProductType.ACCESSORY:
      return getAccessory(id);
  }
}

function getFilteredProductsByCapacity(
  products: FilteredProduct[],
  namespaceId: string,
  capacity: string,
) {
  return products.filter(
    product =>
      product.namespaceId === namespaceId && product.capacity === capacity,
  );
}

function getFilteredProductsByColor(
  products: FilteredProduct[],
  namespaceId: string,
  color: string,
) {
  return products.filter(
    product => product.namespaceId === namespaceId && product.color === color,
  );
}

function parseAvailableItems(
  products: FilteredProduct[],
  category: Categories,
  isCapacity?: boolean,
) {
  return products.map(({ color, capacity, id }) => ({
    optionValue: isCapacity ? capacity : color,
    url: `../${category}/${id}`,
  }));
}

function getAvailableProductsByCapacity(
  category: Categories,
  namespaceId: string,
  capacity: string,
) {
  switch (category) {
    case 'phones':
      return getFilteredProductsByCapacity(phones, namespaceId, capacity);
    case 'tablets':
      return getFilteredProductsByCapacity(tablets, namespaceId, capacity);
    case 'accessories':
      return getFilteredProductsByCapacity(accessories, namespaceId, capacity);
  }
}

function getAvailableProductsByColor(
  category: Categories,
  namespaceId: string,
  color: string,
) {
  switch (category) {
    case 'phones':
      return getFilteredProductsByColor(phones, namespaceId, color);
    case 'tablets':
      return getFilteredProductsByColor(tablets, namespaceId, color);
    case 'accessories':
      return getFilteredProductsByColor(accessories, namespaceId, color);
  }
}

function availableItem(
  category: Categories,
  namespaceId: string,
  capacity: string | undefined,
  color: string | undefined,
) {
  const item = capacity
    ? getAvailableProductsByCapacity(category, namespaceId, capacity)
    : color
      ? getAvailableProductsByColor(category, namespaceId, color)
      : [];

  return parseAvailableItems(item, category, Boolean(color));
}

// Головний компонент
export const ItemCard: FC<{ type: ProductType }> = ({ type }) => {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(type, id);
  const p = (productsFromServer as Product[]).find(
    item => item.itemId === product.id,
  ) as Product;
  const [isMobile, setIsMobile] = useState(false);

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

  if (!product) {
    return <p>Product not found</p>;
  }

  const availableColors = availableItem(
    product.category as Categories,
    product.namespaceId,
    product.capacity,
    undefined,
  );
  const availibleCapacities = availableItem(
    product.category as Categories,
    product.namespaceId,
    undefined,
    product.color,
  );

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
      title: 'Processor',
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
      title: 'cell',
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

  return (
    <div className="itemCard">
      <div className="itemCard__container">
        <div className="itemCard__navigation">
          <Breadcrumbs />
          <ButtonBack />
        </div>
        <h2 className="itemCard__title">{`${product.name}`}</h2>

        <div className="itemCard__details">
          <ImageGallery
            items={imagesOfGallery}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
            thumbnailPosition={isMobile ? 'bottom' : 'left'}
            useTranslate3D={false}
            infinite={false}
            slideDuration={0}
          />

          <div className="itemCard__info">
            <ItemSelector availibleData={availableColors} type={'color'} />
            <ItemSelector
              availibleData={availibleCapacities}
              type={'capacity'}
            />

            <div className="itemCard__info--buy">
              <div className="itemCard__info--buy__wrapper">
                <p className="itemCard__info--buy__regular">{`$${product.priceRegular}`}</p>
                <p className="itemCard__info--buy__discount">{`$${product.priceDiscount}`}</p>
              </div>

              <div className="itemCard__info--buy--buttons">
                <ButtonAddToCart addedProduct={p} />
                <ButtonFavourite favourite={p} />
              </div>
            </div>

            <ItemTech itemTech={itemsTech.slice(0, 4)} variant="page" />
          </div>
          {/* <div className="itemCard__info--id">
            <span className="itemCard__info--id__value">ID: 802390</span>
          </div> */}
        </div>
        <div className="itemCard__characteristic">
          <Description about={product.description} />
          <div className="itemCard__characteristic--itemTech">
            <ItemTech
              itemTech={itemsTech}
              headline={'Tech specs'}
              variant="page"
            />
          </div>
        </div>
        <div className="item__slider container container--mobile">
          <h2 className="itemCard__title--slider">You may also like</h2>
          <ProductsSlider
            products={getSuggestedProducts(productsFromServer)}
            fullPrice={true}
          />
        </div>
      </div>
    </div>
  );
};
