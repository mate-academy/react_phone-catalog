import React from 'react';

import './DescriptionContant.scss';

type Props = {
  itemDetails: {
    map(
      arg0: (
        desc: { title: string; text: string[] },
        index: number,
      ) => import('react/jsx-runtime').JSX.Element,
    ): React.ReactNode;
  };
};

const DescriptionContant: React.FC<Props> = ({ itemDetails }) => {
  return (
    <div className="DescriptionContant">
      <div className="DescriptionContant__block">
        <h3 className="DescriptionContant__block-title">About</h3>
        <div className="DescriptionContant__block-line" />

        {itemDetails.map(
          (desc: { title: string; text: string[] }, index: number) => (
            <div key={index} className="DescriptionContan__block">
              <h4 className="DescriptionContant__block-title">{desc.title}</h4>
              {desc.text.map((paragraph, idx) => (
                <p key={idx} className="DescriptionContant__block-text">
                  {paragraph}
                </p>
              ))}
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default DescriptionContant;
