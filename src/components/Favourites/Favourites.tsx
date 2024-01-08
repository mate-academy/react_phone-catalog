/* eslint-disable max-len */
/* eslint-disable no-console */
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { storeGadgets, counter } from '../../store/store';
import { storage } from '../../support/utility';
import { CardGadget } from '../CardGadget';

export const Favourites:React.FC = () => {
  const { fav } = counter();
  const { list } = storeGadgets();
  const favouritesGadgetsID = storage.getAll('favourites');
  const gadgets = list.filter(item => (favouritesGadgetsID.includes(item.id) ? item : false));

  useEffect(() => {
    console.log(gadgets);
  }, [fav]);

  return (
    <section className="favourites flex flex-wrap gap-4 max-w-[1136px] mx-auto mt-10">
      {!gadgets.length && <p className="h1 text-altRed flex justify-center mx-auto">Favourites is empty</p>}
      {!!gadgets.length && gadgets.map(item => <CardGadget item={item} key={nanoid()} />)}
    </section>
  );
};
