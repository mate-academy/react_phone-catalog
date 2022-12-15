import { FC } from 'react';
import './ToFavoritesButton.scss';

type Props = {
  width: string;
  height: string;
};

export const ToFavoritesButton: FC<Props> = ({ width, height }) => {
  const styles = {
    width,
    height,
  };

  return (
    <button
      type="button"
      className="to-favorites-button"
      aria-label="add-to-favorites"
      style={styles}
    />
  );
};
