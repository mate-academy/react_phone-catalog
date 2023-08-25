import classNames from 'classnames';
import './IconButton.scss';

type Props = {
  iconClass: string,
};

export const IconButton: React.FC<Props> = ({ iconClass }) => {
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      type="button"
      className={classNames('icon-button', {
        [iconClass]: iconClass,
      })}
    />
  );
};
