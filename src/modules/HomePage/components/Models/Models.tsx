/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { CardsContext } from '../../../../context/CardsContext/CardsContext';
import { MainContext } from '../../../../context/MainContext/MainContext';
import { ProductsContext } from '../../../../context/ProductsContext';
import { HOT_PRICES_TITLE, MODELS_TITLE } from '../../constants/ProductTitle';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { DESKTOP_MI, MOBILE_MI, TABLET_MI } from './constants/MarginInline';
import styles from './Models.module.scss';

interface Props {
  title: string;
}

export const Models: React.FC<Props> = React.memo(({ title }) => {
  // #region context

  const { isTablet, isDesktop } = useContext(MainContext);
  const { getCardWidth } = useContext(ProductsContext);
  const {
    mCardIndex,
    setMCardIndex,
    hpCardIndex,
    setHpCardIndex,
    ymalCardIndex,
    setYmalCardIndex,
  } = useContext(CardsContext);

  // #endregion
  // #region states

  const cardIndex = useMemo(() => {
    if (title === MODELS_TITLE) {
      return mCardIndex;
    }

    if (title === HOT_PRICES_TITLE) {
      return hpCardIndex;
    }

    return ymalCardIndex;
  }, [mCardIndex, hpCardIndex, ymalCardIndex]);

  const setCardIndex = useMemo(() => {
    if (title === MODELS_TITLE) {
      return setMCardIndex;
    }

    if (title === HOT_PRICES_TITLE) {
      return setHpCardIndex;
    }

    return setYmalCardIndex;
  }, []);

  const [transformValue, setTransformValue] = useState<string>('0');

  // #endregion
  // #region functions

  const getMarginInline = useCallback(
    (isItForTransform = false) => {
      if (isDesktop) {
        return isItForTransform ? MOBILE_MI : DESKTOP_MI;
      }

      if (isTablet) {
        return isItForTransform ? MOBILE_MI : TABLET_MI;
      }

      return MOBILE_MI;
    },
    [isDesktop, isTablet],
  );

  // #endregion
  // #region useEffects

  useEffect(() => {
    if (isTablet && !isDesktop) {
      const startValue = `-1 * (${getCardWidth()} + ${TABLET_MI})`;
      const nextValue = `(-1 * ${cardIndex - 1} * (${getCardWidth()} + ${getMarginInline(true)}) + ${startValue})`;

      if (cardIndex === 0) {
        setTransformValue('0');

        return;
      }

      if (cardIndex === 1) {
        setTransformValue(`calc(${startValue})`);

        return;
      }

      setTransformValue(`calc(${nextValue})`);

      return;
    } else {
      setTransformValue(
        `calc(-1 * ${cardIndex} * (${getCardWidth()} + ${getMarginInline(true)}))`,
      );
    }
  }, [cardIndex, isTablet, isDesktop]);

  // #endregion

  return (
    <section
      className={styles.models}
      style={{ marginInline: getMarginInline() }}
    >
      <Header title={title} cardIndex={cardIndex} setCardIndex={setCardIndex} />
      <Main
        title={title}
        transformValue={transformValue}
        getMarginInline={getMarginInline}
      />
    </section>
  );
});

Models.displayName = 'Models';
