import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import classes from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const errerArray = Array(40).fill(4).concat(Array(40).fill(0));

  return (
    <>
      <main className={classes.container}>
        {errerArray.map(item => (
          // eslint-disable-next-line react/jsx-key
          <span className={classes.particle}>{item}</span>
        ))}

        <article className={classes.content}>
          <p>Damnit stranger,</p>
          <p>
            You got lost in the
            <strong className={classes.srtong}>{' 404 '}</strong>
            galaxy
          </p>

          <div className={classes.content__button}>
            <PrimaryButton link="/" text="Go back to earth" />
          </div>
        </article>
      </main>
    </>
  );
};
