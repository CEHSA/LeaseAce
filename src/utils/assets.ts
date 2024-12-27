// Get the base URL from Vite config
const baseUrl = import.meta.env.BASE_URL || '/';

// Function to get the full URL for an asset
const getFullUrl = (path: string) => {
  try {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // In development, use relative path
    if (import.meta.env.DEV) {
      return `${baseUrl}${cleanPath}`;
    }
    // In production, use absolute path
    const url = new URL(cleanPath, window.location.origin + baseUrl);
    return url.href;
  } catch (error) {
    console.error('Error constructing asset URL:', error);
    return `${baseUrl}${path}`;
  }
};

// Export logo URL
export const logoUrl = getFullUrl('aaa-logo.png');

// Helper function for other assets
export const getAssetUrl = (filename: string) => getFullUrl(filename);