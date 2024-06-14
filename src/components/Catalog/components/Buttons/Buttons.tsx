import { useSearchParams } from 'react-router-dom';
import { ButtonWithErrow } from '../../../../components/UIKit/ButtonWithErrow';
import classNames from 'classnames';
import styles from './Buttons.module.scss';

type Props = {
  numberOfPages: number;
};

export const Buttons: React.FC<Props> = ({ numberOfPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPage = +(searchParams.get('page') || 1);

  const buttons = Array.from(Array(numberOfPages).keys());

  function handleButtonClick(newValue: number) {
    const params = new URLSearchParams(searchParams);

    params.set('page', `${newValue}`);
    setSearchParams(params);
  }

  return (
    <div className={styles.wrapper}>
      <ButtonWithErrow
        className={`${styles.button} button button--small`}
        onClick={() => {
          handleButtonClick(selectedPage - 1);
        }}
        disabled={selectedPage === 1}
      />
      <div className={styles.container}>
        {buttons.map(button => (
          <button
            key={button}
            className={classNames(`${styles.button} button button--small`, {
              'button--black': button + 1 === selectedPage,
            })}
            style={{
              transition: 'transform 3s',
              transform: `translateX(calc((-100% * ${Math.floor(selectedPage - 1)} - 8px * ${Math.floor(selectedPage - 1)}))`,
            }}
            onClick={() => {
              handleButtonClick(button + 1);
            }}
          >
            {button + 1}
          </button>
        ))}
      </div>
      <ButtonWithErrow
        className={`${styles.button} button button--small`}
        onClick={() => {
          handleButtonClick(selectedPage + 1);
        }}
        disabled={selectedPage === numberOfPages}
      />
    </div>
  );
};
