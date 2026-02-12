/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../shared/api/getProductById';
import { getSuggestedProducts } from '../../shared/api/suggested';
import type {
  ProductDetailBase,
  ProductListItem,
} from '../../shared/api/types';
import { Loader } from '../../shared/components/Loader';
import { ErrorState } from '../../shared/components/ErrorState';
import { ProductsSlider } from '../../shared/components/ProductsSlider';
import { useCart } from '../../shared/context/CartContext';
import { useFavorites } from '../../shared/context/FavoritesContext';
import { money } from '../../shared/utils/format';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import HeartEmpty from '../../assets/Favourites (Heart Like).svg';
import HeartFull from '../../assets/Favourites Filled (Heart Like).svg';
import s from './ProductDetailsPage.module.scss';

const withBase = (p: string) => {
  if (!p) {
    return p;
  }

  if (/^[a-z]+:\/\//i.test(p)) {
    return p;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.replace(/^\/|\/$/g, '');
  const cleanPath = p.replace(/^\/+/, '');

  if (!cleanBase) {
    return `/${cleanPath}`;
  }

  if (
    p.startsWith(base) ||
    p.startsWith(`/${cleanBase}/`) ||
    p.startsWith(`${cleanBase}/`)
  ) {
    return p.startsWith('/') ? p : `/${p}`;
  }

  return `/${cleanBase}/${cleanPath}`;
};

const buildImagePath = (prod: ProductDetailBase, file: string) => {
  if (!file) {
    return file;
  }

  if (file.includes('/')) {
    return file;
  } // уже путь

  const cat = (prod.category || '').toLowerCase(); // phones/tablets/accessories

  return `img/${cat}/${prod.namespaceId}/${file}`;
};

const categoryRoutes: Record<string, string> = {
  phones: '/phones',
  tablets: '/tablets',
  accessories: '/accessories',
};

export const ProductDetailsPage: React.FC = () => {
  const { productId = '' } = useParams();
  const { add } = useCart();
  const { isFavorite, toggle } = useFavorites();

  const [addedIds, setAddedIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('addedVariantIds');
      const arr: string[] = raw ? JSON.parse(raw) : [];

      return new Set(arr);
    } catch {
      return new Set();
    }
  });

  const inCart = addedIds.has(productId);
  const fav = isFavorite(productId);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductDetailBase | null>(null);
  const [suggested, setSuggested] = useState<ProductListItem[]>([]);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [color, setColor] = useState<string>('');
  const [capacity, setCapacity] = useState<string>('');

  const [imgSrc, setImgSrc] = useState<string>('');
  const [isImgReady, setIsImgReady] = useState(true);

  const startX = useRef<number | null>(null);
  const lastX = useRef<number | null>(null);
  const isPointerDown = useRef(false);
  const THRESHOLD = 50;

  const navigate = useNavigate();

  const scrollYRef = useRef(0);
  const isScrollLockedRef = useRef(false);

  const galleryRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const lockScroll = () => {
    if (isScrollLockedRef.current) {
      return;
    }

    const y = window.scrollY;

    scrollYRef.current = y;
    const { body } = document;

    body.style.position = 'fixed';
    body.style.top = `-${y}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.setProperty('scrollbar-gutter', 'stable both-edges');
    isScrollLockedRef.current = true;
  };

  const unlockScroll = () => {
    if (!isScrollLockedRef.current) {
      return;
    }

    const { body } = document;
    const savedTop = body.style.top;
    const y =
      savedTop && savedTop.startsWith('-')
        ? Math.abs(parseInt(savedTop, 10)) || scrollYRef.current
        : scrollYRef.current;

    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.width = '';
    body.style.removeProperty('scrollbar-gutter');

    isScrollLockedRef.current = false;
    window.scrollTo(0, y);
  };

  const freezeGallery = () => {
    const g = galleryRef.current;
    const m = mainRef.current;

    if (!g || !m) {
      return;
    }

    g.style.minHeight = `${g.offsetHeight}px`;
    m.style.minHeight = `${m.offsetHeight}px`;
  };

  const unfreezeGallery = () => {
    const g = galleryRef.current;
    const m = mainRef.current;

    if (!g || !m) {
      return;
    }

    g.style.minHeight = '';
    m.style.minHeight = '';
  };

  const forceUnlock = () => {
    unfreezeGallery();
    if (isScrollLockedRef.current) {
      unlockScroll();
    }
  };

  const buildVariantId = (p: ProductDetailBase, c: string, cap: string) =>
    `${p.namespaceId}-${cap.toLowerCase()}-${c.toLowerCase()}`;

  const safeSetActiveImageIdx = (nextIdx: number | ((v: number) => number)) => {
    freezeGallery();
    setActiveImageIdx(nextIdx);
  };

  const toNext = () =>
    safeSetActiveImageIdx(prev =>
      prev < (product?.images.length ?? 1) - 1 ? prev + 1 : 0,
    );

  const toPrev = () =>
    safeSetActiveImageIdx(prev =>
      prev > 0 ? prev - 1 : (product?.images.length ?? 1) - 1,
    );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDown.current = true;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current || startX.current == null) {
      return;
    }

    lastX.current = e.clientX;
  };

  const onPointerUp = () => {
    if (
      !isPointerDown.current ||
      startX.current == null ||
      lastX.current == null
    ) {
      isPointerDown.current = false;
      startX.current = null;
      lastX.current = null;

      return;
    }

    const diff = lastX.current - startX.current;

    if (Math.abs(diff) > THRESHOLD) {
      (diff < 0 ? toNext : toPrev)();
    }

    isPointerDown.current = false;
    startX.current = null;
    lastX.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      toPrev();
    }

    if (e.key === 'ArrowRight') {
      toNext();
    }
  };

  const preloadImg = (src: string) =>
    new Promise<void>(resolve => {
      const img = new Image();

      img.onload = img.onerror = () => resolve();
      img.src = src;
    });

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }

      forceUnlock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reload = () => {
    if (!productId) {
      return;
    }

    setError(null);
    const isFirstLoad = !product;

    if (isFirstLoad) {
      lockScroll();
      setLoading(true);
    }

    getProductById(productId)
      .then(async p => {
        if (!p) {
          setProduct(null);

          return;
        }

        const raw = Array.isArray(p.images) ? p.images : [];
        const full = raw.map(f => withBase(buildImagePath(p, f)));

        const preloadAll = full.length
          ? Promise.all(full.map(preloadImg))
          : Promise.resolve();

        const suggestedPromise = getSuggestedProducts(
          p.category,
          p.namespaceId,
          8,
        );

        await Promise.all([preloadAll, suggestedPromise]);
        const sug = await suggestedPromise;

        setProduct(p);
        setColor(p.color);
        setCapacity(p.capacity);
        setActiveImageIdx(0);
        setImgSrc(full[0] || '');
        setIsImgReady(true);
        setSuggested(sug);
      })
      .catch(e => setError(String(e?.message || e)))
      .finally(() => {
        if (isFirstLoad) {
          setLoading(false);
        }

        requestAnimationFrame(() => {
          forceUnlock();
        });
      });
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const images = useMemo(
    () =>
      product
        ? (product.images ?? []).map(f => withBase(buildImagePath(product, f)))
        : [],
    [product],
  );

  useEffect(() => {
    if (!product || !color || !capacity) {
      return;
    }

    const newId = buildVariantId(product, color, capacity);

    if (newId === productId) {
      return;
    }

    scrollYRef.current = window.scrollY;
    (document.activeElement as HTMLElement | null)?.blur?.();

    freezeGallery();
    lockScroll();

    navigate(`/product/${newId}`, {
      replace: true,
      preventScrollReset: true,
    });

    const t = window.setTimeout(() => {
      forceUnlock();
    }, 1000);

    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, capacity]);

  const trail = useMemo(() => {
    if (!product) {
      return [];
    }

    const cat = product.category?.toLowerCase?.() ?? '';
    const categoryLabel = cat.charAt(0).toUpperCase() + cat.slice(1);

    return [
      { label: categoryLabel, to: categoryRoutes[cat] ?? `/${cat}` },
      { label: product.name },
    ];
  }, [product]);

  const title = product?.name || 'Product details';

  const techSpecs = useMemo(() => {
    if (!product) {
      return [];
    }

    const entries: Array<[string, string | number]> = [
      ['Screen', product.screen ?? '—'],
      ['Resolution', product.resolution ?? '—'],
      ['Processor', product.processor ?? '—'],
      ['RAM', product.ram ?? '—'],
      ['Camera', product.camera ?? '—'],
      ['Zoom', product.zoom ?? '—'],
      ['Cell', product.cell?.join(', ') ?? '—'],
    ];

    return entries.filter(
      ([, v]) => v !== '—' && v !== undefined && v !== null,
    );
  }, [product]);

  const visibleSpecs = useMemo(() => {
    const SPEC_ORDER = ['Screen', 'Resolution', 'Processor', 'RAM'] as const;
    const order = new Map<string, number>(SPEC_ORDER.map((k, i) => [k, i]));

    return techSpecs
      .filter(([k]) => order.has(k))
      .sort((a, b) => (order.get(a[0]) ?? 99) - (order.get(b[0]) ?? 99));
  }, [techSpecs]);

  useEffect(() => {
    if (!images.length) {
      requestAnimationFrame(() => {
        forceUnlock();
      });

      return;
    }

    const nextSrc = images[activeImageIdx] ?? '';

    if (nextSrc === imgSrc) {
      requestAnimationFrame(() => {
        forceUnlock();
      });

      return;
    }

    setIsImgReady(false);
    const img = new Image();

    img.onload = () => {
      setImgSrc(nextSrc);
      requestAnimationFrame(() => {
        setIsImgReady(true);
        requestAnimationFrame(() => {
          forceUnlock();
        });
      });
    };

    img.onerror = () => {
      setImgSrc(nextSrc);
      setIsImgReady(true);
      requestAnimationFrame(() => {
        forceUnlock();
      });
    };

    img.src = nextSrc;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeImageIdx, images]);

  if (loading && !product) {
    return (
      <div
        style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return <ErrorState message="Something went wrong" onRetry={reload} />;
  }

  if (!product) {
    return <p style={{ padding: 24 }}>Product was not found</p>;
  }

  return (
    <section className={s.root}>
      <div className={s.inner}>
        <div className={s.breadcrumbs}>
          <Breadcrumbs trail={trail} variant="home" />
        </div>
        <div className={s.breadcrumbsBack}>
          <Breadcrumbs trail={[]} variant="back" />
        </div>

        <h1 className={s.title}>{title}</h1>

        <div className={s.grid}>
          <div className={s.gallery} ref={galleryRef}>
            <div
              className={s.mainImage}
              ref={mainRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              tabIndex={0}
              role="button"
              aria-label={`Image ${activeImageIdx + 1} of ${images.length}. Swipe or use arrow keys`}
              onKeyDown={onKeyDown}
            >
              <img
                src={imgSrc}
                alt={product.name}
                draggable={false}
                className={isImgReady ? s.imgVisible : s.imgHidden}
                width={800}
                height={800}
              />
            </div>

            <div className={s.thumbs}>
              {images.map((src, i) => (
                <button
                  key={src}
                  className={`${s.thumb} ${i === activeImageIdx ? s.active : ''}`}
                  onClick={() => safeSetActiveImageIdx(i)}
                  aria-pressed={i === activeImageIdx}
                  aria-label={`Show image ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className={s.panel}>
            {product.colorsAvailable?.length > 0 && (
              <div className={s.option}>
                <div className={s.optionLabel}>Available colors</div>
                <div className={s.swatches}>
                  {product.colorsAvailable.map(c => (
                    <label
                      key={c}
                      className={`${s.swatch} ${color === c ? s.selected : ''}`}
                    >
                      <input
                        type="radio"
                        name="color"
                        value={c}
                        checked={color === c}
                        onChange={() => setColor(c)}
                        tabIndex={-1}
                      />
                      <span style={{ background: c }} />
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className={s.sep} />

            {product.capacityAvailable?.length > 0 && (
              <div className={s.option}>
                <div className={s.optionLabel}>Select capacity</div>
                <div className={s.choices}>
                  {product.capacityAvailable.map(cap => (
                    <label
                      key={cap}
                      className={`${s.choice} ${capacity === cap ? s.selected : ''}`}
                    >
                      <input
                        type="radio"
                        name="capacity"
                        value={cap}
                        checked={capacity === cap}
                        onChange={() => setCapacity(cap)}
                        tabIndex={-1}
                      />
                      {cap}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className={s.sep} />

            <div className={s.priceBlock}>
              <span className={s.price}>{money(product.priceDiscount)}</span>
              {product.priceRegular > product.priceDiscount && (
                <span className={s.fullPrice}>
                  {money(product.priceRegular)}
                </span>
              )}
            </div>

            <div className={s.actions}>
              <button
                className={`${s.cartBtn} ${inCart ? s.inCart : ''}`}
                onClick={() => {
                  if (!inCart) {
                    add(product.id);
                    setAddedIds(prev => {
                      const next = new Set(prev);

                      next.add(productId);
                      try {
                        localStorage.setItem(
                          'addedVariantIds',
                          JSON.stringify(Array.from(next)),
                        );
                      } catch {}

                      return next;
                    });
                  }
                }}
                aria-disabled={inCart}
              >
                {inCart ? 'Added' : 'Add to cart'}
              </button>

              <button
                className={`${s.heartBtn} ${fav ? s.active : ''}`}
                aria-pressed={fav}
                onClick={() => toggle(productId)}
                title={fav ? 'Remove from favorites' : 'Add to favorites'}
              >
                <img
                  src={fav ? HeartFull : HeartEmpty}
                  alt=""
                  className={s.heartIcon}
                  width={16}
                  height={16}
                  decoding="async"
                />
              </button>
            </div>

            {visibleSpecs.length > 0 && (
              <ul className={s.specs}>
                {visibleSpecs.map(([k, v]) => (
                  <li key={k}>
                    <span>{k}</span> <strong>{v}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {product.description?.length > 0 && (
          <section className={s.about}>
            <div className={s.row}>
              <div className={s.left}>
                <h2 className={s.aboutTitle}>About</h2>
                <div className={s.sep} />
                {product.description.map(block => (
                  <article key={block.title} className={s.aboutBlock}>
                    <h3 className={s.blockTitle}>{block.title}</h3>
                    {block.text.map((t, i) => (
                      <p key={i} className={s.blockText}>
                        {t}
                      </p>
                    ))}
                  </article>
                ))}
              </div>

              {techSpecs.length > 0 && (
                <div className={s.right}>
                  <h2 className={s.specsBlockTitle}>Tech specs</h2>
                  <div className={s.sep} />
                  <ul className={s.specsBlockList}>
                    {techSpecs.map(([k, v]) => (
                      <li key={k}>
                        <span>{k}:</span> <strong>{v}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {suggested.length > 0 && (
          <section className={s.suggested}>
            <ProductsSlider title="You may also like" items={suggested} />
          </section>
        )}
      </div>
    </section>
  );
};
