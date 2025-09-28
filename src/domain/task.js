export class Task {
  constructor(text, completed = false, id = null) {
    this.id = id || Date.now().toString();
    this.text = text.trim();
    this.completed = completed;
  }

  toggle() {
    this.completed = !this.completed;
  }
}