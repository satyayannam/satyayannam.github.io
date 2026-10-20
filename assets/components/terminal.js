import { terminal } from '../data/content.js';

export function mountTerminal(reduced) {
  const output = document.querySelector('[data-terminal-output]');
  const boot = document.querySelector('[data-boot]');
  boot.textContent = terminal.boot;
  document.querySelector('[data-terminal-command]').textContent = terminal.command;
  if (reduced.matches) { output.textContent = terminal.output; boot.remove(); return; }
  boot.classList.add('boot-active');
  setTimeout(() => boot.remove(), 1100);
  let length = 0;
  const type = () => {
    if (reduced.matches) length = terminal.output.length;
    if (!document.hidden) output.textContent = terminal.output.slice(0, ++length);
    if (length < terminal.output.length) setTimeout(type, 32);
  };
  setTimeout(type, 850);
}
