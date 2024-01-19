import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import { Counter } from './Counter';
import {
  DropDownMenuContext,
} from '../../../helpers/context/DropDownMenuContext';

type ImageLinkProps = {
  link: string
  imageSource: string
  alternativeName: string
  itemsCount: number
};

export const ImageLink = ({
  link,
  imageSource,
  alternativeName,
  itemsCount,
}: ImageLinkProps) => {
  const { collapseMenu } = useContext(DropDownMenuContext);

  return (
    <NavLink
      className="image-link"
      to={link}
      onClick={collapseMenu}
    >
      <img
        className="image-link__icon"
        src={imageSource}
        alt={alternativeName}
      />

      {itemsCount !== -1 && <Counter count={itemsCount} />}
    </NavLink>
  );
};
