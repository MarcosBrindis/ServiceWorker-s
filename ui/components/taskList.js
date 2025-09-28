export function renderTasks(tasks, ul, { onToggle, onDelete }) {
  ul.innerHTML = '';
  if (tasks.length === 0) {
    ul.innerHTML = '<li class="empty">¡No hay tareas!</li>';
    return;
  }
  for (const t of tasks) {
    const li = document.createElement('li');
    li.className = t.completed ? 'done' : '';
    li.innerHTML = `
      <span>${t.text}</span>
      <button class="toggle" title="Completar">${t.completed ? '⏪' : '✔️'}</button>
      <button class="delete" title="Eliminar">🗑️</button>
    `;
    li.querySelector('.toggle').onclick = () => onToggle(t.id);
    li.querySelector('.delete').onclick = () => onDelete(t.id);
    ul.appendChild(li);
  }
}