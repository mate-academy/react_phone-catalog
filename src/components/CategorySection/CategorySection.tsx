import React from 'react';
import './CategorySection.scss';

interface CategorySectionProps {
  title: string;
  image: string;
  categoryLink: string;
  itemCount: number;
  id: number;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  image,
  categoryLink,
  itemCount,
  id,
}) => {
  const categoryClass = `category-section__image-container--${id}`;

  return (
    <div className="category-section">
      <div className="category-section__content">
        <a href={categoryLink} className="category-section__link">
          <div className={`category-section__image-container ${categoryClass}`}>
            <img src={image} alt={title} className="category-section__image" />
          </div>
          <h3 className="category-section__title">{title}</h3>
          <p className="category-section__count">{itemCount} models</p>
        </a>
      </div>
    </div>
  );
};
