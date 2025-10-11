import { useLocation } from 'react-router-dom';
import './phones-title.scss';

const pageTitles: Record<string, { title: string; models: string }> = {
  '/phones': { title: 'Mobile Phones', models: '95' },
  '/tablets': { title: 'Tablets', models: '36' },
  '/accessories': { title: 'Accessories', models: '34' }
};

export const PhonesTitle = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname];

  if (!title) return null;

  return (
    <>
      <h1 className="phonestitle">{title.title}</h1>
      <p className="quantity">{`${title.models} models`}</p>
    </>
  );
};
