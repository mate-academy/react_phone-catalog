import React from 'react';

type TechSpecsProps = {
  goodDetails: GoodDetails,
}

export const TechSpecs: React.FC<TechSpecsProps> = ({ goodDetails }) => {
  return (
    <section className="tech-specs">
      <h2 className="tech-specs__title">Tech specs</h2>

      <ul className="tech-specs__list">
        <li className="tech-specs__item">
          <span className="tech-specs__item-title">Screen</span>
          <span className="tech-specs__value">{goodDetails.display.screenSize}</span>
        </li>
        <li className="tech-specs__item">
          <span className="tech-specs__item-title">Resolution</span>
          <span className="tech-specs__value">{goodDetails?.display.screenResolution}</span>
        </li>
        <li className="tech-specs__item">
          <span className="tech-specs__item-title">Processor</span>
          <span className="tech-specs__value">{goodDetails.hardware.cpu}</span>
        </li>
        <li className="tech-specs__item">
          <span className="tech-specs__item-title">RAM</span>
          <span className="tech-specs__value">{goodDetails.storage.ram}</span>
        </li>
        <li className="tech-specs__item">
          <span className="tech-specs__item-title">Camera</span>
          <span className="tech-specs__value">{goodDetails.camera.primary}</span>
        </li>
        <li className="tech-specs__item">
          <span className="tech-specs__item-title">Cell</span>
          <span className="tech-specs__value">{goodDetails.connectivity.cell}</span>
        </li>
      </ul>
    </section>
  )
}
