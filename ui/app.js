import { taskService } from '../src/application/taskService.js';
import { renderTasks } from './components/taskList.js';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

function refresh() {
  renderTasks(taskService.getTasks(), list, {
    onToggle: id => {
      taskService.toggleTask(id);
      refresh();
    },
    onDelete: id => {
      taskService.deleteTask(id);
      refresh();
    }
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value;
  if (taskService.addTask(text)) {
    input.value = '';
    refresh();
  }
});

window.addEventListener('DOMContentLoaded', refresh);