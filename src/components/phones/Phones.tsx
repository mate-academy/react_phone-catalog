import { useContext } from "react";
import { ContextApp } from "../../appContext/AppContext";
import { PhoneCard } from "./productCard";
import style from './Phones.module.scss'

export const Phones: React.FC = () => {
  const {phonesTotalNumber, phones} = useContext(ContextApp);
  return (
    <div className={style["phones"]}>
      <div className={style["phones__head"]}>
        <h1 className={style["phones__head__title"]}>Mobile phones</h1>
        <p className={style["phones__head__paragraph"]}>{phonesTotalNumber} models</p>
      </div>

      <div className={style["phones__filters"]}>
        <div className={style["phones__filters__sort"]}></div>
        <div className={style["phones__filters__items"]}></div>
      </div>

      <div className={style["phones__container"]}>
        {[...phones].map(phone => {
          return (
            <PhoneCard key={phone.id} product={phone} />
          )
        })}
      </div>
    </div>
  );
};
