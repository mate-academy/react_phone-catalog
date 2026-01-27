import { useContext } from 'react';
import styles from './Message.module.scss';
import cn from 'classnames';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
import { ProductCatalogContext } from '../../../ProductCatalogContext';

export type MessageType = 'error' | 'emptyList';

interface Props {
  className?: string;
  category?: string;
  type: MessageType;
}

const Message: React.FC<Props> = ({ className, type, category }) => {
  const { t } = useTranslation();
  const { reloadProducts } = useContext(ProductCatalogContext);
  const errorMessage = type === 'error';
  const emptyListMessage = type === 'emptyList';

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
      {emptyListMessage && (
        <span>
          {t('messages.emptyList', { category: t('messages.' + category) })}
        </span>
      )}
    </p>
  );
};

export default Message;
