/**
 * Get a full image URL from a Strapi media object.
 * Handles both local uploads (relative URLs) and Cloudinary (absolute URLs).
 */
export function getImageUrl(media: any): string | null {
  if (!media) return null;
  if (media.url?.startsWith('/')) {
    return `${import.meta.env.STRAPI_URL}${media.url}`;
  }
  return media.url ?? null;
}

/**
 * Format a date string to French locale (e.g. "19 février 2026").
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Convert Strapi Blocks content to plain text (for previews/excerpts).
 */
export function blocksToText(blocks: any[], maxLength = 300): string {
  if (!blocks) return '';
  return blocks
    .filter((b: any) => b.type === 'paragraph')
    .map((b: any) => b.children?.map((c: any) => c.text).join(''))
    .join(' ')
    .substring(0, maxLength);
}
