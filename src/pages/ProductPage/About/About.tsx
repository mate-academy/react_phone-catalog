
import React from 'react';
import './About.scss';

export const About = ({description}:{description: string}) => {

  return (
    <div className="About">
 <h2 className="About__title">About</h2>
 <span className="About__horisont"></span>
    <article className="About__article">
      {description}
    </article>

    </div>

  )
}
