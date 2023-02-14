import classNames from 'classnames';

type Props = {
  isSelected: boolean,
};

export const SelectedBannerIcon:React.FC<Props> = ({ isSelected }) => (
  <div
    className={classNames(
      'selected-banner__icon',
      { 'selected-banner__icon--selected': isSelected },
    )}
  >
    {}
  </div>
);
