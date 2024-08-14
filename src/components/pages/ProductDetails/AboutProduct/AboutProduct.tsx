import React from "react";
import {useAppSelector} from "../../../../app/hooks";
import {nanoid} from "nanoid";

export const AboutProduct: React.FC = () => {
  const selectedProduct = useAppSelector(
    state => state.selectedProduct.selectedProduct,
  );

  const {
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
    capacityAvailable,
    description = [],
  } = selectedProduct || {};

  const specs = [
    {name: "Screen", value: screen},
    {name: "Resolution", value: resolution},
    {name: "Processor", value: processor},
    {name: "RAM", value: ram},
    {name: "Built in memory", value: capacityAvailable?.join(", ")},
    {name: "Camera", value: camera},
    {name: "Zoom", value: zoom},
    {name: "Cell", value: cell?.join(", ")},
  ];

  return (
    <aside className="about__product">
      <div className="about">
        <h3 className="about__product__title">About</h3>

        <div className="about__description">
          {description.map(item => {
            const {title, text} = item;

            return (
              <div key={nanoid()}>
                <h4 className="about__description__title">{title}</h4>

                {text.map(paragraph => (
                  <p key={nanoid()} className="about__description__text">
                    {paragraph}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="tech-specs">
        <h3 className="about__product__title">Tech Specs</h3>

        <div className="tech-specs__description">
          <ul className="tech-specs__description__list">
            {specs.map(spec => {
              const {name, value} = spec;

              return (
                <li className="tech-specs__description__item" key={name}>
                  <span className="tech-specs__description__item__name">
                    {name}
                  </span>
                  <span className="tech-specs__description__item__value">
                    {value}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
};
