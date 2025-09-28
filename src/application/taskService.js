import { Task } from '../domain/task.js';
import { taskRepo } from '../infrastructure/localStorageRepo.js';

export const taskService = {
  getTasks() {
    return taskRepo.load().map(
      t => new Task(t.text, t.completed, t.id)
    );
  },

  addTask(text) {
    if (!text.trim()) return null;
    const task = new Task(text);
    const tasks = this.getTasks();
    tasks.push(task);
    taskRepo.save(tasks);
    return task;
  },

  toggleTask(id) {
    const tasks = this.getTasks();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx !== -1) {
      tasks[idx].toggle();
      taskRepo.save(tasks);
    }
    return tasks[idx];
  },

  deleteTask(id) {
    let tasks = this.getTasks();
    tasks = tasks.filter(t => t.id !== id);
    taskRepo.save(tasks);
    return tasks;
  }
};