import React from 'react';
import AddToCartButton from '../AddToCartButton';
import './ProductCard.scss'
import {Card} from '../../interfaces/Card'
import LikeButton from '../LikeButton';
import { HashLink } from 'react-router-hash-link';

export interface Props {
  card: Card;
}

export const ProductCard: React.FC<Props> = ({
  card,
}) => {

  return(
    <div className="card" key={card.id}>
        <HashLink smooth className='card__img-container'
          to={{
            pathname: `/${card.type}s/${card.id}`,
            hash: 'top'
          }}
        >
          <img
            alt=""
            width="100%"
            className="card__img"
            src={card.imageUrl}
          />
        </HashLink>
        <div className="card__info">
          <span className='body-text'>
            {card.name}
          </span>
          <div>
            <span className="h2">${card.price} </span>
            {card.discount !== 0 ?
              <span
                className="is_crossed h3 text_color_gray"
              >
                ${card.price + card.discount}
              </span>
              : ''
            }
          </div>
          <div className="hr" />
          <div className="info__characteristics">
            <div className="small-text text_color_gray">Screen</div>
            <div
              className="
                small-text
                characteristics__value_align_is-right
              "
            >
              {card.screen}
            </div>
            <div className="small-text text_color_gray">Capacity</div>
            <div
              className="
                small-text
                characteristics__value_align_is-right
              "
            >
              {card.capacity}
            </div>
            <div className="small-text text_color_gray">RAM</div>
            <div
              className="
                small-text
                characteristics__value_align_is-right
              "
            >
              {card.ram}
            </div>
          </div>
          <div className="card__quick-action-buttons-block row_gap_8px">
            <AddToCartButton idToAdd={card.id}/>
            <LikeButton id={card.id}/>
        </div>
      </div>
    </div>
  )
}