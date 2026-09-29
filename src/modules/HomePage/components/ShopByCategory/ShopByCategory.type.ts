import React from 'react';

export interface CategoryConfig {
  id: string;
  title: string;
  path: string;
  img?: string;
  alt?: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ShopByCategoryProps {
  categoriesCount: Record<string, number>;
}
