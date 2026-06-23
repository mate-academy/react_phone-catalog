/* eslint-disable max-len */
import { CategoryData } from '../../types/CategoryData';
import React from 'react';
import { Link } from 'react-router-dom';
import { getImage } from '../../store/getImage';

interface Props {
  data: CategoryData;
}

export const Category: React.FC<Props> = ({ data }) => {
  const { title, link, img, amountItems } = data;

  return (
    <div className="flex flex-col gap-8">
      <Link to={`/${link}`}>
        <div className="rounded-lg overflow-hidden w-full">
          <img className="object-cover h-full w-full" src={getImage(img)} alt={title} />
        </div>
      </Link>
      <div>
        <h3 className="text-[20px] font-semibold text-[#0F0F11] mb-2">{title}</h3>
        <p className="text-[#89939A]">{amountItems} models</p>
      </div>
    </div>
  );
};
