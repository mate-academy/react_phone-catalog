import cn from 'classnames';
import style from './detailInfo.module.scss';
import React from 'react';
import { Boundary } from '../../../shared/components/Boundary';

interface Props {
  description: {
    title: string;
    text: string[];
  }[];
}

export const DetailInfo: React.FC<Props> = React.memo(({ description }) => {
  return (
    <div className={cn(style.info)}>
      <div className={cn(style['info__about-content'])}>
        <h3 className={cn(style.info__title)}>About</h3>
        <Boundary />
      </div>

      {description.map(({ title, text }) => (
        <div key={title} className={cn(style['info__about-content'])}>
          <h4 className={cn(style['info__about-title'])}>{title}</h4>
          <p className={cn(style['info__about-text'])}>{text}</p>
        </div>
      ))}
    </div>
  );
});

DetailInfo.displayName = 'DetailInfo';
