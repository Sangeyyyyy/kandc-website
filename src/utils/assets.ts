export const CLOUDINARY_CLOUD_NAME = 'dnocvgvnc';

// List of public IDs that should be treated as videos
const VIDEO_ASSETS = [
  'Bet_Is_The_Cookout',
  'hoppers_video',
  'avatar_video',
  'jason_harvey_video',
  'Sinners_video',
  'ABE',
  'Zootopia_video',
  'creatives_at_sea_video',
  'Tron_video',
  'onemusicfest_video',
  'instagram_video',
  'spike_lee_fireside_chat_video',
  'spike_lee_dinner_video',
  'Thought Leadership Brunch Video',
  'Average Joe Main Video',
  'the_come_up_brunch_video',
  'Kingdom Business Video',
  'minute maid video',
  'philadelphia video',
  'shuffle slay video'
];

// List of public IDs that should be treated as raw (e.g. PDFs)
const RAW_ASSETS = [
  'nedbank_cannes_lion_dinner_-_run_of_show',
  'LeavingMoney-JasonEHarvey_1_1',
  'Jason-Harvey-Visionary-Tech-and-Media-Executive_Aug_2025_key'
];

/**
 * Detects the Cloudinary resource type.
 */
const getResourceType = (path: string): string => {
  // Check if it's a known video ID
  if (VIDEO_ASSETS.includes(path)) return 'video';
  if (RAW_ASSETS.includes(path)) return 'raw';

  const ext = path.split('.').pop()?.toLowerCase();
  
  const videoExtensions = ['mp4', 'mov', 'webm', 'ogv'];
  if (ext && videoExtensions.includes(ext)) {
    return 'video';
  }
  
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif', 'heic'];
  if (ext && imageExtensions.includes(ext)) {
    return 'image';
  }
  
  // Default to image if no extension (assuming it's a Public ID from our mapping)
  return 'image';
};

export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  
  if (path.startsWith('http')) return path;

  // Use Vite's built-in environment detection
  const isDev = import.meta.env.DEV;

  if (isDev) {
    // If it's a Public ID without a slash/extension, it's not a local path
    // Local paths usually start with /assets/
    if (!path.startsWith('/') && !path.includes('.')) {
      // It's a Cloudinary ID, but we are in Dev. 
      // Ideally we should still point to Cloudinary in Dev for these IDs.
    } else {
      const localPath = path.startsWith('/') ? path : `/${path}`;
      return encodeURI(localPath);
    }
  }
  
  // Normalize path: remove leading slash and extension if present
  let normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Get resource type before potentially stripping extension
  const resourceType = getResourceType(normalizedPath);
  
  // For Cloudinary URLs, we often want just the Public ID (no extension)
  // unless it's a 'raw' file which needs the extension in the URL often.
  let publicId = normalizedPath;
  if (resourceType !== 'raw' && publicId.includes('.')) {
    publicId = publicId.split('.').slice(0, -1).join('.');
  }
  
  // Extract just the filename (Public ID) in case a path was passed
  const pathSegments = publicId.split('/');
  const finalPublicId = pathSegments[pathSegments.length - 1];
  
  const encodedPublicId = encodeURIComponent(finalPublicId);
  const transformation = resourceType === 'raw' ? '' : 'f_auto,q_auto/';
  
  // Videos should usually have an extension for delivery, or they can use f_auto
  const extension = (resourceType === 'video' && !finalPublicId.includes('.')) ? '.mp4' : '';
  
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/${transformation}${encodedPublicId}${extension}`;
};


