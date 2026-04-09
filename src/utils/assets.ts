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
  
  // 1. Clean the path
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // 2. Identify the resource type
  const resourceType = getResourceType(normalizedPath);
  
  // 3. Extract the final filename to use as the Public ID (fallback strategy for root uploads)
  // This handles cases where assets are uploaded to the root regardless of their local folder
  const pathSegments = normalizedPath.split('/');
  const filename = pathSegments[pathSegments.length - 1];
  
  // 4. Encode special characters (spaces, +, etc.)
  const encodedFilename = encodeURIComponent(filename).replace(/%20/g, '%20');
  
  // 5. Build the final URL with automatic optimization
  const transformation = resourceType === 'raw' ? '' : 'f_auto,q_auto/';
  
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/${transformation}${encodedFilename}`;
};
