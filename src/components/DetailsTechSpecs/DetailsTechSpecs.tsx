import React from 'react';
import { Phone } from '../../types/phone';
import { Tablet } from '../../types/tablet';
import { Accessory } from '../../types/accessory';

type Product = Phone | Tablet | Accessory;

type Props = {
  product: Product;
}

export const DetailsTechSpecs: React.FC<Props> = ({ product }) => {
  return (
    <>

      <div className='about__grid'>
        <div className='about__grid-el'>
          <h3>About</h3>
          <div className="card__line"></div>

          <h4>And then there was pro</h4>
          <p>
            A transformative triple‑camera system that adds tons of capability
            without complexity.
          </p>
          <p>
            An unprecedented leap in battery life. And a mind‑blowing chip that
            doubles down on machine learning and pushes the boundaries of what a
            smartphone can do. Welcome to the first iPhone powerful enough to be
            called Pro.
          </p>

          <h4>Camera</h4>
          <p>
            Meet the first triple‑camera system to combine cutting‑edge technology
            with the legendary simplicity of iPhone. Capture up to four times more
            scene. Get beautiful images in drastically lower light. Shoot the
            highest‑quality video in a smartphone — then edit with the same tools
            you love for photos. You’ve never shot with anything like it.
          </p>

          <h4>
            Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love
            it.
          </h4>
          <p>
            iPhone 11 Pro lets you capture videos that are beautifully true to life,
            with greater detail and smoother motion. Epic processing power means it
            can shoot 4K video with extended dynamic range and cinematic video
            stabilization — all at 60 fps. You get more creative control, too, with
            four times more scene and powerful new editing tools to play with.
          </p>
        </div>

        <div className='about__grid-el'>
          <h3>Tech specs</h3>
          <div className="card__line"></div>

          <div className="card__ram">
            <p className="card__ram-name">Screen</p>
            <p className="card__ram-info">{product.screen}</p>
          </div>

          <div className="card__ram">
            <p className="card__ram-name">Resolution</p>
            <p className="card__ram-info">{product.resolution}</p>
          </div>

          <div className="card__ram">
            <p className="card__ram-name">Processor</p>
            <p className="card__ram-info">{product.processor}</p>
          </div>

          <div className="card__ram">
            <p className="card__ram-name">RAM</p>
            <p className="card__ram-info">{product.ram}</p>
          </div>

          <div className="card__ram">
            <p className="card__ram-name">Built in memory</p>
            <p className="card__ram-info">{product.capacity}</p>
          </div>

          <div className="card__ram">
            <p className="card__ram-name">Camera</p>
            <p className="card__ram-info">{product.camera}</p>
          </div>

          <div className="card__ram">
            <p className="card__ram-name">Zoom</p>
            <p className="card__ram-info">{product.zoom}</p>
          </div>

          <div className="card__ram">
            <p className='card__ram-name'>Cell</p>
            <div style={{ display: 'flex', columnGap: '3px' }}>
              {product.cell.map((el, index) => (
                <p key={`${product.id}-cell-${index}`} className="card__ram-info">{el}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
