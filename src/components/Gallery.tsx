import React, {useState} from 'react';
import { Phone } from '../interfaces';

interface Props {
  activePhone: Phone;
}

export const Gallery: React.FC<Props> = ({ activePhone }) => {
  const [activeSrc, setActiveSrc] = useState(activePhone.imageUrl)

  const handleClick = (url: string) => {
    setActiveSrc(url);
  }

  return (
    <div className="gallery__img-wrapper">
    <ul className="gallery__img-list">
      {
        activePhone.details?.images.map(img => (
          <li key={img} className="gallery__item">
            <img
              className="gallery__image"
              src={img}
              alt={activePhone.name}
              onClick={() => handleClick(img)}
            />
          </li>
        ))
      }
    </ul>
  <img className="gallery__main-image" src={activeSrc} alt={activePhone.name}/>
  </div>
  )
}
