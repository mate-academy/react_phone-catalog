import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Header } from '../../modules/shared/components/header';
import { Container } from '../../modules/shared/components/container';
import { Footer } from '../../modules/shared/components/footer';
import { Saidebar } from '../../modules/shared/components/sidebar';

import styles from './MainLayout.module.scss';

type Props = {
  children: React.ReactNode;
};

const classForAnimationMenu = {
  enter: styles.enterSidebar,
  enterActive: styles.enterActiveSidebar,
  exit: styles.exitSidebar,
  exitActive: styles.exitActiveSidebar,
};

export const MainLayout: React.FC<Props> = ({ children }) => {
  const [asaideIsOpen, setAsaideIsOpen] = useState(false);

  const clickOnMenu = () => setAsaideIsOpen(c => !c);

  return (
    <div className={styles.pageContent}>
      <Header onClickMenu={clickOnMenu} menuIsOpen={asaideIsOpen} />
      <h1 hidden>Product Catalog</h1>

      <CSSTransition
        in={asaideIsOpen}
        timeout={300}
        classNames={classForAnimationMenu}
        unmountOnExit
      >
        <Saidebar />
      </CSSTransition>

      <main className={styles.main}>
        <Container>{children}</Container>
      </main>

      <Footer />
    </div>
  );
};
