import { skills } from '../data/content.js';

export function mountSkillNodes(onSelect) {
  const host = document.querySelector('[data-skill-nodes]');
  const tooltip = document.querySelector('[data-skill-tooltip]');
  host.innerHTML = skills.map(s => `<button class="skill-node" type="button" data-skill="${s.id}" aria-pressed="false"><span class="node-glyph" aria-hidden="true">${s.glyph}</span>${s.name}</button>`).join('');
  let pinned = null, pinnedElement = null;
  function show(id, source = pinnedElement) {
    const skill = skills.find(s => s.id === id);
    document.querySelectorAll('[data-skill]').forEach(el => {
      el.classList.toggle('is-active', el.dataset.skill === id);
      el.classList.toggle('is-related', !!skill?.related.includes(el.dataset.skill));
      if (el.classList.contains('skill-node')) el.setAttribute('aria-pressed', String(el.dataset.skill === pinned));
    });
    tooltip.textContent = skill ? `> ${skill.name} / ${skill.detail}` : '> Select a node to trace its connections.';
    tooltip.classList.toggle('contextual', !!skill && !!source?.classList.contains('skill-tag'));
    onSelect(id);
  }
  document.querySelectorAll('[data-skill]').forEach(el => {
    el.addEventListener('pointerenter', () => show(el.dataset.skill, el));
    el.addEventListener('pointerleave', () => show(pinned));
    el.addEventListener('focus', () => show(el.dataset.skill, el));
    el.addEventListener('blur', () => show(pinned));
    el.addEventListener('click', () => { pinned = pinned === el.dataset.skill ? null : el.dataset.skill; pinnedElement = pinned ? el : null; show(pinned); });
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { pinned = null; show(null); } });
  document.addEventListener('pillar-hover', event => show(event.detail || pinned));
}
