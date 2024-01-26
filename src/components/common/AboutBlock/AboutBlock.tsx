import React, { memo } from 'react';

import './AboutBlock.scss';
import { DescriptionItem } from '../../../definitions/types/ProductDetails';

interface Props {
  descriptions: DescriptionItem[],
  className?: string,
}

interface ItemProps {
  item: DescriptionItem,
}

export const AboutBlock: React.FC<Props> = memo(({
  descriptions,
  className,
}) => (
  <div className={`about-block ${className || ''}`}>
    <h2 className='about-block__title'>About</h2>

    <hr />

    <div className="about-block__content">
      {descriptions.map(item => <AboutBlockItem item={item} key={item.title}/>)}
    </div>
  </div>
));

const AboutBlockItem: React.FC<ItemProps> = memo(({ item }) => (
  <article className='about-block__item'>
    <h3 className='about-block__item-title'>{item.title}</h3>

    <div className='about-block__item-content'>
      {item.text.map(paragraph => (
        <p className='about-block__paragraph' key={paragraph}>{paragraph}</p>
      ))}
    </div>
  </article>
));
