const API_BASE = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001').replace(/\/+$/, '');

const DEFAULT_WIDTHS = [320, 480, 640, 960, 1280];

export const imageUrl = (id, { width = 800, height, quality = 76, fit = 'cover' } = {}) => {
  const params = new URLSearchParams({ w: String(width), q: String(quality), fit });
  if (height) params.set('h', String(height));
  return `${API_BASE}/api/images/${id}?${params.toString()}`;
};

export const imageSrcSet = (id, { widths = DEFAULT_WIDTHS, width: baseWidth, height, quality = 76, fit = 'cover' } = {}) =>
  widths
    .map((width) => {
      const scaledHeight = height && baseWidth ? Math.round((height / baseWidth) * width) : height;
      return `${imageUrl(id, { width, height: scaledHeight, quality, fit })} ${width}w`;
    })
    .join(', ');

export const imageAssets = {
  logo: { id: 'logo', alt: 'Rajan Wines', width: 160, height: 160 },
  homeHero: { id: 'hero-home', alt: 'Premium wines and spirits', width: 1600, height: 1000 },
  collectionHero: { id: 'hero-collection', alt: 'Premium Collection', width: 1600, height: 700 },
  aboutHero: { id: 'about-hero', alt: 'About Rajan Wines', width: 1600, height: 700 },
  aboutStory: { id: 'about-story', alt: 'Our collection', width: 900, height: 700 },
};
