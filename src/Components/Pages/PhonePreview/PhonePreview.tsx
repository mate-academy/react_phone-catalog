import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PhonesPageInfo } from '../../PhonesPageInfo/PhonesPageInfo';

export const PhonePreview: FC = () => {
  const [item, setItem] = useState(null);
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://mate-academy.github.io/react_phone-catalog/_new/products/${id}.json`, { method: 'GET' });
        const body = await res.json();

        setItem(body);
      } catch (err) {
        <h1>Error</h1>;
      }
    };

    fetchData();
  }, [id]);

  const handleColorClick = (color: string) => {
    const url = `/phones${id}-${color}`;

    navigate(url);
  };

  const hendleGBclick = (capacity: string) => {
    const url = `/phones${id}-${capacity}-`;

    navigate(url);
  };

  return (
    <PhonesPageInfo
      onGBclick={hendleGBclick}
      info={item}
      onColorClick={handleColorClick}
      priceRegular={0}
      priceDiscount={1}
    />
  );
};
