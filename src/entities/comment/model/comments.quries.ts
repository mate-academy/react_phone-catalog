import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Category } from '@/shared/types/Category';

import { commentsApi } from '../api/comments.api';
import type { CreateComment } from '../api/comments.api';

export const useComments = (namespaceId: string) => {
  return useQuery({
    queryKey: ['comments', namespaceId],
    queryFn: () => commentsApi.getByNamespace(namespaceId),
    enabled: Boolean(namespaceId),
  });
};

export const useCommentVariants = (category: Category, namespaceId: string) => {
  return useQuery({
    queryKey: ['comment-variants', category, namespaceId],
    queryFn: () => commentsApi.getVariants(category, namespaceId),
    enabled: Boolean(category && namespaceId),
  });
};

export const useCreateComment = (namespaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: CreateComment) => commentsApi.create(comment),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['comments', namespaceId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['product-ratings'],
          refetchType: 'all',
        }),
      ]);
    },
  });
};
