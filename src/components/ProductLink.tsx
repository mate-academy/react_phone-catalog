import { Link, LinkProps, useParams } from 'react-router-dom';
import { ProductCategory } from '../types/ProductCategory';
import { COLORS_MAP } from '../config';

type Props = Omit<LinkProps, 'to'> & {
  category: ProductCategory;
  color?: string;
  capacity?: string;
};

const getProductLink = ({
  productId,
  category,
  color,
  capacity,
}: {
  productId?: string;
  category: ProductCategory;
  color?: string;
  capacity?: string;
}) => {
  if (!productId) {
    return '';
  }

  const productIdParts = productId.split('-').filter(Boolean);

  const colors = Object.keys(COLORS_MAP);

  const foundColor = colors.find(item =>
    productIdParts.join('-').includes(item),
  );

  const colorPartsCount = foundColor?.split('-').length || 1;

  if (color && foundColor) {
    productIdParts.splice(
      productIdParts.length - colorPartsCount,
      colorPartsCount,
      color.replace(' ', '-'),
    );
  }

  if (capacity) {
    productIdParts[productIdParts.length - (colorPartsCount + 1)] = capacity;
  }

  return `/${category}/` + productIdParts.join('-').toLowerCase();
};

export const ProductLink = ({ children, capacity, color, category }: Props) => {
  const { productId } = useParams();

  const link = getProductLink({
    productId,
    category,
    color,
    capacity,
  });

  return <Link to={link}>{children}</Link>;
};
