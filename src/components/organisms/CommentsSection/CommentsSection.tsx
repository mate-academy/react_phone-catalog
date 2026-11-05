import { useState } from 'react';
import type { SubmitEvent } from 'react';

import classNames from 'classnames';
import { Form } from 'radix-ui';
import { useTranslation } from 'react-i18next';

import { Typography } from '@/components/atoms';
import { DefaultButton, Dropdown, Rating } from '@/components/molecules';

import {
  useComments,
  useCommentVariants,
  useCreateComment,
} from '@/entities/comment/model/comments.quries';

import type { Category } from '@/shared/types/Category';
import type { Rate } from '@/shared/types';

import { Comment } from './Comment/Comment';

import styles from './CommentsSection.module.scss';

type Props = {
  namespaceId: string;
  category: Category;
  productId: string;
  className?: string;
};

export const CommentsSection = ({
  namespaceId,
  category,
  productId,
  className,
}: Props) => {
  const { t } = useTranslation();

  const [isWriting, setIsWriting] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(productId);
  const [rating, setRating] = useState<Rate>(5);

  const {
    data: comments = [],
    isPending: isCommentsPending,
    isError: isCommentsError,
  } = useComments(namespaceId);

  const {
    data: variants = [],
    isPending: isVariantsPending,
    isError: isVariantsError,
  } = useCommentVariants(category, namespaceId);

  const createComment = useCreateComment(namespaceId);

  const selectedVariant = variants.find(
    (variant) => variant.id === selectedProductId,
  );

  const handleCancel = () => {
    setIsWriting(false);
    setSelectedProductId(productId);
    setRating(5);
    createComment.reset();
  };

  const handleClear = () => {
    setSelectedProductId('');
    setRating(5);
    createComment.reset();
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedVariant || rating === 0 || createComment.isPending) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const username = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const comment = String(formData.get('comment') ?? '').trim();

    if (!username || !email || !comment) {
      return;
    }

    await createComment.mutateAsync({
      productId: selectedVariant.id,
      namespaceId,
      username,
      email,
      comment,
      rate: rating,
    });

    form.reset();
    handleCancel();
  };

  return (
    <section className={classNames(styles.container, className)}>
      <Typography
        variant="h3"
        className={styles.title}
      >
        {t('commentsTitle')}
      </Typography>

      <div className={styles.comments}>
        {isCommentsPending && (
          <Typography variant="smalltext">{t('commentsLoading')}</Typography>
        )}

        {isCommentsError && (
          <Typography variant="smalltext">{t('commentsLoadError')}</Typography>
        )}

        {!isCommentsPending && !isCommentsError && comments.length === 0 && (
          <Typography variant="smalltext">{t('commentsEmpty')}</Typography>
        )}

        {!isCommentsError &&
          comments.map((comment) => {
            const variant = variants.find(
              (item) => item.id === comment.productId,
            );

            const specs =
              variant ?
                [
                  variant.color &&
                    `${t('commentsColor')}: ${variant.color[0].toUpperCase() + variant.color.slice(1)}`,
                  variant.capacity &&
                    `${t('commentsCapacity')}: ${variant.capacity}`,
                ]
                  .filter(Boolean)
                  .join(' · ')
              : '';

            return (
              <div
                key={comment.id}
                className={styles.commentItem}
              >
                <Comment
                  name={comment.username}
                  date={new Date(comment.createdAt).toLocaleDateString('en-GB')}
                  specs={specs}
                  text={comment.comment}
                  rate={Math.max(0, Math.min(5, comment.rate)) as Rate}
                />
              </div>
            );
          })}
      </div>

      {!isWriting ?
        <DefaultButton
          type="button"
          className={classNames(styles.button, styles.writeButton)}
          onClick={() => {
            setSelectedProductId(productId);
            setRating(5);
            createComment.reset();
            setIsWriting(true);
          }}
        >
          {t('commentsWrite')}
        </DefaultButton>
      : <Form.Root
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.formHeader}>
            <Typography variant="h3"> {t('commentsLeave')}</Typography>

            <Typography
              variant="smalltext"
              className={styles.formDescription}
            >
              {t('commentsFormDescription')}
            </Typography>
          </div>

          <div className={styles.field}>
            <label
              htmlFor="comment-product"
              className={styles.label}
            >
              {t('commentsProduct')} <span>*</span>
            </label>

            <Dropdown
              options={variants.map((variant) => ({
                value: variant.id,
                label: variant.name,
              }))}
              value={selectedProductId}
              onChange={setSelectedProductId}
              placeholder={
                isVariantsPending ? t('commentsLoadingVariants')
                : isVariantsError ?
                  t('commentsVariantsError')
                : variants.length === 0 ?
                  t('commentsNoVariants')
                : t('commentsSelectVariant')
              }
              disabled={
                isVariantsPending || isVariantsError || variants.length === 0
              }
            />
          </div>

          <div className={styles.ratingField}>
            <Typography
              variant="bodytext"
              className={styles.label}
            >
              {t('commentsYourRating')} <span>*</span>
            </Typography>

            <Rating
              rate={rating}
              onChange={setRating}
            />
          </div>

          <div className={styles.fieldsRow}>
            <Form.Field
              name="name"
              className={styles.field}
            >
              <div className={styles.fieldHeader}>
                <Form.Label className={styles.label}>
                  {t('commentsName')} <span>*</span>
                </Form.Label>

                <Form.Message
                  className={styles.message}
                  match="valueMissing"
                >
                  {t('commentsEnterName')}
                </Form.Message>
              </div>

              <Form.Control asChild>
                <input
                  name="name"
                  type="text"
                  className={styles.input}
                  placeholder={t('commentsNamePlaceholder')}
                  autoComplete="name"
                  maxLength={80}
                  required
                />
              </Form.Control>
            </Form.Field>

            <Form.Field
              name="email"
              className={styles.field}
            >
              <div className={styles.fieldHeader}>
                <Form.Label className={styles.label}>
                  {t('commentsEmail')} <span>*</span>
                </Form.Label>

                <Form.Message
                  className={styles.message}
                  match="valueMissing"
                >
                  {t('commentsEnterEmail')}
                </Form.Message>

                <Form.Message
                  className={styles.message}
                  match="typeMismatch"
                >
                  {t('commentsInvalidEmail')}
                </Form.Message>
              </div>

              <Form.Control asChild>
                <input
                  name="email"
                  type="email"
                  className={styles.input}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </Form.Control>
            </Form.Field>
          </div>

          <Form.Field
            name="comment"
            className={styles.field}
          >
            <div className={styles.fieldHeader}>
              <Form.Label className={styles.label}>
                {t('commentsYourComment')} <span>*</span>
              </Form.Label>

              <Form.Message
                className={styles.message}
                match="valueMissing"
              >
                {t('commentsEnterComment')}
              </Form.Message>
            </div>

            <Form.Control asChild>
              <textarea
                name="comment"
                className={styles.textarea}
                placeholder={t('commentsPlaceholder')}
                rows={5}
                maxLength={1000}
                required
              />
            </Form.Control>
          </Form.Field>

          {createComment.isError && (
            <Typography
              variant="smalltext"
              className={styles.message}
            >
              {t('commentsSendError')}
            </Typography>
          )}

          <div className={styles.formActions}>
            <DefaultButton
              type="button"
              className={classNames(styles.button, styles.cancelButton)}
              onClick={handleCancel}
            >
              {t('commentsCancel')}
            </DefaultButton>

            <DefaultButton
              type="reset"
              className={classNames(styles.button, styles.clearButton)}
              onClick={handleClear}
            >
              {t('commentsClear')}
            </DefaultButton>

            <Form.Submit asChild>
              <DefaultButton
                type="submit"
                className={classNames(styles.button, styles.submitButton)}
                disabled={
                  createComment.isPending ||
                  isVariantsPending ||
                  isVariantsError ||
                  !selectedVariant ||
                  rating === 0
                }
              >
                {createComment.isPending ?
                  t('commentsSending')
                : t('commentsWrite')}
              </DefaultButton>
            </Form.Submit>
          </div>
        </Form.Root>
      }
    </section>
  );
};
