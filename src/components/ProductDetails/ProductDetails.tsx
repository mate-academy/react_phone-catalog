import React, { memo, useEffect, useMemo, useState } from 'react';

import { ProductDetails as DetailsType } from '../../types/ProductDetails';
import { ProductDetailsSlider } from '../ProductDetailsSlider';
import { ProductSelection } from '../ProductSelection';
import { ProductActions } from '../ProductActions';
import { Specification } from '../Specification';
import { ProductAbout } from '../ProductAbout';
import { ProductTechSpecs } from '../ProductTechsSpec';
import { ProductsSection } from '../ProductsSection';

import { getShuffledProducts } from '../../utils/filters';

import './ProductDetails.scss';
import { API_URL } from '../../utils/api';

type Props = {
  details: DetailsType;
};

export const ProductDetails: React.FC<Props> = memo(({ details }) => {
  const [validImages, setValidImages] = useState<string[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  // prettier-ignore
  const {
    name,
    images,
    color,
    colorsAvailable,
    capacity,
    capacityAvailable,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    ram,
    processor,
    description,
    camera,
    zoom,
    cell,
    id,
  } = details;

  const specifications = useMemo(
    () => [
      ['Screen', screen],
      ['Resolution', resolution],
      ['Processor', processor],
      ['RAM', ram],
    ],
    [screen, resolution, processor, ram],
  );

  const techSpecs = useMemo(
    () => [
      ['Screen', screen],
      ['Resolution', resolution],
      ['Processor', processor],
      ['RAM', ram],
      ['Built in memory', capacity],
      ['Camera', camera],
      ['Zoom', zoom],
      ['Cell', cell.join(', ')],
    ],
    [screen, resolution, processor, ram, capacity, camera, zoom, cell],
  );

  useEffect(() => {
    setIsLoadingImages(true);
    const checkImage = (path: string) =>
      new Promise(resolve => {
        const img = new Image();

        img.onload = () => resolve(`${API_URL}/${path}`);
        img.onerror = () => resolve(null);
        img.src = `${API_URL}/${path}`;
      });

    Promise.all(images.map(checkImage))
      .then(paths => {
        setValidImages(paths.filter(Boolean) as string[]);
      })
      .finally(() => setIsLoadingImages(false));
  }, [images]);

  return (
    <section className="ProductDetails">
      <h1 className="ProductDetails__title">{name} (iMT9G2FS/A)</h1>

      <section className="ProductDetails__startBlock">
        <ProductDetailsSlider
          images={validImages}
          isLoading={isLoadingImages}
        />
        <ProductSelection
          selectedColor={color}
          colorsAvailable={colorsAvailable}
          selectedCapacity={capacity}
          capacityAvailable={capacityAvailable}
          productId={id}
        />

        <ProductActions
          fullPrice={priceRegular}
          discountPrice={priceDiscount}
          productId={id}
        />

        <section className="ProductDetails__specifications">
          {specifications.map(([key, value]) => (
            <Specification key={key} specification={[key, value]} />
          ))}
        </section>
        <span className="ProductDetails__id">ID: 802390</span>
      </section>

      <section className="ProductDetails__midBlock">
        <ProductAbout description={description} />
        <ProductTechSpecs techSpecs={techSpecs} />
      </section>

      <ProductsSection
        getSectionProducts={getShuffledProducts}
        title="You may also like"
        sectionName="suggestedModels"
        currentProductId={id}
      />
    </section>
  );
});
