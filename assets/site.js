import { Background } from './components/background.js';
import { mountSkillNodes } from './components/skill-nodes.js';
import { mountTimeline } from './components/timeline.js';
import { mountTerminal } from './components/terminal.js';

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
mountTimeline();
const background = new Background(document.querySelector('#neural-background'), reduced);
mountSkillNodes(id => background.select(id));
mountTerminal(reduced);
document.querySelector('[data-year]').textContent = new Date().getFullYear();
const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
const narrow = matchMedia('(max-width: 980px)');
function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menu.inert = narrow.matches && !open;
}
setMenu(false);
narrow.addEventListener('change', () => setMenu(false));
menuToggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); menuToggle.focus(); } });
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
  setMenu(false);
  if (!reduced.matches) {
    document.body.classList.remove('transitioning');
    void document.body.offsetWidth;
    document.body.classList.add('transitioning');
    setTimeout(() => document.body.classList.remove('transitioning'), 350);
  }
}));
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  reveals.forEach((el, i) => { el.style.transitionDelay = `${i % 4 * 55}ms`; observer.observe(el); });
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      const active = link.hash === `#${entry.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }), { rootMargin: '-15% 0px -55% 0px' });
  document.querySelectorAll('main > section').forEach(el => navObserver.observe(el));
}
const motionButton = document.querySelector('[data-motion-toggle]');
motionButton.addEventListener('click', () => {
  const paused = motionButton.getAttribute('aria-pressed') !== 'true';
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.textContent = paused ? 'Resume effects ▷' : 'Pause effects Ⅱ';
  document.body.classList.toggle('effects-paused', paused);
  background.setPaused(paused);
});
const cursor = document.querySelector('.crosshair');
window.addEventListener('pointermove', e => {
  if (reduced.matches || e.pointerType === 'touch') return;
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  cursor.classList.add('visible');
}, { passive: true });
document.addEventListener('pointerleave', () => cursor.classList.remove('visible'));
document.querySelector('[data-copy-email]').addEventListener('click', async event => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText('syannam2024@fau.edu');
    button.textContent = 'Copied';
    setTimeout(() => { button.textContent = 'Copy Email'; }, 1400);
  } catch { location.href = 'mailto:syannam2024@fau.edu'; }
});
if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
