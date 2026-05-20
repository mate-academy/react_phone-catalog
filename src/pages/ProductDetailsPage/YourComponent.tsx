import { Phone, Tablet, Accessories } from '../../Interface';

type Props = {
  product: Phone | Tablet | Accessories | null;
};

export const YourComponent = ({ product }: Props) => {
  const getPageTitle = () => {
    if (product?.category === 'phones') {
      return 'Phones';
    }

    if (product?.category === 'tablets') {
      return 'Tablets';
    }

    if (product?.category === 'accessories') {
      return 'Accessories';
    }

    return 'Products';
  };

  return <p className="home--nav-top">{getPageTitle()}</p>;
};
