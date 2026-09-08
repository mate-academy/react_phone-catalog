/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { Navigation } from '../../Header/Components/Navigation/Navigation';
import { NavIcons } from '../../Header/Components/NavigationIcons/NavIcons';
import { AnimatedLayout } from '../../shared/Shared_Components/AnimatedComponents/AnimatedLayout';
import { useAppDispatch } from '../../../app/hooks';
import { setIsOpened } from '../../../app/features/asideMenuSlice';

export const AsideMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  let width = window.innerWidth;

  const onResize = (e: Event) => {
    const target = e.target as Window;

    width = target.innerWidth;

    if (width > 639) {
      dispatch(setIsOpened(false));
    }
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <AnimatedLayout>
      <aside className="aside">
        <Navigation />

        <NavIcons />
      </aside>
    </AnimatedLayout>
  );
};
