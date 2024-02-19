import React from 'react';
import { ProductCard } from '../ProductCard';
import { Item } from '../../types/interface/Item';
import './Catalogue.scss';

interface CatalogueProps {
  items: Item[];
}

export const Catalogue: React.FC<CatalogueProps>
  = ({ items }) => {
    return (
      <div className="catalogue">
        {items.map((item) => (
          <ProductCard item={item} key={item.phoneId} />
        ))}
      </div>
    );
  };
