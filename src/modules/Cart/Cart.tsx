import React, { FC } from 'react';

import { useModalWindow } from '../../hooks/useModalWindow';
import { Text } from '../shared/ui/Text';
import { ModalWrapper } from '../shared/ModalWrapper';
import { Container } from '../shared/Container';
import { LinkBack } from '../shared/LinkBack';
import { Warning } from './components/Warning';
import { Summary } from './components/Summary';
import { WarningProvier } from './WarningContext';
import classes from './cart.module.scss';

type Props = {};

export const Cart: FC<Props> = ({}) => {
  const modalWindow = useModalWindow(false);
  const [isModalOpen, setIsModalOpen] = modalWindow;

  const clsoeModal = () => setIsModalOpen(false);

  return (
    <Container className={classes.page}>
      <LinkBack className={classes.page__linkBack} />
      <Text.H1 element="h1" className={classes.page__title}>
        Cart
      </Text.H1>
      <WarningProvier value={modalWindow}>
        <Summary className={classes.page__info} />

        {isModalOpen && (
          <ModalWrapper onClose={clsoeModal}>
            <Warning />
          </ModalWrapper>
        )}
      </WarningProvier>
    </Container>
  );
};
