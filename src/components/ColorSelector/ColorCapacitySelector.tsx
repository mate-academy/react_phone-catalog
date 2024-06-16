import React, { useContext, useEffect, useState } from 'react';
import './ColorCapacitySelector.scss';
import { ProductContext } from '../../helpers/utils/productsContext';
import { Product } from '../../helpers/types/Product';
import { SelectorLink } from '../../helpers/types/SelectorLink';
import { SelectorColorItem } from '../SelectorColorItem';
import { SelectorCapacityItem } from '../SelectorCapacityItem';

type Props = {
  colorsAvailable: string[];
  capacityAvailable: string[];
  currentColor: string;
  currentCapacity: string;
  namespaceId: string;
};

function getDataToSelectorLinks(
  available: string[],
  products: Product[],
  namespaceId: string,
  current: string,
  selectBy: 'color' | 'capacity',
): SelectorLink[] {
  const filteredProducts = products.filter(product => {
    const { itemId, capacity, color } = product;

    if (selectBy === 'capacity') {
      return itemId.includes(namespaceId) && current === color;
    }

    return itemId.includes(namespaceId) && current === capacity;
  });

  const newSelectLinks = available.map(selector => {
    const productWithSelector = filteredProducts.find(prod => {
      if (selectBy === 'capacity') {
        return prod.capacity === selector;
      }

      return prod.color === selector;
    });

    return {
      selector,
      link: productWithSelector
        ? `../product/${productWithSelector.itemId}`
        : null,
    };
  });

  return newSelectLinks;
}

export const ColorCapacitySelector: React.FC<Props> = ({
  colorsAvailable,
  capacityAvailable,
  currentColor,
  currentCapacity,
  namespaceId,
}) => {
  const { products } = useContext(ProductContext);

  const [colorLinks, setColorLinks] = useState<SelectorLink[]>([]);
  const [capacityLinks, setCapacityLinks] = useState<SelectorLink[]>([]);

  useEffect(() => {
    if (products) {
      const newSelectorLinks = getDataToSelectorLinks(
        colorsAvailable,
        products,
        namespaceId,
        currentCapacity,
        'color',
      );

      const newCapacityLinks = getDataToSelectorLinks(
        capacityAvailable,
        products,
        namespaceId,
        currentColor,
        'capacity',
      );

      setColorLinks(newSelectorLinks);
      setCapacityLinks(newCapacityLinks);
    }
  }, [
    colorsAvailable,
    namespaceId,
    currentCapacity,
    currentColor,
    products,
    capacityAvailable,
  ]);

  return (
    <article className="color-capacity-selector">
      <h6 className="color-capacity-selector__title">Available colors</h6>
      <ul className="color-capacity-selector__list">
        {colorLinks.map(selectorLink => (
          <SelectorColorItem
            key={selectorLink.link}
            selector={selectorLink.selector}
            link={selectorLink.link}
            current={currentColor}
          />
        ))}
      </ul>

      <div className="color-capacity-selector__line" />

      <h6 className="color-capacity-selector__title">Select capacity</h6>
      <ul className="color-capacity-selector__list">
        {capacityLinks.map(capacityLink => (
          <SelectorCapacityItem
            key={capacityLink.link}
            selector={capacityLink.selector}
            link={capacityLink.link}
            current={currentCapacity}
          />
        ))}
      </ul>

      <div className="color-capacity-selector__line" />
    </article>
  );
};
