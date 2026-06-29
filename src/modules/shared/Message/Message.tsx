import styles from './Message.module.scss';

import { useContext } from 'react';
import cn from 'classnames';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
import { ProductCatalogContext } from '../../../ProductCatalogContext';

export type MessageType = 'error' | 'emptyList' | 'emptyCart';

interface Props {
  className?: string;
  text?: string;
  type: MessageType;
}

const Message: React.FC<Props> = ({ className, type, text }) => {
  const { t } = useTranslation();
  const { reloadProducts } = useContext(ProductCatalogContext);
  const errorMessage = type === 'error';
  const emptyListMessage = type === 'emptyList' || type === 'emptyCart';

  return (
    <p
      className={cn(styles.message, {
        [styles.message__error]: errorMessage,
        [styles.message__warning]: emptyListMessage,
        [className || '']: className,
      })}
    >
      {errorMessage && (
        <>
          <span>{t('messages.wrong')}</span>
          <Button
            text={t('messages.reload')}
            handleClick={reloadProducts}
            messageStyles
          />
        </>
      )}
      {emptyListMessage && <span>{text}</span>}
    </p>
  );
};

export default Message;
