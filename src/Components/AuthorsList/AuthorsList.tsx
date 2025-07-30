import { useEffect, useState } from 'react';
import './AuthorsList.scss';
import type { Author } from '../../types/author/author';
import { getAuthors } from '../../api/fetchAuthors/fetchAuthors';
import { AuthorCard } from '../AuthorCard';
import { SkeletonAuthorCard } from '../SkeletonAuthorCard';

export const AuthorsList = () => {
  const [authors, setAuthor] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const skeletons = Array.from({ length: 4 });

  useEffect(() => {
    setLoading(true);
    getAuthors()
      .then((data) => {
        setAuthor(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="author-list">
      {loading ?
        skeletons.map((_, i) => <SkeletonAuthorCard key={`skeleton-${i}`} />)
      : authors.map((author) => (
          <AuthorCard
            key={author.id}
            author={author}
          />
        ))
      }
    </div>
  );
};
