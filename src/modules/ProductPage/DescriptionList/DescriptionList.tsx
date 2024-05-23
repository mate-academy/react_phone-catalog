import React from 'react';
import { Device } from '../../../types/Device';

type Props = {
  description: Device['description'];
};

export const DescriptionList: React.FC<Props> = React.memo(
  ({ description }) => {
    return (
      <>
        {description.map(descr => (
          <div key={descr.title} className="description">
            <h4 className="description__title">{descr.title}</h4>
            <div className="description__item-container">
              {descr.text.map(item => (
                <p key={item} className="description__item">
                  {item}
                </p>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  },
);
