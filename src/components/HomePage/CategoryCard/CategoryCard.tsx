import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCardStyle.scss';

interface Props {
  title: string;
  subTitle: number;
  imgUrl: string;
  UrlTo: string;
}

const CategoryCard: React.FC<Props> = ({ title, subTitle, imgUrl, UrlTo }) => {
  return (
    <Link className="categories__section " to={UrlTo}>
      <img className="categories__image" src={imgUrl} />
      <div className="categories__text">
        <h4 className="categories__text--title">{title}</h4>
        <div className="categories__text--sub-title">{subTitle} Models</div>
      </div>
    </Link>
  );
};

export default CategoryCard;
