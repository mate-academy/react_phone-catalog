import React from 'react';
import './ShopCategory.scss';
import { Link } from 'react-router-dom';
import { sectionsLinks } from '../../helpers';

interface Props {
  cards: Good[];
}

export const ShopCategory: React.FC<Props> = ({ cards }) => {
  const imageWidth = 368;
  const imageGap = 16;
  const imageCount = 3;

  return (
    <div
      className="Category"
      style={{
        width: `${imageWidth * imageCount + (imageGap * (imageCount - 1))}px`,
      }}
    >
      <div className="Category__Title">
        <p className="Category__Title-text">
          Shop by category
        </p>
      </div>
      <div className="Category__Container">
        <ul className="Category__List">
          {sectionsLinks.map(link => (
            <li className="Category__Item" key={link.imgUrl}>
              <Link to={link.url} className="Category__Link">
                <div className="Category__Image-container">
                  <img
                    src={link.imgUrl}
                    alt={link.alt}
                    className="Category__Image"
                  />
                </div>

                <div className="Category__Info">
                  <p className="Category__Title-type Category__Paragraph">
                    {link.title}
                  </p>
                  <p className="Category__Title-count Category__Paragraph">
                    {cards.filter(card => card.type === link.type).length}
                    {' '}
                    models
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
