import React from 'react';
import { imageSrcSet, imageUrl } from '../lib/images';

export const OptimizedImage = ({
  imageId,
  alt,
  width,
  height,
  sizes = '100vw',
  widths,
  className = '',
  imgClassName = '',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  quality = 76,
  fit = 'cover',
  wrapperClassName = '',
  ...props
}) => {
  const src = imageUrl(imageId, { width: width || 800, height, quality, fit });
  const srcSet = imageSrcSet(imageId, { widths, width, height, quality, fit });
  const style = width && height ? { aspectRatio: `${width} / ${height}` } : undefined;

  return (
    <span className={`block overflow-hidden bg-zinc-900 ${wrapperClassName}`} style={style}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={`${className} ${imgClassName}`.trim()}
        {...props}
      />
    </span>
  );
};
