import { SecondaryButton } from '../SecondaryButton';
import classNames from 'classnames';
import errorStyles from './SomethingWentWrongError.module.scss';

type Props = {
  errorMessage: string;
  actionText: string;
  onAction: () => void;
};

export const SomethingWentWrongError = ({
  errorMessage,
  actionText,
  onAction,
}: Props) => (
  <div className={classNames(errorStyles.SomethingWentWrongError, 'container')}>
    <h2
      className={classNames(
        'font-h2',
        errorStyles.SomethingWentWrongErrorTitle,
      )}
    >
      Oops! Something went wrong
    </h2>

    <p
      className={classNames(
        'font-body',
        errorStyles.SomethingWentWrongErrorMessage,
      )}
    >
      {errorMessage}
    </p>

    <div className={errorStyles.SomethingWentWrongErrorButton}>
      <SecondaryButton onClick={onAction}>{actionText}</SecondaryButton>
    </div>
  </div>
);
