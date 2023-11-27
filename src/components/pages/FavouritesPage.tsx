import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Card, BreadCrumbs, BlockTitle } from '../index';
import { Context } from '../../utils/Context';

export const FavouritesPage = () => {
  const { favourites } = useContext(Context);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const list = useMemo(() => favourites.filter(item => item.name
    .toLocaleLowerCase().replaceAll(' ', '')
    .includes(query.toLocaleLowerCase())), [query, favourites]);

  return (
    <main className="favourites page__container">
      <BreadCrumbs />
      <BlockTitle title="Favourites" subtitle={favourites.length} />
      <section className="favourites__list">
        <TransitionGroup className="favourites__list" data-cy="addToFavorite">
          {list
            .map(product => (
              <CSSTransition
                key={product.name}
                timeout={500}
                classNames="favourites__item"
              >
                <div className="favourites__item">
                  <Card product={product} />
                </div>
              </CSSTransition>
            ))}

        </TransitionGroup>
      </section>
      {(!list.length && query)
        && <BlockTitle subtitle={0} title="No matches found" />}
    </main>
  );
};
