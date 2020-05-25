import React from 'react';
import { Heading } from '../Heading/Heading';
import { Category } from './Category';

const categories: Category[] = [
  { title: 'Mobile phones', link: 'phones' },
  { title: 'Tablets', link: 'tablets' },
  { title: 'Accessories', link: 'accessories' },
];

export const Categories = () => {
  return (
    <>
      <Heading title="Shop by category" />
      <div className="categories">
        {categories.map(({ title, link }) => (
          <Category
            key={title}
            title={title}
            link={link}
          />
        ))}
      </div>
    </>
  );
};
