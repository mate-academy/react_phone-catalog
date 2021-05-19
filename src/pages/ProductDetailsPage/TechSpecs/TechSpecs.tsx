import React from 'react';
import './TechSpecs.scss';

type TechSpecsType = {
  screen: string;
  resolution: string;
  camera: string;
  flash: string;
  ram: string;
  bluetooth: string;
  cpu: string;
  wifi: string;
};

export const TechSpecs: React.FC<TechSpecsType> = ({
  screen,
  resolution,
  cpu,
  camera,
  flash,
  ram,
  bluetooth,
  wifi,
}) => (

  <div className="TechSpecsInfo-TechSpecs">
    <h2 className="TechSpecs-Title">Tech Specs</h2>

    <div>
      <div className="TechSpecs-Block">
        <div className="TechSpecs-Name">
          Screen
        </div>
        <div className="TechSpecs-Value">
          {screen}
        </div>
      </div>

      <div className="TechSpecs-Block">
        <div className="TechSpecs-Name">
          Resolution
        </div>
        <div className="TechSpecs-Value">
          {resolution}
        </div>
      </div>

      <div className="TechSpecs-Block">
        <div className="TechSpecs-Name">
          Camera
        </div>
        <div className="TechSpecs-Value">
          {camera}
        </div>
      </div>

      <div className="TechSpecs-Block">
        <div className="TechSpecs-Name">
          Flash
        </div>
        <div className="TechSpecs-Value">
          {flash}
        </div>
      </div>

      <div className="TechSpecs-Block">
        <div className="TechSpecs-Name">
          RAM
        </div>
        <div className="TechSpecs-Value">
          {ram}
        </div>
      </div>

      <div className="TechSpecs-Block">
        <div className="TechSpecs-Name">
          Bluetooth
        </div>
        <div className="TechSpecs-Value">
          {bluetooth}
        </div>
      </div>

      <div className="TechSpecs-Block">
        <div className="TechSpecs-Name">
          CPU
        </div>
        <div className="TechSpecs-Value">
          {cpu}
        </div>
      </div>

      <div className="TechSpecs-Block">
        <div className="TechSpecs-Name">
          Wi-Fi
        </div>
        <div className="TechSpecs-Value">
          {wifi}
        </div>
      </div>
    </div>
  </div>
);
