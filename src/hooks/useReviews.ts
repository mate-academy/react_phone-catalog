import { useEffect, useState } from 'react';
import { supabase } from '@utils/supabaseClient';

export interface Review {
  id: number;
  name: string;
  score: number;
  title: string;
  date: string;
  body: string;
}

export function useReviews(productId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    let active = true;

    supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (!active) return;
        if (data) {
          setReviews(
            data.map((rev) => ({
              id: rev.id,
              name: rev.name,
              score: rev.score,
              title: rev.title,
              date: `Reviewed on ${new Date(rev.created_at).toLocaleDateString(
                'en-GB',
                {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                },
              )}`,
              body: rev.body,
            })),
          );
        }
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [productId, refreshToken]);

  async function addReview(payload: {
    name: string;
    score: number;
    title: string;
    body: string;
  }) {
    const { error } = await supabase.from('reviews').insert([
      {
        ...payload,
        product_id: productId,
      },
    ]);
    if (!error) setRefreshToken((prev) => prev + 1);
    return !error;
  }

  const avgScore =
    reviews.length ?
      Math.round(
        (reviews.reduce((s, r) => s + r.score, 0) / reviews.length) * 10,
      ) / 10
    : 0;

  const ratings = [5, 4, 3, 2, 1].map((star) => ({
    label: `${star} star`,
    pct:
      reviews.length ?
        Math.round(
          (reviews.filter((r) => r.score === star).length / reviews.length) *
            100,
        )
      : 0,
  }));

  return { reviews, loading, addReview, avgScore, ratings };
}
