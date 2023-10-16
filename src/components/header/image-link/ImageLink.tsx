import { NavLink } from 'react-router-dom';
import { Counter } from './Counter';

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
}: ImageLinkProps) => (
  <NavLink className="image-link" to={link}>
    <img
      className="image-link__icon"
      src={imageSource}
      alt={alternativeName}
    />

    {itemsCount !== -1 && <Counter count={itemsCount} />}
  </NavLink>
);
