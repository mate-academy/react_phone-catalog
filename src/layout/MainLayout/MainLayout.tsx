import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Header } from '../../modules/shared/components/header';
import { Container } from '../../modules/shared/components/container';
import { Footer } from '../../modules/shared/components/footer';
import { Sidebar } from '../../modules/shared/components/sidebar';

import styles from './MainLayout.module.scss';
import { SwitchThemeButton } from './components/switchThemeButton';

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

  const nodeRef = useRef(null);

  return (
    <div className={styles.pageContent}>
      <Header onClickMenu={clickOnMenu} menuIsOpen={asaideIsOpen} />
      <h1 hidden>Product Catalog</h1>

      <CSSTransition
        in={asaideIsOpen}
        timeout={300}
        classNames={classForAnimationMenu}
        nodeRef={nodeRef}
        unmountOnExit
      >
        <Sidebar ref={nodeRef} />
      </CSSTransition>

      <main className={styles.main}>
        <Container>{children}</Container>
        <SwitchThemeButton />
      </main>

      <Footer />
    </div>
  );
};
