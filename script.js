const form = document.getElementById('terminal-form');
const input = document.getElementById('terminal-input');
const output = document.getElementById('terminal-output');

let history = [];
let historyIndex = 0;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const command = input.value.trim();
  if (!command) return;

  // Show command
  const cmdElem = document.createElement('p');
  cmdElem.className = 'command';
  cmdElem.textContent = `> ${command}`;
  output.appendChild(cmdElem);

  const response = document.createElement('p');
  response.className = 'output';

  const cmd = command.toLowerCase();
  history.push(cmd);
  historyIndex = history.length;

  // Command logic
  switch (cmd) {
    case 'whoami':
      response.textContent = 'Satya Yannam – Data Scientist. Builder. Automator.';
      break;
    case 'help':
      response.innerHTML = 'Try: whoami, ls, clear, resume, github, neofetch, fortune, sudo rm -rf /, echo, cowsay, figlet';
      break;
    case 'ls':
      response.innerHTML = '/about  /contact  /projects  /resume  /skills  /stack  /ai-model';
      break;
    case 'clear':
      output.innerHTML = '';
      return;
    case 'resume':
      response.textContent = 'Opening resume...';
      window.open('/resume.pdf', '_blank');
      break;
    case 'github':
      response.innerHTML = '<a href="https://github.com/satyayannam" target="_blank">github.com/satyayannam</a>';
      break;
    case 'linkedin':
      response.innerHTML = '<a href="https://linkedin.com/in/satyayannam" target="_blank">linkedin.com/in/satyayannam</a>';
      break;
    case 'neofetch':
      response.innerHTML = `<pre>${ascii.neofetch}</pre>`;
      break;
    case 'figlet':
      response.innerHTML = `<pre>${ascii.figlet}</pre>`;
      break;
    case 'fortune':
      response.textContent = `"Creativity is intelligence having fun."`;
      break;
    case 'sudo rm -rf /':
      response.textContent = '🛑 permission denied: you are not root';
      break;
    default:
      if (cmd.startsWith('echo ')) {
        response.textContent = cmd.slice(5);
      } else if (cmd.startsWith('cd ')) {
        const path = cmd.slice(3);
        response.textContent = `navigated to ${path}`;
      } else {
        response.textContent = `command not found: ${cmd}`;
      }
  }

  output.appendChild(response);
  input.value = '';
  output.scrollTop = output.scrollHeight;
});

// ↑ / ↓ for history
input.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowUp') {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      input.value = '';
    }
  } else if (e.key === 'Tab') {
    e.preventDefault();
    const prefix = input.value.trim();
    const suggestions = ['whoami', 'ls', 'resume', 'clear', 'help', 'echo', 'cd', 'github', 'figlet', 'fortune', 'neofetch'];
    const match = suggestions.find(cmd => cmd.startsWith(prefix));
    if (match) input.value = match;
  }
});
