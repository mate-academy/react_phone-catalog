import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const titles: Record<string, string> = {
  '/': 'Phone Catalog — phones, tablets and accessories',
  '/home': 'Phone Catalog — phones, tablets and accessories',
  '/phones': 'Mobile phones | Phone Catalog',
  '/tablets': 'Tablets | Phone Catalog',
  '/accessories': 'Accessories | Phone Catalog',
  '/favourites': 'Favourites | Phone Catalog',
  '/cart': 'Shopping cart | Phone Catalog',
  '/rights': 'Copyright | Phone Catalog',
};

export const Seo = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    document.title = titles[pathname] || 'Product | Phone Catalog';
  }, [pathname]);

  return null;
};
