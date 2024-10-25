import './ArrowButton.scss';
import classNames from 'classnames';

interface Props {
  click: () => void;
  diraction: 'top' | 'left' | 'right' | 'bottom';
  disable: boolean;
}

export const ArrowButton: React.FC<Props> = ({ click, diraction, disable }) => {
  return (
    <button
      className={classNames('arrowButton', {
        'arrowButton--disabled': disable,
      })}
      onClick={() => click()}
    >
      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames(
          'arrowButton__img',
          `arrowButton__img--${diraction}`,
          { 'arrowButton__img--disabled': disable },
        )}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          // eslint-disable-next-line max-len
          d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z"
        />
      </svg>
    </button>
  );
};
