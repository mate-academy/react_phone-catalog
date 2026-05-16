import React from 'react';
import styles from './CategoryCard.module.scss';
import '../../styles/App.scss';
import { NavLink } from 'react-router-dom';

interface CategoryCardProps {
  image: string;
  title: string;
  models: string;
  linkTo: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  image,
  title,
  models,
  linkTo,
}) => {
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <NavLink to={linkTo} className={styles.categoryCard} onClick={handleScroll}>
      <img
        src={`${image}`}
        alt={title}
        className={`${styles.categoryCard__image}`}
      />
      <h4 className={styles.categoryCard__title}>{title}</h4>
      <p className={styles.categoryCard__models}>{models}</p>
    </NavLink>
  );
};

export default CategoryCard;
