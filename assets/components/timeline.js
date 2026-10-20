import { experience } from '../data/content.js';

export function timelineMarkup() {
  // Content is developer-owned, never user-supplied HTML.
  return experience.map((job, i) => `
    <article class="timeline-item reveal" id="${job.id}">
      <div class="commit-meta"><span>commit / 0${experience.length - i}</span>${job.present ? '<span class="present-badge">● PRESENT</span>' : '<span>merged</span>'}</div>
      <p class="time">${job.dates}</p>
      <h3>${job.role}<span class="company">${job.company}</span></h3>
      <p class="role-location">${job.type} · ${job.location}</p>
      <details open><summary>Role details <span aria-hidden="true">±</span></summary>
        <p>${job.description}</p>
        <div class="tag-row">${job.tags.map(([name, id]) => id ? `<button type="button" class="skill-tag" data-skill="${id}">${name}</button>` : `<span>${name}</span>`).join('')}</div>
        ${job.link ? `<a class="suprgig-link" href="${job.link}" title="${job.linkTitle}" target="_blank" rel="noopener noreferrer"><span><small>BUILDING NOW</small>Visit suprgig.com</span><span aria-hidden="true">↗</span></a>` : ''}
      </details>
    </article>`).join('').replace(/^[ \t]+$/gm, '');
}

export function mountTimeline() {
  document.querySelector('[data-timeline]').innerHTML = timelineMarkup();
}
