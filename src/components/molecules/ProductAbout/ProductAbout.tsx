import React from 'react';
import { Typography } from '../../atoms/Typography/Typography';

type DescriptionPart = {
  title: string;
  text: string[];
};

type Props = {
  description: DescriptionPart[];
};

export const ProductAbout: React.FC<Props> = ({ description }) => (
  <div>
    <Typography
      level="h3"
      className="pb-[16px] border-b-[1px] border-elements"
    >
      About
    </Typography>
    {description.map(({ title, text }) => (
      <React.Fragment key={title}>
        <Typography
          level="h4"
          className="pt-[32px]"
        >
          {title}
        </Typography>
        {text.map((textPart) => (
          <Typography
            key={textPart}
            level="body"
            className="pt-[16px] text-secondary"
          >
            {textPart}
          </Typography>
        ))}
      </React.Fragment>
    ))}
  </div>
);
