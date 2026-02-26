import classNames from "classnames";
import styles from "./LikeButton.module.scss";
import React, { useContext } from "react";
import {
  DispatchContext,
  StateContext,
} from "../../providers/GlobalStateProvider";
import { getAssetPath } from "../../utils";

const iconsPath = {
  heart: getAssetPath("img/general/icons/heart.svg"),
  redHeart: getAssetPath("img/general/icons/red-heart.svg"),
};

interface Props {
  id: number;
}

export const LikeButton: React.FC<Props> = ({ id }) => {
  const { favoriteIds } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const isFavoriteId = favoriteIds.some(card => card.id === id);

  const addFavorite = () => {
    if (isFavoriteId) {
      dispatch({ type: "REMOVE_FAVORITE", payload: id });

      return;
    }

    dispatch({ type: "ADD_FAVORITE", payload: id });
  };

  return (
    <button
      className={classNames(styles.like, {
        [styles.addedToFavorite]: isFavoriteId,
      })}
      onClick={addFavorite}
    >
      {isFavoriteId ? (
        <img className="action__icon" src={iconsPath.redHeart} alt="heart" />
      ) : (
        <img className="action__icon" src={iconsPath.heart} alt="heart" />
      )}
    </button>
  );
};
