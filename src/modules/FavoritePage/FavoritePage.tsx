import React from "react";
import style from './FavoritePage.module.scss';

export const FavoritePage: React.FC = () => {
  return (
    <div className={style.favorite}>
      <div className={style.wrapper}>
        <div className={style.navigation}>
          <img src="#" alt="home icon" />
          <img src="!" alt="arrow right icon" />
          <p className={style.navTitle}>Favourite</p>
        </div>

        <div className={style.pageInfo}>
          <h1 className={style.title}>Favourites</h1>
          <p className={style.description}>5 items</p>
        </div>

        <div className={style.container}>
          {/*Cart map*/}
        </div>
      </div>
    </div>
  )
}
