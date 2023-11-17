import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { appContext } from '../Contexts/AppContext';
import { api } from '../api/api';
import { typographyStyle } from '../CustomStyles/Typography';

export const ItemCard = () => {
  const { currentItem, setCurrentItem } = useContext(appContext);
  const { itemId, catalogueId } = useParams();

  useEffect(() => {
    setCurrentItem(null);
    const data = api.getInfo.phone(itemId);

    data.then(setCurrentItem);
  }, []);

  return (
    <>
      <div className="col-span-full">
        <Link
          className={`flex w-min items-center gap-1 text-Secondary ${typographyStyle.smallText}`}
          to={`/catalogue/${catalogueId}`}
        >
          <img src="/Icons/Chevron (Arrow Left).svg" alt="back" />
          Back
        </Link>

        <hr className="mb-4 border-0" />

        <h1 className={typographyStyle.h1}>{currentItem?.name}</h1>
      </div>
    </>
  );
};
