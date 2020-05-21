
import React from 'react';

import './stripe.scss';

interface Image {
pictureUrl:string;
phoneName: string;
}


export const Stripe = ({images}:{images:Image[]}) => {
  return (
    <div>
      {images.map(image => (
        <img src={image.pictureUrl} alt={image.phoneName}/>
      ))}
    </div>
  )
}

