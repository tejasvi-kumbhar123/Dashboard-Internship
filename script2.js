class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.pendingList = document.getElementById("pendingList");
    this.completedList = document.getElementById("completedList");
    this.taskInput = document.getElementById("taskInput");
    this.addButton = document.getElementById("addTaskBtn");
    this.saveButton = document.getElementById("saveBtn");

    this.addButton.addEventListener("click", () => this.addTask());
    this.saveButton.addEventListener("click", () => this.manualSave());

    this.render();
  }

  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  manualSave() {
    this.save();
    alert("Tasks saved successfully!");
  }

  addTask() {
    const text = this.taskInput.value.trim();
    if (!text) {
      alert("Task cannot be empty");
      return;
    }

    const task = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toLocaleString(),
      completedAt: null
    };

    this.tasks.push(task);
    this.save();
    this.render();
    this.taskInput.value = "";
  }

  toggleTask(id) {
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        task.completed = !task.completed;
        task.completedAt = task.completed
          ? new Date().toLocaleString()
          : null;
      }
      return task;
    });

    this.save();
    this.render();
  }

  editTask(id) {
    const task = this.tasks.find(t => t.id === id);
    const newText = prompt("Edit task:", task.text);

    if (newText && newText.trim()) {
      task.text = newText.trim();
      this.save();
      this.render();
    }
  }

  deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.save();
    this.render();
  }

  createTaskElement(task) {
    const li = document.createElement("li");

    const info = document.createElement("div");

    const text = document.createElement("div");
    text.textContent = task.text;
    text.className = "task-text";
    if (task.completed) text.classList.add("completed");

    const time = document.createElement("div");
    time.className = "task-time";
    time.textContent = task.completed
      ? `Added: ${task.createdAt} | Completed: ${task.completedAt}`
      : `Added: ${task.createdAt}`;

    info.append(text, time);

    const actions = document.createElement("div");
    actions.className = "actions";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.className = "complete";
    completeBtn.onclick = () => this.toggleTask(task.id);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit";
    editBtn.onclick = () => this.editTask(task.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => this.deleteTask(task.id);

    actions.append(completeBtn, editBtn, deleteBtn);
    li.append(info, actions);

    return li;
  }

  render() {
    this.pendingList.innerHTML = "";
    this.completedList.innerHTML = "";

    this.tasks.forEach(task => {
      const element = this.createTaskElement(task);
      task.completed
        ? this.completedList.appendChild(element)
        : this.pendingList.appendChild(element);
    });
  }
}

new TaskManager();
