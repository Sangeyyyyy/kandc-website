export const CLOUDINARY_CLOUD_NAME = 'dnocvgvnc';

/**
 * Detects the Cloudinary resource type based on file extension.
 */
const getResourceType = (path: string): string => {
  const ext = path.split('.').pop()?.toLowerCase();
  
  const videoExtensions = ['mp4', 'mov', 'webm', 'ogv'];
  if (ext && videoExtensions.includes(ext)) {
    return 'video';
  }
  
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif', 'heic'];
  if (ext && imageExtensions.includes(ext)) {
    return 'image';
  }
  
  return 'raw';
};

/**
 * Returns the full URL for an asset hosted on Cloudinary.
 * @param path The local path (e.g., '/assets/hero.mp4' or 'founder.png')
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  
  // If it's already a full URL, don't change it
  if (path.startsWith('http')) return path;
  
  // Remove leading slash if it exists
  let cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Strip 'assets/' prefix if it exists, as the user uploaded contents directly to root
  if (cleanPath.startsWith('assets/')) {
    cleanPath = cleanPath.substring(7);
  }
  
  const resourceType = getResourceType(cleanPath);
  
  // Add optimization flags for images and videos
  // f_auto: automatic format (WebP/AVIF etc)
  // q_auto: automatic quality compression
  const transformation = resourceType === 'raw' ? '' : 'f_auto,q_auto/';
  
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/${transformation}${cleanPath}`;
};
