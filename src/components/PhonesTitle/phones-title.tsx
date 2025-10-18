import { useLocation, useParams } from 'react-router-dom';
import './phones-title.scss';
import { useEffect, useState } from 'react';

const pageTitles: Record<string, { title: string; models: string }> = {
  '/phones': { title: 'Mobile Phones', models: '95' },
  '/tablets': { title: 'Tablets', models: '36' },
  '/accessories': { title: 'Accessories', models: '34' }
};

export const PhonesTitle = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname];
  const { productId } = useParams<{ productId: string }>();
  const [productName, setProductName] = useState();

  useEffect(() => {
    if (productId) {
      let url = '';
      if (location.pathname.includes('/phones')) {
        url = './api/phones.json';
      } else if (location.pathname.includes('/tablets')) {
        url = './api/tablets.json';
      } else if (location.pathname.includes('/accessories')) {
        url = './api/accessories.json';
      }

      if (url) {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const product = data.find((item: any) => item.id === productId);
            setProductName(product.name);
          });
      }
    }
  }, [productId, location.pathname]);

  if (!title && !productName) return null;

  return (
    <>
    {!productName 
    ? <>
   <h1 className="phonestitle">{title.title}</h1>
    <p className="quantity">{`${title.models} models`}</p>
    </>
    : <h1 className='idtitle'>{productName}</h1> 

  }
    </>
  );
};
