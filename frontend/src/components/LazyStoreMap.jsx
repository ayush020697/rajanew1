import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';

const StoreMap = lazy(() => import('./StoreMap').then((module) => ({ default: module.StoreMap })));

export const LazyStoreMap = ({ height = '500px' }) => {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  const fallback = (
    <div
      className="rounded-2xl border border-amber-500/20 bg-zinc-900 animate-pulse"
      style={{ height }}
      aria-hidden="true"
    />
  );

  return (
    <div ref={ref}>
      {shouldLoad ? (
        <Suspense fallback={fallback}>
          <StoreMap height={height} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};
