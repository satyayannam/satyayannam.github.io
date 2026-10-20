import { readFile, writeFile } from 'node:fs/promises';
import { timelineMarkup } from '../assets/components/timeline.js';

// Optional authoring helper: keep the no-JavaScript/SEO timeline in sync with data.
// This is not a runtime build step; GitHub Pages serves index.html directly.
const url = new URL('../index.html', import.meta.url);
const html = await readFile(url, 'utf8');
const updated = html.replace(/(<div class="timeline" data-timeline>)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/, (_, start, end) => start + timelineMarkup() + '\n          ' + end);
if (updated === html && !html.includes('commit / 04')) throw new Error('Timeline container not found');
await writeFile(url, updated);
console.log('Static Experience content synchronized.');
