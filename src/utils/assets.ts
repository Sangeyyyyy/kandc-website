export const BASE_ASSET_URL = 'https://pub-d207007fae5c46adb4654282a5b04400.r2.dev';

/**
 * Returns the full URL for an asset hosted on Cloudflare R2.
 * @param path The local path (e.g., '/assets/hero.mp4' or 'founder.png')
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  
  // If it's already a full URL, don't change it
  if (path.startsWith('http')) return path;
  
  // Remove leading slash if it exists
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  return `${BASE_ASSET_URL}/${cleanPath}`;
};
