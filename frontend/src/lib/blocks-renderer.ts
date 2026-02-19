/**
 * Renders Strapi Blocks content as HTML.
 * Supports: paragraphs, headings, lists, quotes, images, links,
 * bold, italic, underline, strikethrough, code.
 */

import { getImageUrl } from './helpers';

/** Render inline children (text with formatting + links) */
export function renderChildren(children: any[]): string {
  if (!children) return '';
  return children.map((child: any) => {
    if (child.type === 'link') {
      const inner = renderChildren(child.children);
      return `<a href="${child.url}" target="_blank" rel="noopener noreferrer" class="text-rose-600 hover:underline">${inner}</a>`;
    }
    if (child.type === 'text') {
      let text = escapeHtml(child.text || '');
      if (child.bold) text = `<strong>${text}</strong>`;
      if (child.italic) text = `<em>${text}</em>`;
      if (child.underline) text = `<u>${text}</u>`;
      if (child.strikethrough) text = `<s>${text}</s>`;
      if (child.code) text = `<code class="bg-gray-100 px-1 rounded text-sm">${text}</code>`;
      return text;
    }
    return child.text ? escapeHtml(child.text) : '';
  }).join('');
}

/** Render a single block */
export function renderBlock(block: any): string {
  switch (block.type) {
    case 'paragraph':
      return `<p>${renderChildren(block.children)}</p>`;

    case 'heading': {
      const level = block.level || 2;
      return `<h${level}>${renderChildren(block.children)}</h${level}>`;
    }

    case 'list': {
      const tag = block.format === 'ordered' ? 'ol' : 'ul';
      const items = (block.children || [])
        .map((item: any) => `<li>${renderChildren(item.children)}</li>`)
        .join('');
      return `<${tag}>${items}</${tag}>`;
    }

    case 'quote':
      return `<blockquote>${renderChildren(block.children)}</blockquote>`;

    case 'code':
      return `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>${escapeHtml(
        (block.children || []).map((c: any) => c.text).join('\n')
      )}</code></pre>`;

    case 'image': {
      const url = getImageUrl(block.image);
      if (!url) return '';
      const alt = block.image?.alternativeText || '';
      const caption = block.image?.caption || '';
      return `<figure class="my-6">
        <img src="${url}" alt="${escapeHtml(alt)}" class="rounded-lg w-full" loading="lazy" />
        ${caption ? `<figcaption class="text-sm text-gray-500 mt-2 text-center">${escapeHtml(caption)}</figcaption>` : ''}
      </figure>`;
    }

    default:
      return '';
  }
}

/** Render all blocks to HTML string */
export function renderBlocks(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks.map(renderBlock).join('');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
