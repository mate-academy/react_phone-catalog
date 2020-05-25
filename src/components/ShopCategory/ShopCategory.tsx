import React from 'react';
import './ShopCategory.scss';
import { Link } from 'react-router-dom';
import { sectionsLinks } from '../../helpers';

interface Props {
  cards: Good[];
}

export const ShopCategory: React.FC<Props> = ({ cards }) => (
  <div
    className="Category"
  >
    <h2 className="Category__Title">
      Shop by category
        </h2>
    <div className="Category__Container">
      <ul className="Category__List">
        {sectionsLinks.map(link => (
          <li
            className="Category__Item"
            key={link.name}
          >
            <Link to={link.url} className="Category__Link">
              <div
                className="Category__ImageContainer"
              >
                <img
                  src={link.imgUrl}
                  alt={link.title}
                  className="Category__Image"
                />
              </div>

              <div className="Category__Info">
                <h3 className="Category__InfoType Category__Paragraph">
                  {link.title}
                </h3>
                <p className="Category__InfoCount Category__Paragraph">
                  {cards.filter(card => card.type === link.type).length}
                  {' models'}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

