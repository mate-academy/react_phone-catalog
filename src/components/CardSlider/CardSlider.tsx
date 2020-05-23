import React from 'react';

interface Props {
  cards: Good[];
  title: string;
}

export const CardSlider:React.FC<Props> = ({ cards, title }) => {
  console.log(cards);
  console.log(title);
  return (
    <ul className="Card">
      {cards.map(card => (
        
      ))}
    </ul>
  )
}
